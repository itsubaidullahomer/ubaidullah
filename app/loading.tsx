export default function Loading() {
  return (
    <div className="flex min-h-[60svh] items-center justify-center">
      <div className="flex items-center gap-2 text-sm text-fg-muted">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" style={{ animationDelay: "0.15s" }} />
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" style={{ animationDelay: "0.3s" }} />
      </div>
    </div>
  );
}
