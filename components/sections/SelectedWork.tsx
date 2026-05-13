import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { Card } from "@/components/primitives/Card";
import { Pill } from "@/components/primitives/Pill";
import { projects } from "@/content/projects";

export function SelectedWork() {
  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title={
        <>
          Real products, real users, <em className="italic text-gradient-accent not-italic">real outcomes.</em>
        </>
      }
      description="A few of the products I've shipped end-to-end. Each one is a case study, not a screenshot dump."
    >
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {projects.map((p, i) => (
          <Card
            key={p.slug}
            href={`/work/${p.slug}`}
            className={i === 0 ? "md:col-span-2 md:p-10" : ""}
          >
            <div
              aria-hidden
              className="absolute inset-0 -z-10 opacity-50 transition-opacity duration-500 group-hover:opacity-80"
              style={{
                background: `radial-gradient(800px circle at top right, color-mix(in oklab, ${p.accent} 18%, transparent), transparent 60%)`,
              }}
            />

            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Pill>
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: p.accent }}
                  />
                  {p.status === "live" ? "Live" : p.status === "shipped" ? "Shipped" : p.status}
                </Pill>
                <Pill>{p.period}</Pill>
              </div>
              <ArrowUpRight
                className="h-5 w-5 text-fg-muted transition-all duration-300 group-hover:rotate-12 group-hover:text-fg"
                strokeWidth={1.5}
              />
            </div>

            <h3 className={`mt-6 font-display text-fg leading-tight ${i === 0 ? "text-4xl md:text-5xl" : "text-3xl"}`}>
              {p.title}
            </h3>
            <p className={`mt-3 text-fg-muted leading-relaxed text-pretty ${i === 0 ? "text-lg max-w-2xl" : "text-base"}`}>
              {p.tagline}
            </p>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {p.stack.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-fg-muted"
                >
                  {tech}
                </span>
              ))}
              {p.stack.length > 5 && (
                <span className="rounded-full px-2.5 py-0.5 text-[11px] text-fg-subtle">
                  +{p.stack.length - 5}
                </span>
              )}
            </div>

            {i === 0 && p.metrics.length > 0 && (
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 md:grid-cols-4">
                {p.metrics.slice(0, 4).map((m) => (
                  <div key={m.label}>
                    <div className="font-display text-2xl md:text-3xl text-fg leading-none tracking-[-0.02em]">
                      {m.value}
                    </div>
                    <div className="mt-1.5 text-xs text-fg-muted">{m.label}</div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/work"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
        >
          View all work
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </Section>
  );
}
