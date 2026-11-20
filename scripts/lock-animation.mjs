#!/usr/bin/env node
/**
 * Re-signs the taste grid after design has approved a change.
 * Hashes the grid component, the locked motion, and the plate images.
 */

import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const locked = [
  "src/components/TasteGrid/TasteGrid.tsx",
  "src/components/TasteGrid/TasteGrid.module.css",
  "src/components/TasteGrid/tiles.ts",
  "src/components/TasteGrid/index.ts",
  "src/animation/settings.lock.json",
  ...readdirSync(path.join(ROOT, "public", "plates"))
    .filter((name) => name.endsWith(".png"))
    .sort()
    .map((name) => `public/plates/${name}`),
  ...readdirSync(path.join(ROOT, "public", "frames"))
    .filter((name) => name.endsWith(".png"))
    .sort()
    .map((name) => `public/frames/${name}`),
];

const files = {};
for (const rel of locked) {
  files[rel] = createHash("sha256").update(readFileSync(path.join(ROOT, rel))).digest("hex");
}

const lock = {
  note: "Locked design asset. Signed off by design (Tina Haibodi). Do not edit by hand; lock again from the bench, or run `npm run lock:animation` after design approves a change.",
  files,
};

writeFileSync(path.join(ROOT, "animation.lock.json"), JSON.stringify(lock, null, 2) + "\n");
console.log(`Signed ${Object.keys(files).length} files into animation.lock.json`);
