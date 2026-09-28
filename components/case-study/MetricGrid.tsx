import type { Metric } from "@/content/types";
import { CountUp } from "@/components/motion/CountUp";

export function MetricGrid({ metrics, accent }: { metrics: Metric[]; accent?: string }) {
  return (
    <div className="surface divide-border grid grid-cols-2 divide-x divide-y overflow-hidden rounded-xl md:grid-cols-4 md:divide-y-0">
      {metrics.map((m, i) => (
        <div key={i} className="spotlight relative p-5 md:p-6">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background: `linear-gradient(90deg, ${accent ?? "var(--accent)"}, transparent 80%)`,
              opacity: 0.7,
            }}
          />
          <div className="label-mono text-fg-subtle">0{i + 1}</div>
          <div className="font-display text-fg mt-3 text-3xl leading-none tracking-[-0.02em] md:text-4xl">
            <CountUp value={m.value} />
          </div>
          <div className="text-fg mt-2.5 text-sm">{m.label}</div>
          {m.detail && (
            <div className="text-fg-muted mt-1 text-xs leading-relaxed break-words">{m.detail}</div>
          )}
        </div>
      ))}
    </div>
  );
}
