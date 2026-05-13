import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { AuroraMesh } from "@/components/effects/AuroraMesh";
import { now } from "@/content/now";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Now",
  description: "What I'm working on, learning, and thinking about right now.",
  path: "/now",
});

export default function NowPage() {
  const updated = new Date(now.updated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <section className="relative isolate overflow-hidden pt-32 pb-12 md:pt-40">
        <AuroraMesh variant="section" />
        <Container size="narrow" className="relative z-10">
          <div className="text-xs uppercase tracking-[0.18em] text-fg-muted">Now</div>
          <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[0.96] tracking-[-0.025em] text-fg text-balance">
            What I'm <em className="italic text-gradient-accent not-italic">up to.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-fg-muted leading-relaxed text-pretty">
            {now.intro}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-xs font-mono text-fg-subtle">
            <span className="h-1 w-1 rounded-full bg-accent" />
            Last updated {updated}
          </div>
        </Container>
      </section>

      <Container size="narrow" className="space-y-12 pb-24">
        {now.sections.map((section) => (
          <div key={section.heading}>
            <div className="font-display text-3xl text-fg">{section.heading}</div>
            <ul className="mt-5 space-y-3.5">
              {section.items.map((item, i) => (
                <li key={i} className="flex gap-4 text-fg-muted leading-relaxed text-pretty">
                  <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-fg-subtle" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="mt-12 rounded-[var(--radius-glass)] border border-border p-5 text-sm text-fg-subtle">
          Inspired by Derek Sivers'{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg-muted underline decoration-1 underline-offset-2 hover:text-fg"
          >
            /now movement
          </a>
          .
        </div>
      </Container>
    </>
  );
}
