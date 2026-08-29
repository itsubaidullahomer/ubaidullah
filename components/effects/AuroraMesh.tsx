import { cn } from "@/lib/cn";

type AuroraMeshProps = {
  className?: string;
  variant?: "page" | "hero" | "section";
};

/**
 * Pure-CSS animated aurora. Three large blurred radial gradients drift slowly.
 * GPU-composited (transform only), no JS, no layout thrash.
 * Variant controls intensity and shape distribution.
 */
export function AuroraMesh({ className, variant = "page" }: AuroraMeshProps) {
  const intensity =
    variant === "hero" ? "opacity-100" : variant === "section" ? "opacity-60" : "opacity-80";

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", intensity, className)}
      style={{ opacity: "var(--aurora-opacity)" }}
    >
      <div
        className="absolute -top-1/4 -left-1/4 h-[80vh] w-[80vh] rounded-full blur-[120px] will-change-transform"
        style={{
          background: "radial-gradient(circle at center, var(--aurora-1), transparent 60%)",
          animation: "aurora-drift 28s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-1/4 -right-1/4 h-[70vh] w-[70vh] rounded-full blur-[120px] will-change-transform"
        style={{
          background: "radial-gradient(circle at center, var(--aurora-2), transparent 60%)",
          animation: "aurora-drift 32s ease-in-out infinite",
          animationDelay: "-12s",
        }}
      />
      <div
        className="absolute -bottom-1/4 left-1/3 h-[60vh] w-[60vh] rounded-full blur-[120px] will-change-transform"
        style={{
          background: "radial-gradient(circle at center, var(--aurora-3), transparent 60%)",
          animation: "aurora-drift 36s ease-in-out infinite",
          animationDelay: "-20s",
        }}
      />
    </div>
  );
}
