"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { PhoneFrame } from "@/components/case-study/PhoneFrame";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import type { ShowcaseSlide } from "@/content/types";

const INTERVAL_MS = 6000;
const EASE = [0.77, 0, 0.18, 1] as const;

/**
 * The next screen wipes in from the side you're moving towards and settles
 * from a slight zoom; the old one sinks back and dims underneath it.
 */
const WIPE = {
  enter: (d: number) => ({
    clipPath: d > 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)",
    scale: 1.08,
    filter: "brightness(1.25)",
    zIndex: 2,
  }),
  center: {
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    filter: "brightness(1)",
    zIndex: 2,
    transition: { duration: 0.95, ease: EASE },
  },
  exit: (d: number) => ({
    scale: 0.94,
    x: d > 0 ? "-4%" : "4%",
    filter: "brightness(0.45)",
    zIndex: 1,
    transition: { duration: 0.95, ease: EASE },
  }),
};

const FADE = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

/**
 * A tour of the real product: tabs grouped by product, one large browser
 * frame, and a caption that says what the visitor is looking at. It plays
 * on its own until the visitor picks a tab, then stays where they put it.
 */
export function ProductShowcase({
  slides,
  accent,
  priority,
  className,
}: {
  slides: ShowcaseSlide[];
  accent: string;
  priority?: boolean;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  // 1 = moving forward, -1 = back; decides which side the next screen wipes in from.
  const [dir, setDir] = useState(1);
  const [autoplay, setAutoplay] = useState(true);
  const [hovered, setHovered] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const inView = useInView(rootRef, { amount: 0.4 });
  const reduced = useReducedMotion();
  const tabRowRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // The frame tilts back and settles flat as it scrolls into view.
  useGSAP(
    () => {
      const el = stageRef.current;
      if (!el || prefersReducedMotion()) return;
      gsap.fromTo(
        el,
        { rotateX: 16, scale: 0.92, y: 40, transformPerspective: 1400, transformOrigin: "50% 0%" },
        {
          rotateX: 0,
          scale: 1,
          y: 0,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 95%", end: "top 35%", scrub: 0.6 },
        },
      );
    },
    { scope: stageRef },
  );
  const [moreRight, setMoreRight] = useState(false);

  // Fade the tab row's right edge only while there are tabs hidden past it.
  useEffect(() => {
    const row = tabRowRef.current;
    if (!row) return;
    const update = () => setMoreRight(row.scrollLeft + row.clientWidth < row.scrollWidth - 4);
    update();
    row.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      row.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const groups = useMemo(() => {
    const out: Array<{ name: string; items: Array<{ slide: ShowcaseSlide; i: number }> }> = [];
    slides.forEach((slide, i) => {
      const g = out.find((x) => x.name === slide.group);
      if (g) g.items.push({ slide, i });
      else out.push({ name: slide.group, items: [{ slide, i }] });
    });
    return out;
  }, [slides]);

  const playing = autoplay && !hovered && inView && !reduced;

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => {
      setDir(1);
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => window.clearTimeout(t);
  }, [playing, index, slides.length]);

  // Keep the active tab visible in the scrolling tab row, without moving the page.
  useEffect(() => {
    const tab = tabRefs.current[index];
    const row = tabRowRef.current;
    if (!tab || !row) return;
    const left = tab.offsetLeft - row.clientWidth / 2 + tab.clientWidth / 2;
    row.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });
  }, [index, reduced]);

  const go = (i: number) => {
    setAutoplay(false);
    setDir(i >= index ? 1 : -1);
    setIndex((i + slides.length) % slides.length);
  };

  const slide = slides[index];

  return (
    <div
      ref={rootRef}
      className={cn("min-w-0", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tabs, grouped by product */}
      <div
        ref={tabRowRef}
        role="tablist"
        aria-label="Product screens"
        className={cn(
          "relative -mx-6 flex [scrollbar-width:none] gap-5 overflow-x-auto px-6 pb-2 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden",
          moreRight && "[mask-image:linear-gradient(to_right,black_85%,transparent)]",
        )}
      >
        {groups.map((g) => (
          <div key={g.name} className="flex shrink-0 items-center gap-1.5">
            <span className="text-fg-subtle mr-1 text-[10px] font-medium tracking-[0.16em] uppercase">
              {g.name}
            </span>
            {g.items.map(({ slide: s, i }) => {
              const active = i === index;
              return (
                <button
                  key={s.label}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  aria-selected={active}
                  aria-controls="showcase-stage"
                  onClick={() => go(i)}
                  className={cn(
                    "rounded-full border px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors",
                    active
                      ? "bg-accent border-transparent text-[var(--accent-fg)]"
                      : "border-border text-fg-muted hover:text-fg hover:border-[var(--border-strong)]",
                  )}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Stage */}
      <div
        ref={stageRef}
        id="showcase-stage"
        role="tabpanel"
        className="glass relative mt-4 overflow-hidden rounded-2xl p-1.5 md:rounded-3xl md:p-2"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px opacity-70"
          style={{
            background: `radial-gradient(900px circle at 50% 0%, color-mix(in oklab, ${accent} 10%, transparent), transparent 60%)`,
          }}
        />

        {/* Browser chrome */}
        <div className="relative flex items-center gap-3 px-3 py-2 md:px-4 md:py-2.5">
          <div className="flex shrink-0 items-center gap-1.5" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-[#FF5F57]/80" />
            <span className="h-2 w-2 rounded-full bg-[#FEBC2E]/80" />
            <span className="h-2 w-2 rounded-full bg-[#28C840]/80" />
          </div>
          <div className="border-border mx-auto flex max-w-[70%] min-w-0 items-center justify-center rounded-full border bg-[var(--glass-tint)] px-4 py-0.5">
            <span className="text-fg-muted truncate font-mono text-[10px] md:text-[11px]">
              {slide.url}
            </span>
          </div>
          <div className="w-8 shrink-0" aria-hidden />
        </div>

        <div className="bg-bg-elevated relative aspect-[1600/757] overflow-hidden rounded-xl md:rounded-2xl">
          <AnimatePresence initial={false} custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              variants={reduced ? FADE : WIPE}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              {slide.shot && (
                <Image
                  src={slide.shot.src}
                  alt={slide.shot.alt}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1216px"
                  quality={80}
                  priority={priority && index === 0}
                  className="object-cover object-top"
                />
              )}
              {slide.phones && (
                <div
                  className="absolute inset-0 flex items-center justify-center gap-[3%]"
                  style={{
                    background: `radial-gradient(80% 90% at 50% 100%, color-mix(in oklab, #1d5bf0 45%, transparent), transparent 70%), linear-gradient(180deg, color-mix(in oklab, #0b3fbf 30%, var(--bg-elevated)), var(--bg-elevated))`,
                  }}
                >
                  {slide.phones.map((p, i) => (
                    <PhoneFrame
                      key={p.src}
                      shot={p}
                      sizes="260px"
                      className={cn(
                        "w-[19%] rounded-[1.1rem] p-1 md:rounded-[1.9rem] md:p-1.5",
                        i === 1 ? "translate-y-[-3%]" : "translate-y-[6%]",
                      )}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Autoplay progress */}
          {playing && (
            <motion.div
              key={`progress-${index}`}
              aria-hidden
              className="absolute bottom-0 left-0 h-[3px]"
              style={{ backgroundColor: accent }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: INTERVAL_MS / 1000, ease: "linear" }}
            />
          )}
        </div>
      </div>

      {/* Caption + controls */}
      <div className="mt-5 flex items-start justify-between gap-6">
        <div aria-live="polite" className="min-w-0">
          <div className="text-fg-subtle text-[11px] font-medium tracking-[0.16em] uppercase">
            {slide.group}
          </div>
          <div className="text-fg mt-1.5 text-lg leading-snug font-medium md:text-xl">
            {slide.title}
          </div>
          <p className="text-fg-muted mt-1.5 max-w-2xl text-sm leading-relaxed text-pretty md:text-[15px]">
            {slide.caption}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="text-fg-subtle hidden font-mono text-xs tabular-nums sm:inline">
            {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          <button
            onClick={() => go(index - 1)}
            aria-label="Previous screen"
            className="border-border text-fg-muted hover:text-fg grid h-9 w-9 place-items-center rounded-full border transition-colors hover:border-[var(--border-strong)]"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => go(index + 1)}
            aria-label="Next screen"
            className="border-border text-fg-muted hover:text-fg grid h-9 w-9 place-items-center rounded-full border transition-colors hover:border-[var(--border-strong)]"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
