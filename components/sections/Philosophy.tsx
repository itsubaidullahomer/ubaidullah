import { Section } from "@/components/primitives/Section";

const tenets = [
  {
    n: "01",
    title: "Ship it, then keep it running.",
    body: "Everything on this site is in production with people using it. Building a demo and keeping a product alive are different jobs.",
  },
  {
    n: "02",
    title: "The prompt is rarely the hard part.",
    body: "Most of the work in an AI feature goes into the streaming, the shape you store things in, the failure modes and the latency budget.",
  },
  {
    n: "03",
    title: "Design is part of the job.",
    body: "Most of my work has been at startups with no designer on the team, so I got used to thinking about the flow before the components.",
  },
  {
    n: "04",
    title: "Speed is part of the product.",
    body: "I'll spend time on the bundle, the queries and the layout shift, because people feel a slow page even when they can't say why.",
  },
];

export function Philosophy() {
  return (
    <Section
      eyebrow="How I think about the work"
      title="Four things I keep coming back to."
      size="default"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {tenets.map((t) => (
          <div
            key={t.n}
            className="group border-border hover:border-border-strong relative overflow-hidden rounded-[var(--radius-glass)] border p-7 transition-colors"
          >
            <div className="text-fg-subtle font-mono text-xs">{t.n}</div>
            <h3 className="font-display text-fg mt-3 text-2xl leading-tight">{t.title}</h3>
            <p className="text-fg-muted mt-3 text-sm leading-relaxed text-pretty">{t.body}</p>

            <div
              aria-hidden
              className="bg-accent absolute right-7 -bottom-1 left-7 h-px scale-x-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
              style={{ transformOrigin: "left" }}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
