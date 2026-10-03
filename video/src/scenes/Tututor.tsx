import { Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import type { SceneProps } from "../Reel";
import { C, PAD, accentItalic, display, mono, progress, rise } from "../theme";
import { BrowserFrame, Eyebrow, MaskLine, Phone, Sans } from "../ui";

const J = "images/tututor/journey";
const M = "images/tututor/mobile";

/** Beat lengths in frames; they add up to the chapter's 16s. */
const BEATS = { bug: 120, rebuilds: 150, products: 105, numbers: 105 };

export function Tututor(_: SceneProps) {
  let at = 0;
  const seq = (frames: number) => {
    const from = at;
    at += frames;
    return { from, durationInFrames: frames };
  };
  return (
    <>
      <Sequence {...seq(BEATS.bug)} layout="none">
        <Beat frames={BEATS.bug}>
          <Bug />
        </Beat>
      </Sequence>
      <Sequence {...seq(BEATS.rebuilds)} layout="none">
        <Beat frames={BEATS.rebuilds}>
          <Rebuilds />
        </Beat>
      </Sequence>
      <Sequence {...seq(BEATS.products)} layout="none">
        <Beat frames={BEATS.products}>
          <Products />
        </Beat>
      </Sequence>
      <Sequence {...seq(BEATS.numbers)} layout="none">
        <Numbers />
      </Sequence>
    </>
  );
}

/** Beats inside the chapter hand over with a quick fade. */
function Beat({ frames, children }: { frames: number; children: React.ReactNode }) {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [frames - 8, frames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <div style={{ position: "absolute", inset: 0, opacity: out }}>{children}</div>;
}

function Bug() {
  const frame = useCurrentFrame();
  const strike = progress(frame, 44, 16);
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Eyebrow
        index="03"
        style={{ position: "absolute", top: 124, left: PAD, ...rise(frame, 0, 16, 10) }}
      >
        Tututor.ai · Lead engineer · Nov 2023 → now
      </Eyebrow>

      <div
        style={{
          position: "absolute",
          top: 236,
          left: PAD - 4,
          right: PAD,
          ...display,
          fontSize: 132,
        }}
      >
        <MaskLine frame={frame} start={4}>
          Hired to fix
        </MaskLine>
        <MaskLine frame={frame} start={10}>
          <span style={{ position: "relative", display: "inline-block" }}>
            one bug.
            <span
              style={{
                position: "absolute",
                left: -6,
                right: -6,
                top: "52%",
                height: 8,
                background: C.accent,
                transformOrigin: "left",
                transform: `scaleX(${strike})`,
              }}
            />
          </span>
        </MaskLine>
        <div style={{ height: 64 }} />
        <MaskLine frame={frame} start={58}>
          Rebuilt it
        </MaskLine>
        <MaskLine frame={frame} start={64}>
          <span style={accentItalic}>three times.</span>
        </MaskLine>
      </div>

      <div
        style={{
          position: "absolute",
          left: PAD,
          bottom: 96,
          ...mono,
          fontSize: 19,
          color: C.subtle,
          ...rise(frame, 80, 18, 10),
        }}
      >
        Murcia, Spain · remote from Rahim Yar Khan
      </div>
    </div>
  );
}

const VERSIONS = [
  { src: `${J}/01-inherited.png`, ratio: 568 / 1176, label: "v1 · the app I inherited" },
  { src: `${J}/02-redesign.png`, ratio: 683 / 1060, label: "v2 · redesign" },
  { src: `${J}/03-react-rebuild.png`, ratio: 959 / 1912, label: "v3 · React rebuild, own backend" },
];

function Rebuilds() {
  const frame = useCurrentFrame();
  const W = 800;
  const H = 520;
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Eyebrow
        index="03"
        style={{ position: "absolute", top: 124, left: PAD, ...rise(frame, 0, 14, 10) }}
      >
        Tututor.ai · three rebuilds
      </Eyebrow>
      {VERSIONS.map((v, i) => {
        const at = 6 + i * 34;
        const t = progress(frame, at, 26);
        // Later versions land on top; earlier ones step back.
        const later = VERSIONS.slice(i + 1).reduce(
          (s, _, j) => s + progress(frame, 6 + (i + 1 + j) * 34, 26),
          0,
        );
        const x = PAD + i * 68;
        const y = 210 + i * 104;
        return (
          <div
            key={v.src}
            style={{
              position: "absolute",
              left: x,
              top: y,
              opacity: t * (1 - later * 0.28),
              transform: `translateY(${(1 - t) * 160}px) scale(${1 - later * 0.035})`,
              transformOrigin: "top left",
              filter: `brightness(${1 - later * 0.25})`,
            }}
          >
            <BrowserFrame
              url="tututor.ai"
              label={v.label}
              width={W}
              height={H}
              status={i === 2 ? C.ok : C.subtle}
            >
              <Img
                src={staticFile(v.src)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top left",
                }}
              />
            </BrowserFrame>
          </div>
        );
      })}
    </div>
  );
}

