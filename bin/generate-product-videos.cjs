const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require("playwright");

const outDir = path.resolve("static/assets/trailers");

const products = [
  {
    key: "aura-command",
    name: "Aura Command",
    url: "http://127.0.0.1:8031/",
    outcome: "Never lose a WhatsApp lead again.",
    steps: ["WhatsApp lead captured", "AI qualifies intent", "Owner assigned", "Follow-up scheduled"]
  },
  {
    key: "documind",
    name: "Documind",
    url: "http://127.0.0.1:8032/",
    outcome: "Know every document expiry before it costs you money.",
    steps: ["Documents uploaded", "Expiry dates extracted", "Risk queue sorted", "Renewal reminders ready"]
  },
  {
    key: "siteflow",
    name: "Siteflow",
    url: "http://127.0.0.1:8033/",
    outcome: "Turn daily site chaos into signed reports.",
    steps: ["Site notes captured", "Snags organized", "Materials tracked", "Report signed"]
  },
  {
    key: "secureops",
    name: "SecureOps",
    url: "http://127.0.0.1:8024/",
    outcome: "See your business security risks before attackers or auditors do.",
    steps: ["Assets scanned", "Risks prioritized", "Business impact explained", "Executive report ready"]
  }
];

async function renderVideo(page, product, screenshotDataUrl) {
  return page.evaluate(async ({ product, screenshotDataUrl }) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1280;
    canvas.height = 720;
    document.body.innerHTML = "";
    document.body.style.margin = "0";
    document.body.style.background = "#050507";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = screenshotDataUrl;
    await image.decode();

    const stream = canvas.captureStream(30);
    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : "video/webm;codecs=vp8";
    const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 4500000 });
    const chunks = [];
    recorder.ondataavailable = (event) => {
      if (event.data.size) chunks.push(event.data);
    };

    const duration = 9000;
    const start = performance.now();

    function roundRect(x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }

    function coverImage(img, x, y, w, h, scale = 1) {
      const ratio = Math.max(w / img.width, h / img.height) * scale;
      const sw = img.width * ratio;
      const sh = img.height * ratio;
      const dx = x + (w - sw) / 2;
      const dy = y + (h - sh) / 2;
      ctx.drawImage(img, dx, dy, sw, sh);
    }

    function drawFrame(now) {
      const t = Math.min((now - start) / duration, 1);
      const wave = Math.sin(t * Math.PI * 2);
      const active = Math.min(product.steps.length - 1, Math.floor(t * product.steps.length));

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.globalAlpha = 0.74;
      ctx.translate(wave * 18, 0);
      coverImage(image, -34, -20, 1348, 760, 1.08);
      ctx.restore();

      const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bg.addColorStop(0, "rgba(3,3,5,.92)");
      bg.addColorStop(.46, "rgba(3,3,5,.50)");
      bg.addColorStop(1, "rgba(3,3,5,.88)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgba(255,154,70,.16)";
      ctx.lineWidth = 1;
      for (let i = -100; i < 1380; i += 52) {
        ctx.beginPath();
        ctx.moveTo(i + wave * 28, 0);
        ctx.lineTo(i - 220 + wave * 28, 720);
        ctx.stroke();
      }

      ctx.fillStyle = "#ff9a46";
      ctx.font = "900 22px Inter, Arial";
      ctx.letterSpacing = "2px";
      ctx.fillText(product.name.toUpperCase(), 72, 78);

      ctx.fillStyle = "#f7f4ef";
      ctx.font = "900 62px Inter, Arial";
      const titleWords = product.outcome.split(" ");
      let line = "";
      let y = 170;
      for (const word of titleWords) {
        const next = `${line}${word} `;
        if (ctx.measureText(next).width > 680 && line) {
          ctx.fillText(line.trim(), 72, y);
          y += 70;
          line = `${word} `;
        } else {
          line = next;
        }
      }
      ctx.fillText(line.trim(), 72, y);

      const cardX = 770 + Math.sin(t * Math.PI) * 14;
      const cardY = 112;
      roundRect(cardX, cardY, 408, 430, 18);
      ctx.fillStyle = "rgba(10,10,14,.78)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,181,107,.42)";
      ctx.stroke();

      product.steps.forEach((step, index) => {
        const itemY = cardY + 70 + index * 78;
        const isActive = index <= active;
        ctx.fillStyle = isActive ? "#ff9a46" : "rgba(247,244,239,.34)";
        ctx.beginPath();
        ctx.arc(cardX + 44, itemY - 7, 11, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = isActive ? "#f7f4ef" : "rgba(247,244,239,.54)";
        ctx.font = "800 25px Inter, Arial";
        ctx.fillText(step, cardX + 76, itemY);
      });

      ctx.fillStyle = "rgba(255,255,255,.14)";
      roundRect(72, 588, 760, 14, 7);
      ctx.fill();
      ctx.fillStyle = "#ff9a46";
      roundRect(72, 588, 760 * t, 14, 7);
      ctx.fill();

      ctx.fillStyle = "rgba(247,244,239,.78)";
      ctx.font = "800 20px Inter, Arial";
      ctx.fillText("Private product demo | Built by Hamees Momin", 72, 648);

      if (t < 1) requestAnimationFrame(drawFrame);
    }

    recorder.start();
    requestAnimationFrame(drawFrame);
    await new Promise((resolve) => setTimeout(resolve, duration + 350));
    recorder.stop();
    await new Promise((resolve) => {
      recorder.onstop = resolve;
    });

    const blob = new Blob(chunks, { type: mimeType });
    const buffer = await blob.arrayBuffer();
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }, { product, screenshotDataUrl });
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });

  for (const product of products) {
    console.log(`Capturing ${product.name}`);
    await page.goto(product.url, { waitUntil: "domcontentloaded", timeout: 20000 });
    await page.waitForTimeout(800);
    const screenshotPath = path.join(outDir, `${product.key}-screen.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });

    const screenshot = await fs.readFile(screenshotPath);
    const dataUrl = `data:image/png;base64,${screenshot.toString("base64")}`;
    const videoPage = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
    const base64 = await renderVideo(videoPage, product, dataUrl);
    await fs.writeFile(path.join(outDir, `${product.key}-demo.webm`), Buffer.from(base64, "base64"));
    await videoPage.close();
  }

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
