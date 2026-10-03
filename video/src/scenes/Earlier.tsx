import { Img, staticFile, useCurrentFrame } from "remotion";
import type { SceneProps } from "../Reel";
import { C, PAD, accentItalic, display, mono, progress, rise } from "../theme";
import { Eyebrow, MaskLine, Sans } from "../ui";

const S = "images/screens";

const WORK = [
  { title: "Jurri", detail: "Storage, inbox & vault · ~40% faster load", src: `${S}/jurri.jpg` },
  { title: "Yaksport", detail: "Training-camp bookings · 100+ clubs", src: `${S}/yaksport.jpg` },
  {
    title: "Crown Kabab",
    detail: "Restaurant ordering · Stripe · solo",
    src: `${S}/crownkabab.png`,
  },
  { title: "ToolkitJar", detail: "Free tools that run in the browser", src: `${S}/toolkitjar.png` },
  { title: "Animated Landing", detail: "Heavy motion, 95+ Lighthouse", src: `${S}/enomad.png` },
];

const GAP = 24;
const COL = (1080 - PAD * 2 - GAP * 2) / 3;
const SHOT = COL * 0.62;

export function Earlier(_: SceneProps) {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Eyebrow
        index="07"
        style={{ position: "absolute", top: 124, left: PAD, ...rise(frame, 0, 14, 10) }}
      >
        Along the way · 2022 – 2025
      </Eyebrow>
      <div style={{ position: "absolute", top: 172, left: PAD - 4, ...display, fontSize: 84 }}>
        <MaskLine frame={frame} start={4}>
          The work that
        </MaskLine>
        <MaskLine frame={frame} start={10}>
          <span style={accentItalic}>got me here.</span>
        </MaskLine>
      </div>

      <div
        style={{
          position: "absolute",
          top: 400,
          left: PAD,
          right: PAD,
          display: "grid",
          gridTemplateColumns: `repeat(3, ${COL}px)`,
          gap: `40px ${GAP}px`,
        }}
      >
        {WORK.map((w, i) => {
          const at = 14 + i * 9;
          const t = progress(frame, at, 22);
          // Each screenshot drifts down its page a little while it's on screen.
          const drift = progress(frame, at, 150);
          return (
            <div key={w.title} style={{ opacity: t, transform: `translateY(${(1 - t) * 40}px)` }}>
              <div
                style={{
                  height: SHOT,
                  borderRadius: 10,
                  overflow: "hidden",
                  border: `1px solid ${C.borderStrong}`,
                  background: C.raised,
                }}
              >
                <Img
                  src={staticFile(w.src)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: `50% ${drift * 18}%`,
                    transform: `scale(${1.06 - drift * 0.06})`,
                  }}
                />
              </div>
              <div style={{ marginTop: 16 }}>
                <Sans style={{ fontSize: 28, fontWeight: 500, color: C.fg }}>{w.title}</Sans>
              </div>
              <div
                style={{ ...mono, fontSize: 15, color: C.subtle, marginTop: 8, lineHeight: 1.45 }}
              >
                {w.detail}
              </div>
            </div>
          );
        })}

        {/* The sixth cell points at the rest. */}
        <div
          style={{
            height: SHOT,
            borderRadius: 10,
            border: `1px dashed ${C.borderStrong}`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: 22,
            ...rise(frame, 14 + 5 * 9, 22, 30),
          }}
        >
          <div style={{ ...display, fontSize: 40 }}>
            and <span style={accentItalic}>more</span>
          </div>
          <div
            style={{
              ...mono,
              fontSize: 14,
              letterSpacing: "0.04em",
              color: C.muted,
              marginTop: 10,
            }}
          >
            itsubaidullahomer.com/work
          </div>
        </div>
      </div>
    </div>
  );
}
