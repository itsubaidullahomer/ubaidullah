import { Sequence, interpolate, useCurrentFrame } from "remotion";
import type { SceneProps } from "../Reel";
import { BAR, beat, cameraAt, hit } from "../beat";
import { Flash, Kicker, Overlay, Shade, Slam, T } from "../fx";
import { Camera } from "../three/Stage";
import { Laptop, Phone } from "../three/Devices";
import { Scene3D } from "../three/Scene3D";
import { useCover, useTexture, useTextures } from "../three/assets";
import { C, PAD, accentItalic, mono } from "../theme";

const J = "images/tututor/journey";
const M = "images/tututor/mobile";
const SCREEN = 1.6; // laptop display aspect

/** Four shots, two bars each: the swoop, the rebuilds, the apps, the numbers. */
export function Tututor(_: SceneProps) {
  const part = BAR * 2;
  return (
    <>
      <Sequence durationInFrames={part} layout="none">
        <Swoop />
      </Sequence>
      <Sequence from={part} durationInFrames={part} layout="none">
        <Rebuilds />
      </Sequence>
      <Sequence from={part * 2} durationInFrames={part} layout="none">
        <Phones />
      </Sequence>
      <Sequence from={part * 3} durationInFrames={part} layout="none">
        <Numbers />
      </Sequence>
    </>
  );
}

function Swoop() {
  const frame = useCurrentFrame();
  const today = useCover(useTexture(`${J}/04-today.jpg`), SCREEN);
  const open = interpolate(frame, [0, beat(3)], [0.04, 1], { extrapolateRight: "clamp" });
  const cam = cameraAt(frame, [
    { at: 0, pos: [6, 7, 8.5], target: [0, 0.5, 0] },
    { at: beat(5), pos: [2.3, 1.7, 5.0], target: [0, 0.95, 0] },
    { at: beat(8), pos: [1.9, 1.55, 4.6], target: [0, 1.0, 0] },
  ]);
  const strike = hit(frame, beat(6), 8);
  return (
    <>
      <Scene3D>
        <Camera position={cam.pos} target={cam.target} />
        <Laptop screen={today} open={open} />
      </Scene3D>
      <Shade top={0.95} bottom={0.9} />
      <Overlay>
        <div style={{ position: "absolute", top: 170, left: PAD, right: PAD }}>
          <Kicker accent="Tututor.ai" style={{ opacity: hit(frame, beat(1), 8) }}>
            Lead engineer · 2023 → now
          </Kicker>
          <div style={{ marginTop: 48 }}>
            <Slam frame={frame} at={beat(3)} style={{ ...T.title, transformOrigin: "left center" }}>
              Hired to fix
            </Slam>
            <Slam frame={frame} at={beat(4)} style={{ ...T.title, transformOrigin: "left center" }}>
              <span style={{ position: "relative", display: "inline-block" }}>
                one bug.
                <span
                  style={{
                    position: "absolute",
                    left: -8,
                    right: -8,
                    top: "54%",
                    height: 10,
                    background: C.accent,
                    transformOrigin: "left",
                    transform: `scaleX(${strike})`,
                  }}
                />
              </span>
            </Slam>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: PAD,
            bottom: 170,
            ...mono,
            fontSize: 28,
            color: C.muted,
            opacity: hit(frame, beat(5), 10),
          }}
        >
          An AI toolkit for teachers · Murcia, Spain
        </div>
      </Overlay>
    </>
  );
}

const VERSIONS = [
  { src: `${J}/01-inherited.png`, at: 0, big: "v1", label: "The app I inherited" },
  { src: `${J}/02-redesign.png`, at: 2, big: "v2", label: "My brother's redesign" },
  { src: `${J}/03-react-rebuild.png`, at: 3, big: "v2", label: "Built in React" },
  { src: `${J}/04-today.jpg`, at: 5, big: "v3", label: "Today, app.tututor.ai" },
];

