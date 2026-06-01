import { readFile } from "node:fs/promises";

const files = {
  app: new URL("../src/App.jsx", import.meta.url),
  index: new URL("../index.html", import.meta.url),
  packageJson: new URL("../package.json", import.meta.url),
};

const app = await readFile(files.app, "utf8");
const index = await readFile(files.index, "utf8");
const packageJson = JSON.parse(await readFile(files.packageJson, "utf8"));

const failures = [];

function requireMatch(condition, message) {
  if (!condition) failures.push(message);
}

const localButtonCount = (app.match(/isLocalDemo && <a className="local-app-button"/g) || []).length;
const ungatedLocalButton = /<a className="local-app-button"/.test(app.replace(/isLocalDemo && <a className="local-app-button"/g, ""));

requireMatch(app.includes("const isLocalPortfolioHost = () =>"), "Missing localhost detector.");
requireMatch(app.includes('["localhost", "127.0.0.1", "::1"].includes(window.location.hostname)'), "Localhost detector no longer restricts to local hostnames.");
requireMatch(localButtonCount >= 2, "Local app buttons are not clearly gated behind isLocalDemo.");
requireMatch(!ungatedLocalButton, "Found a local app button that is not gated by isLocalDemo.");
requireMatch(app.includes("isLocalDemo ? <a href={gapEndpoint}>Open local status API</a>"), "Local status API link is not gated by isLocalDemo.");
requireMatch(app.includes("Live app access is private"), "Public live-access privacy note is missing.");
requireMatch(!index.includes("127.0.0.1") && !index.includes("localhost"), "Public index.html must not hardcode local app URLs.");
requireMatch(!app.includes("password'") && !app.includes('password"'), "Portfolio source appears to include a seeded password.");
requireMatch(!app.includes("@aura.test") && !app.includes("@documind.test") && !app.includes("@secureops.test"), "Portfolio source appears to include seeded demo emails.");
requireMatch(packageJson.scripts?.build, "Build script is missing.");
requireMatch(packageJson.scripts?.["brochures:audit"], "Brochure audit script is missing.");

if (failures.length) {
  console.error("Demo access audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Demo access audit passed. Live portfolio keeps runnable app access gated to localhost-only UI.");
