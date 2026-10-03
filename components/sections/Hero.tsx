import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { Magnetic } from "@/components/primitives/Magnetic";
import { SystemGrid } from "@/components/effects/SystemGrid";
import { HeroReel } from "./HeroReel";
import { LocalClock } from "@/components/layout/LocalClock";
import { StreamHeadline, type Token } from "./StreamHeadline";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { STATUS_DOT, STATUS_LABEL } from "@/components/work/BrowserFrame";

/** Everything marked featured, flagship included, for the readout strip. */
const STRIP = projects.filter((p) => p.featured);

const HEADLINE: Token[] = [
  { text: "I" },
  { text: "build" },
  { text: "AI" },
  { text: "products" },
  { text: "people" },
  { text: "rely", accent: true },
  { text: "on.", accent: true },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <SystemGrid fade="top" />

      {/* Copy and the reel: side by side on wide screens, the reel under the
          copy below that. */}
      <div className="relative">
        <Container size="wide" className="relative z-10 pt-28 md:pt-36 lg:pt-40">
          <div className="lg:grid lg:min-h-[calc(100svh-14rem)] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12 xl:gap-16">
            <div className="max-w-[46rem]">
              {/* Status row */}
              <div className="label-mono text-fg-subtle rise-in flex flex-wrap items-center gap-x-4 gap-y-2 [animation-delay:60ms]">
                <span className="inline-flex items-center gap-2">
                  <span className="relative inline-flex h-1.5 w-1.5">
                    <span className="bg-ok absolute inline-flex h-full w-full animate-[pulse-dot_2.4s_ease-in-out_infinite] rounded-full opacity-70" />
                    <span className="bg-ok relative inline-flex h-1.5 w-1.5 rounded-full" />
                  </span>
                  <span className="text-fg-muted">{site.availability}</span>
                </span>
                <span aria-hidden className="bg-border-strong hidden h-3 w-px sm:inline" />
                <span>
                  {site.location} · <LocalClock />
                </span>
              </div>

              {/* The H1 carries the full name (what people search for), then the
                  headline, which streams in. The hidden dash keeps the two
                  readable as one sentence for crawlers and screen readers. */}
              <h1 className="mt-7 md:mt-9">
                <span className="font-display text-fg-muted rise-in block text-[clamp(1.375rem,2.4vw,2rem)] leading-none tracking-[-0.015em] [animation-delay:120ms]">
                  {site.name}
                </span>
                <span className="sr-only"> – </span>
                <StreamHeadline
                  as="span"
                  tokens={HEADLINE}
                  className="font-display text-fg mt-4 block text-[clamp(2.75rem,7vw,6.75rem)] leading-[0.94] tracking-[-0.03em] text-balance md:mt-5"
                />
              </h1>

              <p className="text-fg-muted rise-in mt-7 max-w-xl text-[17px] leading-relaxed text-pretty [animation-delay:1100ms] md:mt-9 md:text-lg">
                <Image
                  src="/images/avatar.png"
                  alt={site.name}
                  width={28}
                  height={28}
                  priority
                  className="border-border-strong mr-2 inline-block h-7 w-7 -translate-y-px rounded-full border object-cover align-middle"
                />
                I'm a product engineer in {site.location}. Most of what I build has a language model
                somewhere behind it, and my job is the part around the model: the streaming, the
                failure modes, the data shape. Right now that's{" "}
                <a
                  href="https://tututor.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg decoration-fg-subtle hover:decoration-accent hover:text-accent underline decoration-1 underline-offset-4 transition-colors"
                >
                  Tututor.ai
                </a>
                : eight products on one backend, used by 20k+ students, teachers and families every
                day.
              </p>

              <div className="rise-in mt-9 flex flex-wrap items-center gap-3 [animation-delay:1250ms] md:mt-10">
                <Magnetic>
                  <Button href="/work" variant="primary" size="lg" withArrow>
                    See the work
                  </Button>
                </Magnetic>
                <Magnetic>
                  <Button href="/contact" variant="secondary" size="lg">
                    Start a conversation
                  </Button>
                </Magnetic>
                <Button href={site.resumeUrl} external variant="ghost" size="lg">
                  CV
                </Button>
              </div>
            </div>

            <HeroReel className="rise-in mx-auto mt-14 w-full max-w-[24rem] [animation-delay:400ms] lg:mt-0 lg:w-auto lg:max-w-none" />
          </div>
        </Container>
      </div>

      {/* Readout strip: the flagship products as running services. */}
      <div className="border-border bg-bg relative z-10 mt-16 border-t lg:mt-8">
        <Container size="wide">
          <ul className="divide-border -mx-5 flex snap-x snap-mandatory overflow-x-auto md:mx-0 lg:grid lg:grid-cols-4 lg:divide-x lg:overflow-visible">
            {STRIP.map((p, i) => {
              const lead = p.metrics[0];
              return (
                <li
                  key={p.slug}
                  className="border-border min-w-[78%] shrink-0 snap-start border-r last:border-r-0 md:min-w-[42%] lg:min-w-0 lg:border-r-0"
                >
                  <Link
                    href={`/work/${p.slug}`}
                    className="group hover:bg-tint flex h-full flex-col gap-4 px-5 py-5 transition-colors md:px-6 md:py-6"
                  >
                    <div className="label-mono text-fg-subtle flex items-center justify-between gap-3">
                      <span className="flex min-w-0 items-center gap-2">
                        <span className="text-accent">0{i + 1}</span>
                        <span className="text-fg-muted truncate">{p.title}</span>
                      </span>
                      <span className="inline-flex shrink-0 items-center gap-1.5">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: STATUS_DOT[p.status] }}
                        />
                        {STATUS_LABEL[p.status]}
                      </span>
                    </div>
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <div className="font-display text-fg text-3xl leading-none tracking-[-0.02em] md:text-4xl">
                          {lead?.value}
                        </div>
                        <div className="text-fg-muted mt-1.5 text-[13px]">{lead?.label}</div>
                      </div>
                      <ArrowUpRight
                        className="text-fg-subtle group-hover:text-fg mb-1 h-4 w-4 shrink-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.75}
                      />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </div>
    </section>
  );
}
