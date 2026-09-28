"use client";

import { ReactLenis } from "lenis/react";

/**
 * Lenis smooth scrolling on the window. Lenis honours
 * prefers-reduced-motion itself (lerp becomes 1, scroll tracks the
 * input 1:1). Nested scroll areas work because allowNestedScroll is on;
 * anything that must never be smoothed can add data-lenis-prevent.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        duration: 1.1,
        smoothWheel: true,
        allowNestedScroll: true,
        anchors: true,
        respectReducedMotion: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
