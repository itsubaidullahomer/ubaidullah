import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/primitives/Card";
import { BrowserFrame, STATUS_LABEL } from "./BrowserFrame";
import { cn } from "@/lib/cn";
import type { Project, Shot } from "@/content/types";

export { STATUS_LABEL };

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
  sizes?: string;
  /** Full-width flagship layout: cinematic frame on top, two-column body. */
  wide?: boolean;
  index?: number;
};

/** The flagship's first two product screens, when it has them. */
function productViews(p: Project): [Shot, Shot] | undefined {
  const shots = (p.showcase ?? []).map((s) => s.shot).filter((s): s is Shot => !!s);
  return shots.length >= 2 ? [shots[0], shots[1]] : undefined;
}

/**
 * A project as a running service. The browser chrome doubles as a status
 * bar (live dot, domain, number), the screenshot wipes to a second view on
 * hover, and the body ends in a readout row of the project's real metrics.
 * A bar in the project's colour loads across the top edge on hover.
 *
 * The whole card links to the case study; the "Live" chip links out.
 */
export function ProjectCard({
  project: p,
  priority,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px",
  wide,
  index,
}: ProjectCardProps) {
  const views = wide ? productViews(p) : undefined;
  const readouts = p.metrics.slice(0, wide ? 4 : 3);

  return (
    <Card interactive className="flex h-full flex-col p-0 md:p-0">
      <Link
        href={`/work/${p.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`${p.title}: read the case study`}
      />

      {/* Load bar in the project's colour */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-20 h-px origin-left scale-x-[0.3] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
        style={{ backgroundColor: p.accent }}
      />

      <BrowserFrame
        project={p}
        sizes={wide ? "(max-width: 1280px) 100vw, 1216px" : sizes}
        priority={priority}
        statusBar
        index={index}
        views={views}
        windowClassName={wide ? (views ? "aspect-[1600/757]" : "aspect-[16/7]") : undefined}
      />

      <div
        className={cn(
          "relative flex flex-1 flex-col p-5 md:p-6",
          wide && "lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12 lg:p-8",
        )}
      >
        <div className="flex flex-col">
          <h3
            className={cn(
              "font-display text-fg leading-[1.02] tracking-[-0.02em]",
              wide ? "text-[2rem] md:text-[2.75rem]" : "text-[1.75rem] md:text-[2rem]",
            )}
          >
            {p.title}
          </h3>
          <p
            className={cn(
              "text-fg-muted mt-3 leading-relaxed text-pretty",
              wide ? "text-base md:text-lg" : "text-[15px]",
            )}
          >
            {p.tagline}
          </p>
          <p className="label-mono text-fg-subtle mt-4 leading-relaxed">
            {p.role} · {p.period}
          </p>
        </div>

        <div className={cn("mt-6 flex flex-col", wide && "lg:mt-0")}>
          {readouts.length > 0 && (
            <dl
              className={cn(
                "border-border grid border-t",
                wide
                  ? "grid-cols-2 lg:border-t-0 lg:border-l"
                  : readouts.length === 1
                    ? "grid-cols-1"
                    : readouts.length === 2
                      ? "grid-cols-2"
                      : "grid-cols-3",
              )}
            >
              {readouts.map((m, i) => (
                // Label first for the markup, value first on screen.
                <div
                  key={m.label}
                  className={cn(
                    "flex min-w-0 flex-col-reverse justify-end pt-4 pr-3",
                    !wide && i > 0 && "border-border border-l pl-3",
                    wide && "lg:pt-0 lg:pl-6",
                    wide && i % 2 === 1 && "border-border border-l pl-4",
                    wide && i >= 2 && "border-border mt-4 border-t lg:mt-5 lg:pt-5",
                  )}
                >
                  <dt className="text-fg-muted mt-1.5 text-xs leading-snug">{m.label}</dt>
                  <dd className="font-display text-fg text-2xl leading-none tracking-[-0.02em] md:text-[1.75rem]">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-auto flex items-center justify-end gap-2 pt-6">
            {p.externalUrl && (
              <a
                href={p.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="label-mono border-border text-fg-muted hover:border-accent hover:text-accent relative z-20 inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 transition-colors"
              >
                Live
                <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
              </a>
            )}
            <span className="label-mono border-border text-fg-muted group-hover:bg-accent group-hover:text-accent-fg inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 transition-colors group-hover:border-transparent">
              Case study
              <ArrowUpRight
                className="h-3 w-3 transition-transform duration-300 group-hover:rotate-45"
                strokeWidth={2}
              />
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
