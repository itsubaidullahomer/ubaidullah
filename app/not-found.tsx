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
        <div className="text-fg-subtle font-mono text-xs tracking-[0.18em] uppercase">
          Error 404
        </div>
        <h1 className="font-display text-fg mt-4 text-7xl leading-[0.96] tracking-[-0.025em] text-balance md:text-9xl">
          This page took the{" "}
          <em className="text-gradient-accent italic not-italic">scenic route.</em>
        </h1>
        <p className="text-fg-muted mx-auto mt-6 max-w-md leading-relaxed text-pretty">
          It either never existed or it's been retired. Here's the way back.
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
