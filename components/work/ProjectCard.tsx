import Link from "next/link";
import { ArrowUpRight, Globe } from "lucide-react";
import { Card } from "@/components/primitives/Card";
import { BrowserFrame } from "./BrowserFrame";
import { cn } from "@/lib/cn";
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
  /** Side-by-side layout for the lead card. */
  wide?: boolean;
  index?: number;
};

/**
 * A project as a running service: mono header with status and index,
 * live-site screenshot in a browser frame, then title, tagline and the
 * one metric that matters. The whole card links to the case study; the
 * "Live" chip links out to the product.
 */
export function ProjectCard({
  project: p,
  priority,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px",
  wide,
  index,
}: ProjectCardProps) {
  const lead = p.metrics[0];

  return (
    <Card
      interactive
      className={cn("flex h-full flex-col p-0 md:p-0", wide && "lg:grid lg:grid-cols-[1.15fr_1fr]")}
    >
      <Link
        href={`/work/${p.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`${p.title} — read the case study`}
      />

      {/* Accent hairline keyed to the project */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-20 h-px opacity-70"
        style={{ background: `linear-gradient(90deg, ${p.accent}, transparent 70%)` }}
      />

      <BrowserFrame
        project={p}
        sizes={wide ? "(max-width: 1024px) 100vw, 720px" : sizes}
        priority={priority}
        className={cn(wide && "lg:border-border lg:rounded-tr-none lg:border-r")}
      />

      <div className="relative flex flex-1 flex-col p-5 md:p-6">
        <div className="label-mono text-fg-subtle flex items-center justify-between">
          <span className="flex items-center gap-2">
            {index !== undefined && <span className="text-accent">0{index}</span>}
            <span>{p.period}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: p.status === "live" ? "var(--ok)" : p.accent }}
            />
            {STATUS_LABEL[p.status]}
          </span>
        </div>

        <h3 className="font-display text-fg mt-5 text-[1.75rem] leading-[1.02] tracking-[-0.02em] md:text-[2rem]">
          {p.title}
        </h3>
        <p className="text-fg-muted mt-2.5 text-[15px] leading-relaxed text-pretty">{p.tagline}</p>

        <div className="border-border mt-6 flex items-end justify-between gap-4 border-t pt-5">
          {lead && (
            <div>
              <div className="font-display text-fg text-2xl leading-none tracking-[-0.02em]">
                {lead.value}
              </div>
              <div className="text-fg-muted mt-1.5 text-xs">{lead.label}</div>
            </div>
          )}
          <div className="flex items-center gap-2">
            {p.externalUrl && (
              <a
                href={p.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="label-mono border-border text-fg-muted hover:border-accent hover:text-accent relative z-20 inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 transition-colors"
              >
                <Globe className="h-3 w-3" strokeWidth={2} />
                Live
              </a>
            )}
            <span className="border-border text-fg-muted group-hover:border-fg-muted group-hover:text-fg grid h-8 w-8 place-items-center rounded-md border transition-colors">
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
