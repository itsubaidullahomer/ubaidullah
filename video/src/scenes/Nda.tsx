import { interpolate, useCurrentFrame } from "remotion";
import { reel } from "../../../content/reel";
import type { SceneProps } from "../Reel";
import { C, PAD, accentItalic, display, mono, progress, rise } from "../theme";
import { Dot, Eyebrow, MaskLine, Redaction, Sans } from "../ui";

/** Field names only. Every value is redacted, so nothing here can leak. */
const FIELDS: Array<{ k: string; w: number }> = [
  { k: "Project", w: 230 },
  { k: "Client", w: 180 },
  { k: "Stack", w: 250 },
  { k: "Scale", w: 140 },
];

export function Nda(_: SceneProps) {
  const frame = useCurrentFrame();
  const count = Math.max(1, Math.min(reel.classifiedCount, 2));
  const cardW = count === 1 ? 600 : (1080 - PAD * 2 - 28) / 2;
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Eyebrow
        index="08"
        style={{ position: "absolute", top: 124, left: PAD, ...rise(frame, 0, 14, 10) }}
      >
        Classified · under NDA
      </Eyebrow>
      <div style={{ position: "absolute", top: 172, left: PAD - 4, ...display, fontSize: 80 }}>
        <MaskLine frame={frame} start={4}>
          My most ambitious work
        </MaskLine>
        <MaskLine frame={frame} start={10}>
          is the work <span style={accentItalic}>I can&rsquo;t show.</span>
        </MaskLine>
      </div>

      <div style={{ position: "absolute", top: 410, left: PAD, display: "flex", gap: 28 }}>
        {Array.from({ length: count }, (_, c) => {
          const at = 20 + c * 12;
          const stamp = progress(frame, 92 + c * 10, 10);
          return (
            <div
              key={c}
              style={{
                position: "relative",
                width: cardW,
                height: 440,
                border: `1px solid ${C.borderStrong}`,
                background: C.elevated,
                borderRadius: 12,
                padding: 30,
                ...rise(frame, at, 22, 40),
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  ...mono,
                  fontSize: 17,
                  color: C.subtle,
                }}
              >
                <span>File {String(c + 1).padStart(2, "0")}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 10, color: C.muted }}>
                  <Dot color={C.warn} size={9} />
                  In progress
                </span>
              </div>
              <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 30 }}>
                {FIELDS.map((f, i) => (
                  <div key={f.k} style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <span style={{ ...mono, fontSize: 17, color: C.subtle, width: 96 }}>{f.k}</span>
                    <Redaction frame={frame} start={at + 16 + i * 7} width={f.w} height={24} />
                  </div>
                ))}
              </div>

              {/* The stamp lands last. */}
              <div
                style={{
                  position: "absolute",
                  right: 28,
                  bottom: 30,
                  ...mono,
                  fontSize: 34,
                  letterSpacing: "0.2em",
                  color: C.accent,
                  border: `3px solid ${C.accent}`,
                  borderRadius: 8,
                  padding: "10px 14px 10px 20px",
                  opacity: stamp,
                  transform: `rotate(-8deg) scale(${interpolate(stamp, [0, 1], [1.6, 1])})`,
                }}
              >
                NDA
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", top: 892, left: PAD, ...rise(frame, 112, 18, 12) }}>
        <Sans style={{ fontSize: 34, color: C.fg }}>
          Ask me about it <span style={{ color: C.accent }}>→</span>
        </Sans>
      </div>
    </div>
  );
}
