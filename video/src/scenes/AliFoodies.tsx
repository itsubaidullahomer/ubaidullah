import { useEffect, useMemo, useState } from "react";
import {
  cancelRender,
  continueRender,
  delayRender,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import * as THREE from "three";
import type { SceneProps } from "../Reel";
import { beat, cameraAt, hit } from "../beat";
import { Kicker, Overlay, Shade, Slam, T } from "../fx";
import { Camera } from "../three/Stage";
import { Phone } from "../three/Devices";
import { Scene3D } from "../three/Scene3D";
import { C, PAD, accentItalic, display, easeInOut, mono, progress } from "../theme";
import { Dot } from "../ui";

/** The phone layout drawing itself in, block by block. */
const BLOCKS: Array<{ y: number; h: number; w?: number; accent?: boolean; img?: boolean }> = [
  { y: 0.06, h: 0.035, w: 0.42 },
  { y: 0.12, h: 0.26, img: true },
  { y: 0.41, h: 0.035, w: 0.7 },
  { y: 0.46, h: 0.025, w: 0.5 },
  { y: 0.52, h: 0.12, accent: true },
  { y: 0.66, h: 0.12 },
  { y: 0.8, h: 0.12 },
  { y: 0.935, h: 0.04, w: 0.6 },
];

/** The old site's home page (stitched from the owner's phone screenshots). */
function useOldPage() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [handle] = useState(() => delayRender("old Ali Foodies page"));
  useEffect(() => {
    const i = new Image();
    i.onload = () => {
      setImg(i);
      continueRender(handle);
    };
    i.onerror = (e) => cancelRender(e);
    i.src = staticFile("images/ali-foodies/compare/before-home.jpg");
  }, [handle]);
  return img;
}

/**
 * The phone's screen: the old site scrolling, then an orange scan line that
 * rebuilds it, top to bottom, as the new layout drawing itself in.
 */
function useScreen(old: HTMLImageElement | null, scroll: number, wipe: number, build: number) {
  const { canvas, texture } = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 540;
    c.height = 1170;
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return { canvas: c, texture: tex };
  }, []);
  const g = canvas.getContext("2d")!;
  const W = canvas.width;
  const H = canvas.height;

  if (old && wipe < 1) {
    const srcH = (H * old.width) / W;
    const srcY = scroll * (old.height - srcH);
    g.drawImage(old, 0, srcY, old.width, srcH, 0, 0, W, H);
  }

  const edge = wipe * H;
  if (edge > 0) {
    g.save();
    g.beginPath();
    g.rect(0, 0, W, edge);
    g.clip();
    g.fillStyle = "#0c0d13";
    g.fillRect(0, 0, W, H);
    const pad = 40;
    BLOCKS.forEach((b, i) => {
      const p = Math.max(0, Math.min(1, build * BLOCKS.length - i));
      if (p <= 0) return;
      g.fillStyle = b.accent
        ? "rgba(255,196,77,0.14)"
        : b.img
          ? "rgba(242,241,236,0.08)"
          : "rgba(242,241,236,0.06)";
      g.strokeStyle = b.accent ? "#ffc44d" : "rgba(242,241,236,0.28)";
      g.lineWidth = 3;
      g.beginPath();
      g.roundRect(pad, b.y * H, (W - pad * 2) * (b.w ?? 1) * p, b.h * H, 18);
      g.fill();
      g.stroke();
    });
    g.restore();
  }
  if (wipe > 0 && wipe < 1) {
    g.fillStyle = "rgba(255,77,28,0.35)";
    g.fillRect(0, edge - 14, W, 28);
    g.fillStyle = "#ff4d1c";
    g.fillRect(0, edge - 3, W, 6);
  }
  texture.needsUpdate = true;
  return texture;
}

export function AliFoodies(_: SceneProps) {
  const frame = useCurrentFrame();
  const wipe = progress(frame, beat(3.5), beat(1), easeInOut);
  const screen = useScreen(
    useOldPage(),
    progress(frame, beat(0.5), beat(3), easeInOut) * 0.55,
    wipe,
    progress(frame, beat(3.8), beat(2.8)),
  );
  const count = progress(frame, 2, beat(3)) * 99.9;
  const cam = cameraAt(frame, [
    { at: 0, pos: [0.6, 1.45, 3.7], target: [0, 1.32, 0] },
    { at: beat(8), pos: [-0.3, 1.4, 3.5], target: [0, 1.32, 0] },
  ]);
  const spin = interpolate(frame, [0, beat(8)], [-0.75, 0.3]);
  const rise = hit(frame, 0, 24);
  return (
    <>
      <Scene3D>
        <Camera position={cam.pos} target={cam.target} />
        <Phone
          screen={screen}
          position={[0, 0.95 - (1 - rise) * 2.5, 0]}
          rotation={[0.05, spin, 0]}
          scale={1.05}
        />
      </Scene3D>
      <Shade top={0.95} bottom={0.95} />
      <Overlay>
        <div style={{ position: "absolute", top: 170, left: PAD, right: PAD }}>
          <Kicker accent="Ali Foodies" style={{ opacity: hit(frame, 2, 8) }}>
            Rebuild in progress
          </Kicker>
          <div
            style={{
              ...display,
              fontSize: 250,
              letterSpacing: "-0.05em",
              marginTop: 30,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {count.toFixed(1)}
            <span style={accentItalic}>%</span>
          </div>
          <div
            style={{
              ...T.sans,
              fontSize: 40,
              color: C.muted,
              marginTop: 10,
              opacity: hit(frame, beat(2), 8),
            }}
          >
            of its customers open it on a phone.
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: PAD,
            top: 585,
            display: "flex",
            alignItems: "center",
            gap: 14,
            ...mono,
            fontSize: 26,
            color: C.muted,
            opacity: hit(frame, beat(0.5), 8),
          }}
        >
          <Dot color={wipe < 0.5 ? C.subtle : C.warn} size={12} />
          {wipe < 0.5 ? "Before · alifoodies.com" : "After · being rebuilt"}
        </div>
        <div style={{ position: "absolute", left: PAD, right: PAD, bottom: 170 }}>
          <Slam frame={frame} at={beat(4)} style={{ ...T.title, transformOrigin: "left center" }}>
            So I&rsquo;m rebuilding it
          </Slam>
          <Slam
            frame={frame}
            at={beat(5)}
            style={{ ...T.title, ...accentItalic, transformOrigin: "left center" }}
          >
            phone first.
          </Slam>
        </div>
      </Overlay>
    </>
  );
}
