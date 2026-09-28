"use client";

import { useEffect } from "react";
import { RotateCw } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { SystemGrid } from "@/components/effects/SystemGrid";

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
      <SystemGrid fade="center" />
      <Container className="relative z-10 text-center">
        <div className="label-mono text-fg-subtle">Something went sideways</div>
        <h1 className="font-display text-display text-fg mt-5 text-balance">
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
