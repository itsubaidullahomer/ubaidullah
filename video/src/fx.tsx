import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { hit } from "./beat";
import { C, FONT, display, mono } from "./theme";

/** 2D layer over a 3D shot. */
export function Overlay({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <AbsoluteFill style={{ pointerEvents: "none", ...style }}>{children}</AbsoluteFill>;
}

/** Text that lands on a beat: scales down into place and snaps in. */
export function Slam({
  frame,
  at,
  children,
  from = 1.35,
  style,
}: {
  frame: number;
  at: number;
  children: ReactNode;
  from?: number;
  style?: CSSProperties;
}) {
  const t = hit(frame, at, 8);
  const shown = frame >= at;
  return (
    <div
      style={{
        opacity: shown ? Math.min(1, t * 2.5) : 0,
        transform: `scale(${from + (1 - from) * t})`,
        filter: t < 1 && shown ? `blur(${(1 - t) * 6}px)` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Small mono line: "TUTUTOR.AI · LEAD ENGINEER". */
export function Kicker({
  children,
  style,
  accent,
}: {
  children: ReactNode;
  style?: CSSProperties;
  accent?: string;
}) {
  return (
    <div style={{ ...mono, fontSize: 28, color: C.muted, display: "flex", gap: 20, ...style }}>
      {accent && <span style={{ color: C.accent }}>{accent}</span>}
      <span>{children}</span>
    </div>
  );
}

/** A full-frame flash on a cut. */
export function Flash({
  frame,
  at,
  strength = 0.85,
  color = "#ffffff",
}: {
  frame: number;
  at: number;
  strength?: number;
  color?: string;
}) {
  const o = interpolate(frame, [at, at + 1, at + 7], [0, strength, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (o <= 0) return null;
  return <AbsoluteFill style={{ background: color, opacity: o, mixBlendMode: "screen" }} />;
}

/** Darkens the edges so the eye stays on the device. */
export function Vignette({ strength = 0.75 }: { strength?: number }) {
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 75% 60% at 50% 50%, transparent 55%, rgba(7,8,12,${strength}) 100%)`,
        pointerEvents: "none",
      }}
    />
  );
}

/** Top and bottom shade so overlay text reads over the 3D. */
export function Shade({ top = 0.9, bottom = 0.9 }: { top?: number; bottom?: number }) {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(to bottom, rgba(7,8,12,${top}) 0%, rgba(7,8,12,0) 32%, rgba(7,8,12,0) 66%, rgba(7,8,12,${bottom}) 100%)`,
        pointerEvents: "none",
      }}
    />
  );
}

/**
 * A glitch: the content splits into an orange and a bone copy that jitter and
 * slice for `frames` after `at`, then settles.
 */
export function Glitch({
  frame,
  at,
  frames = 10,
  children,
  style,
}: {
  frame: number;
  at: number;
  frames?: number;
  children: ReactNode;
  style?: CSSProperties;
}) {
  const active = frame >= at && frame < at + frames;
  const seed = (n: number) => {
    const x = Math.sin((frame + 1) * 12.9898 + n * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  const dx = active ? (seed(1) - 0.5) * 34 : 0;
  const slice = active ? seed(2) * 70 + 10 : 0;
  const visible = frame >= at;
  return (
    <div style={{ position: "relative", opacity: visible ? 1 : 0, ...style }}>
      {active && (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: `translateX(${dx}px)`,
              color: C.accent,
              opacity: 0.85,
              mixBlendMode: "screen",
            }}
          >
            {children}
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: `translateX(${-dx * 0.7}px)`,
              clipPath: `inset(${slice}% 0 ${Math.max(0, 85 - slice)}% 0)`,
            }}
          >
            {children}
          </div>
        </>
      )}
      <div style={{ opacity: active ? 0.6 : 1 }}>{children}</div>
    </div>
  );
}

export const T = {
  hero: { ...display, fontSize: 132, lineHeight: 0.92 } as CSSProperties,
  title: { ...display, fontSize: 104, lineHeight: 0.95 } as CSSProperties,
  sans: { fontFamily: FONT.sans, letterSpacing: "-0.01em" } as CSSProperties,
};
