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
    credentials: { email: "aisha@example.com", password: "password" },
    clickScenes: ["Inbox", "CRM", "AI", "Operations", "Security"],
    steps: ["Shared inbox", "Lead pipeline", "AI follow-up", "Team operations", "Security controls"]
  },
  {
    key: "documind",
    name: "Documind",
    url: "http://127.0.0.1:8032/",
    outcome: "Know every document expiry before it costs you money.",
    credentials: { email: "owner@documind.test", password: "password" },
    pathScenes: [
      ["/dashboard", "Dashboard"],
      ["/documents", "Document vault"],
      ["/expiring-soon", "Expiry risk"],
      ["/ai-assistant", "AI assistant"],
      ["/security", "Security center"]
    ],
    steps: ["Dashboard", "Document vault", "Expiry risk", "AI assistant", "Security"]
  },
  {
    key: "siteflow",
    name: "Siteflow",
    url: "http://127.0.0.1:8033/",
    outcome: "Turn daily site chaos into signed reports.",
    credentials: { email: "owner@siteflow.test", password: "password" },
    clickScenes: ["Projects", "Daily Site Reports", "Materials", "Approvals", "Security Center"],
    steps: ["Projects", "Daily reports", "Materials", "Approvals", "Security"]
  },
  {
    key: "secureops",
    name: "SecureOps",
    url: "http://127.0.0.1:8024/",
    outcome: "See your business security risks before attackers or auditors do.",
    credentials: { email: "owner@secureops.demo", password: "Password123!" },
    clickScenes: ["Dashboard", "Assets", "Risks", "Reports", "Security"],
    steps: ["Dashboard", "Assets", "Risk posture", "Reports", "Security"]
  }
];

async function isReachable(page, url) {
  try {
    const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 12000 });
    await page.waitForTimeout(700);
    return Boolean(response && response.ok());
  } catch {
    return false;
  }
}

async function maybeLogin(page, product) {
  await page.waitForSelector('input[type="email"], input[name="email"], input[placeholder*="email" i]', { timeout: 6000 }).catch(() => {});
  const email = page.locator('input[type="email"], input[name="email"], input[placeholder*="email" i]').first();
  const password = page.locator('input[type="password"], input[name="password"], input[placeholder*="password" i]').first();

  if ((await email.count()) && (await password.count())) {
    await email.fill(product.credentials.email).catch(() => {});
    await password.fill(product.credentials.password).catch(() => {});
    await page.waitForTimeout(250);
    await page.getByRole("button", { name: /login|sign in|enter/i }).first().click({ timeout: 4000 }).catch(async () => {
      await password.press("Enter").catch(() => {});
    });
    await page.waitForLoadState("networkidle", { timeout: 6000 }).catch(() => {});
    await page.waitForTimeout(1000);
  }
}

