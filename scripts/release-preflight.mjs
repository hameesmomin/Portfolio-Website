import { spawnSync } from "node:child_process";

const checks = [
  {
    name: "Production build",
    command: "npm.cmd",
    args: ["run", "build"],
  },
  {
    name: "Brochure content audit",
    command: "npm.cmd",
    args: ["run", "brochures:audit"],
  },
  {
    name: "Live demo access audit",
    command: "npm.cmd",
    args: ["run", "demo-access:audit"],
  },
];

const isWindows = process.platform === "win32";
const startedAt = new Date();
const results = [];

for (const check of checks) {
  console.log(`\n[preflight] ${check.name}`);
  const result = spawnSync(check.command, check.args, {
    stdio: "inherit",
    shell: isWindows,
  });

  results.push({
    name: check.name,
    status: result.status === 0 ? "PASS" : "FAIL",
    exitCode: result.status,
  });

  if (result.status !== 0) {
    console.error(`\n[preflight] ${check.name} failed with exit code ${result.status}.`);
    console.table(results);
    process.exit(result.status ?? 1);
  }
}

console.log("\n[preflight] Live portfolio release gate passed.");
console.table(results);
console.log(`[preflight] Duration: ${Math.round((new Date() - startedAt) / 1000)}s`);
