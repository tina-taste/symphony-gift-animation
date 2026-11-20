#!/usr/bin/env node
/**
 * Fails if the taste grid, its motion, or its column cards differ from animation.lock.json.
 */

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const lock = JSON.parse(readFileSync(path.join(ROOT, "animation.lock.json"), "utf8"));
const expected = lock.files ?? {};
const names = Object.keys(expected).sort();

if (names.length === 0) {
  console.error("animation.lock.json has no signed files. Run npm run lock:animation.");
  process.exit(1);
}

const mismatches = [];
for (const rel of names) {
  let actual;
  try {
    actual = createHash("sha256").update(readFileSync(path.join(ROOT, rel))).digest("hex");
  } catch {
    mismatches.push(`${rel} is missing`);
    continue;
  }
  if (actual !== expected[rel]) mismatches.push(`${rel} does not match the signed version`);
}

if (mismatches.length) {
  console.error("The taste grid is locked. These files differ from the signed version:\n");
  for (const line of mismatches) console.error(`  ${line}`);
  console.error("\nDesign has to approve the change and run npm run lock:animation.");
  process.exit(1);
}

console.log(`Taste grid matches the lock (${names.length} files).`);
