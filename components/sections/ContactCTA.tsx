import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { Magnetic } from "@/components/primitives/Magnetic";
import { SystemGrid } from "@/components/effects/SystemGrid";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export function ContactCTA() {
  return (
    <section className="border-border relative isolate overflow-hidden border-t py-28 md:py-40">
      <SystemGrid fade="center" />
      <Container size="default" className="relative z-10">
        <Reveal stagger={0.1}>
          <div className="label-mono text-fg-muted flex items-center gap-3">
            <span className="text-accent">05</span>
            <span className="bg-border-strong h-px w-6" />
            Get in touch
          </div>
          <h2 className="font-display text-display text-fg mt-6 max-w-4xl text-balance">
            Have something <em className="accent-italic">worth building?</em>
          </h2>
          <p className="text-fg-muted mt-7 max-w-lg text-lg leading-relaxed text-pretty">
            I'm looking at a small number of product and AI engineering roles at the moment. If
            you're building something people already use, I'd like to hear about it.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Button href="/contact" variant="primary" size="lg" withArrow>
                Start a conversation
              </Button>
            </Magnetic>
            <Button href={`mailto:${site.email}`} variant="ghost" size="lg" external>
              {site.email}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
