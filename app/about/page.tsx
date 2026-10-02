import type { Metadata } from "next";
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
import { Portrait } from "@/components/effects/Portrait";
import { SystemGrid } from "@/components/effects/SystemGrid";
import { skills } from "@/content/skills";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { cn } from "@/lib/cn";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: `Product engineer based in Pakistan, four years building AI features into production apps. Currently at Tututor.ai, used by 20k+ people.`,
  path: "/about",
});

const NUMBERS = [
  { value: "4+", label: "Years building production software" },
  { value: "20k+", label: "People using what I build at Tututor.ai" },
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
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <section className="relative isolate overflow-hidden pt-28 pb-12 md:pt-36">
        <SystemGrid />
        <Container className="relative z-10">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
            <div className="max-w-3xl">
              <div className="label-mono text-fg-muted">About</div>
              <h1 className="font-display text-display text-fg mt-5 text-balance">
                Engineer who thinks like a <em className="accent-italic">product person.</em>
              </h1>
              <div className="text-fg-muted mt-8 max-w-2xl space-y-6 text-lg leading-relaxed text-pretty">
                <p>
                  I'm <span className="text-fg">{site.name}</span>, a product engineer based in{" "}
                  {site.location}. Four years of building web apps, mostly at startups that didn't
                  have a designer, a PM and an engineer for every feature. Usually it was just me.
                </p>
                <p>
                  That changed how I work. I sketch the data model before I draw the screen, and I
                  try to work out what happens when the AI call fails before I write the prompt.
                  It's less elegant than it sounds. Mostly it means fewer rewrites later.
                </p>
                <p>
                  Right now I'm at <span className="text-fg">Tututor.ai</span>. It came to me as
                  someone else's Next.js app with one bug to fix. I rebuilt it three times, wrote
                  the backend, and grew it into eight products: an AI toolkit for teachers, a school
                  platform, and parent, student and teacher apps in both stores. More than 20,000
                  students, teachers and families in Murcia, Spain use it.
                </p>
                <p>
                  Along the way I led a small team of junior developers, and taught the founder to
                  code. He started by changing a few words of Spanish. Now he ships whole features,
                  and the two of us run the product between us.
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
              <Portrait
                src={site.photo}
                alt={site.name}
                sizes="(max-width: 1024px) 80vw, 320px"
                priority
                figure="Fig. 01"
                className="aspect-[4/5]"
              />
            </div>
          </div>

          {/* Numbers strip */}
          <div className="mt-16 grid grid-cols-2 gap-4 md:mt-20 lg:grid-cols-4">
            {NUMBERS.map((n) => (
              <div key={n.label} className="surface rounded-xl p-6">
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
            What I build with, <em className="accent-italic">and why.</em>
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
                className="surface relative overflow-hidden rounded-2xl p-6 md:p-7"
              >
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "border-border grid h-9 w-9 place-items-center rounded-md border",
                        lead && "bg-accent text-accent-fg border-transparent",
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
                        className="border-border text-fg-muted rounded-md border px-2 py-0.5 font-mono text-[11px]"
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
