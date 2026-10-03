import { Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import type { SceneProps } from "../Reel";
import { C, PAD, accentItalic, display, easeInOut, mono, progress, rise } from "../theme";
import { BrowserFrame, Eyebrow, MaskLine, Phone, Sans } from "../ui";

const J = "images/tututor/journey";
const M = "images/tututor/mobile";

/** Beat lengths in frames; they add up to the chapter's 16s. */
const BEATS = { bug: 110, rebuilds: 170, products: 100, numbers: 100 };

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

/**
 * v2 is one build shown twice: my brother's design, then the React build of
 * it, wiped across inside the same frame.
 */
const VERSIONS: Array<{ srcs: string[]; label: string; url: string; at: number }> = [
  { srcs: [`${J}/01-inherited.png`], label: "v1 · the app I inherited", url: "tututor.ai", at: 6 },
  {
    srcs: [`${J}/02-redesign.png`, `${J}/03-react-rebuild.png`],
    label: "v2 · redesign, built in React",
    url: "tututor.ai",
    at: 34,
  },
  { srcs: [`${J}/04-today.jpg`], label: "v3 · today", url: "app.tututor.ai", at: 100 },
];
/** When v2 wipes from the design to the build. */
const WIPE = { at: 62, frames: 22 };

function Shot({ src, clip }: { src: string; clip?: number }) {
  return (
    <Img
      src={staticFile(src)}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "top left",
        clipPath: clip === undefined ? undefined : `inset(0 ${(1 - clip) * 100}% 0 0)`,
      }}
    />
  );
}

function Rebuilds() {
  const frame = useCurrentFrame();
  const W = 800;
  const H = 520;
  const wipe = progress(frame, WIPE.at, WIPE.frames, easeInOut);
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Eyebrow
        index="03"
        style={{ position: "absolute", top: 124, left: PAD, ...rise(frame, 0, 14, 10) }}
      >
        Tututor.ai · three rebuilds
      </Eyebrow>
      {VERSIONS.map((v, i) => {
        const t = progress(frame, v.at, 26);
        // Later versions land on top; earlier ones step back.
        const later = VERSIONS.slice(i + 1).reduce((sum, n) => sum + progress(frame, n.at, 26), 0);
        const last = i === VERSIONS.length - 1;
        return (
          <div
            key={v.label}
            style={{
              position: "absolute",
              left: PAD + i * 68,
              top: 210 + i * 104,
              opacity: t * (1 - later * 0.28),
              transform: `translateY(${(1 - t) * 160}px) scale(${1 - later * 0.035})`,
              transformOrigin: "top left",
              filter: `brightness(${1 - later * 0.25})`,
            }}
          >
            <BrowserFrame
              url={v.url}
              label={v.label}
              width={W}
              height={H}
              status={last ? C.ok : C.subtle}
            >
              <Shot src={v.srcs[0]} />
              {v.srcs[1] && (
                <>
                  <Shot src={v.srcs[1]} clip={wipe} />
                  {/* The wipe's leading edge, in the accent. */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: `${wipe * 100}%`,
                      width: 3,
                      marginLeft: -1.5,
                      background: C.accent,
                      opacity: wipe > 0 && wipe < 1 ? 1 : 0,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: 16,
                      bottom: 16,
                      ...mono,
                      fontSize: 15,
                      color: C.fg,
                      background: "rgba(7, 8, 12, 0.82)",
                      border: `1px solid ${C.borderStrong}`,
                      borderRadius: 6,
                      padding: "7px 12px",
                    }}
                  >
                    {wipe < 0.5 ? "The design" : "The build"}
                  </div>
                </>
              )}
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
