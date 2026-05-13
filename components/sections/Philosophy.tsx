import { Section } from "@/components/primitives/Section";

const tenets = [
  {
    n: "01",
    title: "Ship to users, not to portfolios.",
    body: "Every project on this site is in production with real people relying on it. Demo-quality code is a different sport.",
  },
  {
    n: "02",
    title: "Architecture is the feature.",
    body: "The hard part of an AI feature isn't the prompt — it's the streaming, the storage shape, the failure modes, the latency budget.",
  },
  {
    n: "03",
    title: "Design is part of the job.",
    body: "Most of my work has been at startups without a designer. I've learned to think in flows before I think in components.",
  },
  {
    n: "04",
    title: "Speed is a feature for the user, not the developer.",
    body: "I'll optimize the bundle, the queries, and the layout shift — because users feel slowness even when they can't name it.",
  },
];

export function Philosophy() {
  return (
    <Section
      eyebrow="How I think about the work"
      title="Four things I won't compromise on."
      size="default"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {tenets.map((t) => (
          <div
            key={t.n}
            className="group relative overflow-hidden rounded-[var(--radius-glass)] border border-border p-7 transition-colors hover:border-border-strong"
          >
            <div className="font-mono text-xs text-fg-subtle">{t.n}</div>
            <h3 className="mt-3 font-display text-2xl text-fg leading-tight">{t.title}</h3>
            <p className="mt-3 text-sm text-fg-muted leading-relaxed text-pretty">{t.body}</p>

            <div
              aria-hidden
              className="absolute -bottom-1 left-7 right-7 h-px scale-x-0 bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
              style={{ transformOrigin: "left" }}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
