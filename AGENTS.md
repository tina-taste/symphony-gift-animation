# Agent instructions

## LOCKED: the taste grid is a signed-off design asset

These files are locked. Do not edit them, and do not work around them:

- `src/components/TasteGrid/` (the grid, the tile positions, the easing curves, the motion)
- `src/animation/settings.lock.json` (the signed motion values)
- `public/frames/col-*.png` (the column cards)
- `animation.lock.json` (the signature `npm run verify:animation` and `npm run build` check)

Design owns the motion. It ships exactly as approved.

- Don’t change duration, gap, direction, column geometry, colours, or the photographs.
- Don’t add `className` or `style` passthroughs that restyle the grid.
- Don’t regenerate or hand-edit `animation.lock.json`, and don’t skip the `prebuild` verify step.
- If a task seems to need any of the above, stop and say it needs design sign-off.

Tuning from the bench is the way design changes the motion: the bench writes the lock. Editing the bench panel and the thank-you screen chrome is fine. The grid itself is not.

## This is NOT the Next.js you know

This version has breaking changes. Read the relevant guide in `node_modules/next/dist/docs/` before writing code, and heed deprecation notices.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
