"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { PhoneShell } from "@/components/work/PhoneShell";
import { ScrollTrigger, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import type { DeviceCompare } from "@/content/types";

type Side = "before" | "after";

/**
 * The previous site and the new build on the same phone.
 *
 * With motion on, the stage pins to the viewport and page scroll drives
 * both screens from top to bottom together (the --p custom property, read
 * by `.phone-img` in globals.css). On wide screens the phones sit side by
 * side; on narrow ones they share one slot, the old site shows for the
 * first half of the scroll and the new one wipes in for the second, and a
 * toggle lets the visitor flip between them.
 *
 * With reduced motion nothing pins: each screen is a normal scroll area,
 * kept in step with the other.
 */
export function PhoneCompare({ compare, accent }: { compare: DeviceCompare; accent: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const viewportRefs = useRef<Array<HTMLDivElement | null>>([null, null]);
  const syncing = useRef(false);
  const manual = useRef(false);

  const [screen, setScreen] = useState(0);
  const [view, setView] = useState<Side>("before");
  const [staticMode, setStaticMode] = useState(false);

  useEffect(() => setStaticMode(prefersReducedMotion()), []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage || prefersReducedMotion()) return;

      let lastHalf: Side = "before";
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=160%",
        pin: stage,
        pinSpacing: true,
        onUpdate: (self) => {
          const p = self.progress;
          stage.style.setProperty("--p", p.toFixed(4));
          if (pctRef.current) pctRef.current.textContent = `${Math.round(p * 100)}%`;
          // Narrow screens: flip to the new site halfway, unless the visitor chose.
          const half: Side = p >= 0.5 ? "after" : "before";
          if (half !== lastHalf) {
            lastHalf = half;
            if (!manual.current) setView(half);
          }
        },
      });
      return () => st.kill();
    },
    { scope: sectionRef },
  );

  // Changing the screen tab starts both phones from the top again in static mode.
  useEffect(() => {
    viewportRefs.current.forEach((v) => v && (v.scrollTop = 0));
  }, [screen]);

  /** Reduced motion: keep the two scroll areas at the same relative position. */
  function syncFrom(i: number) {
    if (syncing.current) return;
    const from = viewportRefs.current[i];
    const to = viewportRefs.current[1 - i];
    if (!from || !to) return;
    const ratio = from.scrollTop / Math.max(1, from.scrollHeight - from.clientHeight);
    syncing.current = true;
    to.scrollTop = ratio * (to.scrollHeight - to.clientHeight);
    requestAnimationFrame(() => (syncing.current = false));
  }

  const current = compare.screens[screen];
  const sides: Array<{ side: Side; label: string; tag: string }> = [
    { side: "before", label: compare.before.label, tag: "Before" },
    { side: "after", label: compare.after.label, tag: "After" },
  ];

  return (
    <div ref={sectionRef} className="relative">
      <div
        ref={stageRef}
        className="bg-bg relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-16 pb-6 md:px-8 md:pt-20"
        style={{ ["--p" as string]: 0 }}
      >
        <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-60" />

        {/* Screen tabs, when there is more than one page to compare */}
        {compare.screens.length > 1 && (
          <div role="tablist" aria-label="Pages" className="relative mb-4 flex flex-wrap gap-1.5">
            {compare.screens.map((s, i) => (
              <button
                key={s.name}
                role="tab"
                aria-selected={i === screen}
                onClick={() => setScreen(i)}
                className={cn(
                  "label-mono rounded-md border px-2.5 py-1.5 transition-colors",
                  i === screen
                    ? "bg-accent text-accent-fg border-transparent"
                    : "border-border text-fg-muted hover:text-fg hover:border-border-strong",
                )}
              >
                {s.name}
              </button>
            ))}
          </div>
        )}

        {/* Phones: side by side from md up, one slot below that */}
        <div className="relative grid justify-items-center md:grid-cols-2 md:gap-16 lg:gap-24">
          {sides.map(({ side, label, tag }, i) => {
            const hidden = side === "after" && view === "before";
            return (
              <figure
                key={side}
                className={cn(
                  "col-start-1 row-start-1 flex flex-col items-center md:col-start-auto md:row-start-auto",
                  side === "after" &&
                    "transition-[clip-path] duration-700 ease-[var(--ease-out-expo)] max-md:[clip-path:inset(0_0_0_0)]",
                  hidden && "max-md:[clip-path:inset(0_0_0_100%)]",
                  // The covered phone's caption would show through the new one's.
                  side === "before" && view === "after" && "max-md:[&_figcaption]:opacity-0",
                )}
              >
                <figcaption className="label-mono mb-3 flex items-center gap-2 transition-opacity duration-300">
                  <span className={side === "after" ? "text-accent" : "text-fg-subtle"}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-fg">{tag}</span>
                  <span className="text-fg-subtle normal-case">{label}</span>
                </figcaption>
                <PhoneShell
                  shot={current?.[side]}
                  label={label}
                  sizes="(max-width: 768px) 70vw, 320px"
                  pan={staticMode ? "native" : "scroll"}
                  viewportRef={(el) => {
                    viewportRefs.current[i] = el;
                  }}
                  onViewportScroll={staticMode ? () => syncFrom(i) : undefined}
                  className="h-[min(62svh,640px)] md:h-[min(60svh,680px)]"
                />
              </figure>
            );
          })}
        </div>

        {/* Controls: progress, and the flip toggle on narrow screens */}
        <div className="relative mt-5 flex w-full max-w-[min(680px,100%)] flex-col items-center gap-4">
          {!staticMode && (
            <div className="flex w-full items-center gap-3">
              <span className="label-mono text-fg-subtle shrink-0">Scroll</span>
              <span className="bg-border relative h-px flex-1 overflow-hidden">
                <span
                  className="absolute inset-y-0 left-0 w-[calc(var(--p)*100%)]"
                  style={{ backgroundColor: accent }}
                />
              </span>
              <span ref={pctRef} className="label-mono text-fg-muted w-10 shrink-0 text-right">
                0%
              </span>
            </div>
          )}

          <div
            role="radiogroup"
            aria-label="Which version to show"
            className="border-border inline-flex rounded-md border p-0.5 md:hidden"
          >
            {sides.map(({ side, tag }) => (
              <button
                key={side}
                role="radio"
                aria-checked={view === side}
                onClick={() => {
                  manual.current = true;
                  setView(side);
                }}
                className={cn(
                  "label-mono rounded-[5px] px-4 py-2 transition-colors",
                  view === side ? "bg-accent text-accent-fg" : "text-fg-muted",
                )}
              >
                {tag}
              </button>
            ))}
          </div>

          {current?.title && (
            <p className="text-fg-muted max-w-md text-center text-sm leading-relaxed text-pretty">
              {current.title}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
