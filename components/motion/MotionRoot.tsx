"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";
import { setLenis } from "@/lib/lenis-store";

/**
 * Site-wide motion plumbing, mounted once in the layout:
 * - Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync
 * - a hairline accent progress line along the top of the page
 * - the cursor spotlight on `.spotlight` surfaces
 * - a safety net that un-hides [data-reveal] content if a reveal never runs
 */
export function MotionRoot() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduced = prefersReducedMotion();

    // Never leave content hidden: anything a reveal didn't claim shows up.
    const safety = window.setTimeout(() => root.classList.remove("js-motion"), 2500);

    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;
    if (!reduced) {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        allowNestedScroll: true,
      });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }
    setLenis(lenis);

    // Scroll progress line.
    const bar = barRef.current;
    const progress = bar
      ? gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
          },
        )
      : null;

    // Cursor spotlight: one listener for every .spotlight element.
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(".spotlight") as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.clearTimeout(safety);
      window.removeEventListener("pointermove", onMove);
      progress?.scrollTrigger?.kill();
      progress?.kill();
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden
      className="bg-accent pointer-events-none fixed inset-x-0 top-0 z-[60] h-px origin-left scale-x-0"
    />
  );
}
