"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  Building2,
  Cloud,
  Database,
  Hand,
  MonitorSmartphone,
  Play,
  RotateCcw,
  Server,
  Sparkles,
  User,
  Volume2,
  Waypoints,
} from "lucide-react";
import type { ArchitectureEdge, ArchitectureFlow, ArchitectureNode } from "@/content/types";
import { cn } from "@/lib/cn";

type Props = {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  flows?: ArchitectureFlow[];
  className?: string;
};

type Icon = React.ComponentType<{ className?: string; strokeWidth?: number }>;
type Point = { x: number; y: number };

const KIND: Record<ArchitectureNode["kind"], { color: string; label: string; icon: Icon }> = {
  client: { color: "var(--accent)", label: "Client", icon: User },
  service: { color: "#7AC5FF", label: "Service", icon: Server },
  ai: { color: "#B854FB", label: "AI", icon: Sparkles },
  data: { color: "#54FBE5", label: "Data", icon: Database },
  external: { color: "#FFB07A", label: "External", icon: Cloud },
};

const NODE_ICON: Record<string, Icon> = {
  web: MonitorSmartphone,
  ws: Waypoints,
  crm: Building2,
  eleven: Volume2,
};

/** Inset so node cards never bleed past the canvas edge. */
const PAD_X = 0.075;
const PAD_Y = 0.13;

const HOP_MS = 950;
const AMBIENT_SPEED = 0.2; // path fractions per second

