import { createServer } from "node:http";
import { existsSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { connect as tlsConnect } from "node:tls";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const rootDir = normalize(join(__dirname, ".."));
const distDir = join(rootDir, "dist");
const publicDir = existsSync(join(distDir, "index.html")) ? distDir : join(rootDir, "public");
const port = Number(process.env.PORT || 3000);
const contactEmail = process.env.CONTACT_EMAIL || "hamu.dxb@gmail.com";
const contactWebhookUrl = process.env.CONTACT_WEBHOOK_URL;
const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 465);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpFrom = process.env.SMTP_FROM || smtpUser || contactEmail;

const rateLimitWindowMs = 60_000;
const rateLimitMaxRequests = 12;
const rateLimitStore = new Map();
const isProduction = process.env.NODE_ENV === "production";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

function setSecurityHeaders(res) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Permissions-Policy", "accelerometer=(), autoplay=(), camera=(), clipboard-read=(), display-capture=(), encrypted-media=(), fullscreen=(), gamepad=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=()");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
  res.setHeader("Origin-Agent-Cluster", "?1");
  res.setHeader("X-Permitted-Cross-Domain-Policies", "none");
  res.setHeader("X-DNS-Prefetch-Control", "off");
  res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  res.setHeader(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self' https://api.web3forms.com",
      "img-src 'self' data:",
      "font-src 'self'",
      "style-src 'self'",
      "script-src 'self'",
      "connect-src 'self' https://api.web3forms.com",
      "manifest-src 'self'",
      "worker-src 'self'",
      isProduction ? "upgrade-insecure-requests" : ""
    ].filter(Boolean).join("; ")
  );
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8"
  });
  res.end(JSON.stringify(payload));
}

function isTrustedOrigin(req) {
  const host = req.headers.host;
  const origin = req.headers.origin;
  const referer = req.headers.referer;

  if (!host || (!origin && !referer)) return true;

  try {
    const source = new URL(origin || referer);
    return source.host === host;
  } catch {
    return false;
  }
}

function encodeBase64(value) {
  return Buffer.from(value, "utf8").toString("base64");
}

function sanitizeHeader(value) {
  return String(value || "").replace(/[\r\n]+/g, " ").trim();
}

function dotStuff(value) {
  return String(value).replace(/\r?\n/g, "\r\n").replace(/^\./gm, "..");
}

