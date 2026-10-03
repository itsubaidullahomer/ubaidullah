import type { ReactNode } from "react";
import { useCurrentFrame } from "remotion";
import { beat, cameraAt, hit, type Key } from "../beat";
import { Kicker, Overlay, Shade, Slam, T } from "../fx";
import { Camera } from "../three/Stage";
import { Panel } from "../three/Devices";
import { Scene3D } from "../three/Scene3D";
import { useTexture, useWindowed } from "../three/assets";
import { C, PAD, accentItalic, easeInOut, progress } from "../theme";

const PW = 3.3;
const PH = 2.15;
// The screenshot area inside the panel (minus the title bar).
const SCREEN_ASPECT = (PW - 0.04) / (PH - 0.14 - 0.04);

/**
 * A live site on a floating browser panel: the camera drifts past while the
 * page scrolls. Used for Illume and Viloi.
 */
export function Showcase({
  src,
  ratio,
  scrollTo,
  tilt,
  keys,
  kicker,
  accent,
  line1,
  line2,
  bottom,
}: {
  src: string;
  /** Image height / width. */
  ratio: number;
  scrollTo: number;
  tilt: number;
  keys: Key[];
  kicker: string;
  accent: string;
  line1: string;
  line2: string;
  bottom: (frame: number) => ReactNode;
}) {
  const frame = useCurrentFrame();
  const visible = 1 / SCREEN_ASPECT / ratio;
  const scroll = progress(frame, beat(1), beat(7), easeInOut) * scrollTo;
  const screen = useWindowed(useTexture(src), visible, scroll);
  const cam = cameraAt(frame, keys);
  const lift = hit(frame, 0, 26);
  return (
    <>
      <Scene3D>
        <Camera position={cam.pos} target={cam.target} />
        <Panel
          screen={screen}
          w={PW}
          h={PH}
          position={[0, 1.3 - (1 - lift) * 0.8, 0]}
          rotation={[-0.06, tilt, 0]}
        />
      </Scene3D>
      <Shade top={0.95} bottom={0.95} />
      <Overlay>
        <div style={{ position: "absolute", top: 170, left: PAD, right: PAD }}>
          <Kicker accent={accent} style={{ opacity: hit(frame, 2, 8) }}>
            {kicker}
          </Kicker>
          <div style={{ marginTop: 48 }}>
            <Slam frame={frame} at={beat(1)} style={{ ...T.title, transformOrigin: "left center" }}>
              {line1}
            </Slam>
            <Slam
              frame={frame}
              at={beat(2)}
              style={{ ...T.title, ...accentItalic, transformOrigin: "left center" }}
            >
              {line2}
            </Slam>
          </div>
        </div>
        <div style={{ position: "absolute", left: PAD, right: PAD, bottom: 160 }}>
          {bottom(frame)}
        </div>
      </Overlay>
    </>
  );
}

export const statLine = (frame: number, at: number, value: string, label: string) => (
  <div style={{ display: "flex", alignItems: "baseline", gap: 28 }}>
    <Slam
      frame={frame}
      at={at}
      from={1.5}
      style={{ ...T.hero, fontSize: 190, transformOrigin: "left bottom" }}
    >
      {value}
    </Slam>
    <div
      style={{
        ...T.sans,
        fontSize: 38,
        color: C.muted,
        opacity: hit(frame, at + 4, 8),
        lineHeight: 1.25,
      }}
    >
      {label}
    </div>
  </div>
);
