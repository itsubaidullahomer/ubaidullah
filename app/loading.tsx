export default function Loading() {
  return (
    <div className="flex min-h-[60svh] items-center justify-center">
      <div className="text-fg-muted flex items-center gap-2 text-sm">
        <span className="bg-accent h-1.5 w-1.5 animate-pulse rounded-full" />
        <span
          className="bg-accent h-1.5 w-1.5 animate-pulse rounded-full"
          style={{ animationDelay: "0.15s" }}
        />
        <span
          className="bg-accent h-1.5 w-1.5 animate-pulse rounded-full"
          style={{ animationDelay: "0.3s" }}
        />
      </div>
    </div>
  );
}
