import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Project } from "@/content/types";

function domainOf(url?: string): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

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
  className?: string;
};

/**
 * A browser-chrome frame around the project's full-page screenshot.
 * On cards, hovering the surrounding `.group` wipes from the top of the
 * site to a view further down (see `.shot-a` / `.shot-b` in globals.css).
 */
export function BrowserFrame({
  project,
  sizes,
  priority,
  windowClassName,
  scrollable,
  className,
}: BrowserFrameProps) {
  const domain = domainOf(project.externalUrl ?? project.companyUrl);

  return (
    <div
      className={cn("relative flex h-full flex-col overflow-hidden rounded-t-[inherit]", className)}
    >
      {/* Chrome bar */}
      <div className="border-border relative flex items-center gap-3 border-b bg-[var(--glass-tint)] px-4 py-2.5">
        <div className="flex shrink-0 items-center gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-[#FF5F57]/80" />
          <span className="h-2 w-2 rounded-full bg-[#FEBC2E]/80" />
          <span className="h-2 w-2 rounded-full bg-[#28C840]/80" />
        </div>
        <div className="border-border mx-auto flex max-w-[70%] min-w-0 items-center justify-center gap-1.5 rounded-full border px-3 py-0.5">
          <span className="text-fg-muted truncate font-mono text-[10px] tracking-tight">
            {domain ?? project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
          </span>
        </div>
        <div className="w-8 shrink-0" aria-hidden />
      </div>

      {/* Screenshot window */}
      <div
        className={cn(
          scrollable
            ? "relative max-h-[70vh] overflow-y-auto overscroll-contain"
            : "shot-window relative aspect-[16/10] overflow-hidden",
          windowClassName,
        )}
      >
        {project.screenshot && scrollable ? (
          <Image
            src={project.screenshot.src}
            width={project.screenshot.width}
            height={project.screenshot.height}
            alt={`Screenshot of the ${project.title} website`}
            sizes={sizes}
            priority={priority}
            quality={70}
            className="block h-auto w-full"
          />
        ) : project.screenshot ? (
          <>
            {/* View A: the top of the site */}
            <Image
              src={project.screenshot.src}
              alt={`Screenshot of the ${project.title} website`}
              fill
              sizes={sizes}
              priority={priority}
              quality={70}
              className="shot-a object-cover object-top"
            />
            {/* View B: further down the page, wiped in on hover */}
            <Image
              src={project.screenshot.src}
              alt=""
              aria-hidden
              fill
              sizes={sizes}
              quality={70}
              className="shot-b object-cover"
              style={{
                objectPosition:
                  project.screenshot.height / project.screenshot.width > 1.2
                    ? "50% 32%"
                    : "50% 50%",
              }}
            />
            <div aria-hidden className="shot-sheen" />
            <span aria-hidden className="shot-tag">
              Read case study
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </>
        ) : (
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: `radial-gradient(120% 120% at 20% 0%, color-mix(in oklab, ${project.accent} 28%, transparent), transparent 70%)`,
            }}
          >
            <span className="font-display text-fg/20 absolute inset-0 grid place-items-center text-6xl">
              {project.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Soft inner edge so the shot sits "inside" the glass */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [box-shadow:inset_0_1px_0_0_var(--glass-highlight),inset_0_-24px_32px_-28px_rgba(0,0,0,0.55)]"
        />
      </div>
    </div>
  );
}
