#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const envPath = resolve(ROOT, ".env.local");

const KEYS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "AUTH_SECRET",
  "AI_GATEWAY_API_KEY",
  "AI_MODEL",
  "AI_EMBEDDING_MODEL",
];

const OVERRIDES = {
  NEXT_PUBLIC_SITE_URL: "https://steffens-showcase.vercel.app",
};

function parseEnvFile(path) {
  const values = {};
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    values[key] = value;
  }
  return values;
}

function runVercel(args, input) {
  const result = spawnSync("npx", ["vercel", ...args], {
    cwd: ROOT,
    input,
    encoding: "utf8",
    shell: true,
    stdio: ["pipe", "pipe", "pipe"],
  });
  return result;
}

function addEnv(key, env, value) {
  runVercel(["env", "rm", key, env, "--yes"], undefined);
  const extraArgs = key.startsWith("NEXT_PUBLIC_")
    ? ["--force", "--no-sensitive"]
    : ["--force"];
  return runVercel(["env", "add", key, env, ...extraArgs], `${value}\n`);
}

const local = parseEnvFile(envPath);
const environments = ["production", "preview"];

for (const env of environments) {
  console.log(`\n== ${env} ==`);
  for (const key of [...KEYS, "NEXT_PUBLIC_SITE_URL"]) {
    const value = OVERRIDES[key] ?? local[key];
    if (!value) {
      console.log(`skip ${key} (missing)`);
      continue;
    }
    const add = addEnv(key, env, value);
    if (add.status === 0) {
      console.log(`ok ${key}`);
    } else {
      console.error(`fail ${key}:`, add.stderr || add.stdout);
    }
  }
}

console.log("\nDone. Redeploy with: npx vercel deploy --prod");