function Rebuilds() {
  const frame = useCurrentFrame();
  const raw = useTextures(VERSIONS.map((v) => v.src));
  const t0 = useCover(raw?.[0] ?? null, SCREEN);
  const t1 = useCover(raw?.[1] ?? null, SCREEN);
  const t2 = useCover(raw?.[2] ?? null, SCREEN);
  const t3 = useCover(raw?.[3] ?? null, SCREEN);
  const tex = [t0, t1, t2, t3];
  const idx = VERSIONS.reduce((n, v, i) => (frame >= beat(v.at) ? i : n), 0);
  const fade = idx > 0 ? hit(frame, beat(VERSIONS[idx].at), 6) : 1;
  const cam = cameraAt(frame, [
    { at: 0, pos: [0, 1.7, 5.8], target: [0, 1.08, 0] },
    { at: beat(8), pos: [0.35, 1.55, 4.9], target: [0, 1.1, 0] },
  ]);
  const v = VERSIONS[idx];
  return (
    <>
      <Scene3D>
        <Camera position={cam.pos} target={cam.target} />
        <Laptop
          screen={idx > 0 ? tex[idx - 1] : tex[0]}
          overlay={tex[idx]}
          overlayOpacity={idx > 0 ? fade : 0}
        />
      </Scene3D>
      <Shade top={0.95} bottom={0.95} />
      {VERSIONS.slice(1).map((x) => (
        <Flash key={x.src} frame={frame} at={beat(x.at)} strength={0.35} />
      ))}
      <Overlay>
        <div style={{ position: "absolute", top: 170, left: PAD, right: PAD }}>
          <Slam frame={frame} at={0} style={{ ...T.title, transformOrigin: "left center" }}>
            Rebuilt it
          </Slam>
          <Slam
            frame={frame}
            at={beat(1)}
            style={{ ...T.title, ...accentItalic, transformOrigin: "left center" }}
          >
            three times.
          </Slam>
        </div>
        <div
          style={{
            position: "absolute",
            left: PAD,
            right: PAD,
            bottom: 150,
            display: "flex",
            alignItems: "baseline",
            gap: 32,
          }}
        >
          <Slam
            key={v.big}
            frame={frame}
            at={beat(v.at)}
            from={1.6}
            style={{ ...T.hero, fontSize: 200, transformOrigin: "left bottom" }}
          >
            {v.big}
          </Slam>
          <div style={{ ...mono, fontSize: 30, color: C.muted, lineHeight: 1.4 }}>{v.label}</div>
        </div>
      </Overlay>
    </>
  );
}

const SWAP = beat(4);
const APPS: Array<{
  a: string;
  b: string;
  pos: [number, number, number];
  rot: number;
  delay: number;
}> = [
  {
    a: `${M}/profesores-home.jpg`,
    b: `${M}/profesores-horario.jpg`,
    pos: [-1.0, 1.25, -0.35],
    rot: 0.42,
    delay: 0.5,
  },
  {
    a: `${M}/alumnos-home.jpg`,
    b: `${M}/alumnos-notas.jpg`,
    pos: [0, 1.32, 0.35],
    rot: 0,
    delay: 0,
  },
  {
    a: `${M}/familias-tareas.jpg`,
    b: `${M}/familias-mensajes.jpg`,
    pos: [1.0, 1.25, -0.35],
    rot: -0.42,
    delay: 1,
  },
];

