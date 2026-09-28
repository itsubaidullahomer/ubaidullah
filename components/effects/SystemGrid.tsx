import { cn } from "@/lib/cn";

type SystemGridProps = {
  className?: string;
  /** Where the grid is fully visible before it fades out. */
  fade?: "top" | "center" | "none";
};

/**
 * Hairline grid behind page heroes. Pure CSS, no JS. Replaces the old
 * aurora blobs as the page-level texture: it reads as a plotting surface
 * the rest of the "living system" sits on.
 */
export function SystemGrid({ className, fade = "top" }: SystemGridProps) {
  const mask =
    fade === "top"
      ? "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0) 100%)"
      : fade === "center"
        ? "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)"
        : undefined;

  return (
    <div
      aria-hidden
      className={cn("bg-grid pointer-events-none absolute inset-0", className)}
      style={mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
    />
  );
}
