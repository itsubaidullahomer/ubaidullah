import { Section } from "@/components/primitives/Section";
import { experience } from "@/content/experience";

export function ExperienceTimeline() {
  return (
    <Section
      eyebrow="Track record"
      title="Where I've been working."
      description="Four years of building web apps. I started as a junior and ended up responsible for the architecture and most of the AI work."
    >
      <ol className="relative space-y-12 md:space-y-16">
        <div
          aria-hidden
          className="from-accent via-border absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b to-transparent md:left-[11px]"
        />
        {experience.map((e, idx) => (
          <li
            key={e.company}
            className="relative grid gap-4 pl-8 md:grid-cols-[200px_1fr] md:gap-8 md:pl-10"
          >
            <span
              aria-hidden
              className="bg-bg ring-border absolute top-1.5 left-0 grid h-4 w-4 place-items-center rounded-full ring-1 md:h-6 md:w-6"
            >
              <span
                className="h-1.5 w-1.5 rounded-full md:h-2 md:w-2"
                style={{ backgroundColor: idx === 0 ? "var(--accent)" : "var(--fg-subtle)" }}
              />
            </span>

            <div>
              <div className="text-fg-subtle text-xs tracking-[0.16em] uppercase">{e.period}</div>
              <div className="text-fg-muted mt-2 text-xs">{e.location}</div>
            </div>

            <div>
              <h3 className="font-display text-fg text-2xl leading-tight">
                {e.role}
                <span className="text-fg-muted mt-1 block font-sans text-base not-italic">
                  {e.companyUrl ? (
                    <a
                      href={e.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="decoration-fg-subtle hover:text-fg hover:decoration-accent underline decoration-1 underline-offset-4 transition-colors"
                    >
                      {e.company}
                    </a>
                  ) : (
                    e.company
                  )}
                </span>
              </h3>

              <p className="text-fg-muted mt-4 max-w-2xl leading-relaxed text-pretty">
                {e.summary}
              </p>

              <ul className="mt-5 max-w-2xl space-y-2.5">
                {e.highlights.map((h, i) => (
                  <li key={i} className="text-fg-muted flex gap-3 text-sm leading-relaxed">
                    <span aria-hidden className="bg-fg-subtle mt-2 h-px w-3 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {e.stack.map((s) => (
                  <span
                    key={s}
                    className="border-border text-fg-muted rounded-full border px-2.5 py-0.5 text-[11px]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
