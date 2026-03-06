# Level Test Lead Bot (Go)

Сервис принимает заявки с теста уровня и пересылает их в Telegram.

## 1) Подготовка

Нужны:
- токен Telegram-бота (`TELEGRAM_BOT_TOKEN`)
- `chat_id` получателя (`TELEGRAM_TARGET_CHAT_ID`)

## 2) Запуск

```bash
cd server-go
TELEGRAM_BOT_TOKEN=123456:ABCDEF \
TELEGRAM_TARGET_CHAT_ID=123456789 \
LISTEN_ADDR=:8080 \
CORS_ORIGIN=http://localhost:5173 \
go run .
```

Переменные:
- `TELEGRAM_BOT_TOKEN` (обязательно)
- `TELEGRAM_TARGET_CHAT_ID` (обязательно)
- `LISTEN_ADDR` (опционально, по умолчанию `:8080`)
- `CORS_ORIGIN` (опционально, по умолчанию `*`)

## 3) Подключение фронта

На фронте используется `VITE_LEVEL_TEST_API_URL`.

Пример `.env` в корне проекта:

```bash
VITE_LEVEL_TEST_API_URL=http://localhost:8080/api/level-test
```

## 4) Проверка

Healthcheck:

```bash
curl http://localhost:8080/healthz
```

Тестовый POST:

```bash
curl -X POST http://localhost:8080/api/level-test \
  -H 'Content-Type: application/json' \
  -d '{
    "name":"Тест",
    "primaryContact":"@test",
    "secondaryContact":"",
    "score":{"ok":3,"total":11},
    "questions":[
      {
        "id":1,
        "russian":"Ты зачем пиво сломал?",
        "userAnswers":["did"],
        "correctAnswers":["did"]
      }
    ]
  }'
```
