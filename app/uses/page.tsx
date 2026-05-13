import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { AuroraMesh } from "@/components/effects/AuroraMesh";
import { uses } from "@/content/uses";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Uses",
  description: "Hardware, software, and tools I actually use day-to-day.",
  path: "/uses",
});

export default function UsesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-32 pb-12 md:pt-40">
        <AuroraMesh variant="section" />
        <Container size="narrow" className="relative z-10">
          <div className="text-xs uppercase tracking-[0.18em] text-fg-muted">Uses</div>
          <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[0.96] tracking-[-0.025em] text-fg text-balance">
            The tools I <em className="italic text-gradient-accent not-italic">actually</em> use.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-fg-muted leading-relaxed text-pretty">
            Not aspirational — the actual stack I touch every day.
          </p>
        </Container>
      </section>

      <Container size="narrow" className="space-y-12 pb-24">
        {uses.map((group) => (
          <div key={group.heading}>
            <div className="font-display text-3xl text-fg">{group.heading}</div>
            <ul className="mt-5 divide-y divide-border">
              {group.items.map((item) => (
                <li key={item.name} className="flex flex-col gap-1 py-4 md:flex-row md:items-baseline md:gap-6">
                  <div className="min-w-[200px] font-medium text-fg">{item.name}</div>
                  {item.detail && (
                    <div className="text-sm text-fg-muted leading-relaxed">{item.detail}</div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
    </>
  );
}
