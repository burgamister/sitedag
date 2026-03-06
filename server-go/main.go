package main

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
)

type config struct {
	ListenAddr    string
	TelegramToken string
	TargetChatID  int64
	CORSOrigin    string
}

type leadRequest struct {
	Name             string         `json:"name"`
	PrimaryContact   string         `json:"primaryContact"`
	SecondaryContact string         `json:"secondaryContact"`
	Score            leadScore      `json:"score"`
	Questions        []leadQuestion `json:"questions"`
}

type leadScore struct {
	OK    int `json:"ok"`
	Total int `json:"total"`
}

type leadQuestion struct {
	ID             int      `json:"id"`
	Russian        string   `json:"russian"`
	UserAnswers    []string `json:"userAnswers"`
	CorrectAnswers []string `json:"correctAnswers"`
}

type telegramSendMessageResponse struct {
	OK          bool            `json:"ok"`
	Description string          `json:"description"`
	Result      json.RawMessage `json:"result"`
}

func main() {
	cfg, err := loadConfig()
	if err != nil {
		log.Fatalf("config error: %v", err)
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("ok"))
	})
	mux.HandleFunc("/api/level-test", withCORS(cfg.CORSOrigin, func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		if r.Method != http.MethodPost {
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}

		var req leadRequest
		if err := decodeJSONBody(w, r, &req); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		if err := validateLead(req); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		message := formatLeadMessage(req)
		if err := sendTelegramMessage(r.Context(), cfg, message); err != nil {
			log.Printf("telegram send error: %v", err)
			http.Error(w, "failed to deliver message", http.StatusBadGateway)
			return
		}

		writeJSON(w, http.StatusOK, map[string]any{"ok": true})
	}))

	server := &http.Server{
		Addr:              cfg.ListenAddr,
		Handler:           mux,
		ReadHeaderTimeout: 10 * time.Second,
		ReadTimeout:       15 * time.Second,
		WriteTimeout:      20 * time.Second,
		IdleTimeout:       60 * time.Second,
	}

	log.Printf("server started on %s", cfg.ListenAddr)
	if err := server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
		log.Fatalf("server failed: %v", err)
	}
}

func loadConfig() (config, error) {
	token := strings.TrimSpace(os.Getenv("TELEGRAM_BOT_TOKEN"))
	chatIDRaw := strings.TrimSpace(os.Getenv("TELEGRAM_TARGET_CHAT_ID"))
	if token == "" {
		return config{}, errors.New("TELEGRAM_BOT_TOKEN is required")
	}
	if chatIDRaw == "" {
		return config{}, errors.New("TELEGRAM_TARGET_CHAT_ID is required")
	}
	chatID, err := strconv.ParseInt(chatIDRaw, 10, 64)
	if err != nil {
		return config{}, fmt.Errorf("invalid TELEGRAM_TARGET_CHAT_ID: %w", err)
	}

	listen := strings.TrimSpace(os.Getenv("LISTEN_ADDR"))
	if listen == "" {
		listen = ":8080"
	}

	cors := strings.TrimSpace(os.Getenv("CORS_ORIGIN"))
	if cors == "" {
		cors = "*"
	}

	return config{
		ListenAddr:    listen,
		TelegramToken: token,
		TargetChatID:  chatID,
		CORSOrigin:    cors,
	}, nil
}

func decodeJSONBody(w http.ResponseWriter, r *http.Request, dst any) error {
	r.Body = http.MaxBytesReader(w, r.Body, 1<<20)
	defer r.Body.Close()

	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()
	if err := dec.Decode(dst); err != nil {
		return fmt.Errorf("invalid request body: %w", err)
	}
	if dec.More() {
		return errors.New("invalid request body: multiple JSON values")
	}
	return nil
}

func validateLead(req leadRequest) error {
	if strings.TrimSpace(req.PrimaryContact) == "" && strings.TrimSpace(req.SecondaryContact) == "" {
		return errors.New("at least one contact is required")
	}
	if req.Score.Total <= 0 {
		return errors.New("score.total must be greater than 0")
	}
	if len(req.Questions) == 0 {
		return errors.New("questions are required")
	}
	return nil
}

func formatLeadMessage(req leadRequest) string {
	name := strings.TrimSpace(req.Name)
	if name == "" {
		name = "-"
	}
	primary := strings.TrimSpace(req.PrimaryContact)
	if primary == "" {
		primary = "-"
	}
	secondary := strings.TrimSpace(req.SecondaryContact)
	if secondary == "" {
		secondary = "-"
	}

	var b strings.Builder
	b.WriteString("Новая заявка после теста уровня\n\n")
	b.WriteString(fmt.Sprintf("Имя: %s\n", name))
	b.WriteString(fmt.Sprintf("Контакт 1: %s\n", primary))
	b.WriteString(fmt.Sprintf("Контакт 2: %s\n", secondary))
	b.WriteString(fmt.Sprintf("Результат: %d/%d\n\n", req.Score.OK, req.Score.Total))
	b.WriteString("Ответы:\n")

	for _, q := range req.Questions {
		userAnswers := strings.Join(q.UserAnswers, ", ")
		if strings.TrimSpace(userAnswers) == "" {
			userAnswers = "-"
		}
		correct := strings.Join(q.CorrectAnswers, ", ")
		b.WriteString(fmt.Sprintf("%d) %s\n", q.ID, q.Russian))
		b.WriteString(fmt.Sprintf("   Пользователь: %s\n", userAnswers))
		b.WriteString(fmt.Sprintf("   Правильно: %s\n", correct))
	}

	return b.String()
}

func sendTelegramMessage(ctx context.Context, cfg config, text string) error {
	payload := map[string]any{
		"chat_id": cfg.TargetChatID,
		"text":    text,
	}
	body, err := json.Marshal(payload)
	if err != nil {
		return fmt.Errorf("marshal telegram payload: %w", err)
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodPost, fmt.Sprintf("https://api.telegram.org/bot%s/sendMessage", cfg.TelegramToken), bytes.NewReader(body))
	if err != nil {
		return fmt.Errorf("create telegram request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("telegram request failed: %w", err)
	}
	defer resp.Body.Close()

	respBody, _ := io.ReadAll(io.LimitReader(resp.Body, 1<<20))
	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return fmt.Errorf("telegram returned status %d: %s", resp.StatusCode, strings.TrimSpace(string(respBody)))
	}

	var tgResp telegramSendMessageResponse
	if err := json.Unmarshal(respBody, &tgResp); err != nil {
		return fmt.Errorf("invalid telegram response: %w", err)
	}
	if !tgResp.OK {
		return fmt.Errorf("telegram api error: %s", tgResp.Description)
	}

	return nil
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}

func withCORS(origin string, next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", origin)
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		next(w, r)
	}
}
