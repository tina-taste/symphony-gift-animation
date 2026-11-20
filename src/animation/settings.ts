import locked from "./settings.lock.json";

export const VARIANTS = ["columns"] as const;
export const MOTIONS = ["drift", "turn"] as const;
export const LEADS = ["rise", "fall"] as const;

export type VariantName = (typeof VARIANTS)[number];
export type MotionName = (typeof MOTIONS)[number];
export type LeadName = (typeof LEADS)[number];

export type AnimationSettings = {
  /** Which animation is on the graphic. */
  variant: VariantName;
  /** One pass of a column, in milliseconds. */
  duration: number;
  /** Space between photographs in a column, in pixels. */
  gap: number;
  /** Drift travels one way. Turn eases up, then back down. */
  motion: MotionName;
  /** Which way column 1 starts. Columns 2 and 3 take the opposite of their neighbor. */
  lead: LeadName;
};

export const LIMITS = {
  duration: [8000, 36000],
  gap: [8, 28],
} as const;

export const LOCKED_SETTINGS: AnimationSettings = locked.settings as AnimationSettings;

function clamp(value: number, [min, max]: readonly [number, number]) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function sanitizeSettings(input: unknown): AnimationSettings | null {
  if (!input || typeof input !== "object") return null;
  const value = input as Record<string, unknown>;
  const variant = VARIANTS.find((name) => name === value.variant) ?? "columns";
  const motion = MOTIONS.find((name) => name === value.motion);
  const lead = LEADS.find((name) => name === value.lead);
  if (!motion || !lead) return null;
  return {
    variant,
    duration: Math.round(clamp(Number(value.duration), LIMITS.duration)),
    gap: Math.round(clamp(Number(value.gap), LIMITS.gap)),
    motion,
    lead,
  };
}

export function sameSettings(a: AnimationSettings, b: AnimationSettings) {
  return (Object.keys(a) as (keyof AnimationSettings)[]).every((key) => a[key] === b[key]);
}

export function encodeSettings(settings: AnimationSettings) {
  const json = JSON.stringify(settings);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

export function decodeSettings(encoded: string): AnimationSettings | null {
  try {
    const padded = encoded.replaceAll("-", "+").replaceAll("_", "/");
    const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
    const binary = atob(padded + pad);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return sanitizeSettings(JSON.parse(new TextDecoder().decode(bytes)));
  } catch {
    return null;
  }
}
