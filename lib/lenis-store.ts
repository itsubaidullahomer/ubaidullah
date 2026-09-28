import type Lenis from "lenis";

let instance: Lenis | null = null;

/** MotionRoot registers the one Lenis instance here so UI can pause it. */
export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}
