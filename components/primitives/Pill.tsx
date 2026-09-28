import { cn } from "@/lib/cn";

type PillProps = {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  glow?: boolean;
};

/** Mono metadata chip. Reads like a readout, not a badge. */
export function Pill({ children, className, icon, glow }: PillProps) {
  return (
    <span
      className={cn(
        "label-mono text-fg-muted border-border inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5",
        glow && "ring-accent",
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}

/** Pill with a live status dot. `tone` picks the dot colour. */
export function StatusPill({
  children,
  className,
  tone = "ok",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "ok" | "accent" | "warn";
}) {
  const color = tone === "ok" ? "var(--ok)" : tone === "warn" ? "var(--warn)" : "var(--accent)";
  return (
    <Pill
      className={cn("text-fg", className)}
      icon={
        <span className="relative inline-flex h-1.5 w-1.5">
          <span
            className="absolute inline-flex h-full w-full animate-[pulse-dot_2.4s_ease-in-out_infinite] rounded-full opacity-70"
            style={{ backgroundColor: color }}
          />
          <span
            className="relative inline-flex h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: color }}
          />
        </span>
      }
    >
      {children}
    </Pill>
  );
}
