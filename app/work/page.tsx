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
          {projects.map((p) => (
            <Card key={p.slug} href={`/work/${p.slug}`} className="md:p-8">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 opacity-50 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(800px circle at top right, color-mix(in oklab, ${p.accent} 14%, transparent), transparent 60%)`,
                }}
              />
              <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill>
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: p.accent }}
                      />
                      {p.status === "live" ? "Live" : "Shipped"}
                    </Pill>
                    <Pill>{p.period}</Pill>
                    <Pill>{p.role}</Pill>
                  </div>

                  <h3 className="mt-5 font-display text-3xl md:text-4xl text-fg leading-tight">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-fg-muted leading-relaxed text-pretty">
                    {p.tagline}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-fg-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-fg-muted transition-colors group-hover:text-fg md:flex-col md:items-end md:gap-0">
                  <span>Read case study</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-12" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
