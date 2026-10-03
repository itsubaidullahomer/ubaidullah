import { interpolate, useCurrentFrame } from "remotion";
import type { SceneProps } from "../Reel";
import { beat, cameraAt, hit } from "../beat";
import { Kicker, Overlay, Shade, Slam, T } from "../fx";
import { Camera } from "../three/Stage";
import { Laptop, Panel, Phone } from "../three/Devices";
import { Scene3D } from "../three/Scene3D";
import { useCover, useTextures } from "../three/assets";
import { C, PAD, accentItalic } from "../theme";
import { Dot } from "../ui";

const SRC = [
  "images/tututor/journey/04-today.jpg",
  "images/tututor/mobile/alumnos-home.jpg",
  "images/tututor/mobile/familias-tareas.jpg",
  "images/screens/illume.jpg",
  "images/screens/viloi.jpg",
];

/** Pull back from everything, then the name and the way to reach me. */
export function End({ duration }: SceneProps) {
  const frame = useCurrentFrame();
  const t = useTextures(SRC);
  const laptop = useCover(t?.[0] ?? null, 1.6);
  const illume = useCover(t?.[3] ?? null, 1.6);
  const viloi = useCover(t?.[4] ?? null, 1.6);
  const cam = cameraAt(frame, [
    { at: 0, pos: [0, 1.6, 4.6], target: [0, 1.1, 0] },
    { at: beat(5), pos: [0, 3.4, 10.5], target: [0, 1.0, -0.8] },
    { at: beat(8), pos: [0, 3.6, 11], target: [0, 1.0, -0.8] },
  ]);
  const underline = hit(frame, beat(5.5), 12);
  const out = interpolate(frame, [duration - 16, duration - 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <>
      <Scene3D>
        <Camera position={cam.pos} target={cam.target} />
        <Laptop screen={laptop} />
        <Phone screen={t?.[1] ?? null} position={[-2.0, 0.81, 0.6]} rotation={[0, 0.5, 0]} />
        <Phone screen={t?.[2] ?? null} position={[2.0, 0.81, 0.6]} rotation={[0, -0.5, 0]} />
        <Panel
          screen={illume}
          position={[-3.1, 1.6, -2.6]}
          rotation={[0, 0.5, 0]}
          w={2.6}
          h={1.7}
        />
        <Panel screen={viloi} position={[3.1, 1.6, -2.6]} rotation={[0, -0.5, 0]} w={2.6} h={1.7} />
      </Scene3D>
      <Shade top={0.95} bottom={0.98} />
      <Overlay>
        <div style={{ position: "absolute", top: 170, left: PAD, right: PAD }}>
          <Slam frame={frame} at={beat(1)} style={{ ...T.title, transformOrigin: "left center" }}>
            Let&rsquo;s build something
          </Slam>
          <Slam frame={frame} at={beat(2)} style={{ ...T.title, transformOrigin: "left center" }}>
            people <span style={accentItalic}>rely on.</span>
          </Slam>
        </div>
        <div
          style={{
            position: "absolute",
            left: PAD,
            right: PAD,
            bottom: 170,
            opacity: hit(frame, beat(4), 10),
          }}
        >
          <Kicker style={{ color: C.fg, alignItems: "center" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 16 }}>
              <Dot color={C.ok} size={16} glow />
              Available for select work
            </span>
          </Kicker>
          <div style={{ ...T.title, fontSize: 120, marginTop: 40 }}>Ubaidullah Omer</div>
          <div style={{ position: "relative", display: "inline-block", marginTop: 28 }}>
            <span style={{ ...T.sans, fontSize: 50, color: C.fg }}>itsubaidullahomer.com</span>
            <span
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: -10,
                height: 5,
                background: C.accent,
                transformOrigin: "left",
                transform: `scaleX(${underline})`,
              }}
            />
          </div>
        </div>
      </Overlay>
      {/* Fade to the ink the film opens on, so the loop is seamless. */}
      <Overlay style={{ background: C.bg, opacity: out }}>{null}</Overlay>
    </>
  );
}
