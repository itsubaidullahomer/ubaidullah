import { Section } from "@/components/primitives/Section";
import { experience } from "@/content/experience";

export function ExperienceTimeline() {
  return (
    <Section
      eyebrow="Track record"
      title="Where I've been shipping."
      description="Four years of building production web applications — first as a junior turning into a team lead, now owning architecture and AI features end-to-end."
    >
      <ol className="relative space-y-12 md:space-y-16">
        <div
          aria-hidden
          className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent via-border to-transparent md:left-[11px]"
        />
        {experience.map((e, idx) => (
          <li key={e.company} className="relative grid gap-4 pl-8 md:grid-cols-[200px_1fr] md:pl-10 md:gap-8">
            <span
              aria-hidden
              className="absolute left-0 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-bg ring-1 ring-border md:h-6 md:w-6"
            >
              <span
                className="h-1.5 w-1.5 rounded-full md:h-2 md:w-2"
                style={{ backgroundColor: idx === 0 ? "var(--accent)" : "var(--fg-subtle)" }}
              />
            </span>

            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-fg-subtle">{e.period}</div>
              <div className="mt-2 text-xs text-fg-muted">{e.location}</div>
            </div>

            <div>
              <h3 className="font-display text-2xl text-fg leading-tight">
                {e.role}
                <span className="block text-base font-sans text-fg-muted not-italic mt-1">
                  {e.companyUrl ? (
                    <a
                      href={e.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-fg-subtle decoration-1 underline-offset-4 transition-colors hover:text-fg hover:decoration-accent"
                    >
                      {e.company}
                    </a>
                  ) : (
                    e.company
                  )}
                </span>
              </h3>

              <p className="mt-4 max-w-2xl text-fg-muted leading-relaxed text-pretty">{e.summary}</p>

              <ul className="mt-5 space-y-2.5 max-w-2xl">
                {e.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3 text-sm text-fg-muted leading-relaxed">
                    <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-fg-subtle" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {e.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-fg-muted"
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
