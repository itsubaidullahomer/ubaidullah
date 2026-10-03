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

/** A phone screenshot of a whole page, as an image for the canvas. */
function usePage(src: string) {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [handle] = useState(() => delayRender(`page ${src}`));
  useEffect(() => {
    const i = new Image();
    i.onload = () => {
      setImg(i);
      continueRender(handle);
    };
    i.onerror = (e) => cancelRender(e);
    i.src = staticFile(src);
  }, [src, handle]);
  return img;
}

/** Draws a window of a tall page onto the canvas, `scroll` 0 → 1 top to bottom. */
function drawPage(g: CanvasRenderingContext2D, page: HTMLImageElement, scroll: number) {
  const W = g.canvas.width;
  const H = g.canvas.height;
  const srcH = (H * page.width) / W;
  g.drawImage(page, 0, scroll * (page.height - srcH), page.width, srcH, 0, 0, W, H);
}

/**
 * The phone's screen: the old site scrolling, then an orange scan line that
 * rebuilds it, top to bottom, into the new one (both are the owner's phone
 * screenshots, stitched into a page each).
 */
function useScreen(
  before: HTMLImageElement | null,
  after: HTMLImageElement | null,
  beforeScroll: number,
  wipe: number,
  afterScroll: number,
) {
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
  if (before && wipe < 1) drawPage(g, before, beforeScroll);
  const edge = wipe * H;
  if (after && edge > 0) {
    g.save();
    g.beginPath();
    g.rect(0, 0, W, edge);
    g.clip();
    drawPage(g, after, afterScroll);
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

/** Keeps the closing line readable over the new site's light screens. */
const SHADOW = "0 4px 28px rgba(7,8,12,0.95), 0 0 2px rgba(7,8,12,0.8)";

export function AliFoodies(_: SceneProps) {
  const frame = useCurrentFrame();
  const wipe = progress(frame, beat(3.5), beat(1), easeInOut);
  const screen = useScreen(
    usePage("images/ali-foodies/compare/before-home.jpg"),
    usePage("images/ali-foodies/compare/after-home.jpg"),
    progress(frame, beat(0.5), beat(3), easeInOut) * 0.55,
    wipe,
    progress(frame, beat(4.6), beat(3.4), easeInOut) * 0.5,
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
          {wipe < 0.5 ? "Before · alifoodies.com" : "After · alifoodiess.vercel.app"}
        </div>
        <div style={{ position: "absolute", left: PAD, right: PAD, bottom: 170 }}>
          <Slam
            frame={frame}
            at={beat(4)}
            style={{ ...T.title, transformOrigin: "left center", textShadow: SHADOW }}
          >
            So I&rsquo;m rebuilding it
          </Slam>
          <Slam
            frame={frame}
            at={beat(5)}
            style={{
              ...T.title,
              ...accentItalic,
              transformOrigin: "left center",
              textShadow: SHADOW,
            }}
          >
            phone first.
          </Slam>
        </div>
      </Overlay>
    </>
  );
}
