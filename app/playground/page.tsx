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
    "The Failure Lab — an interactive simulation of production AI resilience. Kill providers mid-stream and watch the system retry, fail over, and resume.",
  path: "/playground",
});

const PATTERNS = [
  {
    title: "Checkpointed streams",
    detail: "Every token is committed as it arrives, so a failover resumes mid-sentence instead of restarting the answer.",
  },
  {
    title: "Provider fallback chains",
    detail: "OpenAI → Anthropic → Google, with backoff between attempts. One vendor's bad day never becomes the user's.",
  },
  {
    title: "Latency budgets",
    detail: "TTFT and throughput are measured live. When the budget blows, that's a signal — not a mystery.",
  },
  {
    title: "Honest degradation",
    detail: "When everything is down, serve the cache and say so. A labeled stale answer beats an infinite spinner.",
  },
];

export default function PlaygroundPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-32 pb-12 md:pt-40">
        <AuroraMesh variant="section" />
        <Container className="relative z-10">
          <div className="text-xs uppercase tracking-[0.18em] text-fg-muted">Playground</div>
          <h1 className="mt-4 max-w-3xl font-display text-5xl md:text-7xl leading-[0.96] tracking-[-0.025em] text-fg text-balance">
            Try to break <em className="italic text-gradient-accent not-italic">my AI.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-fg-muted leading-relaxed text-pretty">
            My whole thesis is that AI products are defined by their failure cases. So here's a live
            simulation of the resilience patterns I ship — and a chaos console to attack them with.
            Kill a provider mid-stream. Trigger a rate limit. Throttle the network. Watch the answer
            survive.
          </p>
        </Container>
      </section>

      <Container className="pb-16">
        <div className="mb-6">
          <div className="text-xs uppercase tracking-[0.18em] text-fg-muted">Exhibit 01 — The Failure Lab</div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl text-fg leading-tight">
            A stream that refuses to die.
          </h2>
          <p className="mt-3 max-w-2xl text-fg-muted leading-relaxed">
            Everything below runs in your browser — a deterministic simulation of a production LLM
            pipeline, no API keys involved. The interesting part isn't the model; it's the state
            machine wrapped around it.
          </p>
        </div>
        <FailureLab />

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PATTERNS.map((p) => (
            <div key={p.title} className="glass rounded-[var(--radius-glass)] p-5">
              <div className="text-sm font-medium text-fg">{p.title}</div>
              <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">{p.detail}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-fg-muted">
          These aren't demo tricks — they're the patterns keeping{" "}
          <Link
            href="/work/tututor"
            className="text-fg underline decoration-fg-subtle decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            Tututor.ai
          </Link>{" "}
          responsive for 17,000+ students and teachers while the AI behind it has a bad day.
        </p>
      </Container>

      <Container className="pb-24">
        <div className="mb-5">
          <div className="text-xs uppercase tracking-[0.18em] text-fg-muted">Exhibit 02 — Where this runs in production</div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl text-fg leading-tight">
            The system these patterns live in.
          </h2>
          <p className="mt-3 max-w-2xl text-fg-muted leading-relaxed">
            Tututor's real architecture, live. Play a scenario to watch a single request travel the
            system hop by hop — the AI path and the CRUD path never touch, which is the whole reason
            a slow model can't slow down the rest of the product. Drag any service to rearrange it.
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
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
          >
            Read the full Tututor case study
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </Container>
    </>
  );
}
