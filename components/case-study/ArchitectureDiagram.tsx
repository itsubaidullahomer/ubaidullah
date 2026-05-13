"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ArchitectureNode, ArchitectureEdge } from "@/content/types";
import { cn } from "@/lib/cn";

type Props = {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  className?: string;
};

const KIND_STYLES: Record<ArchitectureNode["kind"], { fill: string; ring: string; label: string }> = {
  client:   { fill: "rgba(199,242,132,0.10)", ring: "var(--accent)",     label: "Client" },
  service:  { fill: "rgba(255,255,255,0.05)", ring: "var(--fg-muted)",   label: "Service" },
  ai:       { fill: "rgba(184,84,251,0.12)",  ring: "#B854FB",           label: "AI" },
  data:     { fill: "rgba(75,107,251,0.12)",  ring: "#4B6BFB",           label: "Data" },
  external: { fill: "rgba(84,251,229,0.10)",  ring: "#54FBE5",           label: "External" },
};

export function ArchitectureDiagram({ nodes, edges, className }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  const isHighlighted = (nodeId: string) => {
    if (!hovered) return true;
    if (hovered === nodeId) return true;
    return edges.some(
      (e) => (e.from === hovered && e.to === nodeId) || (e.to === hovered && e.from === nodeId),
    );
  };

  const isEdgeHighlighted = (e: ArchitectureEdge) =>
    !hovered || e.from === hovered || e.to === hovered;

  return (
    <div className={cn("glass relative overflow-hidden rounded-[var(--radius-glass)] p-2 md:p-4", className)}>
      <div className="relative aspect-[16/9] w-full">
        <svg viewBox="0 0 100 56" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="3"
              markerHeight="3"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--fg-subtle)" />
            </marker>
          </defs>

          {edges.map((e, i) => {
            const from = nodes.find((n) => n.id === e.from);
            const to = nodes.find((n) => n.id === e.to);
            if (!from || !to) return null;
            const highlight = isEdgeHighlighted(e);
            return (
              <g key={i} opacity={highlight ? 1 : 0.15} style={{ transition: "opacity 200ms" }}>
                <line
                  x1={from.x}
                  y1={from.y * 0.56}
                  x2={to.x}
                  y2={to.y * 0.56}
                  stroke={highlight ? "var(--accent)" : "var(--fg-subtle)"}
                  strokeWidth={highlight ? 0.25 : 0.15}
                  strokeDasharray="0.6 0.4"
                  markerEnd="url(#arrow)"
                />
              </g>
            );
          })}
        </svg>

        {nodes.map((n) => {
          const style = KIND_STYLES[n.kind];
          const dim = !isHighlighted(n.id);
          return (
            <motion.button
              key={n.id}
              type="button"
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(n.id)}
              onBlur={() => setHovered(null)}
              animate={{ opacity: dim ? 0.3 : 1, scale: hovered === n.id ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              style={{
                left: `${n.x}%`,
                top: `${n.y}%`,
                backgroundColor: style.fill,
                borderColor: style.ring,
                color: "var(--fg)",
              }}
              aria-label={`${n.label}: ${style.label}`}
            >
              {n.label}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border px-2 pt-3 text-[11px]">
        {(Object.entries(KIND_STYLES) as Array<[ArchitectureNode["kind"], typeof KIND_STYLES["client"]]>).map(
          ([kind, s]) => (
            <div key={kind} className="flex items-center gap-1.5 text-fg-muted">
              <span
                className="h-2 w-2 rounded-full border"
                style={{ borderColor: s.ring, backgroundColor: s.fill }}
              />
              {s.label}
            </div>
          ),
        )}
        <div className="ml-auto text-fg-subtle">Hover to focus a service</div>
      </div>
    </div>
  );
}
