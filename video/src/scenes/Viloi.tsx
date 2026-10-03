import { useCurrentFrame } from "remotion";
import type { SceneProps } from "../Reel";
import { C, PAD, accentItalic, display, easeInOut, progress, rise } from "../theme";
import { BrowserFrame, Eyebrow, MaskLine, Pill, Sans, ScrollShot } from "../ui";

const STACK = ["OpenAI", "Anthropic", "Gemini", "Stripe"];

export function Viloi({ duration }: SceneProps) {
  const frame = useCurrentFrame();
  const W = 1080 - PAD * 2;
  const H = 440;
  const enter = progress(frame, 0, 28);
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Eyebrow
        index="05"
        style={{ position: "absolute", top: 124, left: PAD, ...rise(frame, 0, 14, 10) }}
      >
        Viloi · side project · built solo
      </Eyebrow>

      <div
        style={{
          position: "absolute",
          left: PAD,
          top: 176,
          opacity: enter,
          transform: `translateY(${(1 - enter) * 60}px)`,
        }}
      >
        <BrowserFrame url="viloi.com" label="live" width={W} height={H}>
          <ScrollShot
            src="images/screens/viloi.jpg"
            ratio={7800 / 2160}
            frameWidth={W}
            frameHeight={H - 46}
            scroll={progress(frame, 20, duration - 30, easeInOut) * 0.4}
          />
        </BrowserFrame>
      </div>

      <div
        style={{
          position: "absolute",
          top: 660,
          left: PAD - 4,
          right: PAD,
          ...display,
          fontSize: 80,
        }}
      >
        <MaskLine frame={frame} start={12}>
          AI text, rewritten
        </MaskLine>
        <MaskLine frame={frame} start={18}>
          <span style={accentItalic}>to read like a person.</span>
        </MaskLine>
      </div>

      <div
        style={{
          position: "absolute",
          top: 870,
          left: PAD,
          right: PAD,
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <Sans style={{ fontSize: 26, color: C.muted, marginRight: 10, ...rise(frame, 26, 16, 10) }}>
          Model pipeline to billing:
        </Sans>
        {STACK.map((s, i) => (
          <Pill key={s} style={rise(frame, 30 + i * 4, 14, 10)}>
            {s}
          </Pill>
        ))}
      </div>
    </div>
  );
}