function Phones() {
  const frame = useCurrentFrame();
  const tex = useTextures(APPS.flatMap((p) => [p.a, p.b]));
  const cam = cameraAt(frame, [
    { at: 0, pos: [0, 1.2, 5.9], target: [0, 1.3, 0] },
    { at: beat(8), pos: [-0.35, 1.45, 5.2], target: [0, 1.28, 0] },
  ]);
  return (
    <>
      <Scene3D>
        <Camera position={cam.pos} target={cam.target} />
        {APPS.map((p, i) => {
          const t = hit(frame, beat(p.delay), 22);
          const spin = (1 - t) * (i === 1 ? 0.9 : p.rot > 0 ? 1.4 : -1.4);
          return (
            <Phone
              key={p.a}
              screen={tex ? tex[i * 2 + (frame >= SWAP ? 1 : 0)] : null}
              position={[p.pos[0], p.pos[1] - (1 - t) * 3.2, p.pos[2]]}
              rotation={[0.04, p.rot + spin, 0]}
            />
          );
        })}
      </Scene3D>
      <Shade top={0.95} bottom={0.9} />
      <Flash frame={frame} at={SWAP} strength={0.3} />
      <Overlay>
        <div style={{ position: "absolute", top: 170, left: PAD, right: PAD }}>
          <Slam frame={frame} at={beat(1)} style={{ ...T.title, transformOrigin: "left center" }}>
            Eight products.
          </Slam>
          <Slam
            frame={frame}
            at={beat(2)}
            style={{ ...T.title, ...accentItalic, transformOrigin: "left center" }}
          >
            One backend.
          </Slam>
        </div>
        <div
          style={{
            position: "absolute",
            left: PAD,
            right: PAD,
            bottom: 160,
            opacity: hit(frame, beat(3), 10),
          }}
        >
          <div style={{ ...mono, fontSize: 30, color: C.fg }}>Familias · Alumnos · Profesores</div>
          <div style={{ ...mono, fontSize: 26, color: C.muted, marginTop: 16 }}>
            App Store · Google Play · web · API
          </div>
        </div>
      </Overlay>
    </>
  );
}

const NUMBERS = [
  { value: "20k+", label: "Students, teachers & families" },
  { value: "~1,000", label: "API endpoints" },
  { value: "~6,000", label: "Commits across 9 repos" },
  { value: "6", label: "Store listings" },
];

function Numbers() {
  const frame = useCurrentFrame();
  const i = Math.min(NUMBERS.length - 1, Math.floor(frame / beat(2)));
  const n = NUMBERS[i];
  const at = beat(i * 2);
  return (
    <Overlay
      style={{
        background: C.bg,
        backgroundImage: `linear-gradient(to right, ${C.grid} 1px, transparent 1px), linear-gradient(to bottom, ${C.grid} 1px, transparent 1px)`,
        backgroundSize: "90px 90px",
      }}
    >
      <Flash frame={frame} at={at} strength={0.25} color={C.accent} />
      <div style={{ position: "absolute", top: 170, left: PAD, right: PAD }}>
        <Kicker accent="Tututor.ai">Today</Kicker>
      </div>
      <div style={{ position: "absolute", left: PAD - 10, right: PAD, top: 640 }}>
        <Slam
          key={n.value}
          frame={frame}
          at={at}
          from={1.5}
          style={{
            ...T.hero,
            // "~6,000" has to fit the frame width; "6" can fill it.
            fontSize: n.value.length >= 6 ? 230 : n.value.length > 4 ? 290 : 400,
            letterSpacing: "-0.05em",
            transformOrigin: "left center",
          }}
        >
          {n.value.replace(/[k+]+$/, "")}
          {/[k+]+$/.test(n.value) && (
            <span style={accentItalic}>{n.value.match(/[k+]+$/)?.[0]}</span>
          )}
        </Slam>
        <div
          key={n.label}
          style={{
            ...T.sans,
            fontSize: 52,
            color: C.muted,
            marginTop: 40,
            opacity: hit(frame, at + 3, 8),
          }}
        >
          {n.label}
        </div>
      </div>
      {/* Progress ticks: which of the four numbers this is. */}
      <div style={{ position: "absolute", left: PAD, bottom: 170, display: "flex", gap: 14 }}>
        {NUMBERS.map((x, k) => (
          <span
            key={x.value}
            style={{ width: 70, height: 6, background: k <= i ? C.accent : C.borderStrong }}
          />
        ))}
      </div>
    </Overlay>
  );
}
