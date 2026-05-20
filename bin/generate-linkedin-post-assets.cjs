const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require("playwright");

const outDir = path.resolve("linkedin-assets");
const trailerDir = path.resolve("static/assets/trailers");

const products = [
  {
    key: "aura-command",
    name: "Aura Command",
    shortName: "Aura",
    icon: "AC",
    headline: "Never lose a WhatsApp lead again.",
    subline: "Shared inbox, AI follow-up, CRM handoff, and team accountability for businesses that sell through chat.",
    proof: "Lead captured -> AI qualified -> Owner assigned -> Follow-up queued",
    tags: ["WhatsApp Ops", "AI Sales", "CRM Flow"],
    accent: "#ff9a46",
    accent2: "#ffd0a8"
  },
  {
    key: "documind",
    name: "Documind",
    shortName: "D",
    icon: "DM",
    headline: "Know every document expiry before it costs you money.",
    subline: "A document intelligence workspace for renewals, licenses, IDs, contracts, and source-grounded answers.",
    proof: "Upload files -> Extract dates -> Rank risk -> Notify the team",
    tags: ["Document AI", "Renewals", "UAE Ops"],
    accent: "#ffb56b",
    accent2: "#fff0d8"
  },
  {
    key: "siteflow",
    name: "Siteflow",
    shortName: "SF",
    icon: "SF",
    headline: "Turn daily site chaos into signed reports.",
    subline: "Construction operations for daily reports, materials, approvals, evidence, and client-ready PDF records.",
    proof: "Site notes -> Materials -> Approvals -> Signed report",
    tags: ["Construction Ops", "Reports", "Approvals"],
    accent: "#f2994a",
    accent2: "#ffe1bd"
  },
  {
    key: "secureops",
    name: "SecureOps",
    shortName: "SO",
    icon: "SO",
    headline: "See business security risks before attackers or auditors do.",
    subline: "A defensive AI security dashboard for risk posture, assets, vulnerabilities, incidents, and executive reports.",
    proof: "Assets scanned -> Risks ranked -> Impact explained -> Report ready",
    tags: ["Security AI", "Risk Posture", "Audit Ready"],
    accent: "#ff8f3d",
    accent2: "#ffd7b8"
  }
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function postHtml(product) {
  const tags = product.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        width: 1200px;
        height: 1200px;
        overflow: hidden;
        background: #050507;
        color: #f8f4ef;
        font-family: Inter, Arial, sans-serif;
      }
      .post {
        position: relative;
        width: 1200px;
        height: 1200px;
        padding: 76px;
        background:
          radial-gradient(circle at 82% 10%, ${product.accent}33, transparent 330px),
          radial-gradient(circle at 12% 84%, ${product.accent}24, transparent 310px),
          linear-gradient(135deg, #050507 0%, #111114 54%, #070708 100%);
      }
      .post::before {
        position: absolute;
        inset: 0;
        background:
          repeating-linear-gradient(100deg, rgba(255,255,255,.055) 0 1px, transparent 1px 26px),
          repeating-linear-gradient(0deg, rgba(255,154,70,.035) 0 1px, transparent 1px 10px);
        content: "";
      }
      .post::after {
        position: absolute;
        inset: 38px;
        border: 1px dashed rgba(255,181,107,.32);
        border-radius: 28px;
        content: "";
      }
      .content { position: relative; z-index: 2; height: 100%; display: grid; grid-template-rows: auto 1fr auto; }
      .top { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .brand { display: flex; align-items: center; gap: 22px; }
      .mark {
        display: grid;
        place-items: center;
        width: 104px;
        height: 104px;
        border: 2px solid ${product.accent};
        border-radius: 24px;
        background: linear-gradient(145deg, ${product.accent}28, rgba(255,255,255,.04));
        box-shadow: 0 0 42px ${product.accent}44;
        color: ${product.accent2};
        font-size: 34px;
        font-weight: 950;
        letter-spacing: .04em;
      }
      .brand-name strong {
        display: block;
        color: ${product.accent};
        font-size: 36px;
        font-weight: 950;
        letter-spacing: .04em;
        text-transform: uppercase;
      }
      .brand-name span {
        display: block;
        margin-top: 4px;
        color: rgba(248,244,239,.62);
        font-size: 18px;
        font-weight: 800;
        letter-spacing: .14em;
        text-transform: uppercase;
      }
      .built {
        padding: 14px 18px;
        border: 1px dashed rgba(255,181,107,.34);
        border-radius: 12px;
        color: rgba(248,244,239,.72);
        font-size: 17px;
        font-weight: 900;
        letter-spacing: .12em;
        text-transform: uppercase;
      }
      .middle { align-self: center; max-width: 980px; }
      h1 {
        margin: 0;
        max-width: 980px;
        font-size: 82px;
        line-height: .98;
        letter-spacing: 0;
      }
      .subline {
        max-width: 860px;
        margin: 36px 0 0;
        color: rgba(248,244,239,.78);
        font-size: 32px;
        line-height: 1.25;
        font-weight: 700;
      }
      .proof {
        margin-top: 42px;
        padding: 24px 28px;
        border-left: 5px solid ${product.accent};
        background: linear-gradient(90deg, ${product.accent}22, transparent);
        color: ${product.accent2};
        font-size: 25px;
        font-weight: 950;
      }
      .bottom { display: flex; align-items: end; justify-content: space-between; gap: 30px; }
      .tags { display: flex; gap: 14px; flex-wrap: wrap; }
      .tags span {
        padding: 13px 16px;
        border: 1px solid rgba(255,181,107,.28);
        border-radius: 10px;
        background: rgba(0,0,0,.26);
        color: #f8f4ef;
        font-size: 18px;
        font-weight: 900;
      }
      .cta {
        color: rgba(248,244,239,.84);
        font-size: 24px;
        font-weight: 950;
        text-align: right;
      }
      .cta span { color: ${product.accent}; }
    </style>
  </head>
  <body>
    <main class="post">
      <div class="content">
        <div class="top">
          <div class="brand">
            <div class="mark">${escapeHtml(product.icon)}</div>
            <div class="brand-name">
              <strong>${escapeHtml(product.name)}</strong>
              <span>Private AI Product Demo</span>
            </div>
          </div>
          <div class="built">Built by Hamees Momin</div>
        </div>
        <div class="middle">
          <h1>${escapeHtml(product.headline)}</h1>
          <p class="subline">${escapeHtml(product.subline)}</p>
          <div class="proof">${escapeHtml(product.proof)}</div>
        </div>
        <div class="bottom">
          <div class="tags">${tags}</div>
          <div class="cta">Request the demo<br><span>hameesmomin.com</span></div>
        </div>
      </div>
    </main>
  </body>
</html>`;
}

function logoHtml(product) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body {
        margin: 0;
        width: 1100px;
        height: 280px;
        overflow: hidden;
        background: transparent;
        font-family: Inter, Arial, sans-serif;
      }
      .logo {
        display: inline-flex;
        align-items: center;
        gap: 24px;
        padding: 60px 70px;
        color: #f8f4ef;
      }
      .mark {
        display: grid;
        place-items: center;
        width: 132px;
        height: 132px;
        border: 3px solid ${product.accent};
        border-radius: 30px;
        background: linear-gradient(145deg, ${product.accent}38, rgba(5,5,7,.9));
        box-shadow: 0 0 42px ${product.accent}44;
        color: ${product.accent2};
        font-size: 42px;
        font-weight: 950;
      }
      strong {
        color: ${product.accent};
        font-size: 50px;
        font-weight: 950;
        letter-spacing: .03em;
        text-transform: uppercase;
      }
      span {
        display: block;
        margin-top: 6px;
        color: rgba(248,244,239,.68);
        font-size: 18px;
        font-weight: 850;
        letter-spacing: .16em;
        text-transform: uppercase;
      }
    </style>
  </head>
  <body>
    <div class="logo">
      <div class="mark">${escapeHtml(product.icon)}</div>
      <div><strong>${escapeHtml(product.name)}</strong><span>AI Product Demo</span></div>
    </div>
  </body>
</html>`;
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 1200 }, deviceScaleFactor: 1 });

  for (const product of products) {
    await page.setContent(postHtml(product), { waitUntil: "load" });
    await page.screenshot({
      path: path.join(outDir, `${product.key}-linkedin-post.png`),
      fullPage: false
    });

    await page.setViewportSize({ width: 1100, height: 280 });
    await page.setContent(logoHtml(product), { waitUntil: "load" });
    await page.screenshot({
      path: path.join(outDir, `${product.key}-logo.png`),
      fullPage: false,
      omitBackground: true
    });
    await page.setViewportSize({ width: 1200, height: 1200 });

    await fs.copyFile(
      path.join(trailerDir, `${product.key}-linkedin.gif`),
      path.join(outDir, `${product.key}-linkedin-trailer.gif`)
    );
  }

  await fs.writeFile(
    path.join(outDir, "README.md"),
    [
      "# LinkedIn Assets",
      "",
      "These assets are not referenced by the portfolio app. They are for posting manually on LinkedIn.",
      "",
      "For each product:",
      "",
      "- `*-linkedin-post.png`: 1200x1200 square post image with logo, headline, positioning, and CTA.",
      "- `*-logo.png`: transparent logo lockup for carousels, thumbnails, or pitch decks.",
      "- `*-linkedin-trailer.gif`: short trailer GIF copied from the generated product trailer assets.",
      "",
      "Suggested post order:",
      "",
      "1. Post the square image as the main visual.",
      "2. Add the GIF as a follow-up comment or carousel/media variation.",
      "3. Use the product outcome as the first line of the LinkedIn caption.",
      ""
    ].join("\n"),
    "utf8"
  );

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
