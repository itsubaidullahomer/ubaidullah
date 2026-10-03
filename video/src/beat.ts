import { interpolate } from "remotion";
import { reel } from "../../content/reel";
import { easeInOut, easeOut } from "./theme";

/** Frames per beat at the reel's tempo. */
export const BEAT = (reel.fps * 60) / reel.bpm;
/** Frames per bar (four beats). */
export const BAR = BEAT * 4;
/** The frame a beat starts on. */
export const beat = (n: number) => Math.round(n * BEAT);

type V3 = [number, number, number];
export type Key = { at: number; pos: V3; target: V3 };

/**
 * A camera move through keyframes (frames), eased in and out between each
 * pair, so it reads as one continuous move.
 */
export function cameraAt(frame: number, keys: Key[]) {
  if (frame <= keys[0].at) return keys[0];
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i];
    const b = keys[i + 1];
    if (frame <= b.at) {
      const t = interpolate(frame, [a.at, b.at], [0, 1], { easing: easeInOut });
      const mix = (p: V3, q: V3) => p.map((v, k) => v + (q[k] - v) * t) as V3;
      return { at: frame, pos: mix(a.pos, b.pos), target: mix(a.target, b.target) };
    }
  }
  return keys[keys.length - 1];
}

/** 0 → 1 over a few frames from `start`, eased out: the "slam" of a cut. */
export function hit(frame: number, start: number, frames = 7) {
  return interpolate(frame, [start, start + frames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
}
