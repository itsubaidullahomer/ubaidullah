import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { ProductShowcase } from "@/components/work/ProductShowcase";
import { cn } from "@/lib/cn";
import { flagshipProject } from "@/content/projects";

/**
 * The home page's lead: the flagship shown as the suite it is. Short
 * pitch, one strip of numbers, then a tour of the real screens.
 */
export function FlagshipProject() {
  const p = flagshipProject;
  if (!p) return null;

  const stats = [
    p.metrics[0],
    ...(p.ecosystem
      ? [{ value: String(p.ecosystem.length), label: "Products on one backend" }]
      : []),
    ...p.metrics.slice(1),
  ];

  return (
    <section id="flagship" className="relative isolate overflow-hidden py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[35%] -z-10 h-[70%]"
        style={{
          background: `radial-gradient(60% 50% at 50% 40%, color-mix(in oklab, ${p.accent} 9%, transparent), transparent 70%)`,
        }}
      />

      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
          <div className="max-w-3xl">
            <div className="text-fg-muted mb-4 flex items-center gap-2 text-xs tracking-[0.18em] uppercase">
              <span className="bg-fg-subtle h-px w-6" />
              Flagship project · {p.period}
            </div>
            <h2 className="font-display text-fg text-5xl leading-[0.95] tracking-[-0.025em] text-balance md:text-7xl">
              {p.title}
            </h2>
            <p className="text-fg-muted mt-5 max-w-2xl text-lg leading-relaxed text-pretty md:text-xl">
              {p.pitch ?? p.tagline}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:pb-2">
            <Button href={`/work/${p.slug}`} variant="primary" withArrow>
              Read the full story
            </Button>
            {p.externalUrl && (
              <Button href={p.externalUrl} external variant="secondary">
                Visit the product
              </Button>
            )}
          </div>
        </div>

        <dl className="border-border mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-[var(--border)] md:grid-cols-5">
          {stats.map((m, i) => (
            <div
              key={m.label}
              className={cn(
                "bg-bg px-5 py-5 md:px-6 md:py-6",
                i === stats.length - 1 && stats.length % 2 === 1 && "col-span-2 md:col-span-1",
              )}
            >
              <dt className="sr-only">{m.label}</dt>
              <dd className="font-display text-fg text-3xl leading-none tracking-[-0.02em] md:text-4xl">
                {m.value}
              </dd>
              <dd className="text-fg-muted mt-2 text-xs leading-snug">{m.label}</dd>
            </div>
          ))}
        </dl>

        {p.showcase && (
          <ProductShowcase slides={p.showcase} accent={p.accent} className="mt-12 md:mt-16" />
        )}
      </Container>
    </section>
  );
}
