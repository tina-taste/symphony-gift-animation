"use client";

import { useEffect, useMemo, useState } from "react";
import {
  encodeSettings,
  LEADS,
  LIMITS,
  LOCKED_SETTINGS,
  MOTIONS,
  sameSettings,
  type AnimationSettings,
  type LeadName,
  type MotionName,
} from "@/animation/settings";
import { ThankYou } from "@/components/ThankYou/ThankYou";
import styles from "./Bench.module.css";

const MOTION_LABEL: Record<MotionName, string> = {
  drift: "Drift",
  turn: "Turn",
};

const LEAD_LABEL: Record<LeadName, string> = {
  rise: "1 and 3 rise",
  fall: "2 rises",
};

export function Bench() {
  const [settings, setSettings] = useState<AnimationSettings>(LOCKED_SETTINGS);
  const [locked, setLocked] = useState<AnimationSettings>(LOCKED_SETTINGS);
  const [run, setRun] = useState(0);
  const [paused, setPaused] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const dirty = useMemo(() => !sameSettings(settings, locked), [settings, locked]);

  const replay = () => setRun((value) => value + 1);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "SELECT")) return;
      if (event.code === "Space") {
        event.preventDefault();
        replay();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const setNumber = (key: keyof typeof LIMITS, value: number) => {
    setNotice(null);
    setSettings((current) => ({ ...current, [key]: value }));
  };

  const lock = async () => {
    setSaving(true);
    setError(null);
    setNotice(null);
    try {
      const response = await fetch("/api/lock", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(settings),
      });
      const body = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(body.error ?? "Could not write the lock.");
      setLocked(settings);
      setNotice("Locked. Send your engineer the review link.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not write the lock.");
    } finally {
      setSaving(false);
    }
  };

  const copyLink = async () => {
    const path = dirty ? `/review?d=${encodeSettings(settings)}` : "/review";
    const url = `${window.location.origin}${path}`;
    try {
      await navigator.clipboard.writeText(url);
      setError(null);
      setNotice(dirty ? "Copied a draft link. It is not the locked version." : "Copied the review link.");
    } catch {
      setError("Could not copy. The review page is /review.");
    }
  };

  return (
    <div className={styles.shell}>
      <aside className={styles.panel}>
        <header className={styles.header}>
          <p className={styles.title}>Taste grid</p>
          <p className={styles.intro}>
            Three columns of the photographs. Each one travels the opposite way from its neighbor. Tune
            it, then lock it.
          </p>
        </header>

        <p className={styles.status}>
          {dirty ? (
            <>
              <strong>Changed.</strong> Lock again before you send it.
            </>
          ) : (
            <>
              <strong>Locked.</strong> This is the motion engineering has.
            </>
          )}
        </p>

        <section className={styles.group}>
          <Slider
            label="Speed"
            value={settings.duration}
            min={LIMITS.duration[0]}
            max={LIMITS.duration[1]}
            step={1000}
            display={`${settings.duration / 1000}s`}
            onChange={(value) => setNumber("duration", value)}
          />
          <Slider
            label="Gap"
            value={settings.gap}
            min={LIMITS.gap[0]}
            max={LIMITS.gap[1]}
            step={1}
            unit="px"
            onChange={(value) => setNumber("gap", value)}
          />
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Motion</span>
            <div className={styles.segmented}>
              {MOTIONS.map((motion) => (
                <button
                  key={motion}
                  type="button"
                  className={motion === settings.motion ? styles.segmentActive : styles.segment}
                  aria-pressed={motion === settings.motion}
                  onClick={() => {
                    setNotice(null);
                    setSettings((current) => ({ ...current, motion }));
                  }}
                >
                  {MOTION_LABEL[motion]}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Direction</span>
            <div className={styles.segmented}>
              {LEADS.map((lead) => (
                <button
                  key={lead}
                  type="button"
                  className={lead === settings.lead ? styles.segmentActive : styles.segment}
                  aria-pressed={lead === settings.lead}
                  onClick={() => {
                    setNotice(null);
                    setSettings((current) => ({ ...current, lead }));
                  }}
                >
                  {LEAD_LABEL[lead]}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.group}>
          <div className={styles.row}>
            <button type="button" className={styles.quiet} onClick={() => setPaused((value) => !value)}>
              {paused ? "Play" : "Pause"}
            </button>
            <button type="button" className={styles.quiet} onClick={replay}>
              Replay
            </button>
            <button type="button" className={styles.primary} onClick={lock} disabled={!dirty || saving}>
              {saving ? "Locking" : "Lock"}
            </button>
          </div>
          <button type="button" className={styles.quiet} onClick={copyLink}>
            Copy review link
          </button>
          {notice ? <p className={styles.status}>{notice}</p> : null}
          {error ? <p className={styles.error}>{error}</p> : null}
        </section>

        <section className={styles.group}>
          <span className={styles.fieldLabel}>For engineering</span>
          <pre className={styles.code}>{`<TasteGrid />`}</pre>
          <a className={styles.link} href="/review">
            Open the locked review
          </a>
        </section>
      </aside>

      <div className={styles.stage}>
        <ThankYou settings={settings} run={run} paused={paused} />
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  display?: string;
  onChange: (value: number) => void;
}) {
  const shown = display ?? (Number.isInteger(step) ? String(value) : value.toFixed(2));
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>
        {label}
        <output className={styles.value}>
          {shown}
          {unit}
        </output>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