export function SystemMap({ nodes, edges, flows = [], className }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const edgePathRefs = useRef<Array<SVGPathElement | null>>([]);
  const dotRefs = useRef<Array<SVGCircleElement | null>>([]);
  const tracePathRef = useRef<SVGPathElement>(null);
  const packetRef = useRef<SVGGElement>(null);

  // Authored coordinates are stretched to fill the canvas, so a layout that
  // only uses part of the 0-100 range doesn't leave dead space.
  const homePositions = useMemo(() => {
    const xs = nodes.map((n) => n.x);
    const ys = nodes.map((n) => n.y);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const spanX = Math.max(...xs) - minX || 1;
    const spanY = Math.max(...ys) - minY || 1;
    return Object.fromEntries(
      nodes.map((n) => [
        n.id,
        { x: ((n.x - minX) / spanX) * 100, y: ((n.y - minY) / spanY) * 100 },
      ]),
    ) as Record<string, Point>;
  }, [nodes]);

  const [size, setSize] = useState({ w: 0, h: 0 });
  const [nodeBoxes, setNodeBoxes] = useState<Record<string, { w: number; h: number }>>({});
  const [positions, setPositions] = useState<Record<string, Point>>(homePositions);
  const [moved, setMoved] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [canDrag, setCanDrag] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);

  const [flowId, setFlowId] = useState<string | null>(null);
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [trail, setTrail] = useState<string[]>([]);

  const flow = flows.find((f) => f.id === flowId) ?? null;

  /* ── Measurement ─────────────────────────────────────────────── */

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!size.w) return;
    const next: Record<string, { w: number; h: number }> = {};
    for (const n of nodes) {
      const el = nodeRefs.current[n.id];
      if (el) next[n.id] = { w: el.offsetWidth, h: el.offsetHeight };
    }
    setNodeBoxes(next);
  }, [nodes, size.w, size.h]);

  useEffect(() => {
    setCanDrag(window.matchMedia("(pointer: fine)").matches);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ── Geometry ────────────────────────────────────────────────── */

  const toPx = useCallback(
    (p: Point): Point => ({
      x: (PAD_X + (p.x / 100) * (1 - 2 * PAD_X)) * size.w,
      y: (PAD_Y + (p.y / 100) * (1 - 2 * PAD_Y)) * size.h,
    }),
    [size.w, size.h],
  );

  const pathBetween = useCallback(
    (fromId: string, toId: string, endGap = 13): string => {
      const a = positions[fromId];
      const b = positions[toId];
      if (!a || !b || !size.w) return "";
      const pa = toPx(a);
      const pb = toPx(b);
      const dx = pb.x - pa.x;
      const dy = pb.y - pa.y;
      const boxA = nodeBoxes[fromId] ?? { w: 104, h: 46 };
      const boxB = nodeBoxes[toId] ?? { w: 104, h: 46 };
      const start = edgeOfBox(pa, boxA, dx, dy, 7);
      const end = edgeOfBox(pb, boxB, -dx, -dy, endGap);
      const bend = (end.x - start.x) * 0.45;
      return `M ${r(start.x)} ${r(start.y)} C ${r(start.x + bend)} ${r(start.y)}, ${r(end.x - bend)} ${r(end.y)}, ${r(end.x)} ${r(end.y)}`;
    },
    [positions, nodeBoxes, size.w, toPx],
  );

  const edgePaths = useMemo(
    () => edges.map((e) => pathBetween(e.from, e.to)),
    [edges, pathBetween],
  );

  /* ── Ambient flow ────────────────────────────────────────────── */

  useEffect(() => {
    if (reduced || !visible || !size.w) return;
    let raf = 0;
    let last = performance.now();
    let t = 0;
    const tick = (now: number) => {
      t += (now - last) / 1000;
      last = now;
      for (let i = 0; i < edges.length; i++) {
        const path = edgePathRefs.current[i];
        const dot = dotRefs.current[i];
        if (!path || !dot) continue;
        const len = path.getTotalLength();
        if (!len) continue;
        const frac = (t * AMBIENT_SPEED + i * 0.137) % 1;
        const p = path.getPointAtLength(frac * len);
        dot.setAttribute("transform", `translate(${p.x} ${p.y})`);
        dot.setAttribute("opacity", (Math.sin(Math.PI * frac) * 0.85).toFixed(3));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [edges.length, reduced, visible, size.w, size.h, edgePaths]);

  /* ── Request trace ───────────────────────────────────────────── */

  const play = useCallback((id: string) => {
    setFlowId(id);
    setTrail([]);
    setStep(0);
    setPlaying(true);
  }, []);

  useEffect(() => {
    if (!playing || !flow || !size.w) return;
    if (step < 0 || step >= flow.hops.length) return;

    const hop = flow.hops[step];
    const d = pathBetween(hop.from, hop.to);
    const pathEl = tracePathRef.current;
    const packet = packetRef.current;
    if (!d || !pathEl || !packet) return;

    pathEl.setAttribute("d", d);
    const len = pathEl.getTotalLength();
    pathEl.style.strokeDasharray = `${len}`;

    let raf = 0;
    const started = performance.now();
    const duration = reduced ? 240 : HOP_MS;

    const frame = (now: number) => {
      const p = Math.min(1, (now - started) / duration);
      const eased = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
      const pt = pathEl.getPointAtLength(eased * len);
      packet.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
      pathEl.style.strokeDashoffset = `${len * (1 - eased)}`;
      if (p < 1) {
        raf = requestAnimationFrame(frame);
        return;
      }
      setTrail((prev) => [...prev, d]);
      if (step + 1 < flow.hops.length) {
        setStep(step + 1);
      } else {
        setPlaying(false);
      }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [playing, flow, step, pathBetween, size.w, reduced]);

  // On narrow screens the canvas scrolls, so keep the hop being animated in view.
  useEffect(() => {
    if (!playing || !flow || step < 0 || !size.w) return;
    const scroller = scrollerRef.current;
    if (!scroller || scroller.scrollWidth <= scroller.clientWidth) return;
    const target = positions[flow.hops[Math.min(step, flow.hops.length - 1)].to];
    if (!target) return;
    scroller.scrollTo({
      left: Math.max(0, toPx(target).x - scroller.clientWidth / 2),
      behavior: reduced ? "auto" : "smooth",
    });
  }, [playing, flow, step, positions, size.w, toPx, reduced]);

  /* ── Drag ────────────────────────────────────────────────────── */

  function startDrag(e: React.PointerEvent, id: string) {
    if (!canDrag || !size.w) return;
    e.preventDefault();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setDragging(id);
    setPlaying(false);
    setTrail([]);
    setStep(-1);
  }

  function onDragMove(e: React.PointerEvent) {
    if (!dragging) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = ((e.clientX - rect.left) / rect.width - PAD_X) / (1 - 2 * PAD_X);
    const ny = ((e.clientY - rect.top) / rect.height - PAD_Y) / (1 - 2 * PAD_Y);
    setPositions((prev) => ({
      ...prev,
      [dragging]: { x: clamp(nx * 100), y: clamp(ny * 100) },
    }));
    setMoved(true);
  }

  function endDrag() {
    setDragging(null);
  }

  function resetLayout() {
    setPositions(homePositions);
    setMoved(false);
  }

  /* ── Derived highlight state ─────────────────────────────────── */

  const traceNodes = useMemo(() => {
    if (!flow || step < 0) return { active: null as string | null, visited: new Set<string>() };
    const visited = new Set<string>();
    for (let i = 0; i <= Math.min(step, flow.hops.length - 1); i++) {
      visited.add(flow.hops[i].from);
      if (i < step || !playing) visited.add(flow.hops[i].to);
    }
    const current = flow.hops[Math.min(step, flow.hops.length - 1)];
    return { active: playing ? current.to : current.to, visited };
  }, [flow, step, playing]);

  const tracing = flow !== null && step >= 0;

  const focusedNodes = useMemo(() => {
    if (!hovered) return null;
    const set = new Set<string>([hovered]);
    edges.forEach((e) => {
      if (e.from === hovered) set.add(e.to);
      if (e.to === hovered) set.add(e.from);
    });
    return set;
  }, [hovered, edges]);

  const hoveredNode = nodes.find((n) => n.id === hovered);
  const currentHop = flow && step >= 0 ? flow.hops[Math.min(step, flow.hops.length - 1)] : null;

  const info = hoveredNode
    ? { title: hoveredNode.label, body: hoveredNode.detail ?? KIND[hoveredNode.kind].label }
    : currentHop
      ? {
          title: playing ? `${step + 1}/${flow!.hops.length} · ${currentHop.label}` : flow!.label,
          body: playing
            ? `${nodeLabel(nodes, currentHop.from)} → ${nodeLabel(nodes, currentHop.to)}`
            : flow!.description,
        }
      : {
          title: "Trace a request",
          body: "Pick a scenario to watch a request travel through, or hover a service to see what it does.",
        };

  return (
    <div className={cn("glass relative overflow-hidden rounded-[var(--radius-glass)]", className)}>
      {/* Below md, ten labeled services can't fit without colliding — keep true
          width and let the canvas scroll instead of overlapping. */}
      <div ref={scrollerRef} className="overflow-x-auto">
        <div
          ref={containerRef}
          onPointerMove={onDragMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className="relative aspect-[16/9] w-full min-w-[44rem] md:min-w-0"
        >
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox={`0 0 ${size.w || 1} ${size.h || 1}`}
            aria-hidden
          >
            <defs>
              <pattern id="sm-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path
                  d="M 32 0 L 0 0 0 32"
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="1"
                  opacity="0.5"
                />
              </pattern>
              <filter id="sm-glow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <marker
                id="sm-arrow"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
              </marker>
            </defs>

            <rect width="100%" height="100%" fill="url(#sm-grid)" opacity="0.35" />

            {/* Base edges */}
            <g className={cn("transition-opacity duration-300", tracing && "opacity-30")}>
              {edges.map((e, i) => {
                const dim = focusedNodes
                  ? !(focusedNodes.has(e.from) && focusedNodes.has(e.to))
                  : false;
                const lit = focusedNodes ? !dim : false;
                return (
                  <g
                    key={`${e.from}-${e.to}`}
                    className="text-fg-subtle transition-opacity duration-200"
                    opacity={dim ? 0.12 : 1}
                  >
                    <path
                      ref={(el) => {
                        edgePathRefs.current[i] = el;
                      }}
                      d={edgePaths[i]}
                      fill="none"
                      stroke={lit ? "var(--accent)" : "currentColor"}
                      strokeWidth={lit ? 1.6 : 1.1}
                      strokeDasharray="5 5"
                      markerEnd="url(#sm-arrow)"
                    />
                    {!reduced && (
                      <circle
                        ref={(el) => {
                          dotRefs.current[i] = el;
                        }}
                        r={2.6}
                        fill={lit ? "var(--accent)" : "var(--fg-muted)"}
                        filter="url(#sm-glow)"
                        opacity={0}
                      />
                    )}
                  </g>
                );
              })}
            </g>

            {/* Completed hops of the current trace */}
            <g
              className={cn(
                "text-[color:var(--accent)] transition-opacity duration-200",
                hovered && "opacity-20",
              )}
            >
              {trail.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  opacity={0.55}
                  markerEnd="url(#sm-arrow)"
                />
              ))}
            </g>

            {/* Active hop + packet */}
            <g className={cn("text-[color:var(--accent)]", !tracing && "opacity-0")}>
              <path
                ref={tracePathRef}
                fill="none"
                stroke="currentColor"
                strokeWidth={2.4}
                filter="url(#sm-glow)"
                markerEnd="url(#sm-arrow)"
              />
              <g ref={packetRef} opacity={playing ? 1 : 0}>
                <circle r={9} fill="var(--accent)" opacity={0.18} />
                <circle r={4.5} fill="var(--accent)" filter="url(#sm-glow)" />
              </g>
            </g>
          </svg>

          {/* Nodes */}
          <div
            className={cn("transition-opacity duration-300", size.w ? "opacity-100" : "opacity-0")}
          >
            {nodes.map((n) => {
              const pos = positions[n.id] ?? { x: n.x, y: n.y };
              const px = toPx(pos);
              const meta = KIND[n.kind];
              const NodeIcon = NODE_ICON[n.id] ?? meta.icon;
              const isActive = tracing && traceNodes.active === n.id;
              const isVisited = tracing && traceNodes.visited.has(n.id);
              // Hovering takes over from the trace so the two highlight
              // systems never fight for the same node.
              const dim = focusedNodes
                ? !focusedNodes.has(n.id)
                : tracing && !isVisited && !isActive;

              return (
                <button
                  key={n.id}
                  ref={(el) => {
                    nodeRefs.current[n.id] = el;
                  }}
                  type="button"
                  onPointerDown={(e) => startDrag(e, n.id)}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(n.id)}
                  onBlur={() => setHovered(null)}
                  style={{
                    left: px.x,
                    top: px.y,
                    borderColor: isActive || isVisited ? meta.color : "var(--border)",
                    boxShadow: isActive
                      ? `0 0 0 1px ${meta.color}, 0 0 28px -6px ${meta.color}`
                      : undefined,
                    cursor: canDrag ? (dragging === n.id ? "grabbing" : "grab") : "default",
                  }}
                  className={cn(
                    "glass-strong focus-visible:ring-accent absolute flex -translate-x-1/2 -translate-y-1/2 touch-none items-center gap-2 rounded-xl border px-3 py-2 text-left transition-[opacity,transform,box-shadow] duration-200 focus:outline-none focus-visible:ring-2",
                    dim ? "opacity-25" : "opacity-100",
                    (hovered === n.id || isActive) && "scale-[1.06]",
                    dragging === n.id && "z-20",
                  )}
                  aria-label={`${n.label} — ${meta.label}. ${n.detail ?? ""}`}
                >
                  <span
                    className="grid h-6 w-6 shrink-0 place-items-center rounded-md"
                    style={{
                      backgroundColor: `color-mix(in oklab, ${meta.color} 18%, transparent)`,
                      color: meta.color,
                    }}
                  >
                    <NodeIcon className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                  <span className="min-w-0">
                    <span className="text-fg block text-[12px] leading-tight font-medium whitespace-nowrap">
                      {n.label}
                    </span>
                    {n.sub && (
                      <span className="text-fg-subtle block font-mono text-[9px] leading-tight whitespace-nowrap uppercase">
                        {n.sub}
                      </span>
                    )}
                  </span>
                  {isActive && playing && (
                    <span
                      className="absolute -inset-px rounded-xl"
                      style={{ boxShadow: `0 0 0 1px ${meta.color}` }}
                      aria-hidden
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Info strip */}
      <div className="border-border flex min-h-[4.25rem] items-start gap-3 border-t px-4 py-3 md:px-5">
        <span
          className={cn(
            "mt-1.5 h-2 w-2 shrink-0 rounded-full transition-colors",
            playing ? "bg-accent animate-pulse" : "bg-fg-subtle",
          )}
        />
        <div className="min-w-0">
          <div className="text-fg text-[13px] font-medium">{info.title}</div>
          <p className="text-fg-muted mt-0.5 text-[12px] leading-relaxed">{info.body}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="border-border flex flex-wrap items-center gap-2 border-t px-4 py-3 md:px-5">
        {flows.map((f) => {
          const on = flowId === f.id;
          return (
            <button
              key={f.id}
              onClick={() => play(f.id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-all",
                on
                  ? "border-accent text-accent bg-[var(--glass-highlight)]"
                  : "border-border text-fg-muted hover:border-fg-muted hover:text-fg",
              )}
            >
              {on && playing ? (
                <span className="bg-accent h-1.5 w-1.5 animate-pulse rounded-full" />
              ) : (
                <Play className="h-3 w-3" strokeWidth={2.5} />
              )}
              {f.label}
            </button>
          );
        })}

        <div className="ml-auto flex items-center gap-3">
          {moved && (
            <button
              onClick={resetLayout}
              className="text-fg-muted hover:text-fg inline-flex items-center gap-1.5 text-[11px] transition-colors"
            >
              <RotateCcw className="h-3 w-3" strokeWidth={2} />
              Reset layout
            </button>
          )}
          {canDrag && (
            <span className="text-fg-subtle hidden items-center gap-1.5 text-[11px] lg:inline-flex">
              <Hand className="h-3 w-3" strokeWidth={2} />
              Drag any service
            </span>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="border-border flex flex-wrap items-center gap-x-4 gap-y-2 border-t px-4 py-2.5 text-[11px] md:px-5">
        {Object.entries(KIND).map(([kind, k]) => (
          <span key={kind} className="text-fg-muted flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: `color-mix(in oklab, ${k.color} 55%, transparent)` }}
            />
            {k.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── helpers ───────────────────────────────────────────────────── */

function edgeOfBox(
  center: Point,
  box: { w: number; h: number },
  dx: number,
  dy: number,
  gap: number,
): Point {
  const hw = box.w / 2 + gap;
  const hh = box.h / 2 + gap;
  const t = Math.min(hw / (Math.abs(dx) || 1e-6), hh / (Math.abs(dy) || 1e-6));
  return { x: center.x + dx * t, y: center.y + dy * t };
}

function nodeLabel(nodes: ArchitectureNode[], id: string) {
  return nodes.find((n) => n.id === id)?.label ?? id;
}

const clamp = (v: number) => Math.max(0, Math.min(100, v));
const r = (v: number) => Math.round(v * 10) / 10;
