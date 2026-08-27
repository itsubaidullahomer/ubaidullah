import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import {
  Compass,
  Database,
  FileText,
  GitBranch,
  LayoutTemplate,
  Server,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Pill } from "@/components/primitives/Pill";
import { Button } from "@/components/primitives/Button";
import { Magnetic } from "@/components/primitives/Magnetic";
import { AuroraMesh } from "@/components/effects/AuroraMesh";
import { skills } from "@/content/skills";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { cn } from "@/lib/cn";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: `Senior product engineer based in Pakistan. 4+ years shipping AI-native products. Currently at Tututor.ai (17k+ users).`,
  path: "/about",
});

const NUMBERS = [
  { value: "4+", label: "Years shipping production software" },
  { value: "17,000+", label: "Daily users on what I build at Tututor.ai" },
  { value: String(projects.length), label: "Products taken to real users" },
  { value: "$250k", label: "Funding my analytics work helped close" },
];

const SKILL_ICONS: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  "AI / LLMs": Sparkles,
  Frontend: LayoutTemplate,
  Backend: Server,
  Data: Database,
  "DevOps & Tools": GitBranch,
  Product: Compass,
};

export default function AboutPage() {
  return (
    <>
      <Script
        id="about-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ]),
          ),
        }}
      />

      <section className="relative isolate overflow-hidden pt-32 pb-12 md:pt-40">
        <AuroraMesh variant="section" />
        <Container className="relative z-10">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
            <div className="max-w-3xl">
              <div className="text-xs uppercase tracking-[0.18em] text-fg-muted">About</div>
              <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[0.96] tracking-[-0.025em] text-fg text-balance">
                Engineer who thinks like a <em className="italic text-gradient-accent not-italic">product person.</em>
              </h1>
              <div className="mt-8 space-y-6 text-lg leading-relaxed text-fg-muted text-pretty max-w-2xl">
                <p>
                  I'm <span className="text-fg">Ubaidullah</span> — a senior product
                  engineer based in Pakistan. Four years building production web applications, most of them at startups where the team didn't have a designer, a PM, and an engineer for every feature. Usually it was just me.
                </p>
                <p>
                  That's shaped how I work. I think about the user's flow before I think about components. I sketch the data model before I draw the screen. I assume the AI call will fail and design what happens next, before I write the prompt.
                </p>
                <p>
                  Right now I'm at <span className="text-fg">Tututor.ai</span>, building an AI-native education platform used daily by 17,000+ students and teachers across schools in Murcia, Spain. I own AI services, the school CRM, and core student experience — front, back, infra, and the UX decisions in between.
                </p>
                <p>
                  Before that I spent two years at <span className="text-fg">Danzee Tech</span> in Denmark, starting as a junior and growing into someone the team relied on for feature ownership and frontend architecture. And I've shipped a handful of side and contract projects — including <span className="text-fg">Insight-X</span> (now live as Illume Analytics), an AI analytics platform that helped its company close $250k in funding.
                </p>
                <p>
                  My main stack is React, Node.js, Express, MongoDB, and — increasingly — anything with an LLM behind it. I have strong opinions about streaming, prompt caching, and why the failure case is more important than the happy path.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-2">
                <Pill>{site.location}</Pill>
                <Pill>4+ years experience</Pill>
                <Pill>{site.availability}</Pill>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <Button href={site.resumeUrl} external variant="primary">
                    <FileText className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                    View my CV
                  </Button>
                </Magnetic>
                <Magnetic>
                  <Button href="/contact" variant="secondary">
                    Start a conversation
                  </Button>
                </Magnetic>
              </div>
            </div>

            <div className="relative w-full max-w-sm lg:w-80">
              <div className="glass relative aspect-[4/5] overflow-hidden rounded-[var(--radius-glass)]">
                <Image
                  src="/portrait.png"
                  alt={`Portrait of ${site.name}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 320px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Numbers strip */}
          <div className="mt-16 grid grid-cols-2 gap-4 md:mt-20 lg:grid-cols-4">
            {NUMBERS.map((n) => (
              <div key={n.label} className="glass rounded-[var(--radius-glass)] p-6">
                <div className="font-display text-3xl leading-none tracking-[-0.02em] text-fg md:text-4xl">
                  {n.value}
                </div>
                <div className="mt-2.5 text-xs leading-relaxed text-fg-muted md:text-[13px]">
                  {n.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Section
        eyebrow="Toolbox"
        title={
          <>
            What I build with, <em className="italic text-gradient-accent not-italic">and why.</em>
          </>
        }
        description="Not an exhaustive list — these are the tools I reach for without thinking, grouped by the job they do."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => {
            const Icon = SKILL_ICONS[group.category] ?? Sparkles;
            const lead = i === 0;
            return (
              <div
                key={group.category}
                className="glass relative overflow-hidden rounded-[var(--radius-glass)] p-6 md:p-7"
              >
                {lead && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(700px circle at top right, color-mix(in oklab, var(--accent) 12%, transparent), transparent 60%)",
                    }}
                  />
                )}
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "grid h-9 w-9 place-items-center rounded-xl border border-border",
                        lead && "border-transparent bg-accent text-[var(--accent-fg)]",
                      )}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <div className="font-display text-xl text-fg">{group.category}</div>
                  </div>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-fg-muted">
                    {group.blurb}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border px-2.5 py-1 text-[12px] text-fg-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
