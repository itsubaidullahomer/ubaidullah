"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import { STATUS_DOT, STATUS_LABEL } from "./BrowserFrame";
import type { Project } from "@/content/types";

const PREVIEW_W = 360;
const PREVIEW_H = 225;
const GAP = 28;

/**
 * The smaller and older work as a service registry: one row per project
 * with its number, name, what it is, who I was on it, when, and whether
 * it's still running. On a mouse, a screenshot of the hovered project
 * follows the cursor. Every row links to its case study.
 */
export function ArchiveRegistry({
  projects,
  startIndex,
}: {
  projects: Project[];
  /** Number shown on the first row; the flagships above take the lower ones. */
  startIndex: number;
}) {
  const listRef = useRef<HTMLOListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [canHover, setCanHover] = useState(false);
  const move = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setCanHover(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // The preview trails the cursor a little; with reduced motion it jumps.
  useGSAP(
    () => {
      const el = previewRef.current;
      if (!el || !canHover) return;
      const duration = prefersReducedMotion() ? 0 : 0.55;
      move.current = {
        x: gsap.quickTo(el, "x", { duration, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration, ease: "power3.out" }),
      };
    },
    { dependencies: [canHover] },
  );

  /** Sit to the right of the cursor, or flip left near the viewport edge. */
  function place(e: React.PointerEvent, instant = false) {
    const el = previewRef.current;
    const m = move.current;
    if (!el || !m) return;
    const right = e.clientX + GAP + PREVIEW_W < window.innerWidth - 16;
    const x = right ? e.clientX + GAP : e.clientX - GAP - PREVIEW_W;
    const y = Math.min(
      Math.max(e.clientY - PREVIEW_H / 2, 16),
      window.innerHeight - PREVIEW_H - 16,
    );
    if (instant) {
      // First contact: appear at the cursor instead of flying in from 0,0.
      gsap.set(el, { x, y });
    } else {
      m.x(x);
      m.y(y);
    }
  }

  return (
    <div className="relative">
      {/* Column heads, desktop only */}
      <div className="label-mono text-fg-subtle border-border hidden grid-cols-[3.5rem_minmax(0,1.7fr)_minmax(0,1fr)_10rem_6.5rem_2rem] gap-6 border-b pb-3 lg:grid">
        <span>#</span>
        <span>Project</span>
        <span>Role</span>
        <span>When</span>
        <span>Status</span>
        <span />
      </div>

      <ol
        ref={listRef}
        onPointerEnter={canHover ? (e) => place(e, true) : undefined}
        onPointerMove={canHover ? (e) => place(e) : undefined}
        onPointerLeave={() => setActive(null)}
        className="border-border border-t lg:border-t-0"
      >
        {projects.map((p, i) => (
          <li key={p.slug} onPointerEnter={() => setActive(i)}>
            <Link
              href={`/work/${p.slug}`}
              className={cn(
                "group border-border hover:bg-tint relative grid grid-cols-[2.5rem_minmax(0,1fr)_1.5rem] gap-x-4 gap-y-2 border-b py-6 transition-colors lg:grid-cols-[3.5rem_minmax(0,1.7fr)_minmax(0,1fr)_10rem_6.5rem_2rem] lg:items-baseline lg:gap-6 lg:py-7",
              )}
            >
              {/* Project colour marks the row on hover */}
              <span
                aria-hidden
                className="absolute top-0 bottom-0 left-0 w-px origin-top scale-y-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100"
                style={{ backgroundColor: p.accent }}
              />

              <span className="label-mono text-fg-subtle group-hover:text-accent pt-2 transition-colors lg:pt-0 lg:pl-3">
                {String(startIndex + i).padStart(2, "0")}
              </span>

              <span className="min-w-0">
                <span className="font-display text-fg block text-[1.75rem] leading-[1.05] tracking-[-0.02em] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5 lg:text-[2.25rem]">
                  {p.title}
                </span>
                <span className="text-fg-muted mt-2 block max-w-xl text-[15px] leading-relaxed text-pretty">
                  {p.tagline}
                </span>
                {/* Mobile meta line */}
                <span className="label-mono text-fg-subtle mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 lg:hidden">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: STATUS_DOT[p.status] }}
                    />
                    {STATUS_LABEL[p.status]}
                  </span>
                  <span>{p.period}</span>
                </span>
              </span>

              <span className="text-fg-muted hidden text-sm leading-snug lg:block">
                {p.role}
                <span className="text-fg-subtle block">{p.company}</span>
              </span>

              <span className="label-mono text-fg-muted hidden lg:block">{p.period}</span>

              <span className="label-mono text-fg-muted hidden items-center gap-1.5 lg:inline-flex">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: STATUS_DOT[p.status] }}
                />
                {STATUS_LABEL[p.status]}
              </span>

              <ArrowUpRight
                aria-hidden
                className="text-fg-subtle group-hover:text-fg mt-2 h-4 w-4 justify-self-end transition-transform duration-300 group-hover:rotate-45 lg:mt-0"
                strokeWidth={1.75}
              />
            </Link>
          </li>
        ))}
      </ol>

      {/* Cursor-following preview, portalled to <body> so no transformed
          ancestor (scroll reveals leave transforms behind) can offset it.
          Every image is mounted up front so a hover never waits on a download. */}
      {canHover &&
        createPortal(
          <div
            ref={previewRef}
            aria-hidden
            className="pointer-events-none fixed top-0 left-0 z-40"
            style={{ width: PREVIEW_W, height: PREVIEW_H }}
          >
            <div
              className={cn(
                "surface-raised relative h-full w-full overflow-hidden rounded-lg transition-[opacity,transform] duration-300 ease-[var(--ease-out-expo)]",
                active === null ? "scale-90 opacity-0" : "scale-100 opacity-100",
              )}
            >
              {projects.map((p, i) =>
                p.screenshot ? (
                  <Image
                    key={p.slug}
                    src={p.screenshot.src}
                    alt=""
                    fill
                    sizes={`${PREVIEW_W}px`}
                    quality={70}
                    className={cn(
                      "object-cover object-top transition-[opacity,clip-path] duration-500 ease-[var(--ease-out-expo)]",
                      active === i
                        ? "opacity-100 [clip-path:inset(0_0_0_0)]"
                        : "opacity-0 [clip-path:inset(0_0_100%_0)]",
                    )}
                  />
                ) : null,
              )}
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  backgroundColor: active !== null ? projects[active].accent : "transparent",
                }}
              />
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
