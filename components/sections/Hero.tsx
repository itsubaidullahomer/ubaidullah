import Image from "next/image";
import { ArrowDown, MapPin } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { Pill, StatusPill } from "@/components/primitives/Pill";
import { Magnetic } from "@/components/primitives/Magnetic";
import { AuroraMesh } from "@/components/effects/AuroraMesh";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
      <AuroraMesh variant="hero" />

      <Container className="relative z-10">
        <div className="grid items-start gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div className="max-w-3xl">
            <div className="mb-8 flex flex-wrap items-center gap-2">
              <StatusPill>{site.availability}</StatusPill>
              <Pill icon={<MapPin className="h-3 w-3" strokeWidth={2} />}>{site.location}</Pill>
            </div>

            <h1 className="font-display text-[clamp(2.75rem,8vw,7rem)] leading-[0.96] tracking-[-0.025em] text-fg text-balance">
              Builder of{" "}
              <em className="italic text-gradient-accent">production-grade</em>{" "}
              AI products.
            </h1>

            <p className="mt-8 max-w-xl text-lg text-fg-muted leading-relaxed text-pretty">
              I'm <span className="text-fg">Ubaidullah</span> — a senior product
              engineer who ships AI features to real users. Currently at{" "}
              <a
                href="https://tututor.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg underline decoration-fg-subtle decoration-1 underline-offset-4 transition-colors hover:decoration-accent hover:text-accent"
              >
                Tututor.ai
              </a>
              , where 17,000+ students and teachers use what I build daily.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
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
            </div>

            <div className="mt-16 flex items-center gap-3 text-xs text-fg-subtle">
              <ArrowDown className="h-3.5 w-3.5 animate-bounce" strokeWidth={2} />
              <span>Scroll for selected work</span>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="glass relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[var(--radius-glass)]">
              <Image
                src="/portrait.png"
                alt={`Portrait of ${site.name}`}
                fill
                priority
                sizes="400px"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5">
                <div className="text-xs font-mono uppercase tracking-[0.18em] text-white/70">
                  Pakistan · Remote
                </div>
                <div className="mt-1 font-display text-xl text-white">{site.name}</div>
              </div>
            </div>

            <div className="glass mt-4 flex items-center gap-3 rounded-full px-4 py-2 text-xs text-fg-muted">
              <span className="text-fg-subtle">Stack:</span>
              <span className="text-fg">React</span>
              <span className="text-fg-subtle">·</span>
              <span className="text-fg">Node</span>
              <span className="text-fg-subtle">·</span>
              <span className="text-fg">MongoDB</span>
              <span className="text-fg-subtle">·</span>
              <span className="text-accent">AI</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
