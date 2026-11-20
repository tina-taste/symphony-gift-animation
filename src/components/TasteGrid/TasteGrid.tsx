"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { LOCKED_SETTINGS, type AnimationSettings, type LeadName } from "@/animation/settings";
import { COLUMNS } from "./tiles";
import styles from "./TasteGrid.module.css";

type TasteGridProps = {
  settings?: AnimationSettings;
  paused?: boolean;
};

function columnDirection(index: number, lead: LeadName): "up" | "down" {
  const rises = lead === "rise" ? index % 2 === 0 : index % 2 === 1;
  return rises ? "up" : "down";
}

export function TasteGrid({ settings = LOCKED_SETTINGS, paused = false }: TasteGridProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [settings.motion, settings.lead]);

  const plateStyle = {
    "--duration": `${settings.duration}ms`,
    "--gap": `${settings.gap}px`,
    "--ease":
      settings.motion === "drift" ? "linear" : "cubic-bezier(0.645, 0.045, 0.355, 1)",
  } as CSSProperties;

  const held = paused || !inView;

  return (
    <div className={styles.frame} ref={frameRef}>
      <div
        className={styles.plate}
        style={plateStyle}
        role="img"
        aria-label="Photographs moving in three columns"
      >
        {COLUMNS.map((column, index) => (
          <div key={column.id} className={styles.column}>
            <div
              className={styles.track}
              data-motion={settings.motion}
              data-direction={columnDirection(index, settings.lead)}
              data-paused={held ? "true" : "false"}
              style={{ "--index": index } as CSSProperties}
            >
              <ImageSet images={column.images} />
              <ImageSet images={column.images} hidden />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImageSet({ images, hidden = false }: { images: readonly string[]; hidden?: boolean }) {
  return (
    <div className={styles.set} aria-hidden={hidden || undefined}>
      {images.map((src) => (
        // The plate carries the accessible name. The second set continues the loop.
        // eslint-disable-next-line @next/next/no-img-element
        <img key={src} className={styles.card} src={src} alt="" />
      ))}
    </div>
  );
}