function createEmailMessage(payload) {
  const subject = sanitizeHeader(`Portfolio inquiry from ${payload.name}`);
  const safeName = sanitizeHeader(payload.name);
  const safeEmail = sanitizeHeader(payload.email);
  const projectType = payload.projectType || "Not specified";
  const body = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Project type: ${projectType}`,
    `Received: ${payload.receivedAt}`,
    "",
    "Message:",
    payload.message
  ].join("\n");

  return [
    `From: ${safeName} via Portfolio <${smtpFrom}>`,
    `To: Hamees Momin <${contactEmail}>`,
    `Reply-To: ${safeName} <${safeEmail}>`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=utf-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    dotStuff(body)
  ].join("\r\n");
}

function readSmtpResponse(socket) {
  return new Promise((resolve, reject) => {
    let buffer = "";

    function cleanup() {
      socket.off("data", onData);
      socket.off("error", onError);
    }

    function onError(error) {
      cleanup();
      reject(error);
    }

    function onData(chunk) {
      buffer += chunk.toString("utf8");
      const lines = buffer.split(/\r?\n/).filter(Boolean);
      const lastLine = lines.at(-1);

      if (/^\d{3} /.test(lastLine || "")) {
        cleanup();
        resolve(buffer);
      }
    }

    socket.on("data", onData);
    socket.on("error", onError);
  });
}

async function sendSmtpCommand(socket, command, expectedCodes) {
  socket.write(`${command}\r\n`);
  const response = await readSmtpResponse(socket);
  const code = response.slice(0, 3);

  if (!expectedCodes.includes(code)) {
    throw new Error(`smtp_${code}`);
  }

  return response;
}

async function sendEmail(payload) {
  if (!smtpHost || !smtpUser || !smtpPass) {
    console.info("SMTP is not configured. Portfolio contact message:", {
      to: contactEmail,
      ...payload
    });
    return;
  }

  const socket = tlsConnect({
    host: smtpHost,
    port: smtpPort,
    servername: smtpHost,
    timeout: 15_000
  });

  try {
    await new Promise((resolve, reject) => {
      socket.once("secureConnect", resolve);
      socket.once("error", reject);
      socket.once("timeout", () => reject(new Error("smtp_timeout")));
    });

    await readSmtpResponse(socket);
    await sendSmtpCommand(socket, "EHLO portfolio.local", ["250"]);
    await sendSmtpCommand(socket, "AUTH LOGIN", ["334"]);
    await sendSmtpCommand(socket, encodeBase64(smtpUser), ["334"]);
    await sendSmtpCommand(socket, encodeBase64(smtpPass), ["235"]);
    await sendSmtpCommand(socket, `MAIL FROM:<${smtpFrom}>`, ["250"]);
    await sendSmtpCommand(socket, `RCPT TO:<${contactEmail}>`, ["250", "251"]);
    await sendSmtpCommand(socket, "DATA", ["354"]);
    socket.write(`${createEmailMessage(payload)}\r\n.\r\n`);

    const dataResponse = await readSmtpResponse(socket);
    if (dataResponse.slice(0, 3) !== "250") {
      throw new Error(`smtp_${dataResponse.slice(0, 3)}`);
    }

    await sendSmtpCommand(socket, "QUIT", ["221"]);
  } finally {
    socket.end();
  }
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }

  return req.socket.remoteAddress || "unknown";
}

function isRateLimited(req) {
  const ip = getClientIp(req);
  const now = Date.now();
  const bucket = rateLimitStore.get(ip) || { count: 0, resetAt: now + rateLimitWindowMs };

  if (now > bucket.resetAt) {
    bucket.count = 0;
    bucket.resetAt = now + rateLimitWindowMs;
  }

  bucket.count += 1;
  rateLimitStore.set(ip, bucket);

  return bucket.count > rateLimitMaxRequests;
}

async function readJsonBody(req) {
  const chunks = [];
  let totalBytes = 0;
  const maxBytes = 32 * 1024;

  for await (const chunk of req) {
    totalBytes += chunk.length;

    if (totalBytes > maxBytes) {
      throw new Error("payload_too_large");
    }

    chunks.push(chunk);
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new Error("invalid_json");
  }
}

function validateContactMessage(data) {
  const name = String(data?.name || "").trim();
  const email = String(data?.email || "").trim();
  const message = String(data?.message || "").trim();
  const projectType = String(data?.projectType || "").trim();

  const errors = {};
  if (name.length < 2 || name.length > 80) errors.name = "Enter a name between 2 and 80 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
  if (message.length < 20 || message.length > 1500) errors.message = "Enter a message between 20 and 1500 characters.";
  if (projectType.length > 80) errors.projectType = "Project type is too long.";

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    value: { name, email, message, projectType }
  };
}

async function handleContact(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  if (!isTrustedOrigin(req)) {
    sendJson(res, 403, { error: "Forbidden" });
    return;
  }

  if (!String(req.headers["content-type"] || "").includes("application/json")) {
    sendJson(res, 415, { error: "Content-Type must be application/json" });
    return;
  }

  if (isRateLimited(req)) {
    sendJson(res, 429, { error: "Too many requests. Please try again shortly." });
    return;
  }

  try {
    const body = await readJsonBody(req);
    const validation = validateContactMessage(body);

    if (!validation.isValid) {
      sendJson(res, 400, { error: "Please check the form fields.", fields: validation.errors });
      return;
    }

    const payload = {
      ...validation.value,
      receivedAt: new Date().toISOString(),
      source: "portfolio-contact-form",
      to: contactEmail
    };

    if (contactWebhookUrl) {
      const webhookResponse = await fetch(contactWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!webhookResponse.ok) {
        throw new Error("webhook_failed");
      }
    } else {
      await sendEmail(payload);
    }

    sendJson(res, 200, { ok: true, message: "Thanks. Your message was sent." });
  } catch (error) {
    const statusCode = error.message === "payload_too_large" ? 413 : 400;
    sendJson(res, statusCode, { error: "We could not process that message." });
  }
}

async function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const requestedPath = decodeURIComponent(url.pathname);
  const relativePath = requestedPath === "/" ? "index.html" : requestedPath.replace(/^[/\\]+/, "");
  const normalizedPath = normalize(relativePath);
  const filePath = join(publicDir, normalizedPath);

  if (normalizedPath.startsWith("..") || filePath === publicDir || !filePath.startsWith(publicDir)) {
    sendJson(res, 403, { error: "Forbidden" });
    return;
  }

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) throw new Error("not_file");

    const ext = extname(filePath);
    const headers = {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
      "Cross-Origin-Resource-Policy": "same-origin"
    };

    if (ext !== ".html") {
      headers["Cache-Control"] = "public, max-age=604800, immutable";
    } else {
      headers["Cache-Control"] = "no-store";
    }

    res.writeHead(200, headers);
    res.end(await readFile(filePath));
  } catch {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(await readFile(join(publicDir, "404.html")));
  }
}

const server = createServer(async (req, res) => {
  setSecurityHeaders(res);

  if (req.url?.startsWith("/api/contact")) {
    await handleContact(req, res);
    return;
  }

  await serveStatic(req, res);
});

server.listen(port, () => {
  console.log(`Portfolio running at http://localhost:${port}`);
});
