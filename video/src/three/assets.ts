import { useEffect, useMemo, useState } from "react";
import { cancelRender, continueRender, delayRender, staticFile } from "remotion";
import * as THREE from "three";

const cache = new Map<string, Promise<THREE.Texture>>();

function load(src: string) {
  let p = cache.get(src);
  if (!p) {
    p = new Promise<THREE.Texture>((resolve, reject) => {
      new THREE.TextureLoader().load(
        src.startsWith("http") || src.startsWith("data:") || src.startsWith("/")
          ? src
          : staticFile(src),
        (t) => {
          t.colorSpace = THREE.SRGBColorSpace;
          t.anisotropy = 8;
          t.generateMipmaps = true;
          t.minFilter = THREE.LinearMipmapLinearFilter;
          resolve(t);
        },
        undefined,
        reject,
      );
    });
    cache.set(src, p);
  }
  return p;
}

/**
 * Loads an image from public/ as a texture and holds the render until it's
 * ready, so no frame is ever drawn with a blank screen.
 */
export function useTexture(src: string) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [handle] = useState(() => delayRender(`texture ${src}`));
  useEffect(() => {
    load(src)
      .then((t) => {
        setTexture(t);
        continueRender(handle);
      })
      .catch((e) => cancelRender(e));
  }, [src, handle]);
  return texture;
}

/** Loads several textures at once. */
export function useTextures(srcs: string[]) {
  const key = srcs.join("|");
  const [textures, setTextures] = useState<THREE.Texture[] | null>(null);
  const [handle] = useState(() => delayRender(`textures ${key}`));
  useEffect(() => {
    Promise.all(srcs.map(load))
      .then((t) => {
        setTextures(t);
        continueRender(handle);
      })
      .catch((e) => cancelRender(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, handle]);
  return textures;
}

/** A rounded rectangle with UVs spanning 0..1, for screens with rounded corners. */
export function roundedRect(w: number, h: number, r: number, segments = 10) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  const g = new THREE.ShapeGeometry(s, segments);
  const pos = g.attributes.position;
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    uv[i * 2] = (pos.getX(i) - x) / w;
    uv[i * 2 + 1] = (pos.getY(i) - y) / h;
  }
  g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  return g;
}

/**
 * A per-mesh copy of a texture that shows a window of a tall screenshot:
 * `visible` is the share of its height on screen, `scroll` runs 0 → 1 from
 * the top to the bottom. The copy is made once; only its offset changes.
 */
export function useWindowed(base: THREE.Texture | null, visible: number, scroll: number) {
  const tex = useMemo(() => {
    if (!base) return null;
    const t = base.clone();
    t.needsUpdate = true;
    return t;
  }, [base]);
  if (tex) {
    const v = Math.min(1, visible);
    tex.repeat.set(1, v);
    tex.offset.set(0, (1 - v) * (1 - scroll));
  }
  return tex;
}

/** A part of an image, in 0..1 from its top left. */
export type Region = { x0: number; y0: number; x1: number; y1: number };

/**
 * A per-mesh copy of a texture cropped to cover a screen of `aspect`
 * (width / height), anchored to the top left like a real page. `region`
 * limits it to part of the image first.
 */
export function useCover(
  base: THREE.Texture | null,
  aspect: number,
  region: Region = { x0: 0, y0: 0, x1: 1, y1: 1 },
) {
  const { x0, y0, x1, y1 } = region;
  return useMemo(() => {
    if (!base) return null;
    const t = base.clone();
    t.needsUpdate = true;
    const img = base.image as { width: number; height: number };
    const imgAspect = img.width / img.height;
    const rw = x1 - x0;
    const rh = y1 - y0;
    const regionAspect = (imgAspect * rw) / rh;
    if (regionAspect > aspect) {
      // Wider than the screen: full height, crop the right.
      const w = (rh * aspect) / imgAspect;
      t.repeat.set(w, rh);
      t.offset.set(x0, 1 - y1);
    } else {
      // Taller: full width, crop the bottom.
      const h = (rw * imgAspect) / aspect;
      t.repeat.set(rw, h);
      t.offset.set(x0, 1 - y0 - h);
    }
    return t;
  }, [base, aspect, x0, y0, x1, y1]);
}
