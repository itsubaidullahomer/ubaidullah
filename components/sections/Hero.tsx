import Image from "next/image";
import { ArrowDown, FileText, MapPin } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { Pill, StatusPill } from "@/components/primitives/Pill";
import { Magnetic } from "@/components/primitives/Magnetic";
import { AuroraMesh } from "@/components/effects/AuroraMesh";
import { site } from "@/content/site";

const STACK_TICKER = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "WebSockets",
  "OpenAI",
  "Claude",
  "Tailwind",
  "Framer Motion",
  "Redux Toolkit",
  "Stripe",
];

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden px-0 pt-28 pb-12 md:pt-32 md:pb-16 lg:pt-32 lg:pb-20 2xl:pt-40">
      <AuroraMesh variant="hero" />

      <Container size="wide" className="relative z-10 w-full">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 md:gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-12 xl:gap-16 2xl:gap-20">
          {/* ─────── LEFT: text column ─────── */}
          <div className="flex min-w-0 flex-col justify-center">
            <div className="mb-5 flex flex-wrap items-center gap-2 md:mb-6">
              <StatusPill>{site.availability}</StatusPill>
              <Pill icon={<MapPin className="h-3 w-3" strokeWidth={2} />}>{site.location}</Pill>
            </div>

            {/* Headline — 3 lines, all same size, italic gets emphasis from styling alone */}
            <h1
              className="font-display text-fg text-[clamp(2.25rem,5.4vw,4.75rem)] leading-[0.96] tracking-[-0.028em] text-balance"
              style={{ hyphens: "manual" }}
            >
              <span className="block">Builder of</span>
              <span className="block">
                <em className="text-gradient-accent italic not-italic">production&#8209;grade</em>
              </span>
              <span className="block">AI products.</span>
            </h1>

            <p className="text-fg-muted mt-6 max-w-xl text-base leading-relaxed text-pretty md:mt-7 md:text-lg">
              I'm <span className="text-fg">Ubaidullah</span> — a senior product engineer who ships
              AI features to real users. Currently at{" "}
              <a
                href="https://tututor.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg decoration-fg-subtle hover:decoration-accent hover:text-accent underline decoration-1 underline-offset-4 transition-colors"
              >
                Tututor.ai
              </a>
              , where 17,000+ students and teachers use what I build daily.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-9">
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

            <div className="text-fg-subtle mt-12 hidden items-center gap-2.5 text-[11px] md:flex lg:mt-14">
              <ArrowDown className="h-3.5 w-3.5 animate-bounce" strokeWidth={2} />
              <span className="tracking-[0.2em] uppercase">Scroll for selected work</span>
            </div>
          </div>

          {/* ─────── RIGHT: visual stack ─────── */}
          <div className="mx-auto flex w-full max-w-md min-w-0 flex-col gap-4 lg:mx-0 lg:max-w-none lg:gap-4">
            {/* Portrait */}
            <div className="glass relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-glass)] lg:aspect-[5/6]">
              <Image
                src="/portrait.png"
                alt={`Portrait of ${site.name}, senior product engineer`}
                fill
                priority
                sizes="(max-width: 1024px) min(28rem, 90vw), (max-width: 1536px) 32vw, 420px"
                className="object-cover"
              />
              {/* Bottom gradient — strong enough for legibility */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
              />

              {/* Floating nameplate */}
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

            {/* Currently shipping mini-card */}
            {/* <div className="glass rounded-2xl p-4 md:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-fg-muted">
                    Currently shipping
                  </div>
                  <a
                    href="https://tututor.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1.5 font-display text-xl leading-tight text-fg transition-colors hover:text-accent md:text-2xl"
                  >
                    Tututor.ai
                    <span className="text-xs text-fg-subtle">↗</span>
                  </a>
                </div>
                <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-fg-muted">
                  v.now
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4">
                <div>
                  <div className="font-display text-2xl leading-none tracking-[-0.02em] text-fg md:text-3xl">
                    17K+
                  </div>
                  <div className="mt-1.5 text-[11px] text-fg-muted">Active users</div>
                </div>
                <div>
                  <div className="font-display text-2xl leading-none tracking-[-0.02em] text-fg md:text-3xl">
                    <span className="text-accent">90</span>%
                  </div>
                  <div className="mt-1.5 text-[11px] text-fg-muted">Lesson-prep saved</div>
                </div>
              </div>
            </div> */}

            {/* Stack marquee */}
            <div className="glass relative overflow-hidden rounded-full">
              <div className="flex w-max animate-[marquee_28s_linear_infinite] items-center gap-7 py-3">
                {[...STACK_TICKER, ...STACK_TICKER].map((t, i) => (
                  <span
                    key={i}
                    className="text-fg-muted flex shrink-0 items-center gap-7 text-xs font-medium tracking-tight"
                  >
                    {t}
                    <span aria-hidden className="bg-fg-subtle h-1 w-1 rounded-full" />
                  </span>
                ))}
              </div>
              {/* Edge fades */}
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
