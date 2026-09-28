import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Project, Shot } from "@/content/types";

function domainOf(url?: string): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export const STATUS_LABEL: Record<Project["status"], string> = {
  live: "Live",
  shipped: "Shipped",
  "in-progress": "Building",
  archived: "Retired",
};

/** Dot colour per status: green for live, amber while building, grey otherwise. */
export const STATUS_DOT: Record<Project["status"], string> = {
  live: "var(--ok)",
  shipped: "var(--fg-subtle)",
  "in-progress": "var(--warn)",
  archived: "var(--fg-subtle)",
};

type BrowserFrameProps = {
  project: Project;
  /** `sizes` hint forwarded to next/image. */
  sizes: string;
  /** Eagerly load the image (above-the-fold cards). */
  priority?: boolean;
  /** Aspect ratio of the visible window. */
  windowClassName?: string;
  /** Let the viewer scroll the full page themselves. */
  scrollable?: boolean;
  /**
   * Turn the chrome into a service status bar: a status dot on the left
   * instead of traffic lights, the project's number on the right.
   */
  statusBar?: boolean;
  index?: number;
  /**
   * Two specific screens to show instead of the full-page screenshot: the
   * first at rest, the second wiped in on hover. Used for the flagship,
   * whose product screens say more than its marketing page.
   */
  views?: [Shot, Shot];
  className?: string;
};

/**
 * A browser-chrome frame around a project's screenshot. On cards,
 * hovering the surrounding `.group` wipes from the first view to the
 * second (see `.shot-a` / `.shot-b` in globals.css): further down the
 * full-page screenshot, or the second of two product screens.
 */
export function BrowserFrame({
  project,
  sizes,
  priority,
  windowClassName,
  scrollable,
  statusBar,
  index,
  views,
  className,
}: BrowserFrameProps) {
  const domain = domainOf(project.externalUrl ?? project.companyUrl);
  const shot = project.screenshot;

  return (
    <div
      className={cn("relative flex h-full flex-col overflow-hidden rounded-t-[inherit]", className)}
    >
      {/* Chrome bar */}
      <div className="border-border bg-bg-raised relative flex items-center gap-3 border-b px-4 py-2.5">
        {statusBar ? (
          <span className="label-mono text-fg-muted flex w-16 shrink-0 items-center gap-1.5">
            <span className="relative inline-flex h-1.5 w-1.5">
              {project.status === "live" && (
                <span className="bg-ok absolute inline-flex h-full w-full animate-[pulse-dot_2.4s_ease-in-out_infinite] rounded-full opacity-70" />
              )}
              <span
                className="relative inline-flex h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: STATUS_DOT[project.status] }}
              />
            </span>
            {STATUS_LABEL[project.status]}
          </span>
        ) : (
          <div className="flex w-16 shrink-0 items-center gap-1.5" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-[#FF5F57]/80" />
            <span className="h-2 w-2 rounded-full bg-[#FEBC2E]/80" />
            <span className="h-2 w-2 rounded-full bg-[#28C840]/80" />
          </div>
        )}
        <div className="border-border mx-auto flex max-w-[60%] min-w-0 items-center justify-center gap-1.5 rounded-full border px-3 py-0.5">
          <span className="text-fg-muted truncate font-mono text-[10px] tracking-tight normal-case">
            {domain ?? project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
          </span>
        </div>
        <span className="label-mono text-fg-subtle w-16 shrink-0 text-right" aria-hidden>
          {statusBar && index !== undefined ? String(index).padStart(2, "0") : ""}
        </span>
      </div>

      {/* Screenshot window */}
      <div
        data-lenis-prevent={scrollable ? "" : undefined}
        className={cn(
          scrollable
            ? "relative max-h-[70vh] overflow-y-auto overscroll-contain"
            : "shot-window bg-bg-raised relative aspect-[16/10] overflow-hidden",
          windowClassName,
        )}
      >
        {views && !scrollable ? (
          <>
            <Image
              src={views[0].src}
              alt={views[0].alt}
              fill
              sizes={sizes}
              priority={priority}
              quality={75}
              className="shot-a object-cover object-left-top"
            />
            <Image
              src={views[1].src}
              alt=""
              aria-hidden
              fill
              sizes={sizes}
              quality={75}
              className="shot-b object-cover object-left-top"
            />
            <ShotTag />
          </>
        ) : shot && scrollable ? (
          <Image
            src={shot.src}
            width={shot.width}
            height={shot.height}
            alt={`Screenshot of the ${project.title} website`}
            sizes={sizes}
            priority={priority}
            quality={70}
            className="block h-auto w-full"
          />
        ) : shot ? (
          <>
            {/* View A: the top of the site */}
            <Image
              src={shot.src}
              alt={`Screenshot of the ${project.title} website`}
              fill
              sizes={sizes}
              priority={priority}
              quality={70}
              className="shot-a object-cover object-top"
            />
            {/* View B: further down the page, wiped in on hover */}
            <Image
              src={shot.src}
              alt=""
              aria-hidden
              fill
              sizes={sizes}
              quality={70}
              className="shot-b object-cover"
              style={{
                objectPosition: shot.height / shot.width > 1.2 ? "50% 32%" : "50% 50%",
              }}
            />
            <ShotTag />
          </>
        ) : (
          <div
            aria-hidden
            className="bg-bg-raised absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(90deg, ${project.accent}, transparent 70%)`,
              backgroundSize: "100% 1px",
              backgroundRepeat: "no-repeat",
            }}
          >
            <span className="font-display text-fg/20 absolute inset-0 grid place-items-center text-6xl">
              {project.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Soft inner edge so the shot sits inside the frame */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [box-shadow:inset_0_-24px_32px_-28px_rgba(0,0,0,0.55)]"
        />
      </div>
    </div>
  );
}

function ShotTag() {
  return (
    <span aria-hidden className="shot-tag">
      Read case study
      <ArrowUpRight className="h-3.5 w-3.5" />
    </span>
  );
}
