import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowUpRight, Globe } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { Card } from "@/components/primitives/Card";
import { Pill } from "@/components/primitives/Pill";
import { BrowserFrame } from "@/components/work/BrowserFrame";
import { STATUS_LABEL } from "@/components/work/ProjectCard";
import { projects } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { cn } from "@/lib/cn";

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
        description="Every project below is shown as it actually runs in production — hover a screenshot to scroll through the live site. Ordered by recency, not importance."
      >
        <div className="space-y-6 md:space-y-8">
          {projects.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <Card key={p.slug} interactive className="group p-0 md:p-0">
                {/* Full-card click target for the case study */}
                <Link
                  href={`/work/${p.slug}`}
                  className="absolute inset-0 z-10"
                  aria-label={`${p.title} — read the case study`}
                />

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-50 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(900px circle at ${flip ? "top left" : "top right"}, color-mix(in oklab, ${p.accent} 13%, transparent), transparent 62%)`,
                  }}
                />

                <div className="relative grid items-stretch lg:grid-cols-[1.05fr_1fr]">
                  {/* Screenshot */}
                  <div
                    className={cn(
                      "relative w-full p-3 pb-0 md:p-5 md:pb-0 lg:self-center lg:pb-5",
                      flip && "lg:order-2",
                    )}
                  >
                    <BrowserFrame
                      project={p}
                      sizes="(max-width: 1024px) 100vw, 560px"
                      priority={i === 0}
                      className="rounded-2xl border border-border"
                    />
                  </div>

                  {/* Details */}
                  <div className={cn("relative flex min-w-0 flex-col p-6 md:p-8", flip && "lg:order-1")}>
                    <div className="flex flex-wrap items-center gap-2">
                      <Pill>
                        <span
                          className="inline-block h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: p.accent }}
                        />
                        {STATUS_LABEL[p.status]}
                      </Pill>
                      <Pill>{p.period}</Pill>
                      {p.featured && <Pill>Featured</Pill>}
                    </div>

                    <h3 className="mt-5 font-display text-3xl leading-tight text-fg md:text-4xl">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-fg-subtle">
                      {p.role} · {p.company}
                    </p>
                    <p className="mt-4 max-w-2xl leading-relaxed text-fg-muted text-pretty">
                      {p.tagline}
                    </p>

                    {p.metrics.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-5">
                        {p.metrics.slice(0, 2).map((m) => (
                          <div key={m.label}>
                            <div className="font-display text-2xl leading-none tracking-[-0.02em] text-fg md:text-3xl">
                              {m.value}
                            </div>
                            <div className="mt-1.5 text-xs text-fg-muted">{m.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {p.stack.slice(0, 6).map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-fg-muted"
                        >
                          {s}
                        </span>
                      ))}
                      {p.stack.length > 6 && (
                        <span className="rounded-full px-2.5 py-0.5 text-[11px] text-fg-subtle">
                          +{p.stack.length - 6}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-7">
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors group-hover:text-fg">
                        Read case study
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-12" />
                      </span>
                      {p.externalUrl && (
                        <a
                          href={p.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative z-20 inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-fg-muted transition-colors hover:border-accent hover:text-accent"
                        >
                          <Globe className="h-3 w-3" strokeWidth={2} />
                          Visit live site
                        </a>
                      )}
                    </div>
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
