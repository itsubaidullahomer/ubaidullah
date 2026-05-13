"use client";

import { useEffect, useRef } from "react";

/**
 * Soft radial light that follows the cursor. Uses RAF + CSS custom properties
 * — no React re-renders, no layout thrash. Hidden on touch / reduced-motion.
 */
export function CursorHalo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (matchMedia("(hover: none)").matches) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    function onMove(e: MouseEvent) {
      tx = e.clientX;
      ty = e.clientY;
    }

    function tick() {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      if (ref.current) {
        ref.current.style.setProperty("--halo-x", `${cx}px`);
        ref.current.style.setProperty("--halo-y", `${cy}px`);
      }
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    tick();
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[2] hidden md:block"
      style={{
        background:
          "radial-gradient(280px circle at var(--halo-x, 50%) var(--halo-y, 50%), color-mix(in oklab, var(--accent) 18%, transparent), transparent 70%)",
        mixBlendMode: "plus-lighter",
        transition: "opacity 200ms var(--ease-out-quart)",
      }}
    />
  );
}
