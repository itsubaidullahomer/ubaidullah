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
import { Tilt } from "@/components/motion/Tilt";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description:
    "Case studies from products I've built: AI tools, business analytics, enterprise SaaS and consumer e-commerce. All of them shipped and in use.",
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

      <div className="pt-24 md:pt-28" />

      <Section
        index="01"
        eyebrow="Case studies"
        title={
          <>
            Things I've <em className="accent-italic">shipped.</em>
          </>
        }
        description="Each one is running in production right now. They're ordered by how recent they are, not by how much I like them."
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
                  className="absolute inset-x-0 top-0 z-20 h-px opacity-70"
                  style={{ background: `linear-gradient(90deg, ${p.accent}, transparent 70%)` }}
                />

                <div className="relative grid grid-cols-[minmax(0,1fr)] items-stretch lg:grid-cols-[1.05fr_1fr]">
                  {/* Screenshot */}
                  <div
                    className={cn(
                      "relative w-full p-3 pb-0 md:p-5 md:pb-0 lg:self-center lg:pb-5",
                      flip && "lg:order-2",
                    )}
                  >
                    <Tilt max={4}>
                      <BrowserFrame
                        project={p}
                        sizes="(max-width: 1024px) 100vw, 560px"
                        priority={i === 0}
                        className="surface rounded-xl"
                      />
                    </Tilt>
                  </div>

                  {/* Details */}
                  <div
                    className={cn(
                      "relative flex min-w-0 flex-col p-6 md:p-8",
                      flip && "lg:order-1",
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <Pill className="text-fg">
                        <span
                          className="inline-block h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: p.status === "live" ? "var(--ok)" : p.accent }}
                        />
                        {STATUS_LABEL[p.status]}
                      </Pill>
                      <Pill>{p.period}</Pill>
                      {p.featured && <Pill>Featured</Pill>}
                    </div>

                    <h3 className="font-display text-fg mt-5 text-[2rem] leading-[1.02] tracking-[-0.02em] md:text-[2.5rem]">
                      {p.title}
                    </h3>
                    <p className="label-mono text-fg-subtle mt-2">
                      {p.role} · {p.company}
                    </p>
                    <p className="text-fg-muted mt-4 max-w-2xl leading-relaxed text-pretty">
                      {p.tagline}
                    </p>

                    {p.metrics.length > 0 && (
                      <div className="border-border mt-6 flex flex-wrap gap-x-10 gap-y-4 border-t pt-5">
                        {p.metrics.slice(0, 2).map((m) => (
                          <div key={m.label}>
                            <div className="font-display text-fg text-2xl leading-none tracking-[-0.02em] md:text-3xl">
                              {m.value}
                            </div>
                            <div className="text-fg-muted mt-1.5 text-xs">{m.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {p.stack.slice(0, 6).map((s) => (
                        <span
                          key={s}
                          className="border-border text-fg-muted rounded-md border px-2 py-0.5 font-mono text-[11px]"
                        >
                          {s}
                        </span>
                      ))}
                      {p.stack.length > 6 && (
                        <span className="text-fg-subtle rounded-full px-2.5 py-0.5 text-[11px]">
                          +{p.stack.length - 6}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-7">
                      <span className="text-fg-muted group-hover:text-fg inline-flex items-center gap-1.5 text-sm font-medium transition-colors">
                        Read case study
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-12" />
                      </span>
                      {p.externalUrl && (
                        <a
                          href={p.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="label-mono border-border text-fg-muted hover:border-accent hover:text-accent relative z-20 inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 transition-colors"
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
