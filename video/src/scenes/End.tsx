import { interpolate, useCurrentFrame } from "remotion";
import type { SceneProps } from "../Reel";
import { C, PAD, accentItalic, display, mono, progress, rise } from "../theme";
import { Dot, MaskLine, Sans } from "../ui";

export function End({ duration }: SceneProps) {
  const frame = useCurrentFrame();
  const underline = progress(frame, 40, 24);
  const pulse = 0.5 + 0.5 * Math.sin(frame / 6);
  // The last frames fade to the empty grid the reel opens on, so the loop is seamless.
  const out = interpolate(frame, [duration - 22, duration - 10], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ position: "absolute", inset: 0, opacity: out }}>
      <div
        style={{
          position: "absolute",
          top: 190,
          left: PAD,
          display: "flex",
          alignItems: "center",
          gap: 14,
          ...mono,
          fontSize: 21,
          color: C.muted,
          ...rise(frame, 0, 16, 10),
        }}
      >
        <span style={{ position: "relative", display: "inline-flex" }}>
          <Dot color={C.ok} size={11} />
          <span
            style={{
              position: "absolute",
              inset: -7,
              borderRadius: 99,
              border: `1px solid ${C.ok}`,
              opacity: pulse * 0.6,
            }}
          />
        </span>
        Available for select work
      </div>

      <div style={{ position: "absolute", top: 260, left: PAD - 6, ...display, fontSize: 104 }}>
        <MaskLine frame={frame} start={4}>
          Let&rsquo;s build something
        </MaskLine>
        <MaskLine frame={frame} start={10}>
          people <span style={accentItalic}>rely on.</span>
        </MaskLine>
      </div>

      <div
        style={{
          position: "absolute",
          top: 600,
          left: PAD,
          right: PAD,
          borderTop: `1px solid ${C.borderStrong}`,
          paddingTop: 40,
          ...rise(frame, 24, 20, 14),
        }}
      >
        <div style={{ ...display, fontSize: 64 }}>Ubaidullah Omer</div>
        <div style={{ marginTop: 26, display: "inline-block", position: "relative" }}>
          <Sans style={{ fontSize: 40, color: C.fg }}>itsubaidullahomer.com</Sans>
          <span
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: -8,
              height: 3,
              background: C.accent,
              transformOrigin: "left",
              transform: `scaleX(${underline})`,
            }}
          />
        </div>
        <div style={{ ...mono, fontSize: 18, color: C.subtle, marginTop: 40 }}>
          Product engineer · Rahim Yar Khan, Pakistan
        </div>
      </div>
    </div>
  );
}
