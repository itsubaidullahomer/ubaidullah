import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Shot } from "@/content/types";

type PhoneShellProps = {
  /** Full-page phone screenshot. Without one the screen shows a pending state. */
  shot?: Shot;
  /** Shown on the pending screen, e.g. the site's domain. */
  label: string;
  sizes: string;
  priority?: boolean;
  /**
   * How the page moves inside the screen:
   * - "scroll": follows the inherited --p custom property (0 = top, 1 = bottom)
   * - "hover": pans part-way down while the surrounding .group is hovered
   * - "native": the screen is a normal scroll area
   * - "none": stays at the top
   */
  pan?: "scroll" | "hover" | "native" | "none";
  className?: string;
  /** Ref to the screen's scroll area, for pan="native". */
  viewportRef?: React.Ref<HTMLDivElement>;
  onViewportScroll?: React.UIEventHandler<HTMLDivElement>;
};

/**
 * A phone: bezel, a status bar with the island, and a screen that shows a
 * full-page screenshot. The screen is a size container, so the panning
 * rules in globals.css (`.phone-img*`) can move the page by exactly its
 * overflow with `100cqh`.
 */
export function PhoneShell({
  shot,
  label,
  sizes,
  priority,
  pan = "none",
  className,
  viewportRef,
  onViewportScroll,
}: PhoneShellProps) {
  return (
    <div
      className={cn(
        "border-border-strong relative aspect-[9/19] rounded-[2.1rem] border bg-black p-[3.2%] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]",
        className,
      )}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-black">
        {/* Status bar */}
        <div
          aria-hidden
          className="relative flex h-[5.5%] shrink-0 items-center justify-between px-[9%] font-mono text-[9px] text-white/80"
        >
          <span>9:41</span>
          <span className="absolute top-1/2 left-1/2 h-[62%] w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black ring-1 ring-white/10" />
          <span className="flex items-center gap-[3px]">
            <span className="h-[5px] w-[3px] rounded-[1px] bg-white/70" />
            <span className="h-[7px] w-[3px] rounded-[1px] bg-white/70" />
            <span className="ml-[2px] h-[7px] w-[14px] rounded-[2px] border border-white/60" />
          </span>
        </div>

        {/* Screen */}
        <div
          ref={viewportRef}
          onScroll={onViewportScroll}
          data-lenis-prevent={pan === "native" ? "" : undefined}
          className={cn(
            "phone-viewport bg-bg-raised relative min-h-0 flex-1",
            pan === "native" ? "overflow-y-auto overscroll-contain" : "overflow-hidden",
          )}
        >
          {shot ? (
            <Image
              src={shot.src}
              width={shot.width}
              height={shot.height}
              alt={shot.alt}
              sizes={sizes}
              priority={priority}
              quality={75}
              className={cn(
                "block h-auto w-full",
                pan === "scroll" && "phone-img",
                pan === "hover" && "phone-img-hover",
              )}
            />
          ) : (
            <div className="bg-grid absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
              <span className="label-mono text-fg-muted normal-case">{label}</span>
              <span className="label-mono text-fg-subtle">Screens pending</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
