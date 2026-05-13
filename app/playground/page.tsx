import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { AuroraMesh } from "@/components/effects/AuroraMesh";
import { AskResume } from "@/components/playground/AskResume";
import { ArchitectureDiagram } from "@/components/case-study/ArchitectureDiagram";
import { tututor } from "@/content/projects/tututor";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Playground",
  description:
    "Live AI experiment: ask anything about my experience, and an interactive view of how Tututor's architecture is wired.",
  path: "/playground",
});

export default function PlaygroundPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-32 pb-12 md:pt-40">
        <AuroraMesh variant="section" />
        <Container className="relative z-10">
          <div className="text-xs uppercase tracking-[0.18em] text-fg-muted">Playground</div>
          <h1 className="mt-4 max-w-3xl font-display text-5xl md:text-7xl leading-[0.96] tracking-[-0.025em] text-fg text-balance">
            Things I built for <em className="italic text-gradient-accent not-italic">this site.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-fg-muted leading-relaxed text-pretty">
            Two demos — an AI chatbot that knows my resume (with prompt caching, naturally), and an interactive view of the Tututor architecture I shipped.
          </p>
        </Container>
      </section>

      <Container className="pb-16">
        <div className="mb-5">
          <div className="text-xs uppercase tracking-[0.18em] text-fg-muted">Experiment 01 — Live chat</div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl text-fg leading-tight">
            Ask my resume anything.
          </h2>
          <p className="mt-3 max-w-xl text-fg-muted leading-relaxed">
            Edge function, Claude Haiku 4.5, system prompt cached for ~90% cost discount on repeat questions.
          </p>
        </div>
        <AskResume />
      </Container>

      <Container className="pb-24">
        <div className="mb-5">
          <div className="text-xs uppercase tracking-[0.18em] text-fg-muted">Experiment 02 — System view</div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl text-fg leading-tight">
            How Tututor is wired, in one picture.
          </h2>
          <p className="mt-3 max-w-xl text-fg-muted leading-relaxed">
            Hover any service to see who talks to whom. This is roughly the boundary I designed to keep teacher UX responsive while AI work happens behind the scenes.
          </p>
        </div>
        {tututor.architecture && (
          <ArchitectureDiagram
            nodes={tututor.architecture.nodes}
            edges={tututor.architecture.edges}
          />
        )}
      </Container>
    </>
  );
}
