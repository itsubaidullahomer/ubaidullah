import type { Metric } from "@/content/types";

export function MetricGrid({ metrics, accent }: { metrics: Metric[]; accent?: string }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
      {metrics.map((m, i) => (
        <div key={i} className="glass relative overflow-hidden rounded-2xl p-5 md:p-6">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent ?? "var(--accent)"}, transparent)`,
            }}
          />
          <div className="font-display text-fg text-3xl leading-none tracking-[-0.02em] md:text-4xl">
            {m.value}
          </div>
          <div className="text-fg mt-2 text-sm">{m.label}</div>
          {m.detail && (
            <div className="text-fg-muted mt-1 text-xs leading-relaxed break-words">{m.detail}</div>
          )}
        </div>
      ))}
    </div>
  );
}
