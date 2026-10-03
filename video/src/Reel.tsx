import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/fraunces/full-italic.css";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import { useEffect, useState, type ComponentType } from "react";
import { AbsoluteFill, Audio, Sequence, continueRender, delayRender } from "remotion";
import track from "../assets/music.mp3";
import { reel, reelTimeline } from "../../content/reel";
import { C } from "./theme";
import { Hello } from "./scenes/Hello";
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
  tututor: Tututor,
  illume: Illume,
  viloi: Viloi,
  "ali-foodies": AliFoodies,
  earlier: Earlier,
  nda: Nda,
  end: End,
};

const { chapters, duration } = reelTimeline();
// Each chapter runs up to the next one's first frame, so rounding never
// overlaps two scenes or leaves a gap.
export const FRAMES = chapters.map((c) => ({
  ...c,
  from: Math.round(c.start * reel.fps),
  frames: Math.round(c.end * reel.fps) - Math.round(c.start * reel.fps),
}));
export const TOTAL_FRAMES = Math.round(duration * reel.fps);

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

/** The film: one scene per chapter, cut on the bar, with the soundtrack under it. */
export function Reel() {
  useFonts();
  return (
    <AbsoluteFill style={{ background: C.bg, color: C.fg, overflow: "hidden" }}>
      {FRAMES.map((c) => {
        const Scene = SCENES[c.id];
        if (!Scene) return null;
        return (
          <Sequence key={c.id} from={c.from} durationInFrames={c.frames} name={c.label}>
            <Scene duration={c.frames} />
          </Sequence>
        );
      })}
      {reel.music && (
        <Audio
          src={track}
          startFrom={Math.round(reel.music.offset * reel.fps)}
          // A short fade in (the film starts mid-track) and out (it loops).
          volume={(f) => Math.min(1, (f + 1) / 6, (TOTAL_FRAMES - f) / 24)}
        />
      )}
    </AbsoluteFill>
  );
}
