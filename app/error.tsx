"use client";

import { useEffect } from "react";
import { RotateCw } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { AuroraMesh } from "@/components/effects/AuroraMesh";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden">
      <AuroraMesh variant="section" />
      <Container className="relative z-10 text-center">
        <div className="text-xs font-mono uppercase tracking-[0.18em] text-fg-subtle">
          Something went sideways
        </div>
        <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[0.96] tracking-[-0.025em] text-fg text-balance">
          A small fire in the engine room.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-fg-muted leading-relaxed">
          {error.message || "Something failed while rendering this page."}
        </p>
        {error.digest && (
          <p className="mt-2 text-xs font-mono text-fg-subtle">
            ref: {error.digest}
          </p>
        )}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={() => reset()} variant="primary">
            <RotateCw className="h-4 w-4" />
            Try again
          </Button>
          <Button href="/" variant="secondary">
            Go home
          </Button>
        </div>
      </Container>
    </section>
  );
}