async function enterSiteflow(page) {
  await page.getByRole("button", { name: /enter private demo/i }).click({ timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(400);
}

async function captureScene(page, product, sceneLabel, index) {
  await page.waitForTimeout(800);
  const slug = sceneLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const screenshotPath = path.join(outDir, `${product.key}-${String(index + 1).padStart(2, "0")}-${slug}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: false });
  if (index === 0) {
    await fs.copyFile(screenshotPath, path.join(outDir, `${product.key}-screen.png`));
  }
  const screenshot = await fs.readFile(screenshotPath);
  return {
    label: sceneLabel,
    dataUrl: `data:image/png;base64,${screenshot.toString("base64")}`
  };
}

async function captureFallback(page, product) {
  return [await captureScene(page, product, "Demo overview", 0)];
}

async function captureDocumind(page, product) {
  const scenes = [];
  await page.goto(product.url, { waitUntil: "domcontentloaded", timeout: 20000 });
  await maybeLogin(page, product);

  for (const [route, label] of product.pathScenes) {
    await page.goto(new URL(route, product.url).href, { waitUntil: "domcontentloaded", timeout: 16000 }).catch(() => {});
    await page.waitForLoadState("networkidle", { timeout: 5000 }).catch(() => {});
    scenes.push(await captureScene(page, product, label, scenes.length));
  }
  return scenes.length ? scenes : captureFallback(page, product);
}

async function captureClickScenes(page, product) {
  const scenes = [];
  await page.goto(product.url, { waitUntil: "domcontentloaded", timeout: 20000 });
  if (product.key === "siteflow") {
    await enterSiteflow(page);
  }
  await maybeLogin(page, product);
  scenes.push(await captureScene(page, product, "Dashboard", scenes.length));

  for (const label of product.clickScenes) {
    const control = page.getByText(label, { exact: true }).first();
    if (await control.count()) {
      await control.click({ timeout: 3500 }).catch(() => {});
      await page.waitForLoadState("networkidle", { timeout: 3500 }).catch(() => {});
      scenes.push(await captureScene(page, product, label, scenes.length));
    }
  }
  return scenes.length ? scenes.slice(0, 5) : captureFallback(page, product);
}

async function captureProduct(browser, product) {
  const page = await browser.newPage({ viewport: { width: 1366, height: 768 }, deviceScaleFactor: 1 });
  const reachable = await isReachable(page, product.url);
  if (!reachable) {
    console.log(`Skipping live capture for ${product.name}; local app is not reachable.`);
    const fallbackPage = await browser.newPage({ viewport: { width: 1366, height: 768 }, deviceScaleFactor: 1 });
    await fallbackPage.setContent(`<main style="height:100vh;display:grid;place-items:center;background:#050507;color:#f7f4ef;font:700 48px Inter,Arial">${product.name} local demo offline</main>`);
    const scenes = await captureFallback(fallbackPage, product);
    await fallbackPage.close();
    await page.close();
    return scenes;
  }

  const scenes = product.pathScenes ? await captureDocumind(page, product) : await captureClickScenes(page, product);
  await page.close();
  return scenes;
}

async function renderVideo(page, product, scenes) {
  return page.evaluate(async ({ product, scenes }) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1280;
    canvas.height = 720;
    document.body.innerHTML = "";
    document.body.style.margin = "0";
    document.body.style.background = "#050507";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const images = await Promise.all(scenes.map(async (scene) => {
      const image = new Image();
      image.src = scene.dataUrl;
      await image.decode();
      return { ...scene, image };
    }));

    const stream = canvas.captureStream(30);
    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : "video/webm;codecs=vp8";
    const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 5200000 });
    const chunks = [];
    recorder.ondataavailable = (event) => {
      if (event.data.size) chunks.push(event.data);
    };

    const duration = 14000;
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

    function containImage(img, x, y, w, h) {
      const ratio = Math.min(w / img.width, h / img.height);
      const sw = img.width * ratio;
      const sh = img.height * ratio;
      const dx = x + (w - sw) / 2;
      const dy = y + (h - sh) / 2;
      ctx.drawImage(img, dx, dy, sw, sh);
    }

    function coverImage(img, x, y, w, h, scale = 1) {
      const ratio = Math.max(w / img.width, h / img.height) * scale;
      const sw = img.width * ratio;
      const sh = img.height * ratio;
      const dx = x + (w - sw) / 2;
      const dy = y + (h - sh) / 2;
      ctx.drawImage(img, dx, dy, sw, sh);
    }

    function wrapText(text, x, y, maxWidth, lineHeight, font) {
      ctx.font = font;
      const words = text.split(" ");
      let line = "";
      for (const word of words) {
        const next = `${line}${word} `;
        if (ctx.measureText(next).width > maxWidth && line) {
          ctx.fillText(line.trim(), x, y);
          y += lineHeight;
          line = `${word} `;
        } else {
          line = next;
        }
      }
      ctx.fillText(line.trim(), x, y);
      return y;
    }

    function drawFrame(now) {
      const t = Math.min((now - start) / duration, 1);
      const sceneProgress = t * images.length;
      const activeIndex = Math.min(images.length - 1, Math.floor(sceneProgress));
      const local = sceneProgress - activeIndex;
      const active = images[activeIndex];
      const next = images[Math.min(images.length - 1, activeIndex + 1)];
      const wave = Math.sin(t * Math.PI * 2);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.globalAlpha = 0.5;
      coverImage(active.image, -40 + wave * 10, -24, 1360, 768, 1.04);
      ctx.restore();

      const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bg.addColorStop(0, "rgba(3,3,5,.96)");
      bg.addColorStop(.52, "rgba(3,3,5,.72)");
      bg.addColorStop(1, "rgba(3,3,5,.95)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgba(255,154,70,.15)";
      ctx.lineWidth = 1;
      for (let i = -140; i < 1450; i += 54) {
        ctx.beginPath();
        ctx.moveTo(i + wave * 36, 0);
        ctx.bezierCurveTo(i - 80, 180, i + 110, 420, i - 180, 720);
        ctx.stroke();
      }

      ctx.fillStyle = "#ff9a46";
      ctx.font = "900 21px Inter, Arial";
      ctx.fillText(product.name.toUpperCase(), 58, 70);

      ctx.fillStyle = "#f7f4ef";
      wrapText(product.outcome, 58, 148, 402, 62, "900 54px Inter, Arial");

      ctx.fillStyle = "rgba(247,244,239,.72)";
      ctx.font = "800 20px Inter, Arial";
      ctx.fillText(`Walkthrough ${String(activeIndex + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`, 58, 480);

      ctx.fillStyle = "#ffb56b";
      ctx.font = "900 31px Inter, Arial";
      ctx.fillText(active.label, 58, 522);

      const frameX = 506;
      const frameY = 76;
      const frameW = 718;
      const frameH = 504;
      roundRect(frameX, frameY, frameW, frameH, 18);
      ctx.fillStyle = "rgba(10,10,14,.88)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,181,107,.44)";
      ctx.stroke();

      ctx.save();
      roundRect(frameX + 16, frameY + 16, frameW - 32, frameH - 32, 12);
      ctx.clip();
      containImage(active.image, frameX + 16, frameY + 16, frameW - 32, frameH - 32);
      if (next && next !== active && local > 0.72) {
        ctx.globalAlpha = (local - 0.72) / 0.28;
        containImage(next.image, frameX + 16, frameY + 16, frameW - 32, frameH - 32);
      }
      ctx.restore();

      const timelineX = 58;
      const timelineY = 618;
      const timelineW = 1120;
      ctx.fillStyle = "rgba(255,255,255,.13)";
      roundRect(timelineX, timelineY, timelineW, 10, 5);
      ctx.fill();
      ctx.fillStyle = "#ff9a46";
      roundRect(timelineX, timelineY, timelineW * t, 10, 5);
      ctx.fill();

      product.steps.forEach((step, index) => {
        const x = timelineX + index * (timelineW / product.steps.length);
        ctx.fillStyle = index <= activeIndex ? "#f7f4ef" : "rgba(247,244,239,.46)";
        ctx.font = "800 16px Inter, Arial";
        ctx.fillText(step, x, 666);
      });

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
  }, { product, scenes });
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  for (const product of products) {
    console.log(`Capturing ${product.name}`);
    const scenes = await captureProduct(browser, product);
    const videoPage = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
    const base64 = await renderVideo(videoPage, product, scenes);
    await fs.writeFile(path.join(outDir, `${product.key}-demo.webm`), Buffer.from(base64, "base64"));
    await videoPage.close();
  }

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
