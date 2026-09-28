import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/primitives/Card";
import { PhoneShell } from "./PhoneShell";
import { STATUS_DOT, STATUS_LABEL } from "./BrowserFrame";
import { cn } from "@/lib/cn";
import type { Project } from "@/content/types";

/**
 * The card for a rebuild shown on a phone: the previous site and the new
 * one side by side. On hover the old phone steps back and the new one
 * lifts and scrolls part-way down its page. Takes a full row.
 */
export function CompareCard({
  project: p,
  index,
  priority,
}: {
  project: Project;
  index?: number;
  priority?: boolean;
}) {
  const c = p.compare!;
  const first = c.screens[0];
  const readouts = p.metrics.slice(0, 3);

  return (
    <Card interactive className="flex h-full flex-col p-0 md:p-0 lg:flex-row-reverse">
      <Link
        href={`/work/${p.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`${p.title}: read the case study`}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-20 h-px origin-left scale-x-[0.3] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
        style={{ backgroundColor: p.accent }}
      />

      {/* Stage */}
      <div className="border-border bg-bg-raised relative flex-1 overflow-hidden border-b lg:border-b-0 lg:border-l">
        <div aria-hidden className="bg-grid absolute inset-0 opacity-70" />
        <div className="label-mono text-fg-muted relative flex items-center justify-between px-4 py-3">
          <span className="flex items-center gap-1.5">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span
                className="relative inline-flex h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: STATUS_DOT[p.status] }}
              />
            </span>
            {STATUS_LABEL[p.status]}
          </span>
          <span className="text-fg-subtle">
            {index !== undefined ? String(index).padStart(2, "0") : ""}
          </span>
        </div>

        <div className="relative flex items-end justify-center gap-6 px-6 pt-2 pb-8 sm:gap-10 md:pb-10">
          <figure className="flex w-[38%] max-w-[210px] flex-col items-center transition-[transform,opacity,filter] duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-x-2 group-hover:scale-[0.96] group-hover:opacity-60 group-hover:grayscale">
            <PhoneShell
              shot={first?.before}
              label={c.before.label}
              sizes="210px"
              priority={priority}
              className="w-full -rotate-3"
            />
            <figcaption className="label-mono text-fg-subtle mt-4">Before</figcaption>
          </figure>
          <figure className="flex w-[42%] max-w-[230px] flex-col items-center transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2">
            <PhoneShell
              shot={first?.after}
              label={c.after.label}
              sizes="230px"
              priority={priority}
              pan="hover"
              className="w-full rotate-2"
            />
            <figcaption className="label-mono text-accent mt-4">After</figcaption>
          </figure>
        </div>
      </div>

      {/* Body */}
      <div className="relative flex flex-col p-5 md:p-6 lg:w-[44%] lg:p-8">
        <div className="label-mono text-fg-subtle">
          {c.before.label} → {c.after.label}
        </div>
        <h3 className="font-display text-fg mt-4 text-[2rem] leading-[1.02] tracking-[-0.02em] md:text-[2.75rem]">
          {p.title}
        </h3>
        <p className="text-fg-muted mt-3 text-base leading-relaxed text-pretty md:text-lg">
          {p.tagline}
        </p>
        <p className="label-mono text-fg-subtle mt-4 leading-relaxed">
          {p.role} · {p.period}
        </p>

        {readouts.length > 0 && (
          <dl
            className={cn(
              "border-border mt-6 grid border-t",
              readouts.length === 1
                ? "grid-cols-1"
                : readouts.length === 2
                  ? "grid-cols-2"
                  : "grid-cols-3",
            )}
          >
            {readouts.map((m, i) => (
              <div
                key={m.label}
                className={cn(
                  "flex min-w-0 flex-col-reverse justify-end pt-4 pr-3",
                  i > 0 && "border-border border-l pl-3",
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

        <div className="mt-auto flex flex-wrap items-center justify-end gap-2 pt-6">
          <a
            href={c.before.url}
            target="_blank"
            rel="noopener noreferrer"
            className="label-mono border-border text-fg-muted hover:border-border-strong hover:text-fg relative z-20 inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 transition-colors"
          >
            Old site
            <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
          </a>
          <a
            href={c.after.url}
            target="_blank"
            rel="noopener noreferrer"
            className="label-mono border-border text-fg-muted hover:border-accent hover:text-accent relative z-20 inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 transition-colors"
          >
            New build
            <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
          </a>
          <span className="label-mono border-border text-fg-muted group-hover:bg-accent group-hover:text-accent-fg inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 transition-colors group-hover:border-transparent">
            Compare
            <ArrowUpRight
              className="h-3 w-3 transition-transform duration-300 group-hover:rotate-45"
              strokeWidth={2}
            />
          </span>
        </div>
      </div>
    </Card>
  );
}
