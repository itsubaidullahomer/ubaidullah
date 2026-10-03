import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import type { SceneProps } from "../Reel";
import { beat, hit } from "../beat";
import { Kicker, Overlay, Slam, T } from "../fx";
import { C, PAD, accentItalic, mono, progress } from "../theme";
import { TypeOn } from "../ui";

/** Cold open: a black-and-white portrait, the name landing on the beat. */
export function Hello(_: SceneProps) {
  const frame = useCurrentFrame();
  const appear = progress(frame, 4, 36);
  const push = interpolate(frame, [0, beat(8)], [1.12, 1.0]);
  const sweep = hit(frame, beat(6.5), 12);
  return (
    <Overlay>
      {/* Portrait, black and white, fading into the ink at its edges. */}
      <Img
        src={staticFile("portrait.png")}
        style={{
          position: "absolute",
          left: 0,
          top: 120,
          width: 1080,
          height: 1170,
          objectFit: "cover",
          objectPosition: "50% 22%",
          opacity: appear * 0.92,
          transform: `scale(${push})`,
          filter: "grayscale(1) contrast(1.18) brightness(0.82)",
          WebkitMaskImage: "radial-gradient(ellipse 62% 58% at 50% 42%, #000 45%, transparent 78%)",
          maskImage: "radial-gradient(ellipse 62% 58% at 50% 42%, #000 45%, transparent 78%)",
        }}
      />

      <div style={{ position: "absolute", top: 150, left: PAD, right: PAD }}>
        <TypeOn
          frame={frame}
          start={2}
          text="> hello, I'm"
          cps={0.9}
          style={{
            ...mono,
            fontSize: 34,
            color: C.muted,
            textTransform: "none",
            letterSpacing: "0.04em",
          }}
        />
      </div>

      <div style={{ position: "absolute", left: PAD - 10, right: PAD, top: 1080 }}>
        <Slam
          frame={frame}
          at={beat(2)}
          style={{ ...T.hero, fontSize: 196, transformOrigin: "left center" }}
        >
          Ubaidullah
        </Slam>
        <Slam
          frame={frame}
          at={beat(3)}
          style={{ ...T.hero, fontSize: 196, transformOrigin: "left center" }}
        >
          Omer<span style={{ ...accentItalic }}>.</span>
        </Slam>
      </div>

      <div
        style={{
          position: "absolute",
          left: PAD,
          right: PAD,
          top: 1520,
          opacity: hit(frame, beat(4), 10),
          transform: `translateY(${(1 - hit(frame, beat(4), 10)) * 20}px)`,
        }}
      >
        <Kicker accent="●" style={{ fontSize: 30, color: C.fg }}>
          Product engineer
        </Kicker>
        <div style={{ ...mono, fontSize: 30, color: C.muted, marginTop: 18 }}>
          Rahim Yar Khan, Pakistan
        </div>
        <div style={{ ...T.sans, fontSize: 44, color: C.muted, marginTop: 56 }}>
          I build AI products people{" "}
          <span style={{ ...T.title, fontSize: 54, ...accentItalic }}>rely on.</span>
        </div>
      </div>

      {/* An orange line sweeps across into the next shot. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 1490,
          height: 4,
          width: `${sweep * 100}%`,
          background: C.accent,
          opacity: sweep > 0 ? 1 : 0,
        }}
      />
    </Overlay>
  );
}
