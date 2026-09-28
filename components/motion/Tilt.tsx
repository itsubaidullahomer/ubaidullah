"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";
import { gsap, useGSAP, prefersReducedMotion } from "./gsap";

/**
 * Tilts its content in 3D towards the cursor and eases back on leave.
 * Mouse only; touch and reduced-motion visitors get a flat card.
 */
export function Tilt({
  children,
  className,
  max = 7,
}: {
  children: React.ReactNode;
  className?: string;
  /** Largest tilt, in degrees. */
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion() || matchMedia("(hover: none)").matches) return;
      gsap.set(el, { transformPerspective: 1100, transformOrigin: "50% 50%" });
      const rx = gsap.quickTo(el, "rotationX", { duration: 0.7, ease: "power3.out" });
      const ry = gsap.quickTo(el, "rotationY", { duration: 0.7, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        rx(-py * max);
        ry(px * max);
      };
      const leave = () => {
        gsap.to(el, { rotationX: 0, rotationY: 0, duration: 1.1, ease: "elastic.out(1, 0.6)" });
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
