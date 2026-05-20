const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require("playwright");

const outDir = path.resolve("linkedin-assets");
const trailerDir = path.resolve("static/assets/trailers");

const products = [
  {
    key: "aura-command",
    name: "Aura Command",
    markClass: "aura-mark",
    markHtml: '<span class="aura-core"></span><span class="aura-ring aura-ring-one"></span><span class="aura-ring aura-ring-two"></span><span class="aura-ray aura-ray-one"></span><span class="aura-ray aura-ray-two"></span>',
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
    markClass: "documind-mark",
    markHtml: '<span class="doc-page"></span><span class="doc-line doc-line-one"></span><span class="doc-line doc-line-two"></span><span class="doc-lens"></span>',
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
    markClass: "siteflow-mark",
    markHtml: '<span class="site-block site-block-one"></span><span class="site-block site-block-two"></span><span class="site-block site-block-three"></span><span class="site-flow-line"></span><span class="site-check"></span>',
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
    markClass: "secureops-mark",
    markHtml: '<span class="shield"></span><span class="shield-core"></span><span class="risk-dot risk-dot-one"></span><span class="risk-dot risk-dot-two"></span><span class="risk-dot risk-dot-three"></span>',
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
        position: relative;
        width: 104px;
        height: 104px;
        border: 2px solid ${product.accent};
        border-radius: 24px;
        background: linear-gradient(145deg, ${product.accent}28, rgba(255,255,255,.04));
        box-shadow: 0 0 42px ${product.accent}44;
        color: ${product.accent2};
      }
      .mark span { position: absolute; display: block; }
      .aura-core { inset: 42px; border-radius: 999px; background: ${product.accent2}; box-shadow: 0 0 28px ${product.accent}; }
      .aura-ring { border: 3px solid ${product.accent}; border-radius: 999px; opacity: .84; }
      .aura-ring-one { inset: 24px; }
      .aura-ring-two { inset: 12px; border-color: rgba(255,208,168,.42); }
      .aura-ray { width: 42px; height: 4px; border-radius: 999px; background: ${product.accent}; transform-origin: left center; }
      .aura-ray-one { left: 52px; top: 35px; transform: rotate(-35deg); }
      .aura-ray-two { left: 52px; bottom: 35px; transform: rotate(35deg); }
      .doc-page { left: 25px; top: 17px; width: 48px; height: 64px; border: 3px solid ${product.accent2}; border-radius: 8px; background: rgba(255,255,255,.04); }
      .doc-page::after { position: absolute; right: -3px; top: -3px; border-top: 18px solid ${product.accent}; border-left: 18px solid transparent; content: ""; }
      .doc-line { left: 35px; height: 4px; border-radius: 999px; background: ${product.accent}; }
      .doc-line-one { top: 43px; width: 28px; }
      .doc-line-two { top: 56px; width: 22px; opacity: .7; }
      .doc-lens { right: 18px; bottom: 18px; width: 34px; height: 34px; border: 4px solid ${product.accent}; border-radius: 999px; }
      .doc-lens::after { position: absolute; right: -13px; bottom: -8px; width: 20px; height: 4px; border-radius: 999px; background: ${product.accent}; transform: rotate(45deg); content: ""; }
      .site-block { width: 22px; border: 3px solid ${product.accent2}; border-radius: 6px; background: rgba(255,154,70,.16); bottom: 24px; }
      .site-block-one { left: 22px; height: 30px; }
      .site-block-two { left: 43px; height: 50px; }
      .site-block-three { left: 64px; height: 40px; }
      .site-flow-line { left: 21px; top: 31px; width: 60px; height: 38px; border-top: 5px solid ${product.accent}; border-right: 5px solid ${product.accent}; transform: skewX(-20deg); }
      .site-check { right: 18px; top: 25px; width: 28px; height: 15px; border-left: 5px solid ${product.accent2}; border-bottom: 5px solid ${product.accent2}; transform: rotate(-45deg); }
      .shield { left: 28px; top: 14px; width: 48px; height: 66px; background: linear-gradient(160deg, ${product.accent}44, rgba(255,255,255,.02)); clip-path: polygon(50% 0, 92% 16%, 82% 78%, 50% 100%, 18% 78%, 8% 16%); border: 3px solid ${product.accent}; }
      .shield-core { left: 43px; top: 35px; width: 18px; height: 18px; border-radius: 999px; background: ${product.accent2}; box-shadow: 0 0 20px ${product.accent}; }
      .risk-dot { width: 8px; height: 8px; border-radius: 999px; background: ${product.accent}; }
      .risk-dot-one { right: 18px; top: 24px; }
      .risk-dot-two { right: 24px; top: 50px; opacity: .72; }
      .risk-dot-three { right: 16px; bottom: 24px; opacity: .5; }
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
            <div class="mark ${product.markClass}">${product.markHtml}</div>
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
        position: relative;
        width: 132px;
        height: 132px;
        border: 3px solid ${product.accent};
        border-radius: 30px;
        background: linear-gradient(145deg, ${product.accent}38, rgba(5,5,7,.9));
        box-shadow: 0 0 42px ${product.accent}44;
        color: ${product.accent2};
      }
      .mark span { position: absolute; display: block; }
      .aura-core { inset: 53px; border-radius: 999px; background: ${product.accent2}; box-shadow: 0 0 30px ${product.accent}; }
      .aura-ring { border: 4px solid ${product.accent}; border-radius: 999px; opacity: .84; }
      .aura-ring-one { inset: 30px; }
      .aura-ring-two { inset: 15px; border-color: rgba(255,208,168,.42); }
      .aura-ray { width: 54px; height: 5px; border-radius: 999px; background: ${product.accent}; transform-origin: left center; }
      .aura-ray-one { left: 66px; top: 43px; transform: rotate(-35deg); }
      .aura-ray-two { left: 66px; bottom: 43px; transform: rotate(35deg); }
      .doc-page { left: 32px; top: 22px; width: 60px; height: 80px; border: 4px solid ${product.accent2}; border-radius: 10px; background: rgba(255,255,255,.04); }
      .doc-page::after { position: absolute; right: -4px; top: -4px; border-top: 22px solid ${product.accent}; border-left: 22px solid transparent; content: ""; }
      .doc-line { left: 45px; height: 5px; border-radius: 999px; background: ${product.accent}; }
      .doc-line-one { top: 54px; width: 36px; }
      .doc-line-two { top: 70px; width: 28px; opacity: .7; }
      .doc-lens { right: 23px; bottom: 23px; width: 42px; height: 42px; border: 5px solid ${product.accent}; border-radius: 999px; }
      .doc-lens::after { position: absolute; right: -16px; bottom: -10px; width: 25px; height: 5px; border-radius: 999px; background: ${product.accent}; transform: rotate(45deg); content: ""; }
      .site-block { width: 28px; border: 4px solid ${product.accent2}; border-radius: 8px; background: rgba(255,154,70,.16); bottom: 30px; }
      .site-block-one { left: 28px; height: 38px; }
      .site-block-two { left: 54px; height: 64px; }
      .site-block-three { left: 80px; height: 50px; }
      .site-flow-line { left: 27px; top: 40px; width: 76px; height: 48px; border-top: 6px solid ${product.accent}; border-right: 6px solid ${product.accent}; transform: skewX(-20deg); }
      .site-check { right: 23px; top: 33px; width: 35px; height: 18px; border-left: 6px solid ${product.accent2}; border-bottom: 6px solid ${product.accent2}; transform: rotate(-45deg); }
      .shield { left: 36px; top: 18px; width: 60px; height: 82px; background: linear-gradient(160deg, ${product.accent}44, rgba(255,255,255,.02)); clip-path: polygon(50% 0, 92% 16%, 82% 78%, 50% 100%, 18% 78%, 8% 16%); border: 4px solid ${product.accent}; }
      .shield-core { left: 55px; top: 45px; width: 22px; height: 22px; border-radius: 999px; background: ${product.accent2}; box-shadow: 0 0 22px ${product.accent}; }
      .risk-dot { width: 10px; height: 10px; border-radius: 999px; background: ${product.accent}; }
      .risk-dot-one { right: 23px; top: 30px; }
      .risk-dot-two { right: 30px; top: 63px; opacity: .72; }
      .risk-dot-three { right: 20px; bottom: 30px; opacity: .5; }
      strong {
        color: ${product.accent};
        font-size: 50px;
        font-weight: 950;
        letter-spacing: .03em;
        text-transform: uppercase;
      }
    </style>
  </head>
  <body>
    <div class="logo">
      <div class="mark ${product.markClass}">${product.markHtml}</div>
      <div><strong>${escapeHtml(product.name)}</strong></div>
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
