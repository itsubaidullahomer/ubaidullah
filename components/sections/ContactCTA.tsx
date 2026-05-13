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
        <div className="text-xs uppercase tracking-[0.18em] text-fg-muted">Get in touch</div>
        <h2 className="mt-4 font-display text-5xl md:text-6xl lg:text-7xl leading-[0.96] tracking-[-0.025em] text-fg text-balance">
          Have something <em className="italic text-gradient-accent not-italic">worth building</em>?
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg text-fg-muted leading-relaxed text-pretty">
          I'm open to a small number of senior product engineering roles and AI engineering engagements. If you're shipping to real users, let's talk.
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
