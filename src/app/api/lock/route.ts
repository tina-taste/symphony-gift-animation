import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { sanitizeSettings } from "@/animation/settings";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return Response.json(
      { error: "Lock from the repo with npm run lock:animation, then commit the lock file." },
      { status: 403 },
    );
  }

  const settings = sanitizeSettings(await request.json().catch(() => null));
  if (!settings) {
    return Response.json({ error: "Those settings are outside the ranges the grid allows." }, { status: 400 });
  }

  const root = process.cwd();
  const lockPath = path.join(root, "src", "animation", "settings.lock.json");
  const lock = {
    note: "Locked motion for the taste grid. Signed off from the design bench. Do not edit by hand; lock again from the bench or run npm run lock:animation after design approves a change.",
    settings,
  };

  writeFileSync(lockPath, JSON.stringify(lock, null, 2) + "\n");
  execFileSync("node", ["scripts/lock-animation.mjs"], { cwd: root });

  return Response.json({ ok: true, settings });
}
