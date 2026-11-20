import type { AnimationSettings } from "@/animation/settings";
import { TasteGrid } from "@/components/TasteGrid";
import styles from "./ThankYou.module.css";

type ThankYouProps = {
  settings?: AnimationSettings;
  run?: number;
  paused?: boolean;
};

export function ThankYou({ settings, run = 0, paused = false }: ThankYouProps) {
  return (
    <div className={styles.screen}>
      <div className={styles.artboard}>
        <h1 className={styles.title}>Your taste is in</h1>
        <p className={styles.sub}>
          Your ratings now help shape the Design Benchmark, which teaches models what good design
          looks like.
        </p>
        <div className={styles.actions}>
          <button type="button" className={styles.claim}>
            Claim gift
          </button>
          <button type="button" className={styles.back}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.mark} src="/icons/assignment-mark.svg" alt="" />
            Back to Assignments
          </button>
        </div>
        <div className={styles.graphic}>
          <TasteGrid key={run} settings={settings} paused={paused} />
        </div>
      </div>
    </div>
  );
}