const PHONES = [`${M}/alumnos-home.jpg`, `${M}/profesores-home.jpg`, `${M}/familias-tareas.jpg`];
const PRODUCTS = [
  "Tututor.ai",
  "EduNova",
  "School admin",
  "Platform admin",
  "Familias",
  "Alumnos",
  "Profesores",
  "Core API",
];

function Products() {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", top: 120, left: PAD - 4, ...display, fontSize: 92 }}>
        <MaskLine frame={frame} start={2}>
          Eight products.
        </MaskLine>
        <MaskLine frame={frame} start={8}>
          <span style={accentItalic}>One backend.</span>
        </MaskLine>
      </div>
      <div
        style={{
          position: "absolute",
          top: 330,
          left: PAD,
          right: PAD,
          display: "flex",
          flexWrap: "wrap",
          gap: "10px 22px",
          ...mono,
          fontSize: 17,
          color: C.subtle,
        }}
      >
        {PRODUCTS.map((p, i) => (
          <span
            key={p}
            style={{
              ...rise(frame, 14 + i * 2, 12, 8),
              color: i === PRODUCTS.length - 1 ? C.accent : undefined,
            }}
          >
            {p}
          </span>
        ))}
      </div>
      {PHONES.map((src, i) => {
        const t = progress(frame, 10 + i * 8, 34);
        const w = 270;
        return (
          <div
            key={src}
            style={{
              position: "absolute",
              left: PAD + 18 + i * (w + 48),
              top: 430 + (i === 1 ? -26 : 0),
              transform: `translateY(${(1 - t) * 520}px)`,
            }}
          >
            <Phone src={src} width={w} />
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: PAD,
          right: PAD,
          bottom: 72,
          height: 220,
          background: `linear-gradient(to bottom, transparent, ${C.bg})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: PAD,
          bottom: 92,
          ...mono,
          fontSize: 19,
          color: C.muted,
          ...rise(frame, 40, 16, 10),
        }}
      >
        Parent, student & teacher apps · App Store + Google Play
      </div>
    </div>
  );
}

const NUMBERS: Array<{
  to: number;
  prefix?: string;
  suffix?: string;
  label: string;
  format?: (n: number) => string;
}> = [
  { to: 20, suffix: "k+", label: "Students, teachers & families" },
  { to: 1000, prefix: "~", label: "API endpoints", format: (n) => n.toLocaleString("en-US") },
  {
    to: 6000,
    prefix: "~",
    label: "Commits across 9 repos",
    format: (n) => n.toLocaleString("en-US"),
  },
  { to: 6, label: "Store listings" },
];

function Numbers() {
  const frame = useCurrentFrame();
  const cellW = (1080 - PAD * 2) / 2;
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Eyebrow
        index="03"
        style={{ position: "absolute", top: 124, left: PAD, ...rise(frame, 0, 14, 10) }}
      >
        Tututor.ai · today
      </Eyebrow>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: PAD,
          right: PAD,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderTop: `1px solid ${C.borderStrong}`,
        }}
      >
        {NUMBERS.map((n, i) => {
          const t = progress(frame, 4 + i * 6, 46);
          const value = Math.round(n.to * t);
          const shown = n.format ? n.format(value) : String(value);
          return (
            <div
              key={n.label}
              style={{
                width: cellW,
                height: 340,
                padding: "40px 32px 0 0",
                paddingLeft: i % 2 ? 36 : 0,
                borderLeft: i % 2 ? `1px solid ${C.borderStrong}` : undefined,
                borderBottom: `1px solid ${C.borderStrong}`,
                ...rise(frame, 2 + i * 6, 18, 14),
              }}
            >
              <div
                style={{
                  ...display,
                  fontSize: 150,
                  letterSpacing: "-0.04em",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {n.prefix && <span style={{ color: C.subtle }}>{n.prefix}</span>}
                {shown}
                {n.suffix && <span style={accentItalic}>{n.suffix}</span>}
              </div>
              <div style={{ marginTop: 26 }}>
                <Sans style={{ fontSize: 30, color: C.muted }}>{n.label}</Sans>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
