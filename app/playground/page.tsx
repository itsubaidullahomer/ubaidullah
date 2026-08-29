import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { AuroraMesh } from "@/components/effects/AuroraMesh";
import { FailureLab } from "@/components/playground/FailureLab";
import { SystemMap } from "@/components/diagram/SystemMap";
import { tututor } from "@/content/projects/tututor";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Playground",
  description:
    "The Failure Lab: an interactive simulation of how a production AI feature handles failure. Kill providers mid-stream and watch it retry, fail over and resume.",
  path: "/playground",
});

const PATTERNS = [
  {
    title: "Checkpointed streams",
    detail:
      "Tokens are committed as they arrive, so when a stream dies the next provider picks up mid-sentence instead of starting over.",
  },
  {
    title: "Provider fallback chains",
    detail:
      "OpenAI, then Anthropic, then Google, with a backoff between attempts. One vendor having a bad afternoon shouldn't turn into a support ticket.",
  },
  {
    title: "Latency budgets",
    detail:
      "Time to first token and throughput are measured while it runs, so when something gets slow you can see where.",
  },
  {
    title: "Honest degradation",
    detail:
      "If everything is down, serve the cached answer and label it. A slightly old answer beats a spinner that never stops.",
  },
];

export default function PlaygroundPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-32 pb-12 md:pt-40">
        <AuroraMesh variant="section" />
        <Container className="relative z-10">
          <div className="text-fg-muted text-xs tracking-[0.18em] uppercase">Playground</div>
          <h1 className="font-display text-fg mt-4 max-w-3xl text-5xl leading-[0.96] tracking-[-0.025em] text-balance md:text-7xl">
            Try to break <em className="text-gradient-accent italic not-italic">my AI.</em>
          </h1>
          <p className="text-fg-muted mt-6 max-w-2xl text-lg leading-relaxed text-pretty">
            Most of the work in an AI feature goes into what happens when the model doesn't
            cooperate. So this is a simulation of the patterns I use for that, plus a console for
            breaking them. Kill a provider while it's streaming, trigger a rate limit or slow the
            network down, and see whether the answer still arrives.
          </p>
        </Container>
      </section>

      <Container className="pb-16">
        <div className="mb-6">
          <div className="text-fg-muted text-xs tracking-[0.18em] uppercase">
            Exhibit 01 — The Failure Lab
          </div>
          <h2 className="font-display text-fg mt-3 text-3xl leading-tight md:text-4xl">
            A stream that refuses to die.
          </h2>
          <p className="text-fg-muted mt-3 max-w-2xl leading-relaxed">
            This runs entirely in your browser. There's no API key behind it and no real model.
            What's being simulated is the state machine that would wrap one.
          </p>
        </div>
        <FailureLab />

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PATTERNS.map((p) => (
            <div key={p.title} className="glass rounded-[var(--radius-glass)] p-5">
              <div className="text-fg text-sm font-medium">{p.title}</div>
              <p className="text-fg-muted mt-2 text-[13px] leading-relaxed">{p.detail}</p>
            </div>
          ))}
        </div>

        <p className="text-fg-muted mt-8 max-w-2xl text-sm leading-relaxed">
          None of this is theoretical. It's roughly what keeps{" "}
          <Link
            href="/work/tututor"
            className="text-fg decoration-fg-subtle hover:text-accent hover:decoration-accent underline decoration-1 underline-offset-4 transition-colors"
          >
            Tututor.ai
          </Link>{" "}
          usable for 17,000 students and teachers on the days the AI behind it misbehaves.
        </p>
      </Container>

      <Container className="pb-24">
        <div className="mb-5">
          <div className="text-fg-muted text-xs tracking-[0.18em] uppercase">
            Exhibit 02 — Where this runs in production
          </div>
          <h2 className="font-display text-fg mt-3 text-3xl leading-tight md:text-4xl">
            The system these patterns live in.
          </h2>
          <p className="text-fg-muted mt-3 max-w-2xl leading-relaxed">
            This is roughly how Tututor is put together. Play a scenario and one request will travel
            through it, hop by hop. The thing worth noticing is that the AI path and the ordinary
            CRUD path never meet, which is why a slow model doesn't slow down the rest of the app.
            You can drag the services around.
          </p>
        </div>
        {tututor.architecture && (
          <SystemMap
            nodes={tututor.architecture.nodes}
            edges={tututor.architecture.edges}
            flows={tututor.architecture.flows}
          />
        )}

        <div className="mt-8">
          <Link
            href="/work/tututor"
            className="group text-fg-muted hover:text-fg inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
          >
            Read the full Tututor case study
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </Container>
    </>
  );
}
