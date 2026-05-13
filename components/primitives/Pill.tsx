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
        "glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium tracking-tight text-fg-muted",
        glow && "ring-accent",
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}

export function StatusPill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Pill
      className={cn("text-fg", className)}
      icon={
        <span className="relative inline-flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-[pulse-dot_2.4s_ease-in-out_infinite] rounded-full bg-accent opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
      }
    >
      {children}
    </Pill>
  );
}
