import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { MetricGrid } from "./MetricGrid";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
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
            <div className="text-xs uppercase tracking-[0.18em] text-fg-muted">Architecture</div>
            <h3 className="mt-3 font-display text-3xl md:text-4xl text-fg leading-tight">
              How the system is wired.
            </h3>
            <p className="mt-3 text-fg-muted leading-relaxed text-pretty">
              The boundaries that mattered: keeping the teacher UI responsive while heavy AI work happens behind a WebSocket + microservice boundary.
            </p>
          </div>
          <ArchitectureDiagram nodes={project.architecture.nodes} edges={project.architecture.edges} />
        </Container>
      )}

      <Container size="narrow" className="space-y-20 pb-20">
        <Block label="The outcome">{project.outcome}</Block>

        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-fg-muted">What I owned</div>
          <ul className="mt-6 space-y-4">
            {project.responsibilities.map((r, i) => (
              <li key={i} className="flex gap-4 text-fg-muted leading-relaxed text-pretty">
                <span className="font-mono text-xs text-fg-subtle pt-1.5 shrink-0 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-fg-muted">Stack</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border px-3 py-1 text-sm text-fg-muted"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </Container>

      <Container className="border-t border-border pt-12 pb-20">
        <div className="grid gap-4 md:grid-cols-2">
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="glass group flex items-center gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5"
            >
              <ArrowLeft className="h-4 w-4 text-fg-muted transition-transform group-hover:-translate-x-0.5" />
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-fg-subtle">Previous</div>
                <div className="mt-1 font-display text-xl text-fg">{prev.title}</div>
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
                <div className="text-xs uppercase tracking-[0.16em] text-fg-subtle">Next</div>
                <div className="mt-1 font-display text-xl text-fg">{next.title}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-fg-muted transition-transform group-hover:translate-x-0.5" />
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
      <div className="text-xs uppercase tracking-[0.18em] text-fg-muted">{label}</div>
      <p className="mt-6 text-xl leading-relaxed text-fg text-pretty md:text-2xl">{children}</p>
    </div>
  );
}
