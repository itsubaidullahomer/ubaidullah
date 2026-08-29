import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { Magnetic } from "@/components/primitives/Magnetic";
import { AuroraMesh } from "@/components/effects/AuroraMesh";
import { site } from "@/content/site";

export function ContactCTA() {
  return (
    <section className="relative isolate overflow-hidden py-28 md:py-40">
      <AuroraMesh variant="section" />
      <Container size="narrow" className="relative z-10 text-center">
        <div className="text-fg-muted text-xs tracking-[0.18em] uppercase">Get in touch</div>
        <h2 className="font-display text-fg mt-4 text-5xl leading-[0.96] tracking-[-0.025em] text-balance md:text-6xl lg:text-7xl">
          Have something <em className="text-gradient-accent italic not-italic">worth building</em>?
        </h2>
        <p className="text-fg-muted mx-auto mt-6 max-w-lg text-lg leading-relaxed text-pretty">
          I'm looking at a small number of product and AI engineering roles at the moment. If you're
          building something people already use, I'd like to hear about it.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <Button href="/contact" variant="primary" size="lg" withArrow>
              Start a conversation
            </Button>
          </Magnetic>
          <Magnetic>
            <Button href={`mailto:${site.email}`} variant="ghost" size="lg" external>
              {site.email}
            </Button>
          </Magnetic>
        </div>
      </Container>
    </section>
  );
}
