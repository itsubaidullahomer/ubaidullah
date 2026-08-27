import type { Metadata } from "next";
import Script from "next/script";
import { Section } from "@/components/primitives/Section";
import { Card } from "@/components/primitives/Card";
import { Pill } from "@/components/primitives/Pill";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description:
    "Selected case studies — AI-native products, business analytics platforms, enterprise SaaS, and consumer e-commerce. All shipped to production users.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <Script
        id="work-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Work", path: "/work" },
            ]),
          ),
        }}
      />

      <div className="pt-32 md:pt-40" />

      <Section
        eyebrow="Case studies"
        title={
          <>
            Things I've shipped <em className="italic text-gradient-accent not-italic">to real users.</em>
          </>
        }
        description="Each of these is a product in production with users depending on it. I'm putting them in roughly chronological recency, not order of importance."
      >
        <div className="space-y-4 md:space-y-6">
          {projects.map((p) => {
            const statusLabel =
              p.status === "live"
                ? "Live"
                : p.status === "in-progress"
                  ? "In progress"
                  : p.status === "archived"
                    ? "Archived"
                    : "Shipped";
            const visibleStack = p.stack.slice(0, 6);
            const stackOverflow = p.stack.length - visibleStack.length;
            const leadMetric = p.metrics[0];

            return (
              <Card key={p.slug} href={`/work/${p.slug}`}>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(900px circle at top right, color-mix(in oklab, ${p.accent} 16%, transparent), transparent 62%)`,
                  }}
                />
                <div className="relative grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-10">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Pill>
                        <span
                          className="inline-block h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: p.accent }}
                        />
                        {statusLabel}
                      </Pill>
                      <Pill>{p.period}</Pill>
                      {p.featured && <Pill>Featured</Pill>}
                    </div>

                    <h3 className="mt-5 font-display text-3xl md:text-4xl text-fg leading-tight">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-fg-subtle">
                      {p.role} · {p.company}
                    </p>
                    <p className="mt-4 max-w-2xl text-fg-muted leading-relaxed text-pretty">
                      {p.tagline}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {visibleStack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-fg-muted"
                        >
                          {s}
                        </span>
                      ))}
                      {stackOverflow > 0 && (
                        <span className="rounded-full px-2.5 py-0.5 text-[11px] text-fg-subtle">
                          +{stackOverflow}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 md:items-end md:text-right">
                    {leadMetric && (
                      <div>
                        <div className="font-display text-3xl md:text-4xl text-fg leading-none tracking-[-0.02em]">
                          {leadMetric.value}
                        </div>
                        <div className="mt-1.5 text-xs text-fg-muted">
                          {leadMetric.label}
                        </div>
                      </div>
                    )}
                    <span className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors group-hover:text-fg">
                      Read case study
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-12" />
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>
    </>
  );
}
