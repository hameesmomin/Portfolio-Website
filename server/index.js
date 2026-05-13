import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const rootDir = normalize(join(__dirname, ".."));
const publicDir = join(rootDir, "public");
const port = Number(process.env.PORT || 3000);
const contactWebhookUrl = process.env.CONTACT_WEBHOOK_URL;

const rateLimitWindowMs = 60_000;
const rateLimitMaxRequests = 12;
const rateLimitStore = new Map();

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
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
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; connect-src 'self'; form-action 'self'; base-uri 'self'; frame-ancestors 'none'"
  );
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
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
      source: "portfolio-contact-form"
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
      console.info("New portfolio contact message:", payload);
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
      "Content-Type": mimeTypes[ext] || "application/octet-stream"
    };

    if (ext !== ".html") {
      headers["Cache-Control"] = "public, max-age=604800, immutable";
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
