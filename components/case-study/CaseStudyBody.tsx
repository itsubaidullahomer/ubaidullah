import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { MetricGrid } from "./MetricGrid";
import { SystemMap } from "@/components/diagram/SystemMap";
import type { Project } from "@/content/types";
import { getAdjacentProjects } from "@/content/projects";

export function CaseStudyBody({ project }: { project: Project }) {
  const { prev, next } = getAdjacentProjects(project.slug);

  return (
    <>
      <Container size="default" className="pb-16">
        <MetricGrid metrics={project.metrics} accent={project.accent} />
      </Container>

      <Container size="narrow" className="space-y-20 pb-16">
        <Block label="The problem">{project.problem}</Block>
        <Block label="The approach">{project.approach}</Block>
      </Container>

      {project.architecture && (
        <Container className="pb-16">
          <div className="mb-6 max-w-2xl">
            <div className="text-fg-muted text-xs tracking-[0.18em] uppercase">Architecture</div>
            <h3 className="font-display text-fg mt-3 text-3xl leading-tight md:text-4xl">
              How the system is wired.
            </h3>
            <p className="text-fg-muted mt-3 leading-relaxed text-pretty">
              The part that mattered was keeping the teacher UI responsive while the heavy AI work
              happens behind a WebSocket and a separate service. Play a scenario to watch a request
              travel through it.
            </p>
          </div>
          <SystemMap
            nodes={project.architecture.nodes}
            edges={project.architecture.edges}
            flows={project.architecture.flows}
          />
        </Container>
      )}

      <Container size="narrow" className="space-y-20 pb-20">
        <Block label="The outcome">{project.outcome}</Block>

        <div>
          <div className="text-fg-muted text-xs tracking-[0.18em] uppercase">What I owned</div>
          <ul className="mt-6 space-y-4">
            {project.responsibilities.map((r, i) => (
              <li key={i} className="text-fg-muted flex gap-4 leading-relaxed text-pretty">
                <span className="text-fg-subtle shrink-0 pt-1.5 font-mono text-xs tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-fg-muted text-xs tracking-[0.18em] uppercase">Stack</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="border-border text-fg-muted rounded-full border px-3 py-1 text-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </Container>

      <Container className="border-border border-t pt-12 pb-20">
        <div className="grid gap-4 md:grid-cols-2">
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="glass group flex items-center gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5"
            >
              <ArrowLeft className="text-fg-muted h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              <div>
                <div className="text-fg-subtle text-xs tracking-[0.16em] uppercase">Previous</div>
                <div className="font-display text-fg mt-1 text-xl">{prev.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="glass group flex items-center justify-end gap-4 rounded-2xl p-5 text-right transition-all hover:-translate-y-0.5 md:col-start-2"
            >
              <div>
                <div className="text-fg-subtle text-xs tracking-[0.16em] uppercase">Next</div>
                <div className="font-display text-fg mt-1 text-xl">{next.title}</div>
              </div>
              <ArrowRight className="text-fg-muted h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : null}
        </div>
      </Container>
    </>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-fg-muted text-xs tracking-[0.18em] uppercase">{label}</div>
      <p className="text-fg mt-6 text-xl leading-relaxed text-pretty md:text-2xl">{children}</p>
    </div>
  );
}
