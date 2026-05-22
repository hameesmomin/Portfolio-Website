const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require("playwright");

const outDir = path.resolve("static/assets/trailers");

const products = [
  {
    key: "aura-command",
    name: "Aura Command",
    email: "aisha@example.com",
    password: "password",
    outcome: "Never lose a WhatsApp lead again.",
    accent: "#ff9a46",
    pages: [
      ["Login", "Qualified access", ["Private workspace", "Role-aware login", "Demo tenant"]],
      ["Executive Dashboard", "Revenue health in 30 seconds", ["Pipeline value", "Conversion trend", "AI recommendations"]],
      ["Shared Inbox", "Every chat has an owner", ["SLA timers", "Priority tags", "Reply context"]],
      ["Lead Pipeline", "Revenue workflow without chaos", ["Lifecycle stage", "Owner assigned", "Close reason"]],
      ["AI Follow-up", "Replies that keep deals warm", ["Intent detected", "Suggested reply", "Reminder queued"]],
      ["Team Analytics", "Accountability by agent", ["Activity trend", "Response speed", "Won revenue"]],
      ["Integration Studio", "Connect CRM and web forms", ["Data mapping", "Webhook builder", "API keys"]],
      ["Workflow Builder", "Automate next best action", ["IF lead created", "THEN assign agent", "ELSE escalate"]],
      ["Billing And Limits", "Commercial SaaS controls", ["Plans", "Usage", "Feature gates"]],
      ["Security Center", "Access stays controlled", ["Roles", "Audit trail", "Session visibility"]]
    ]
  },
  {
    key: "documind",
    name: "Documind",
    email: "owner@documind.test",
    password: "password",
    outcome: "Know every document expiry before it costs you money.",
    accent: "#ffb56b",
    pages: [
      ["Login", "Secure document workspace", ["Private tenant", "Owner login", "Access protected"]],
      ["Executive Dashboard", "Compliance health in 30 seconds", ["Expiring soon", "Missing files", "Renewal forecast"]],
      ["Document Vault", "One clean source of truth", ["Trade license", "Emirates ID", "Contracts"]],
      ["Upload Flow", "Files become structured records", ["Classification", "OCR-ready", "Confidence score"]],
      ["Expiry Intelligence", "Deadlines before drama", ["30-day warning", "Penalty risk", "Owner notified"]],
      ["Approval Queue", "Human review stays visible", ["Reviewer", "Status", "Bottleneck"]],
      ["AI Assistant", "Ask the files", ["Source-backed answer", "Clause lookup", "Renewal checklist"]],
      ["Integration Studio", "Connect storage and systems", ["SharePoint", "Drive", "Data mapping"]],
      ["Reports", "Owner-ready compliance view", ["PDF export", "CSV export", "Scheduled report"]],
      ["Security Center", "Audit-ready access", ["Roles", "Logs", "Sensitive files"]]
    ]
  },
  {
    key: "siteflow",
    name: "Siteflow",
    email: "owner@siteflow.test",
    password: "password",
    outcome: "Turn daily site chaos into signed reports.",
    accent: "#f2994a",
    pages: [
      ["Login", "Private project access", ["Demo tenant", "Site manager login", "Secure workspace"]],
      ["Executive Dashboard", "Project health in 30 seconds", ["Budget variance", "Delay risk", "Safety trend"]],
      ["Project Dashboard", "All sites in motion", ["Progress", "Open snags", "Pending approvals"]],
      ["Daily Reports", "The site diary writes itself", ["Weather", "Labour", "Photos"]],
      ["Snag Tracking", "Issues get owners and deadlines", ["Severity", "Responsible party", "Evidence"]],
      ["Materials", "Know what arrived and what is missing", ["Deliveries", "Stock risk", "Supplier notes"]],
      ["Approvals", "Decisions stop getting buried", ["Pending sign-off", "Variation request", "Client response"]],
      ["Contractors", "Performance becomes measurable", ["Ranking", "Delay impact", "Quality score"]],
      ["Integration Studio", "Connect ERP and procurement", ["Data mapping", "Webhooks", "API keys"]],
      ["PDF Report", "A clean record clients can sign", ["Summary", "Evidence", "Export ready"]]
    ]
  },
  {
    key: "secureops",
    name: "SecureOps",
    email: "owner@secureops.demo",
    password: "Password123!",
    outcome: "See your business security risks before attackers or auditors do.",
    accent: "#ff8f3d",
    pages: [
      ["Login", "Defensive security access", ["Owner login", "Protected dashboard", "Audit mode"]],
      ["Executive Dashboard", "Security posture in plain English", ["Posture score", "Open risks", "Board summary"]],
      ["Assets", "Know what must be protected", ["Web apps", "Cloud services", "User accounts"]],
      ["Vulnerabilities", "Fix the issues that matter first", ["Severity", "Business impact", "Suggested action"]],
      ["Incidents", "Evidence without panic", ["Timeline", "Owner", "Response status"]],
      ["Risk Register", "Accountability for exposure", ["Likelihood", "Impact", "Acceptance"]],
      ["Compliance", "Audit readiness without scramble", ["Controls", "Evidence", "Owners"]],
      ["Integration Studio", "Connect SIEM and alerts", ["Sentinel", "Wazuh", "Data mapping"]],
      ["AI Copilot", "Defensive recommendations only", ["Explain risk", "Next action", "Executive summary"]],
      ["Executive Report", "Board-friendly security summary", ["Top risks", "Next steps", "Export ready"]]
    ]
  }
];

