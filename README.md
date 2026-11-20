# Taste grid

The photograph grid on the right of Symphony’s thank-you screen (“Your taste is in.”). The cards from the collage travel inside three columns. Neighbors move the opposite way.

The layout of the screen and the pictures are the design. The bench only tunes the motion.

## Tune it, then lock it

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

| Control | What it changes |
| --- | --- |
| Speed | How long one pass of a column takes |
| Gap | The space between photographs in a column |
| Motion | Drift keeps a constant pace. Turn eases up, then back down |
| Direction | Column 1 rises, or column 2 rises. Each neighbor goes the other way |

Space replays.

**Lock** writes `src/animation/settings.lock.json` and re-signs `animation.lock.json`. That file is the version engineering builds. **Copy review link** copies `/review` once the motion is locked. If you copy before locking, the link is marked as a draft.

Send engineering [localhost:3000/review](http://localhost:3000/review). That page has the locked motion and no sliders.

```tsx
import { TasteGrid } from "@/components/TasteGrid";

<TasteGrid />
```

`<TasteGrid />` with no props plays the locked settings. Don’t pass a `className` or restyle it from outside.

## Check

```bash
npm run verify:animation
```

This fails if the grid component, the locked motion, or the column cards differ from `animation.lock.json`. It also runs before `npm run build`.

Changing the motion:

1. Tune it on the bench and press Lock, or edit the grid and then run `npm run lock:animation`.
2. The lock file change is design’s sign-off.

Matter is loaded from `src/fonts` so the screen matches Symphony. It is the product font, for this team.

Reduced motion holds the columns still. Pause stops the loop, and it also stops when the grid is off screen.
