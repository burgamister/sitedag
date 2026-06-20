import http from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ENV_PATHS = [
  join(process.cwd(), ".env"),
  join(process.cwd(), "server", ".env"),
  join(process.cwd(), "server-go", ".env"),
];

for (const p of ENV_PATHS) {
  if (!existsSync(p)) continue;
  for (const line of readFileSync(p, "utf-8").split("\n")) {
    const s = line.trim();
    if (!s || s.startsWith("#")) continue;
    const i = s.indexOf("=");
    if (i === -1) continue;
    const key = s.slice(0, i).trim();
    let val = s.slice(i + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
    if (key && !process.env[key]) process.env[key] = val;
  }
  break;
}

const PORT = parseInt(process.env.PORT || "8081", 10);
const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TARGET_CHAT_ID = process.env.TELEGRAM_TARGET_CHAT_ID || "";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

if (!TELEGRAM_TOKEN || !TARGET_CHAT_ID) {
  console.error("TELEGRAM_BOT_TOKEN and TELEGRAM_TARGET_CHAT_ID are required");
  process.exit(1);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString()));
      } catch {
        reject(new Error("invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

function sendJSON(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

async function sendTelegram(text) {
  const payload = JSON.stringify({ chat_id: Number(TARGET_CHAT_ID), text });
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Telegram status ${res.status}: ${body}`);
  }

  const data = await res.json();
  if (!data.ok) throw new Error(`Telegram API error: ${data.description}`);
}

function validate(req) {
  if (!req.primaryContact?.trim() && !req.secondaryContact?.trim()) {
    throw new Error("at least one contact is required");
  }
  if (req.leadType === "quick_contact") return;
  if (!req.score || req.score.total <= 0) throw new Error("score.total must be greater than 0");
  if (!req.questions?.length) throw new Error("questions are required");
}

function formatMessage(req) {
  const name = req.name?.trim() || "-";
  const primary = req.primaryContact?.trim() || "-";
  const secondary = req.secondaryContact?.trim() || "-";

  if (req.leadType === "quick_contact") {
    return `Быстрая заявка без теста\n\nИмя: ${name}\nКонтакт: ${primary}\n`;
  }

  let msg = `Новая заявка после теста уровня\n\nИмя: ${name}\nКонтакт 1: ${primary}\nКонтакт 2: ${secondary}\nРезультат: ${req.score.ok}/${req.score.total}\n\nОтветы:\n`;

  for (const q of req.questions || []) {
    const user = q.userAnswers?.filter(Boolean).join(", ") || "-";
    const correct = q.correctAnswers?.join(", ") || "-";
    msg += `${q.id}) ${q.russian}\n   Пользователь: ${user}\n   Правильно: ${correct}\n`;
  }

  return msg;
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", CORS_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === "/healthz") {
    res.writeHead(200);
    res.end("ok");
    return;
  }

  if (req.url === "/api/level-test") {
    if (req.method !== "POST") {
      sendJSON(res, 405, { error: "method not allowed" });
      return;
    }

    let body;
    try {
      body = await readBody(req);
    } catch {
      sendJSON(res, 400, { error: "invalid request body" });
      return;
    }

    try {
      validate(body);
    } catch (e) {
      sendJSON(res, 400, { error: e.message });
      return;
    }

    try {
      const message = formatMessage(body);
      await sendTelegram(message);
      sendJSON(res, 200, { ok: true });
    } catch (e) {
      console.error("telegram send error:", e.message);
      sendJSON(res, 502, { error: "failed to deliver message" });
    }
    return;
  }

  sendJSON(res, 404, { error: "not found" });
});

server.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
