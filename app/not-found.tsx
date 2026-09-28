import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { SystemGrid } from "@/components/effects/SystemGrid";
import { Button } from "@/components/primitives/Button";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <SystemGrid fade="center" />
      <Container className="relative z-10 text-center">
        <div className="label-mono text-fg-subtle">Error 404</div>
        <h1 className="font-display text-display text-fg mt-5 text-balance">
          This page took the <em className="accent-italic">scenic route.</em>
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
