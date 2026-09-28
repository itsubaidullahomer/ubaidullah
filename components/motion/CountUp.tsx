"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "./gsap";

/**
 * Counts the number inside a stat like "20k+", "~6,000" or "8" up from zero
 * when it scrolls into view. Anything that isn't a number is kept as is.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\D*)([\d,.]+)(.*)$/);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !match || prefersReducedMotion()) return;
      const [, pre, num, post] = match;
      const target = parseFloat(num.replace(/,/g, ""));
      const decimals = num.includes(".") ? num.split(".")[1].length : 0;
      const commas = num.includes(",");
      const fmt = (n: number) => {
        const s = n.toFixed(decimals);
        return commas ? Number(s).toLocaleString("en-US") : s;
      };
      const state = { n: 0 };
      el.textContent = pre + fmt(0) + post;
      gsap.to(state, {
        n: target,
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = pre + fmt(state.n) + post;
        },
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
