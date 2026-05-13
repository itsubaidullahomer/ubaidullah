import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { AuroraMesh } from "@/components/effects/AuroraMesh";
import { Button } from "@/components/primitives/Button";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <AuroraMesh variant="hero" />
      <Container className="relative z-10 text-center">
        <div className="text-xs font-mono uppercase tracking-[0.18em] text-fg-subtle">Error 404</div>
        <h1 className="mt-4 font-display text-7xl md:text-9xl leading-[0.96] tracking-[-0.025em] text-fg text-balance">
          This page took the <em className="italic text-gradient-accent not-italic">scenic route.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-fg-muted leading-relaxed text-pretty">
          Either it never existed or it's been quietly retired. Either way, here are the directions home.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href="/" variant="primary">
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Button>
          <Button href="/work" variant="secondary">
            See selected work
          </Button>
        </div>
      </Container>
    </section>
  );
}
