import { useCurrentFrame } from "remotion";
import type { SceneProps } from "../Reel";
import { C, PAD, accentItalic, display, easeInOut, progress, rise } from "../theme";
import { BrowserFrame, Eyebrow, MaskLine, Sans, ScrollShot } from "../ui";

export function Illume({ duration }: SceneProps) {
  const frame = useCurrentFrame();
  const W = 1080 - PAD * 2;
  const H = 470;
  const enter = progress(frame, 8, 30);
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Eyebrow
        index="04"
        style={{ position: "absolute", top: 124, left: PAD, ...rise(frame, 0, 14, 10) }}
      >
        Insight-X → Illume Analytics · 2024–25
      </Eyebrow>

      <div style={{ position: "absolute", top: 176, left: PAD - 4, ...display, fontSize: 92 }}>
        <MaskLine frame={frame} start={4}>
          Dashboards that
        </MaskLine>
        <MaskLine frame={frame} start={10}>
          <span style={accentItalic}>build themselves.</span>
        </MaskLine>
      </div>

      <div
        style={{
          position: "absolute",
          top: 400,
          left: PAD,
          display: "flex",
          alignItems: "baseline",
          gap: 22,
          ...rise(frame, 22, 18, 12),
        }}
      >
        <span style={{ ...display, fontSize: 64 }}>$250k</span>
        <Sans style={{ fontSize: 28, color: C.muted }}>
          raised on the back of it · live as Illume today
        </Sans>
      </div>

      <div
        style={{
          position: "absolute",
          left: PAD,
          top: 506,
          opacity: enter,
          transform: `translateY(${(1 - enter) * 80}px)`,
        }}
      >
        <BrowserFrame url="joinillume.com" label="MedSpa analytics" width={W} height={H}>
          <ScrollShot
            src="images/screens/illume.jpg"
            ratio={7800 / 2160}
            frameWidth={W}
            frameHeight={H - 46}
            scroll={progress(frame, 30, duration - 40, easeInOut) * 0.55}
          />
        </BrowserFrame>
      </div>
    </div>
  );
}
