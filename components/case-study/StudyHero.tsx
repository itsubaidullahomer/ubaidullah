import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { Pill } from "@/components/primitives/Pill";
import { AuroraMesh } from "@/components/effects/AuroraMesh";
import { BrowserFrame } from "@/components/work/BrowserFrame";
import type { Project } from "@/content/types";

export function StudyHero({ project }: { project: Project }) {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-20 md:pt-40 md:pb-24">
      <AuroraMesh variant="hero" />

      <Container className="relative z-10">
        <Link
          href="/work"
          className="group text-fg-muted hover:text-fg inline-flex items-center gap-1.5 text-sm transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          All work
        </Link>

        <div className="mt-10 flex flex-wrap items-center gap-2">
          <Pill>
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: project.accent }}
            />
            {project.status === "live" ? "Live" : "Shipped"}
          </Pill>
          <Pill>{project.period}</Pill>
          <Pill>{project.role}</Pill>
        </div>

        <h1 className="font-display text-fg mt-6 text-5xl leading-[0.96] tracking-[-0.025em] text-balance md:text-7xl lg:text-[88px]">
          {project.title}
        </h1>
        <p className="text-fg-muted mt-6 max-w-2xl text-xl leading-relaxed text-pretty">
          {project.tagline}
        </p>

        {project.externalUrl && (
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group text-fg hover:text-accent mt-8 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
          >
            Visit {project.title}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        )}

        {project.screenshot && (
          <div className="mt-12 md:mt-16">
            <BrowserFrame
              project={project}
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
              scrollable
              className="glass rounded-2xl"
            />
            <p className="text-fg-subtle mt-3 text-center text-xs">
              The live site, captured full page. Scroll inside the frame.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
