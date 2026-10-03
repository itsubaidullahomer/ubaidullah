import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/fraunces/full-italic.css";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import { useEffect, useState, type ComponentType } from "react";
import {
  AbsoluteFill,
  Sequence,
  continueRender,
  delayRender,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { reel, reelTimeline } from "../../content/reel";
import { C, PAD, SIZE, mono } from "./theme";
import { Dot } from "./ui";
import { Hello } from "./scenes/Hello";
import { Path } from "./scenes/Path";
import { Tututor } from "./scenes/Tututor";
import { Illume } from "./scenes/Illume";
import { Viloi } from "./scenes/Viloi";
import { AliFoodies } from "./scenes/AliFoodies";
import { Earlier } from "./scenes/Earlier";
import { Nda } from "./scenes/Nda";
import { End } from "./scenes/End";

export type SceneProps = { duration: number };

const SCENES: Record<string, ComponentType<SceneProps>> = {
  hello: Hello,
  path: Path,
  tututor: Tututor,
  illume: Illume,
  viloi: Viloi,
  "ali-foodies": AliFoodies,
  earlier: Earlier,
  nda: Nda,
  end: End,
};

const { chapters } = reelTimeline();
const FRAMES = chapters.map((c) => ({
  ...c,
  from: Math.round(c.start * reel.fps),
  frames: Math.round(c.seconds * reel.fps),
}));

function useFonts() {
  const [handle] = useState(() => delayRender("Loading fonts"));
  useEffect(() => {
    Promise.all([
      document.fonts.load('400 120px "Fraunces Variable"'),
      document.fonts.load('italic 400 120px "Fraunces Variable"'),
      document.fonts.load('400 40px "Geist Variable"'),
      document.fonts.load('500 40px "Geist Variable"'),
      document.fonts.load('400 20px "Geist Mono Variable"'),
    ]).then(() => continueRender(handle));
  }, [handle]);
}

/** Every scene leaves the same way: a short fade and lift. */
function Exit({ duration, children }: { duration: number; children: React.ReactNode }) {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [duration - 10, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ opacity: 1 - t, transform: `translateY(${-14 * t}px)` }}>
      {children}
    </AbsoluteFill>
  );
}

/** Top bar and segmented progress line, on top of every scene. */
function Chrome() {
  const frame = useCurrentFrame();
  const current = FRAMES.findIndex((c) => frame >= c.from && frame < c.from + c.frames);
  const chapter = FRAMES[Math.max(0, current)];
  const appear = interpolate(frame, [4, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const total = FRAMES.length;

  return (
    <AbsoluteFill style={{ opacity: appear, pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: 40,
          left: PAD,
          right: PAD,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          ...mono,
          fontSize: 18,
          color: C.subtle,
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Dot color={C.accent} size={8} />
          <span style={{ color: C.muted }}>Ubaidullah Omer</span>
        </span>
        <span>
          <span style={{ color: C.accent }}>{String(current + 1).padStart(2, "0")}</span>
          <span> / {String(total).padStart(2, "0")} · </span>
          <span style={{ color: C.muted }}>{chapter.label}</span>
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          left: PAD,
          right: PAD,
          bottom: 40,
          height: 3,
          display: "flex",
          gap: 6,
        }}
      >
        {FRAMES.map((c, i) => {
          const fill = interpolate(frame, [c.from, c.from + c.frames], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div key={c.id} style={{ flex: c.frames, background: C.border, position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  transformOrigin: "left",
                  transform: `scaleX(${fill})`,
                  background: i === current ? C.accent : C.borderStrong,
                }}
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

/**
 * `chrome` draws the reel's own top bar and progress line. The site's copy
 * leaves it off, because the hero frame has its own status bar and chapter rail.
 */
export function Reel({ chrome = true }: { chrome?: boolean }) {
  useFonts();
  return (
    <AbsoluteFill
      style={{
        background: C.bg,
        backgroundImage: `linear-gradient(to right, ${C.grid} 1px, transparent 1px), linear-gradient(to bottom, ${C.grid} 1px, transparent 1px)`,
        backgroundSize: "72px 72px",
        backgroundPosition: `${PAD}px 0, 0 0`,
        width: SIZE,
        height: SIZE,
        color: C.fg,
        overflow: "hidden",
      }}
    >
      {FRAMES.map((c) => {
        const Scene = SCENES[c.id];
        if (!Scene) return null;
        return (
          <Sequence key={c.id} from={c.from} durationInFrames={c.frames} name={c.label}>
            <Exit duration={c.frames}>
              <Scene duration={c.frames} />
            </Exit>
          </Sequence>
        );
      })}
      {chrome && <Chrome />}
    </AbsoluteFill>
  );
}
