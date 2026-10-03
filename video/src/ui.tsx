import type { CSSProperties, ReactNode } from "react";
import { Img, staticFile } from "remotion";
import { C, FONT, mono, progress } from "./theme";

/** A line that slides up out of a mask, like a headline being set. */
export function MaskLine({
  frame,
  start,
  duration = 26,
  children,
  style,
}: {
  frame: number;
  start: number;
  duration?: number;
  children: ReactNode;
  style?: CSSProperties;
}) {
  const t = progress(frame, start, duration);
  return (
    <span
      style={{
        display: "block",
        overflow: "hidden",
        // Room for Fraunces descenders inside the mask.
        paddingBottom: "0.14em",
        marginBottom: "-0.14em",
        ...style,
      }}
    >
      <span style={{ display: "block", transform: `translateY(${(1 - t) * 110}%)` }}>
        {children}
      </span>
    </span>
  );
}

/** Types `text` out from `start`, `cps` characters per frame. */
export function TypeOn({
  frame,
  start,
  text,
  cps = 1.2,
  caret = true,
  style,
}: {
  frame: number;
  start: number;
  text: string;
  cps?: number;
  caret?: boolean;
  style?: CSSProperties;
}) {
  const n = Math.max(0, Math.min(text.length, Math.floor((frame - start) * cps)));
  const typing = frame >= start && n < text.length;
  const blinkOn = Math.floor(frame / 8) % 2 === 0;
  return (
    <span style={style}>
      {text.slice(0, n)}
      {caret && frame >= start && (typing || blinkOn) && (
        <span
          style={{
            display: "inline-block",
            width: "0.55em",
            height: "1em",
            marginLeft: "0.08em",
            transform: "translateY(0.14em)",
            background: C.accent,
          }}
        />
      )}
    </span>
  );
}

export function Dot({
  color = C.ok,
  size = 10,
  glow = false,
}: {
  color?: string;
  size?: number;
  glow?: boolean;
}) {
  return (
    <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: 999,
        background: color,
        boxShadow: glow ? `0 0 0 ${size * 0.6}px ${color}22` : undefined,
        flexShrink: 0,
      }}
    />
  );
}

/** Small mono eyebrow: "03 — TUTUTOR.AI · …". */
export function Eyebrow({
  index,
  children,
  style,
}: {
  index?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div style={{ ...mono, fontSize: 21, color: C.subtle, display: "flex", gap: 18, ...style }}>
      {index && <span style={{ color: C.accent }}>{index}</span>}
      <span>{children}</span>
    </div>
  );
}

/** Browser chrome around a screenshot, like the site's BrowserFrame with a status bar. */
export function BrowserFrame({
  url,
  label,
  status = C.ok,
  width,
  height,
  children,
  style,
}: {
  url: string;
  label?: string;
  status?: string;
  width: number;
  height: number;
  children: ReactNode;
  style?: CSSProperties;
}) {
  const bar = 46;
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 14,
        border: `1px solid ${C.borderStrong}`,
        background: C.elevated,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 40px 80px -30px rgba(0,0,0,0.9)",
        ...style,
      }}
    >
      <div
        style={{
          height: bar,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "0 18px",
          borderBottom: `1px solid ${C.border}`,
          background: C.raised,
          ...mono,
          fontSize: 16,
          color: C.muted,
        }}
      >
        <Dot color={status} size={9} />
        <span style={{ textTransform: "none", letterSpacing: "0.02em" }}>{url}</span>
        {label && <span style={{ marginLeft: "auto", color: C.subtle }}>{label}</span>}
      </div>
      <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>{children}</div>
    </div>
  );
}

/** A full-width screenshot that scrolls by `scroll` (0 → 1 of its overflow). */
export function ScrollShot({
  src,
  ratio,
  frameWidth,
  frameHeight,
  scroll,
}: {
  src: string;
  /** Image height / width. */
  ratio: number;
  frameWidth: number;
  frameHeight: number;
  scroll: number;
}) {
  const h = frameWidth * ratio;
  const travel = Math.max(0, h - frameHeight);
  return (
    <Img
      src={staticFile(src)}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: frameWidth,
        height: h,
        transform: `translateY(${-travel * scroll}px)`,
      }}
    />
  );
}

/** Phone bezel with a screenshot, like the site's PhoneShell. */
export function Phone({
  src,
  width,
  style,
}: {
  src: string;
  width: number;
  style?: CSSProperties;
}) {
  const height = width * 2.08;
  const bezel = width * 0.035;
  return (
    <div
      style={{
        width,
        height,
        borderRadius: width * 0.16,
        padding: bezel,
        background: "#000",
        border: `1px solid ${C.borderStrong}`,
        boxShadow: "0 50px 90px -30px rgba(0,0,0,0.95)",
        ...style,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: width * 0.13,
          overflow: "hidden",
          position: "relative",
          background: C.raised,
        }}
      >
        <Img
          src={staticFile(src)}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
        />
      </div>
    </div>
  );
}

/** A black bar that draws over text, left to right. */
export function Redaction({
  frame,
  start,
  width,
  height = 26,
  style,
}: {
  frame: number;
  start: number;
  width: number;
  height?: number;
  style?: CSSProperties;
}) {
  const t = progress(frame, start, 14);
  return (
    <span
      style={{
        display: "inline-block",
        width,
        height,
        verticalAlign: "middle",
        background: C.fg,
        opacity: 0.92,
        transformOrigin: "left center",
        transform: `scaleX(${t})`,
        ...style,
      }}
    />
  );
}

export function Pill({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span
      style={{
        ...mono,
        fontSize: 19,
        color: C.muted,
        border: `1px solid ${C.borderStrong}`,
        borderRadius: 999,
        padding: "10px 18px",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function Sans({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span style={{ fontFamily: FONT.sans, letterSpacing: "-0.01em", ...style }}>{children}</span>
  );
}
