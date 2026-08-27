import Link from "next/link";
import { ArrowUpRight, Globe } from "lucide-react";
import { Card } from "@/components/primitives/Card";
import { Pill } from "@/components/primitives/Pill";
import { BrowserFrame } from "./BrowserFrame";
import type { Project } from "@/content/types";

export const STATUS_LABEL: Record<Project["status"], string> = {
  live: "Live",
  shipped: "Shipped",
  "in-progress": "In progress",
  archived: "Archived",
};

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
  sizes?: string;
};

/**
 * Grid card: live-site screenshot in a browser frame on top, project
 * details below. The whole card links to the case study; the "Live"
 * chip links out to the running product.
 */
export function ProjectCard({
  project: p,
  priority,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px",
}: ProjectCardProps) {
  return (
    <Card interactive className="group flex h-full flex-col p-0 md:p-0">
      {/* Full-card click target for the case study */}
      <Link
        href={`/work/${p.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`${p.title} — read the case study`}
      />

      <BrowserFrame project={p} sizes={sizes} priority={priority} />

      <div className="relative flex flex-1 flex-col p-6 md:p-7">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-80"
          style={{
            background: `radial-gradient(560px circle at top right, color-mix(in oklab, ${p.accent} 14%, transparent), transparent 65%)`,
          }}
        />

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Pill>
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: p.accent }}
              />
              {STATUS_LABEL[p.status]}
            </Pill>
            <Pill>{p.period}</Pill>
          </div>
          <ArrowUpRight
            className="h-5 w-5 shrink-0 text-fg-muted transition-all duration-300 group-hover:rotate-12 group-hover:text-fg"
            strokeWidth={1.5}
          />
        </div>

        <h3 className="relative mt-5 font-display text-2xl leading-tight text-fg md:text-3xl">
          {p.title}
        </h3>
        <p className="relative mt-2.5 text-sm leading-relaxed text-fg-muted text-pretty md:text-[15px]">
          {p.tagline}
        </p>

        <div className="relative mt-5 flex flex-wrap gap-1.5">
          {p.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-fg-muted"
            >
              {tech}
            </span>
          ))}
          {p.stack.length > 4 && (
            <span className="rounded-full px-2.5 py-0.5 text-[11px] text-fg-subtle">
              +{p.stack.length - 4}
            </span>
          )}
        </div>

        <div className="relative mt-auto flex items-center justify-between gap-3 pt-6">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors group-hover:text-fg">
            Read case study
          </span>
          {p.externalUrl && (
            <a
              href={p.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-fg-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Globe className="h-3 w-3" strokeWidth={2} />
              Visit live site
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
