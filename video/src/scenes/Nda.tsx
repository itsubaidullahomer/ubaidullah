import { useCurrentFrame } from "remotion";
import { reel } from "../../../content/reel";
import type { SceneProps } from "../Reel";
import { beat, hit } from "../beat";
import { Glitch, Kicker, Overlay, T } from "../fx";
import { C, PAD, accentItalic, mono } from "../theme";
import { Dot, Redaction } from "../ui";

/** Field names only: every value is redacted, so nothing can leak. */
const FIELDS = [
  { k: "Project", w: 380 },
  { k: "Client", w: 330 },
  { k: "Stack", w: 300 },
  { k: "Scale", w: 260 },
];

export function Nda(_: SceneProps) {
  const frame = useCurrentFrame();
  const count = Math.max(1, Math.min(reel.classifiedCount, 2));
  return (
    <Overlay
      style={{
        background: C.bg,
        backgroundImage: `repeating-linear-gradient(to bottom, rgba(242,241,236,0.025) 0 2px, transparent 2px 6px), linear-gradient(to right, ${C.grid} 1px, transparent 1px), linear-gradient(to bottom, ${C.grid} 1px, transparent 1px)`,
        backgroundSize: "auto, 90px 90px, 90px 90px",
      }}
    >
      <div style={{ position: "absolute", top: 170, left: PAD, right: PAD }}>
        <Glitch frame={frame} at={0} frames={8}>
          <Kicker accent="Classified">Under NDA</Kicker>
        </Glitch>
        <Glitch frame={frame} at={beat(1)} frames={10} style={{ marginTop: 48 }}>
          <div style={T.title}>My most ambitious</div>
          <div style={T.title}>work is the work</div>
          <div style={{ ...T.title, ...accentItalic }}>I can&rsquo;t show.</div>
        </Glitch>
      </div>

      <div
        style={{
          position: "absolute",
          top: 760,
          left: PAD,
          right: PAD,
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}
      >
        {Array.from({ length: count }, (_, c) => {
          const at = beat(3 + c);
          const stamp = hit(frame, beat(5 + c * 0.5), 6);
          return (
            <Glitch key={c} frame={frame} at={at} frames={9}>
              <div
                style={{
                  position: "relative",
                  height: 360,
                  border: `2px solid ${C.borderStrong}`,
                  background: C.elevated,
                  borderRadius: 18,
                  padding: 44,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    ...mono,
                    fontSize: 26,
                    color: C.subtle,
                  }}
                >
                  <span>File {String(c + 1).padStart(2, "0")}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 14, color: C.muted }}>
                    <Dot color={C.warn} size={14} />
                    In progress
                  </span>
                </div>
                <div style={{ marginTop: 44, display: "flex", flexDirection: "column", gap: 30 }}>
                  {FIELDS.map((f, i) => (
                    <div key={f.k} style={{ display: "flex", alignItems: "center", gap: 30 }}>
                      <span style={{ ...mono, fontSize: 24, color: C.subtle, width: 140 }}>
                        {f.k}
                      </span>
                      <Redaction frame={frame} start={at + 4 + i * 3} width={f.w} height={30} />
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    position: "absolute",
                    right: 44,
                    bottom: 44,
                    ...mono,
                    fontSize: 56,
                    letterSpacing: "0.2em",
                    color: C.accent,
                    border: `5px solid ${C.accent}`,
                    borderRadius: 12,
                    padding: "14px 18px 14px 30px",
                    opacity: stamp,
                    transform: `rotate(-8deg) scale(${1.8 - 0.8 * stamp})`,
                  }}
                >
                  NDA
                </div>
              </div>
            </Glitch>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          left: PAD,
          bottom: 170,
          ...T.sans,
          fontSize: 52,
          color: C.fg,
          opacity: hit(frame, beat(6), 8),
        }}
      >
        Ask me about it <span style={{ color: C.accent }}>→</span>
      </div>
    </Overlay>
  );
}
