"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";
import { gsap, useGSAP, prefersReducedMotion } from "./gsap";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay between direct children, in seconds. */
  stagger?: number;
  /** Starting offset in px. */
  y?: number;
  as?: "div" | "header" | "section" | "ul" | "ol";
};

/**
 * Rises its direct children into place, one after another, the first time
 * they scroll into view.
 */
export function Reveal({
  children,
  className,
  stagger = 0.08,
  y = 28,
  as: As = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const items = Array.from(el.children) as HTMLElement[];
      if (prefersReducedMotion()) {
        gsap.set([el, ...items], { autoAlpha: 1 });
        return;
      }
      gsap.set(el, { autoAlpha: 1 });
      gsap.fromTo(
        items,
        { autoAlpha: 0, y, filter: "blur(6px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "expo.out",
          stagger,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          clearProps: "filter",
        },
      );
    },
    { scope: ref },
  );

  return (
    <As ref={ref as React.Ref<never>} data-reveal="" className={cn(className)}>
      {children}
    </As>
  );
}
