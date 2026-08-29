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
          <div className="text-fg-muted text-xs tracking-[0.18em] uppercase">Now</div>
          <h1 className="font-display text-fg mt-4 text-5xl leading-[0.96] tracking-[-0.025em] text-balance md:text-7xl">
            What I'm <em className="text-gradient-accent italic not-italic">up to.</em>
          </h1>
          <p className="text-fg-muted mt-6 max-w-xl text-lg leading-relaxed text-pretty">
            {now.intro}
          </p>
          <div className="text-fg-subtle mt-6 inline-flex items-center gap-2 font-mono text-xs">
            <span className="bg-accent h-1 w-1 rounded-full" />
            Last updated {updated}
          </div>
        </Container>
      </section>

      <Container size="narrow" className="space-y-12 pb-24">
        {now.sections.map((section) => (
          <div key={section.heading}>
            <div className="font-display text-fg text-3xl">{section.heading}</div>
            <ul className="mt-5 space-y-3.5">
              {section.items.map((item, i) => (
                <li key={i} className="text-fg-muted flex gap-4 leading-relaxed text-pretty">
                  <span aria-hidden className="bg-fg-subtle mt-2.5 h-px w-3 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="border-border text-fg-subtle mt-12 rounded-[var(--radius-glass)] border p-5 text-sm">
          Inspired by Derek Sivers'{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg-muted hover:text-fg underline decoration-1 underline-offset-2"
          >
            /now movement
          </a>
          .
        </div>
      </Container>
    </>
  );
}
