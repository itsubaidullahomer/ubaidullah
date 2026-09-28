import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { Pill } from "@/components/primitives/Pill";
import { SystemGrid } from "@/components/effects/SystemGrid";
import { BrowserFrame, STATUS_DOT, STATUS_LABEL } from "@/components/work/BrowserFrame";
import { ProductShowcase } from "@/components/work/ProductShowcase";
import type { Project } from "@/content/types";

export function StudyHero({ project }: { project: Project }) {
  return (
    <section
      className="relative isolate overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20"
      style={{ ["--project-accent" as string]: project.accent }}
    >
      <SystemGrid fade="top" />

      <Container size="wide" className="relative z-10">
        <Link
          href="/work"
          className="group label-mono text-fg-muted hover:text-fg inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          All work
        </Link>

        <div className="mt-10 flex flex-wrap items-center gap-2">
          <Pill className="text-fg">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: STATUS_DOT[project.status] }}
            />
            {STATUS_LABEL[project.status]}
          </Pill>
          <Pill>{project.period}</Pill>
          <Pill>{project.role}</Pill>
        </div>

        <h1 className="font-display text-display text-fg mt-6 max-w-5xl text-balance">
          {project.title}
        </h1>
        <p className="text-fg-muted mt-6 max-w-2xl text-xl leading-relaxed text-pretty">
          {project.tagline}
        </p>

        {project.compare ? (
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            {[
              { href: project.compare.before.url, text: "The old site" },
              { href: project.compare.after.url, text: "The new build" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-fg hover:text-accent inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
              >
                {l.text}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
        ) : (
          project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group text-fg hover:text-accent mt-8 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
            >
              Visit {project.title}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )
        )}

        {project.showcase ? (
          <ProductShowcase
            slides={project.showcase}
            accent={project.accent}
            priority
            className="mt-12 md:mt-16"
          />
        ) : (
          project.screenshot && (
            <div className="mt-12 md:mt-16">
              <BrowserFrame
                project={project}
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
                scrollable
                className="surface rounded-xl"
              />
              <p className="label-mono text-fg-subtle mt-3 text-center">
                The live site, captured full page. Scroll inside the frame.
              </p>
            </div>
          )
        )}
      </Container>
    </section>
  );
}
