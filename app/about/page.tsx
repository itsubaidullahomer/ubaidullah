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
  description: `Product engineer based in Pakistan, four years building AI features into production apps. Currently at Tututor.ai, used by 17,000+ people.`,
  path: "/about",
});

const NUMBERS = [
  { value: "4+", label: "Years building production software" },
  { value: "17,000+", label: "People using what I build at Tututor.ai" },
  { value: String(projects.length), label: "Products shipped to production" },
  { value: "$250k", label: "Raised with help from my analytics work" },
];

const SKILL_ICONS: Record<
  string,
  React.ComponentType<{ className?: string; strokeWidth?: number }>
> = {
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
              <div className="text-fg-muted text-xs tracking-[0.18em] uppercase">About</div>
              <h1 className="font-display text-fg mt-4 text-5xl leading-[0.96] tracking-[-0.025em] text-balance md:text-7xl">
                Engineer who thinks like a{" "}
                <em className="text-gradient-accent italic not-italic">product person.</em>
              </h1>
              <div className="text-fg-muted mt-8 max-w-2xl space-y-6 text-lg leading-relaxed text-pretty">
                <p>
                  I'm <span className="text-fg">Ubaidullah</span>, a product engineer based in
                  Pakistan. Four years of building web apps, mostly at startups that didn't have a
                  designer, a PM and an engineer for every feature. Usually it was just me.
                </p>
                <p>
                  That changed how I work. I sketch the data model before I draw the screen, and I
                  try to work out what happens when the AI call fails before I write the prompt.
                  It's less elegant than it sounds. Mostly it means fewer rewrites later.
                </p>
                <p>
                  Right now I'm at <span className="text-fg">Tututor.ai</span>, an education
                  platform used by around 17,000 students and teachers in schools around Murcia,
                  Spain. I look after the AI services, the school CRM and the student side of the
                  app, which in practice means backend, frontend and most of the UX decisions in
                  between.
                </p>
                <p>
                  Before that I spent two years at <span className="text-fg">Danzee Tech</span> in
                  Denmark. I joined as a junior and left as the person the team handed new features
                  to. Alongside that I've done a few contract and side projects, including{" "}
                  <span className="text-fg">Insight-X</span>, an analytics platform that helped the
                  company raise $250k and runs today as Illume Analytics.
                </p>
                <p>
                  My stack is React, Node, Express and MongoDB, plus whichever LLM API the product
                  needs. I have opinions about streaming and prompt caching, and I think most teams
                  spend too little time on what their product does when the model fails.
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
                <div className="font-display text-fg text-3xl leading-none tracking-[-0.02em] md:text-4xl">
                  {n.value}
                </div>
                <div className="text-fg-muted mt-2.5 text-xs leading-relaxed md:text-[13px]">
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
            What I build with, <em className="text-gradient-accent italic not-italic">and why.</em>
          </>
        }
        description="Not a complete list. These are the ones I reach for without thinking about it, grouped by the job they do."
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
                        "border-border grid h-9 w-9 place-items-center rounded-xl border",
                        lead && "bg-accent border-transparent text-[var(--accent-fg)]",
                      )}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <div className="font-display text-fg text-xl">{group.category}</div>
                  </div>
                  <p className="text-fg-muted mt-3 max-w-xl text-sm leading-relaxed">
                    {group.blurb}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="border-border text-fg-muted rounded-full border px-2.5 py-1 text-[12px]"
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
