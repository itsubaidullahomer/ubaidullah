import { Img, useCurrentFrame } from "remotion";
import portrait from "../../assets/portrait.png";
import type { SceneProps } from "../Reel";
import { C, PAD, accentItalic, display, mono, progress, rise } from "../theme";
import { Dot, MaskLine, Sans, TypeOn } from "../ui";

const FACTS: Array<{ k: string; v: string; dot?: string }> = [
  { k: "Based in", v: "Rahim Yar Khan, PK" },
  { k: "Now", v: "Lead engineer · Tututor.ai" },
  { k: "Shipped for", v: "Spain · Denmark · remote" },
  { k: "Status", v: "Available", dot: C.ok },
];

export function Hello(_: SceneProps) {
  const frame = useCurrentFrame();
  const reveal = progress(frame, 4, 30);
  const color = progress(frame, 34, 50);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* Portrait, wiped up from the bottom, black and white to colour. */}
      <div style={{ position: "absolute", top: 118, right: PAD, width: 420 }}>
        <div
          style={{
            width: 420,
            height: 420,
            overflow: "hidden",
            border: `1px solid ${C.borderStrong}`,
            clipPath: `inset(${(1 - reveal) * 100}% 0 0 0)`,
          }}
        >
          <Img
            src={portrait}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: `grayscale(${1 - color}) contrast(${1.05 + 0.05 * (1 - color)})`,
              transform: `scale(${1.08 - 0.08 * progress(frame, 0, 90)})`,
            }}
          />
        </div>
        <div
          style={{
            ...mono,
            fontSize: 16,
            color: C.subtle,
            marginTop: 14,
            display: "flex",
            justifyContent: "space-between",
            ...rise(frame, 30, 18, 10),
          }}
        >
          <span>Fig. 01</span>
          <span>Ubaidullah Omer</span>
        </div>
      </div>

      {/* Prompt and readout, left of the portrait. */}
      <div style={{ position: "absolute", top: 128, left: PAD, width: 440 }}>
        <TypeOn
          frame={frame}
          start={6}
          text="> hello, I'm"
          cps={0.7}
          style={{
            ...mono,
            fontSize: 26,
            color: C.muted,
            textTransform: "none",
            letterSpacing: "0.04em",
          }}
        />
        <div style={{ marginTop: 52, display: "flex", flexDirection: "column", gap: 26 }}>
          {FACTS.map((f, i) => (
            <div key={f.k} style={{ ...rise(frame, 34 + i * 7, 18, 14) }}>
              <div style={{ ...mono, fontSize: 16, color: C.subtle }}>{f.k}</div>
              <div
                style={{
                  ...mono,
                  fontSize: 22,
                  letterSpacing: "0.08em",
                  color: C.fg,
                  marginTop: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                {f.dot && <Dot color={f.dot} size={10} glow />}
                {f.v}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The name, set large. */}
      <div style={{ position: "absolute", left: PAD - 6, top: 600, ...display, fontSize: 176 }}>
        <MaskLine frame={frame} start={16}>
          Ubaidullah
        </MaskLine>
        <MaskLine frame={frame} start={24}>
          Omer
        </MaskLine>
      </div>

      <div
        style={{
          position: "absolute",
          left: PAD,
          right: PAD,
          top: 952,
          fontSize: 38,
          color: C.muted,
          ...rise(frame, 52, 22, 16),
        }}
      >
        <Sans>I build AI products people </Sans>
        <span style={{ ...display, ...accentItalic, fontSize: 46 }}>rely on.</span>
      </div>
    </div>
  );
}
