import type { CSSProperties } from "react";
import { Easing, interpolate } from "remotion";

/** The site's palette (app/globals.css :root). Keep the two in sync. */
export const C = {
  bg: "#07080c",
  elevated: "#0c0d13",
  raised: "#12131a",
  fg: "#f2f1ec",
  muted: "#9a9ba5",
  subtle: "#5d5e69",
  border: "rgba(242, 241, 236, 0.09)",
  borderStrong: "rgba(242, 241, 236, 0.18)",
  tint: "rgba(242, 241, 236, 0.04)",
  tintStrong: "rgba(242, 241, 236, 0.08)",
  accent: "#ff4d1c",
  accentBright: "#ff7a4d",
  ok: "#4fe3a3",
  warn: "#ffc44d",
  grid: "rgba(242, 241, 236, 0.05)",
};

export const FONT = {
  display: "'Fraunces Variable', Georgia, serif",
  sans: "'Geist Variable', system-ui, sans-serif",
  mono: "'Geist Mono Variable', ui-monospace, monospace",
};

/** Matches the site's `font-display` utility. */
export const display: CSSProperties = {
  fontFamily: FONT.display,
  fontWeight: 400,
  fontOpticalSizing: "auto",
  fontVariationSettings: '"SOFT" 40, "WONK" 0',
  letterSpacing: "-0.03em",
  lineHeight: 0.94,
  color: C.fg,
};

/** Matches `accent-italic`: the one accent phrase in a headline. */
export const accentItalic: CSSProperties = {
  color: C.accent,
  fontStyle: "italic",
  fontVariationSettings: '"SOFT" 80, "WONK" 1',
};

/** Matches `label-mono`. */
export const mono: CSSProperties = {
  fontFamily: FONT.mono,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  fontVariantNumeric: "tabular-nums",
  lineHeight: 1.2,
};

export const sans: CSSProperties = {
  fontFamily: FONT.sans,
  letterSpacing: "-0.01em",
};

/** --ease-out-expo */
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

/** 0 → 1 between two frames, eased and clamped. */
export function progress(frame: number, start: number, duration: number, easing = easeOut) {
  return interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });
}

/** Fade and lift in. */
export function rise(frame: number, start: number, duration = 20, distance = 28): CSSProperties {
  const t = progress(frame, start, duration);
  return { opacity: t, transform: `translateY(${(1 - t) * distance}px)` };
}

export const SIZE = 1080;
export const PAD = 72;
