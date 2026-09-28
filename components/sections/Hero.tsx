"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, Clock, FileText, MapPin } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { Pill, StatusPill } from "@/components/primitives/Pill";
import { Magnetic } from "@/components/primitives/Magnetic";
import { HeroField } from "@/components/effects/HeroField";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import { site } from "@/content/site";

const STACK_TICKER = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "Socket.io",
  "React Native",
  "Kotlin Multiplatform",
  "OpenAI",
  "Claude",
  "Redis",
  "Stripe",
];

/** The phrase in the middle of the headline, in the order it rotates. */
const ROTATING = ["AI products", "school platforms", "mobile apps", "backends"];

/** "18:42 in Pakistan", ticking once a minute. */
function LocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Karachi",
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <Pill icon={<Clock className="h-3 w-3" strokeWidth={2} />}>
      <span className="tabular-nums">{time ?? "--:--"}</span> in Pakistan
    </Pill>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      if (prefersReducedMotion()) {
        gsap.set(q("[data-reveal]"), { autoAlpha: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.1 } });
      tl.set(q("[data-reveal]"), { autoAlpha: 1 })
        .from(q("[data-hero-line]"), { yPercent: 115, stagger: 0.09, duration: 1.2 }, 0.15)
        .from(q("[data-hero-chip]"), { y: 12, autoAlpha: 0, stagger: 0.06 }, 0.05)
        .from(q("[data-hero-fade]"), { y: 20, autoAlpha: 0, stagger: 0.08 }, 0.55)
        .from(
          q("[data-hero-portrait]"),
          { clipPath: "inset(100% 0% 0% 0% round 20px)", scale: 1.06, duration: 1.4 },
          0.25,
        )
        .from(q("[data-hero-portrait] img"), { scale: 1.25, duration: 1.8 }, 0.25);

      // The rotating phrase: each word rises in, holds, and leaves upwards.
      const words = q("[data-rotate-word]");
      gsap.set(words, { yPercent: 110 });
      gsap.set(words[0], { yPercent: 0 });
      const loop = gsap.timeline({ repeat: -1, delay: 2.6 });
      words.forEach((word, i) => {
        const next = words[(i + 1) % words.length];
        loop
          .to(word, { yPercent: -110, duration: 0.7, ease: "expo.inOut" }, "+=2")
          .fromTo(
            next,
            { yPercent: 110 },
            { yPercent: 0, duration: 0.7, ease: "expo.inOut", immediateRender: false },
            "<",
          );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden px-0 pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-32 lg:pb-24 2xl:pt-40"
    >
      <HeroField />

      <Container size="wide" className="relative z-10 w-full">
        <div
          data-reveal
          className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 md:gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-12 xl:gap-16 2xl:gap-20"
        >
          {/* ─────── LEFT: text column ─────── */}
          <div className="flex min-w-0 flex-col justify-center">
            <div className="mb-5 flex flex-wrap items-center gap-2 md:mb-6">
              <span data-hero-chip>
                <StatusPill>{site.availability}</StatusPill>
              </span>
              <span data-hero-chip>
                <Pill icon={<MapPin className="h-3 w-3" strokeWidth={2} />}>{site.location}</Pill>
              </span>
              <span data-hero-chip className="hidden sm:inline-flex">
                <LocalTime />
              </span>
            </div>

            <h1
              aria-label={`I build ${ROTATING[0]} people rely on.`}
              className="font-display text-fg text-[clamp(2.5rem,6vw,5.25rem)] leading-[0.98] tracking-[-0.03em]"
              style={{ hyphens: "manual" }}
            >
              <span aria-hidden className="block overflow-hidden pb-[0.06em]">
                <span data-hero-line className="block">
                  I build
                </span>
              </span>
              <span aria-hidden className="block overflow-hidden pb-[0.08em]">
                <span data-hero-line className="grid">
                  {ROTATING.map((w) => (
                    <em
                      key={w}
                      data-rotate-word
                      style={{ textShadow: "none" }}
                      className="text-gradient-accent col-start-1 row-start-1 block whitespace-nowrap italic not-italic"
                    >
                      {w}
                    </em>
                  ))}
                </span>
              </span>
              <span aria-hidden className="block overflow-hidden pb-[0.06em]">
                <span data-hero-line className="block">
                  people rely on.
                </span>
              </span>
            </h1>

            <p
              data-hero-fade
              className="text-fg-muted mt-6 max-w-xl text-base leading-relaxed text-pretty md:mt-7 md:text-lg"
            >
              I'm <span className="text-fg">Ubaidullah</span>, a product engineer in Pakistan. Right
              now that's{" "}
              <a
                href="#flagship"
                className="text-fg decoration-fg-subtle hover:decoration-accent hover:text-accent underline decoration-1 underline-offset-4 transition-colors"
              >
                Tututor.ai
              </a>
              : eight products on one backend, used by 20k+ students, teachers and families every
              day.
            </p>

            <div data-hero-fade className="mt-8 flex flex-wrap items-center gap-3 md:mt-9">
              <Magnetic>
                <Button href="/work" variant="primary" withArrow>
                  See selected work
                </Button>
              </Magnetic>
              <Magnetic>
                <Button href="/contact" variant="secondary">
                  Start a conversation
                </Button>
              </Magnetic>
              <Magnetic>
                <Button href={site.resumeUrl} external variant="ghost">
                  <FileText className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  View CV
                </Button>
              </Magnetic>
            </div>

            <div
              data-hero-fade
              className="text-fg-subtle mt-12 hidden items-center gap-2.5 text-[11px] md:flex lg:mt-14"
            >
              <ArrowDown className="h-3.5 w-3.5 animate-bounce" strokeWidth={2} />
              <span className="tracking-[0.2em] uppercase">Scroll to see the work</span>
            </div>
          </div>

          {/* ─────── RIGHT: visual stack ─────── */}
          <div className="mx-auto flex w-full max-w-md min-w-0 flex-col gap-4 lg:mx-0 lg:max-w-none lg:gap-4">
            <div
              data-hero-portrait
              className="glass relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-glass)] lg:aspect-[5/6]"
            >
              <Image
                src="/portrait.png"
                alt={`Portrait of ${site.name}, senior product engineer`}
                fill
                priority
                sizes="(max-width: 1024px) min(28rem, 90vw), (max-width: 1536px) 32vw, 420px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
              />

              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
                <div className="glass-strong inline-flex items-center gap-2.5 rounded-full py-1.5 pr-3.5 pl-1.5">
                  <span className="bg-accent font-display grid h-7 w-7 place-items-center rounded-full text-[12px] text-[var(--accent-fg)]">
                    U
                  </span>
                  <div className="leading-tight">
                    <div className="text-[13px] font-medium text-white">{site.name}</div>
                    <div className="text-[9.5px] tracking-[0.18em] text-white/65 uppercase">
                      Pakistan · Remote
                    </div>
                  </div>
                </div>

                <span className="glass-strong inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-medium tracking-[0.14em] text-white/80 uppercase">
                  <span className="relative inline-flex h-1.5 w-1.5">
                    <span className="bg-accent absolute inline-flex h-full w-full animate-[pulse-dot_2.4s_ease-in-out_infinite] rounded-full opacity-70" />
                    <span className="bg-accent relative inline-flex h-1.5 w-1.5 rounded-full" />
                  </span>
                  Available
                </span>
              </div>
            </div>

            {/* Stack marquee */}
            <div data-hero-fade className="glass relative overflow-hidden rounded-full">
              <div className="flex w-max animate-[marquee_32s_linear_infinite] items-center gap-7 py-3">
                {[...STACK_TICKER, ...STACK_TICKER].map((t, i) => (
                  <span
                    key={i}
                    className="text-fg-muted flex shrink-0 items-center gap-7 text-xs font-medium tracking-tight"
                  >
                    {t}
                    <span aria-hidden className="bg-accent/60 h-1 w-1 rounded-full" />
                  </span>
                ))}
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[var(--bg)] to-transparent"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[var(--bg)] to-transparent"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
