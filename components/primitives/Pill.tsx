import { cn } from "@/lib/cn";

type PillProps = {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  glow?: boolean;
};

export function Pill({ children, className, icon, glow }: PillProps) {
  return (
    <span
      className={cn(
        "glass text-fg-muted inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium tracking-tight",
        glow && "ring-accent",
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}

export function StatusPill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Pill
      className={cn("text-fg", className)}
      icon={
        <span className="relative inline-flex h-2 w-2">
          <span className="bg-accent absolute inline-flex h-full w-full animate-[pulse-dot_2.4s_ease-in-out_infinite] rounded-full opacity-70" />
          <span className="bg-accent relative inline-flex h-2 w-2 rounded-full" />
        </span>
      }
    >
      {children}
    </Pill>
  );
}
