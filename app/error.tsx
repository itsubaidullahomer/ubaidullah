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
        <div className="text-fg-subtle font-mono text-xs tracking-[0.18em] uppercase">
          Something went sideways
        </div>
        <h1 className="font-display text-fg mt-4 text-5xl leading-[0.96] tracking-[-0.025em] text-balance md:text-7xl">
          A small fire in the engine room.
        </h1>
        <p className="text-fg-muted mx-auto mt-6 max-w-md leading-relaxed">
          {error.message || "Something failed while rendering this page."}
        </p>
        {error.digest && (
          <p className="text-fg-subtle mt-2 font-mono text-xs">ref: {error.digest}</p>
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
