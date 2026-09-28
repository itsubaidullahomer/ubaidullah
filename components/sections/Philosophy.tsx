import { Section } from "@/components/primitives/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

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
      index="03"
      eyebrow="How I think about the work"
      title="Four things I keep coming back to."
      size="default"
    >
      <RevealGroup
        as="ol"
        className="surface divide-border grid divide-y overflow-hidden rounded-xl md:grid-cols-2 md:divide-y-0"
      >
        {tenets.map((t, i) => (
          <RevealItem
            key={t.n}
            as="li"
            className={
              "group relative p-6 md:p-8 " +
              (i % 2 === 0 ? "md:border-border md:border-r" : "") +
              (i < 2 ? "md:border-border md:border-b" : "")
            }
          >
            <div className="label-mono text-accent">{t.n}</div>
            <h3 className="font-display text-fg mt-4 text-[1.6rem] leading-[1.05] tracking-[-0.02em] md:text-[1.85rem]">
              {t.title}
            </h3>
            <p className="text-fg-muted mt-3 max-w-md text-[15px] leading-relaxed text-pretty">
              {t.body}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
