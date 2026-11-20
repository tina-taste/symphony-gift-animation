"use client";

import { useState } from "react";
import type { AnimationSettings } from "@/animation/settings";
import { ThankYou } from "@/components/ThankYou/ThankYou";
import styles from "./Review.module.css";

export function Review({
  settings,
  draft,
}: {
  settings: AnimationSettings | null;
  draft: boolean;
}) {
  const [run, setRun] = useState(0);
  const [paused, setPaused] = useState(false);

  return (
    <div className={styles.wrap}>
      <ThankYou settings={settings ?? undefined} run={run} paused={paused} />
      <div className={styles.bar}>
        {draft ? (
          <p className={styles.note}>
            {settings
              ? "Draft. This link is not the locked motion."
              : "That draft link could not be read. Showing the locked motion."}
          </p>
        ) : (
          <span />
        )}
        <div className={styles.actions}>
          <button type="button" className={styles.replay} onClick={() => setPaused((value) => !value)}>
            {paused ? "Play" : "Pause"}
          </button>
          <button type="button" className={styles.replay} onClick={() => setRun((value) => value + 1)}>
            Replay
          </button>
        </div>
      </div>
    </div>
  );
}
