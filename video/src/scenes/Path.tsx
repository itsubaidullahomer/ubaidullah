import { interpolate, useCurrentFrame } from "remotion";
import { reel } from "../../../content/reel";
import type { SceneProps } from "../Reel";
import { C, PAD, accentItalic, display, mono, progress, rise } from "../theme";
import { Eyebrow, MaskLine, Redaction, Sans } from "../ui";

const WORDS = ["Zero", "One", "Two", "Three", "Four", "Five"];
const nda = reel.classifiedCount;

const ROWS: Array<{ year?: string; name: string; detail: string; secret?: boolean }> = [
  { year: "2022", name: "Danzee Tech", detail: "React developer, remote for Denmark" },
  { name: "Crown Kabab", detail: "Restaurant ordering, built solo end to end" },
  { year: "2023", name: "Yaksport · Jurri", detail: "100+ sports clubs · enterprise storage" },
  { name: "Tututor.ai", detail: "Hired to fix one bug" },
  { year: "2024", name: "Insight-X", detail: "Self-building dashboards · $250k raised" },
  { year: "2026", name: "Ali Foodies", detail: "Rebuilding it for the phone" },
  {
    year: "Now",
    name: "",
    detail: `${WORDS[nda] ?? nda} project${nda === 1 ? "" : "s"} under NDA`,
    secret: true,
  },
];

const TOP = 400;
const ROW = 88;
const LINE_X = 236;

export function Path(_: SceneProps) {
  const frame = useCurrentFrame();
  const lineStart = 26;
  const perRow = 16;
  const lineEnd = lineStart + perRow * ROWS.length;
  const head = interpolate(frame, [lineStart, lineEnd], [0, (ROWS.length - 1) * ROW], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Eyebrow
        index="02"
        style={{ position: "absolute", top: 124, left: PAD, ...rise(frame, 2, 16, 10) }}
      >
        The path · 2022 → now
      </Eyebrow>

      <div style={{ position: "absolute", top: 172, left: PAD - 4, ...display, fontSize: 84 }}>
        <MaskLine frame={frame} start={6}>
          React developer to
        </MaskLine>
        <MaskLine frame={frame} start={13}>
          <span style={accentItalic}>lead engineer.</span>
        </MaskLine>
      </div>

      {/* The rail: draws down while each stop arrives. */}
      <div
        style={{
          position: "absolute",
          left: LINE_X,
          top: TOP + ROW / 2 - 18,
          width: 2,
          marginLeft: -0.5,
          height: head,
          background: C.subtle,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: LINE_X - 5,
          top: TOP + ROW / 2 - 18 + head - 5,
          width: 11,
          height: 11,
          borderRadius: 99,
          background: C.accent,
          boxShadow: `0 0 0 8px ${C.accent}22`,
          opacity: frame < lineEnd + 30 ? 1 : 0,
        }}
      />

      {ROWS.map((r, i) => {
        const at = lineStart + i * perRow;
        const last = i === ROWS.length - 1;
        const dot = progress(frame, at, 10);
        return (
          <div
            key={r.name + i}
            style={{ position: "absolute", top: TOP + i * ROW, left: PAD, right: PAD, height: ROW }}
          >
            {r.year && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  ...display,
                  fontSize: 46,
                  color: last ? C.accent : C.fg,
                  ...(last
                    ? { fontStyle: "italic", fontVariationSettings: '"SOFT" 80, "WONK" 1' }
                    : null),
                  ...rise(frame, at, 16, 12),
                }}
              >
                {r.year}
              </div>
            )}
            <div
              style={{
                position: "absolute",
                left: LINE_X - PAD - 6,
                top: ROW / 2 - 24,
                width: 13,
                height: 13,
                borderRadius: 99,
                background: last ? C.accent : C.bg,
                border: `2px solid ${last ? C.accent : C.muted}`,
                transform: `scale(${dot})`,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: LINE_X - PAD + 44,
                top: 0,
                right: 0,
                ...rise(frame, at + 2, 16, 12),
              }}
            >
              <div
                style={{
                  fontSize: 34,
                  color: C.fg,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {r.secret ? (
                  <Redaction frame={frame} start={at + 6} width={300} height={28} />
                ) : (
                  <Sans style={{ fontWeight: 500 }}>{r.name}</Sans>
                )}
              </div>
              <div
                style={{ ...mono, fontSize: 18, color: last ? C.accent : C.subtle, marginTop: 8 }}
              >
                {r.detail}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
