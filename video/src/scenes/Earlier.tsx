import { useCurrentFrame } from "remotion";
import type { SceneProps } from "../Reel";
import { beat, cameraAt, hit, type Key } from "../beat";
import { Kicker, Overlay, Shade, Slam, T } from "../fx";
import { Camera } from "../three/Stage";
import { Panel } from "../three/Devices";
import { Scene3D } from "../three/Scene3D";
import { useCover, useTextures, type Region } from "../three/assets";
import { C, PAD, accentItalic, mono } from "../theme";

const S = "images/screens";
const PW = 2.6;
const PH = 1.7;
const ASPECT = (PW - 0.04) / (PH - 0.18);
const STEP = 3.3;

const WORK: Array<{ title: string; detail: string; src: string; region?: Region }> = [
  { title: "Jurri", detail: "Storage, inbox & vault · ~40% faster load", src: `${S}/jurri.jpg` },
  { title: "Yaksport", detail: "Training-camp bookings · 100+ clubs", src: `${S}/yaksport.jpg` },
  {
    title: "Crown Kabab",
    detail: "Restaurant ordering with Stripe · solo",
    src: `${S}/crownkabab.png`,
  },
  {
    title: "ToolkitJar",
    detail: "Free tools that run in the browser",
    src: `${S}/toolkitjar.png`,
    // Just the headline: the page itself shows a tool count, which goes stale.
    region: { x0: 0.2, y0: 0.2, x1: 1, y1: 0.72 },
  },
  { title: "Animated Landing", detail: "Heavy motion at 95+ Lighthouse", src: `${S}/enomad.png` },
];

/** The camera holds on each project, then whips to the next, on the beat. */
const KEYS: Key[] = WORK.flatMap((_, i) => {
  const at = (b: number) => beat(b);
  const x = i * STEP;
  const pos: [number, number, number] = [x + 0.25, 1.45, 6.0];
  const target: [number, number, number] = [x, 1.3, 0];
  if (i === 0)
    return [
      { at: 0, pos, target },
      { at: at(1.2), pos, target },
    ];
  const arrive = 1.2 + i * 1.6;
  return [
    { at: at(arrive), pos, target },
    { at: at(Math.min(8, arrive + 1.0)), pos: [x + 0.35, 1.45, 5.85], target },
  ];
});

function Screen({ i, textures }: { i: number; textures: ReturnType<typeof useTextures> }) {
  const w = WORK[i];
  const tex = useCover(textures?.[i] ?? null, ASPECT, w.region);
  return (
    <Panel
      screen={tex}
      w={PW}
      h={PH}
      position={[i * STEP, 1.3, 0]}
      rotation={[-0.04, i % 2 ? -0.16 : 0.16, 0]}
    />
  );
}

export function Earlier(_: SceneProps) {
  const frame = useCurrentFrame();
  const textures = useTextures(WORK.map((w) => w.src));
  const cam = cameraAt(frame, KEYS);
  const nearestAt = (f: number) =>
    Math.max(0, Math.min(WORK.length - 1, Math.round(cameraAt(f, KEYS).target[0] / STEP)));
  const nearest = nearestAt(frame);
  let since = frame;
  while (since > 0 && nearestAt(since - 1) === nearest) since--;
  const w = WORK[nearest];
  return (
    <>
      <Scene3D>
        <Camera position={cam.pos} target={cam.target} />
        {WORK.map((_, i) => (
          <Screen key={i} i={i} textures={textures} />
        ))}
      </Scene3D>
      <Shade top={0.95} bottom={0.95} />
      <Overlay>
        <div style={{ position: "absolute", top: 170, left: PAD, right: PAD }}>
          <Kicker accent="Along the way" style={{ opacity: hit(frame, 2, 8) }}>
            2022 – 2025
          </Kicker>
          <div style={{ marginTop: 48 }}>
            <Slam
              frame={frame}
              at={beat(0.25)}
              style={{ ...T.title, transformOrigin: "left center" }}
            >
              The work that
            </Slam>
            <Slam
              frame={frame}
              at={beat(0.75)}
              style={{ ...T.title, ...accentItalic, transformOrigin: "left center" }}
            >
              got me here.
            </Slam>
          </div>
        </div>
        <div style={{ position: "absolute", left: PAD, right: PAD, bottom: 160 }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 30 }}>
            {WORK.map((x, k) => (
              <span
                key={x.title}
                style={{
                  width: 54,
                  height: 5,
                  background: k === nearest ? C.accent : C.borderStrong,
                }}
              />
            ))}
          </div>
          <Slam
            key={w.title}
            frame={frame}
            at={since}
            from={1.2}
            style={{ ...T.title, fontSize: 112, transformOrigin: "left center" }}
          >
            {w.title}
          </Slam>
          <div style={{ ...mono, fontSize: 28, color: C.muted, marginTop: 22 }}>{w.detail}</div>
        </div>
      </Overlay>
    </>
  );
}
