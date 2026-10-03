import { useCurrentFrame } from "remotion";
import type { SceneProps } from "../Reel";
import { C, PAD, accentItalic, display, mono, progress, rise } from "../theme";
import { Dot, Eyebrow, MaskLine, Sans } from "../ui";

/** Wireframe blocks of the phone layout, drawn in as it "builds". */
const BLOCKS: Array<{ y: number; h: number; w?: number; accent?: boolean }> = [
  { y: 0, h: 34, w: 0.45 },
  { y: 54, h: 190 },
  { y: 262, h: 30, w: 0.7 },
  { y: 306, h: 22, w: 0.5 },
  { y: 348, h: 96, accent: true },
  { y: 456, h: 96 },
  { y: 564, h: 44, w: 0.6 },
];

export function AliFoodies(_: SceneProps) {
  const frame = useCurrentFrame();
  const count = progress(frame, 4, 40) * 99.9;
  const phoneIn = progress(frame, 18, 30);
  const PW = 290;
  const PH = 580;
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Eyebrow
        index="06"
        style={{ position: "absolute", top: 124, left: PAD, ...rise(frame, 0, 14, 10) }}
      >
        Ali Foodies · in progress
      </Eyebrow>

      <div
        style={{
          position: "absolute",
          top: 150,
          left: PAD - 10,
          ...display,
          fontSize: 250,
          letterSpacing: "-0.05em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {count.toFixed(1)}
        <span style={accentItalic}>%</span>
      </div>

      <div style={{ position: "absolute", top: 420, left: PAD, width: 520 }}>
        <Sans
          style={{ fontSize: 34, color: C.muted, display: "block", ...rise(frame, 20, 18, 10) }}
        >
          of Ali Foodies’ customers open it on a phone.
        </Sans>
        <div style={{ ...display, fontSize: 76, marginTop: 70 }}>
          <MaskLine frame={frame} start={40}>
            So I&rsquo;m rebuilding
          </MaskLine>
          <MaskLine frame={frame} start={46}>
            it <span style={accentItalic}>phone first.</span>
          </MaskLine>
        </div>
        <div
          style={{
            ...mono,
            fontSize: 18,
            color: C.subtle,
            marginTop: 44,
            lineHeight: 1.7,
            ...rise(frame, 64, 16, 10),
          }}
        >
          Old: alifoodies.com
          <br />
          New: alifoodiess.vercel.app
        </div>
      </div>

      {/* A phone drawing its own layout. */}
      <div
        style={{
          position: "absolute",
          right: PAD + 10,
          top: 372,
          width: PW,
          height: PH,
          borderRadius: 46,
          border: `1px solid ${C.borderStrong}`,
          background: C.elevated,
          padding: "52px 22px 22px",
          opacity: phoneIn,
          transform: `translateY(${(1 - phoneIn) * 90}px)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 18,
            left: "50%",
            width: 70,
            height: 18,
            marginLeft: -35,
            borderRadius: 99,
            background: "#000",
          }}
        />
        <div style={{ position: "relative", height: "100%" }}>
          {BLOCKS.map((b, i) => {
            const t = progress(frame, 30 + i * 6, 16);
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: b.y * 0.86,
                  left: 0,
                  width: `${(b.w ?? 1) * 100}%`,
                  height: b.h * 0.86,
                  borderRadius: 10,
                  border: `1px solid ${b.accent ? C.warn : C.borderStrong}`,
                  background: b.accent ? "rgba(255, 196, 77, 0.08)" : C.tint,
                  transformOrigin: "left",
                  transform: `scaleX(${t})`,
                  opacity: t,
                }}
              />
            );
          })}
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -46,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            ...mono,
            fontSize: 16,
            color: C.muted,
          }}
        >
          <Dot color={C.warn} size={9} />
          Building
        </div>
      </div>
    </div>
  );
}