async function renderProduct(page, product) {
  return page.evaluate(async (product) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1280;
    canvas.height = 720;
    document.body.innerHTML = "";
    document.body.style.margin = "0";
    document.body.style.background = "#050507";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const duration = 76000;
    const fps = 30;

    function roundRect(x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }

    function line(x1, y1, x2, y2, color = "rgba(255,154,70,.18)", width = 1) {
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    function text(value, x, y, font, color, maxWidth) {
      ctx.fillStyle = color;
      ctx.font = font;
      if (maxWidth) {
        const words = value.split(" ");
        let row = "";
        for (const word of words) {
          const next = `${row}${word} `;
          if (ctx.measureText(next).width > maxWidth && row) {
            ctx.fillText(row.trim(), x, y);
            y += Number(font.match(/(\d+)px/)?.[1] || 24) * 1.18;
            row = `${word} `;
          } else {
            row = next;
          }
        }
        ctx.fillText(row.trim(), x, y);
        return y;
      }
      ctx.fillText(value, x, y);
      return y;
    }

    function drawBackground(t) {
      ctx.clearRect(0, 0, 1280, 720);
      const gradient = ctx.createLinearGradient(0, 0, 1280, 720);
      gradient.addColorStop(0, "#040405");
      gradient.addColorStop(.52, "#101112");
      gradient.addColorStop(1, "#050507");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1280, 720);

      ctx.save();
      ctx.globalAlpha = .42;
      for (let i = -200; i < 1500; i += 42) {
        const offset = Math.sin(t * Math.PI * 2 + i * .01) * 34;
        ctx.beginPath();
        ctx.strokeStyle = i % 84 === 0 ? "rgba(255,154,70,.22)" : "rgba(210,208,200,.08)";
        ctx.lineWidth = i % 84 === 0 ? 2 : 1;
        ctx.moveTo(i + offset, -20);
        ctx.bezierCurveTo(i - 140, 180, i + 160, 420, i - 90, 740);
        ctx.stroke();
      }
      ctx.restore();

      const glow = ctx.createRadialGradient(970, 100, 0, 970, 100, 540);
      glow.addColorStop(0, "rgba(255,154,70,.18)");
      glow.addColorStop(1, "rgba(255,154,70,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, 1280, 720);
    }

    function drawBrowserShell(x, y, w, h) {
      roundRect(x, y, w, h, 18);
      ctx.fillStyle = "rgba(7,7,10,.9)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,181,107,.34)";
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,.08)";
      ctx.fillRect(x, y + 50, w, 1);
      ["#ff6b5f", "#ffd166", product.accent].forEach((color, index) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x + 28 + index * 22, y + 25, 7, 0, Math.PI * 2);
        ctx.fill();
      });
      roundRect(x + 104, y + 12, w - 128, 26, 13);
      ctx.fillStyle = "rgba(255,255,255,.07)";
      ctx.fill();
      text(`${product.key}.local/demo`, x + 122, y + 31, "700 12px Inter, Arial", "rgba(247,244,239,.5)");
    }

    function drawLogin(x, y, w, h, p) {
      drawBrowserShell(x, y, w, h);
      const panelX = x + w / 2 - 185;
      const panelY = y + 112;
      roundRect(panelX, panelY, 370, 340, 16);
      ctx.fillStyle = "rgba(18,18,22,.92)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,.12)";
      ctx.stroke();
      text(product.name.toUpperCase(), panelX + 28, panelY + 45, "900 14px Inter, Arial", product.accent);
      text("Secure demo login", panelX + 28, panelY + 88, "900 31px Inter, Arial", "#f7f4ef");
      const typedEmail = product.email.slice(0, Math.floor(product.email.length * Math.min(1, p * 2.2)));
      const typedPass = "*".repeat(Math.floor(product.password.length * Math.max(0, Math.min(1, (p - .32) * 2.6))));
      [
        ["Email", typedEmail],
        ["Password", typedPass]
      ].forEach(([label, value], index) => {
        const iy = panelY + 124 + index * 76;
        text(label, panelX + 28, iy - 10, "800 12px Inter, Arial", "rgba(247,244,239,.55)");
        roundRect(panelX + 28, iy, 314, 48, 8);
        ctx.fillStyle = "rgba(0,0,0,.32)";
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,.14)";
        ctx.stroke();
        text(value, panelX + 44, iy + 31, "700 16px Inter, Arial", "#f7f4ef");
      });
      roundRect(panelX + 28, panelY + 284, 314, 48, 8);
      ctx.fillStyle = p > .72 ? product.accent : "rgba(255,154,70,.54)";
      ctx.fill();
      text(p > .72 ? "Opening workspace..." : "Login", panelX + 128, panelY + 315, "900 15px Inter, Arial", "#08080a");
    }

    function drawDashboard(x, y, w, h, scene, p) {
      drawBrowserShell(x, y, w, h);
      const sideW = 158;
      ctx.fillStyle = "rgba(255,255,255,.035)";
      ctx.fillRect(x, y + 51, sideW, h - 51);
      text(product.name, x + 20, y + 88, "900 16px Inter, Arial", product.accent);
      product.pages.slice(1).forEach(([label], index) => {
        const active = label === scene[0];
        roundRect(x + 16, y + 122 + index * 48, sideW - 32, 34, 7);
        ctx.fillStyle = active ? "rgba(255,154,70,.18)" : "transparent";
        ctx.fill();
        text(label.split(" ")[0], x + 30, y + 145 + index * 48, "800 13px Inter, Arial", active ? "#f7f4ef" : "rgba(247,244,239,.48)");
      });

      const mainX = x + sideW + 28;
      const mainY = y + 82;
      text(scene[0], mainX, mainY + 12, "900 35px Inter, Arial", "#f7f4ef");
      text(scene[1], mainX, mainY + 48, "800 18px Inter, Arial", product.accent);

      for (let index = 0; index < 3; index += 1) {
        const cardX = mainX + index * ((w - sideW - 78) / 3);
        const cardY = mainY + 82;
        roundRect(cardX, cardY, 172, 112, 14);
        ctx.fillStyle = "rgba(255,255,255,.065)";
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,.11)";
        ctx.stroke();
        text(["Today", "Priority", "Owner"][index], cardX + 18, cardY + 30, "800 12px Inter, Arial", "rgba(247,244,239,.55)");
        text(["42", "High", "AI"][index], cardX + 18, cardY + 74, "900 34px Inter, Arial", index === 1 ? product.accent : "#f7f4ef");
      }

      const chartX = mainX;
      const chartY = mainY + 232;
      roundRect(chartX, chartY, w - sideW - 88, 205, 16);
      ctx.fillStyle = "rgba(0,0,0,.3)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,181,107,.2)";
      ctx.stroke();
      line(chartX + 24, chartY + 154, chartX + 480, chartY + 42, "rgba(255,154,70,.72)", 5);
      for (let i = 0; i < 7; i += 1) {
        const bx = chartX + 34 + i * 62;
        const bh = 38 + Math.sin(i + p * 4) * 16 + i * 8;
        roundRect(bx, chartY + 160 - bh, 34, bh, 6);
        ctx.fillStyle = i % 2 ? "rgba(255,181,107,.45)" : "rgba(255,154,70,.78)";
        ctx.fill();
      }

      scene[2].forEach((item, index) => {
        const itemX = mainX + 340;
        const itemY = mainY + 234 + index * 58;
        ctx.fillStyle = index <= Math.floor(p * 4) ? product.accent : "rgba(247,244,239,.28)";
        ctx.beginPath();
        ctx.arc(itemX, itemY, 8, 0, Math.PI * 2);
        ctx.fill();
        text(item, itemX + 22, itemY + 7, "800 15px Inter, Arial", "#f7f4ef");
      });
    }

    function drawCaption(sceneIndex, localT) {
      const scene = product.pages[sceneIndex];
      text(product.name.toUpperCase(), 62, 70, "900 20px Inter, Arial", product.accent);
      text(sceneIndex === 0 ? "Login, then the real workflow." : product.outcome, 62, 148, "900 46px Inter, Arial", "#f7f4ef", 420);
      text(`Step ${sceneIndex + 1} of ${product.pages.length}`, 62, 490, "800 18px Inter, Arial", "rgba(247,244,239,.72)");
      text(scene[0], 62, 532, "900 31px Inter, Arial", product.accent);
      text(scene[1], 62, 566, "800 17px Inter, Arial", "rgba(247,244,239,.72)", 390);

      const barW = 1110;
      roundRect(62, 632, barW, 10, 5);
      ctx.fillStyle = "rgba(255,255,255,.13)";
      ctx.fill();
      roundRect(62, 632, barW * ((sceneIndex + localT) / product.pages.length), 10, 5);
      ctx.fillStyle = product.accent;
      ctx.fill();
    }

    function drawFrame(t) {
      const sceneProgress = t * product.pages.length;
      const sceneIndex = Math.min(product.pages.length - 1, Math.floor(sceneProgress));
      const localT = sceneProgress - sceneIndex;
      drawBackground(t);
      drawCaption(sceneIndex, localT);
      const frameX = 500;
      const frameY = 74;
      const frameW = 708;
      const frameH = 500;
      if (sceneIndex === 0) {
        drawLogin(frameX, frameY, frameW, frameH, localT);
      } else {
        drawDashboard(frameX, frameY, frameW, frameH, product.pages[sceneIndex], localT);
      }
    }

    drawFrame(1.7 / product.pages.length);
    const poster = canvas.toDataURL("image/png").split(",")[1];

    const stream = canvas.captureStream(0);
    const [track] = stream.getVideoTracks();
    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : "video/webm;codecs=vp8";
    const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 6200000 });
    const chunks = [];
    recorder.ondataavailable = (event) => {
      if (event.data.size) chunks.push(event.data);
    };

    recorder.start();
    const frameCount = Math.ceil((duration / 1000) * fps);
    const frameDelay = 1000 / fps;
    for (let frame = 0; frame <= frameCount; frame += 1) {
      drawFrame(frame / frameCount);
      track?.requestFrame?.();
      await new Promise((resolve) => setTimeout(resolve, frameDelay));
    }
    recorder.stop();
    await new Promise((resolve) => {
      recorder.onstop = resolve;
    });

    const blob = new Blob(chunks, { type: mimeType });
    const buffer = await blob.arrayBuffer();
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
    return { video: btoa(binary), poster };
  }, product);
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });

  for (const product of products) {
    console.log(`Rendering ${product.name}`);
    const result = await renderProduct(page, product);
    const video = Buffer.from(result.video, "base64");
    const poster = Buffer.from(result.poster, "base64");
    await fs.writeFile(path.join(outDir, `${product.key}-walkthrough-20260523.webm`), video);
    await fs.writeFile(path.join(outDir, `${product.key}-screen.png`), poster);
    await fs.writeFile(path.join(outDir, `${product.key}-poster-20260523.png`), poster);
  }

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
