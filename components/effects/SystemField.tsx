"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/* ────────────────────────────────────────────────────────────────────
   SystemField — the hero background.

   A small request-routing simulation: clients send requests to an API
   node, which either answers from cache or forwards to one of three
   model providers. Providers have real health state; one goes down
   every so often (or when you click it) and in-flight requests to it
   bounce, get rerouted to a healthy provider, and finish streaming
   back. Nothing here is a keyframe. Every dot is a request with a
   lifecycle, and the readout at the bottom is measured from them.

   Canvas draws paths, packets and pulses. Nodes are real DOM so their
   labels use the site fonts and the model nodes are focusable buttons.
   ──────────────────────────────────────────────────────────────────── */

type NodeKind = "client" | "edge" | "cache" | "data" | "model";
type NodeDef = { id: string; kind: NodeKind; label: string; sub?: string; x: number; y: number };
type Layout = { nodes: NodeDef[]; edges: Array<[string, string]> };

const MODELS = [
  { id: "openai", label: "openai", sub: "gpt-5.2" },
  { id: "anthropic", label: "anthropic", sub: "claude-sonnet-5" },
  { id: "google", label: "google", sub: "gemini-3-flash" },
] as const;

const EDGES: Array<[string, string]> = [
  ["you", "api"],
  ["users", "api"],
  ["api", "cache"],
  ["api", "db"],
  ["api", "openai"],
  ["api", "anthropic"],
  ["api", "google"],
];

/** Wide layout: copy sits on the left, so the graph keeps to the right. */
const WIDE: Layout = {
  nodes: [
    { id: "you", kind: "client", label: "you", sub: "this session", x: 0.06, y: 0.12 },
    { id: "users", kind: "client", label: "tututor.ai", sub: "17k users", x: 0.58, y: 0.9 },
    { id: "api", kind: "edge", label: "api", sub: "node · ws", x: 0.68, y: 0.5 },
    { id: "cache", kind: "cache", label: "cache", sub: "redis", x: 0.8, y: 0.16 },
    { id: "db", kind: "data", label: "db", sub: "mongo", x: 0.8, y: 0.84 },
    { id: "openai", kind: "model", label: "openai", sub: "gpt-5.2", x: 0.93, y: 0.24 },
    { id: "anthropic", kind: "model", label: "anthropic", sub: "claude-sonnet-5", x: 0.93, y: 0.5 },
    { id: "google", kind: "model", label: "google", sub: "gemini-3-flash", x: 0.93, y: 0.76 },
  ],
  edges: EDGES,
};

/** Compact layout: the field is its own panel under the copy. */
const COMPACT: Layout = {
  nodes: [
    { id: "you", kind: "client", label: "you", x: 0.08, y: 0.3 },
    { id: "users", kind: "client", label: "17k users", x: 0.08, y: 0.7 },
    { id: "api", kind: "edge", label: "api", x: 0.4, y: 0.5 },
    { id: "cache", kind: "cache", label: "cache", x: 0.6, y: 0.14 },
    { id: "db", kind: "data", label: "db", x: 0.6, y: 0.86 },
    { id: "openai", kind: "model", label: "openai", x: 0.88, y: 0.22 },
    { id: "anthropic", kind: "model", label: "anthropic", x: 0.88, y: 0.5 },
    { id: "google", kind: "model", label: "google", x: 0.88, y: 0.78 },
  ],
  edges: EDGES,
};

// Mirrors the tokens in globals.css. Canvas can't read CSS variables
// per frame cheaply, so they live here too.
const BONE = "242, 241, 236";
const ACCENT = "255, 77, 28";
const OK = "79, 227, 163";
const WARN = "255, 196, 77";

type Point = { x: number; y: number };
type Path = { pts: Point[]; cum: number[]; len: number };

type Health = "ok" | "slow" | "down";
type ModelState = { health: Health; until: number; latency: number };

type Leg =
  | { kind: "move"; from: string; to: string; dur: number; stream?: boolean; dim?: boolean }
  | { kind: "dwell"; at: string; dur: number; pulse?: "think" | "fail" | "cache" };

type Stage = "start" | "atApi" | "atModel" | "done";

type Req = {
  id: number;
  born: number;
  stage: Stage;
  legs: Leg[];
  li: number;
  t: number;
  failed: boolean;
  retries: number;
  model?: string;
  tried: string[];
};

type Pulse = { x: number; y: number; start: number; dur: number; rgb: string };

type Stats = {
  rps: number;
  p95: number;
  errorPct: number;
  rerouted: number;
  live: number;
};

const CACHE_RATE = 0.22;
const MAX_LIVE = 22;
const DPR_CAP = 2;

function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function buildPath(a: Point, b: Point): Path {
  const N = 48;
  const mx = a.x + (b.x - a.x) * 0.5;
  const pts: Point[] = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const mt = 1 - t;
    // Cubic bezier with horizontal tangents at both ends.
    const x = mt * mt * mt * a.x + 3 * mt * mt * t * mx + 3 * mt * t * t * mx + t * t * t * b.x;
    const y = mt * mt * mt * a.y + 3 * mt * mt * t * a.y + 3 * mt * t * t * b.y + t * t * t * b.y;
    pts.push({ x, y });
  }
  const cum = [0];
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i].x - pts[i - 1].x;
    const dy = pts[i].y - pts[i - 1].y;
    cum.push(cum[i - 1] + Math.hypot(dx, dy));
  }
  return { pts, cum, len: cum[cum.length - 1] };
}

/** Point at arc-length fraction u ∈ [0,1]. */
function along(p: Path, u: number): Point {
  const target = Math.min(Math.max(u, 0), 1) * p.len;
  let i = 1;
  while (i < p.cum.length - 1 && p.cum[i] < target) i++;
  const seg = p.cum[i] - p.cum[i - 1] || 1;
  const k = (target - p.cum[i - 1]) / seg;
  const a = p.pts[i - 1];
  const b = p.pts[i];
  return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k };
}

export function SystemField({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [layoutName, setLayoutName] = useState<"wide" | "compact">("wide");
  const [models, setModels] = useState<Record<string, ModelState>>(() =>
    Object.fromEntries(MODELS.map((m) => [m.id, { health: "ok", until: 0, latency: 0 }])),
  );
  const [stats, setStats] = useState<Stats>({ rps: 0, p95: 0, errorPct: 0, rerouted: 0, live: 0 });
  const [reduced, setReduced] = useState(false);

  // Everything the animation loop touches lives in refs so the loop
  // never closes over stale React state.
  const sim = useRef({
    w: 0,
    h: 0,
    layout: WIDE,
    paths: new Map<string, Path>(),
    nodePos: new Map<string, Point>(),
    reqs: [] as Req[],
    pulses: [] as Pulse[],
    models: {} as Record<string, ModelState>,
    nextId: 1,
    spawnAt: 0,
    hotUntil: 0,
    outageAt: 0,
    done: [] as Array<{ at: number; ms: number; failed: boolean; rerouted: boolean }>,
    rerouted: 0,
    running: true,
    lastStats: 0,
    lastFrame: 0,
  });

  // Seed model state in the ref once.
  useEffect(() => {
    sim.current.models = Object.fromEntries(
      MODELS.map((m) => [m.id, { health: "ok" as Health, until: 0, latency: 0 }]),
    );
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  /** Take a provider offline for a while (scheduler or a click). */
  const kill = (id: string, ms = 5000) => {
    const s = sim.current;
    const now = performance.now();
    s.models[id] = { ...s.models[id], health: "down", until: now + ms };
    const p = s.nodePos.get(id);
    if (p) s.pulses.push({ x: p.x, y: p.y, start: now, dur: 900, rgb: ACCENT });
    setModels({ ...s.models });
  };

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const s = sim.current;

    /* ── sizing ─────────────────────────────────────────────── */
    function measure() {
      if (!wrap || !canvas || !ctx) return;
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      s.w = rect.width;
      s.h = rect.height;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const compact = rect.width < 900;
      s.layout = compact ? COMPACT : WIDE;
      setLayoutName(compact ? "compact" : "wide");

      s.nodePos.clear();
      for (const n of s.layout.nodes) s.nodePos.set(n.id, { x: n.x * s.w, y: n.y * s.h });
      s.paths.clear();
      for (const [a, b] of s.layout.edges) {
        const pa = s.nodePos.get(a)!;
        const pb = s.nodePos.get(b)!;
        s.paths.set(`${a}>${b}`, buildPath(pa, pb));
        s.paths.set(`${b}>${a}`, buildPath(pb, pa));
      }
    }
    measure();
    const ro = new ResizeObserver(() => measure());
    ro.observe(wrap);

    /* ── request planning ───────────────────────────────────── */
    function pickModel(exclude: string[]): string | null {
      const now = performance.now();
      const healthy = MODELS.map((m) => m.id).filter(
        (id) =>
          !exclude.includes(id) && !(s.models[id].health === "down" && s.models[id].until > now),
      );
      if (healthy.length === 0) return null;
      return healthy[Math.floor(Math.random() * healthy.length)];
    }

    function plan(r: Req) {
      const now = performance.now();
      r.legs = [];
      r.li = 0;
      r.t = 0;
      if (r.stage === "start") {
        const from = Math.random() < 0.3 ? "you" : "users";
        r.legs.push({ kind: "move", from, to: "api", dur: rand(520, 720) });
        r.stage = "atApi";
        return;
      }
      if (r.stage === "atApi") {
        if (Math.random() < CACHE_RATE) {
          r.legs.push(
            { kind: "dwell", at: "api", dur: 90 },
            { kind: "move", from: "api", to: "cache", dur: 300, dim: true },
            { kind: "dwell", at: "cache", dur: 140, pulse: "cache" },
            { kind: "move", from: "cache", to: "api", dur: 300, dim: true },
            { kind: "move", from: "api", to: "you", dur: 480, dim: true },
          );
          r.stage = "done";
          return;
        }
        const m = pickModel(r.tried);
        if (!m) {
          // Every provider is down: serve the cached answer, flagged.
          r.failed = true;
          r.legs.push(
            { kind: "dwell", at: "api", dur: 220, pulse: "fail" },
            { kind: "move", from: "api", to: "cache", dur: 280 },
            { kind: "move", from: "cache", to: "api", dur: 280 },
            { kind: "move", from: "api", to: "you", dur: 480 },
          );
          r.stage = "done";
          return;
        }
        r.model = m;
        r.tried.push(m);
        r.legs.push(
          { kind: "dwell", at: "api", dur: Math.random() < 0.35 ? 60 : 0 },
          { kind: "move", from: "api", to: m, dur: rand(480, 620) },
        );
        r.stage = "atModel";
        return;
      }
      if (r.stage === "atModel") {
        const m = r.model!;
        const state = s.models[m];
        const down = state.health === "down" && state.until > now;
        if (down) {
          r.failed = true;
          r.retries += 1;
          s.rerouted += 1;
          r.legs.push(
            { kind: "dwell", at: m, dur: 280, pulse: "fail" },
            { kind: "move", from: m, to: "api", dur: 420 },
          );
          r.stage = "atApi";
          return;
        }
        const slow = state.health === "slow" && state.until > now;
        const think = rand(260, 780) * (slow ? 2.2 : 1);
        s.models[m].latency = Math.round(s.models[m].latency * 0.7 + think * 0.3);
        r.legs.push(
          { kind: "dwell", at: m, dur: think, pulse: "think" },
          { kind: "move", from: m, to: "api", dur: 560, stream: true },
          {
            kind: "move",
            from: "api",
            to: r.tried.length && Math.random() < 0.3 ? "you" : "users",
            dur: 520,
            stream: true,
          },
        );
        r.stage = "done";
      }
    }

    function spawn(now: number) {
      const r: Req = {
        id: s.nextId++,
        born: now,
        stage: "start",
        legs: [],
        li: 0,
        t: 0,
        failed: false,
        retries: 0,
        tried: [],
      };
      plan(r);
      s.reqs.push(r);
    }

    /* ── scheduler: outages and recoveries ──────────────────── */
    function schedule(now: number) {
      if (s.outageAt === 0) s.outageAt = now + rand(6000, 9000);
      if (now >= s.outageAt) {
        const id = MODELS[Math.floor(Math.random() * MODELS.length)].id;
        const cur = s.models[id];
        if (!(cur.health !== "ok" && cur.until > now)) {
          const slow = Math.random() < 0.35;
          s.models[id] = {
            ...cur,
            health: slow ? "slow" : "down",
            until: now + (slow ? rand(3500, 6000) : rand(3000, 4500)),
          };
          const p = s.nodePos.get(id);
          if (p && !slow) s.pulses.push({ x: p.x, y: p.y, start: now, dur: 900, rgb: ACCENT });
          setModels({ ...s.models });
        }
        s.outageAt = now + rand(8000, 14000);
      }
      // Recover expired states.
      let changed = false;
      for (const id of Object.keys(s.models)) {
        const m = s.models[id];
        if (m.health !== "ok" && m.until <= now) {
          s.models[id] = { ...m, health: "ok", until: 0 };
          changed = true;
        }
      }
      if (changed) setModels({ ...s.models });
    }

    /* ── stats ───────────────────────────────────────────────── */
    function publishStats(now: number) {
      const win = s.done.filter((d) => now - d.at < 12000);
      s.done = win;
      const lat = win.map((d) => d.ms).sort((a, b) => a - b);
      const p95 = lat.length ? lat[Math.min(lat.length - 1, Math.floor(lat.length * 0.95))] : 0;
      const errors = win.filter((d) => d.failed).length;
      setStats({
        rps: Math.round((win.length / 12) * 10) / 10,
        p95: Math.round(p95),
        errorPct: win.length ? Math.round((errors / win.length) * 1000) / 10 : 0,
        rerouted: s.rerouted,
        live: s.reqs.length,
      });
    }

    /* ── drawing ─────────────────────────────────────────────── */
    function drawPaths() {
      if (!ctx) return;
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${BONE}, 0.09)`;
      for (const [a, b] of s.layout.edges) {
        const p = s.paths.get(`${a}>${b}`)!;
        ctx.beginPath();
        ctx.moveTo(p.pts[0].x, p.pts[0].y);
        for (let i = 1; i < p.pts.length; i++) ctx.lineTo(p.pts[i].x, p.pts[i].y);
        ctx.stroke();
      }
    }

    function drawDot(p: Point, r: number, rgb: string, a: number) {
      if (!ctx) return;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb}, ${a})`;
      ctx.fill();
    }

    function drawTrail(path: Path, u: number, rgb: string, alpha: number, len = 0.14) {
      if (!ctx) return;
      const steps = 10;
      for (let i = 0; i < steps; i++) {
        const u0 = u - (len * (i + 1)) / steps;
        const u1 = u - (len * i) / steps;
        if (u1 <= 0) break;
        const a = along(path, Math.max(u0, 0));
        const b = along(path, u1);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(${rgb}, ${alpha * (1 - i / steps)})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    }

    function drawFrame(now: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, s.w, s.h);
      drawPaths();

      // Pulses at nodes (thinking, failing, cache hits).
      s.pulses = s.pulses.filter((p) => now - p.start < p.dur);
      for (const p of s.pulses) {
        const k = (now - p.start) / p.dur;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 10 + k * 26, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${p.rgb}, ${(1 - k) * 0.55})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Packets.
      for (const r of s.reqs) {
        const leg = r.legs[r.li];
        if (!leg || leg.kind !== "move") continue;
        const path = s.paths.get(`${leg.from}>${leg.to}`);
        if (!path) continue;
        const u = Math.min(r.t / leg.dur, 1);
        const rgb = r.failed ? ACCENT : BONE;
        const alpha = leg.dim ? 0.35 : r.failed ? 0.95 : 0.8;
        if (leg.stream) {
          // A streamed answer: a burst of token dots with a shared trail.
          drawTrail(path, u, rgb, alpha * 0.6, 0.2);
          for (let i = 0; i < 5; i++) {
            const ui = u - i * 0.045;
            if (ui < 0) break;
            drawDot(along(path, ui), i === 0 ? 2.2 : 1.5, rgb, alpha * (1 - i * 0.15));
          }
        } else {
          drawTrail(path, u, rgb, alpha * 0.5);
          drawDot(along(path, u), leg.dim ? 1.6 : 2.2, rgb, alpha);
        }
      }
    }

    /* ── loop ─────────────────────────────────────────────────── */
    let raf = 0;
    function tick(now: number) {
      raf = requestAnimationFrame(tick);
      if (!s.running) return;
      const dt = Math.min(now - (s.lastFrame || now), 50);
      s.lastFrame = now;

      schedule(now);

      // Spawn. Hovering the field spikes the load.
      const hot = now < s.hotUntil;
      const interval = hot ? 260 : 820;
      if (now >= s.spawnAt && s.reqs.length < MAX_LIVE) {
        spawn(now);
        s.spawnAt = now + interval * rand(0.7, 1.3);
      }

      // Advance requests.
      for (const r of s.reqs) {
        let leg = r.legs[r.li];
        if (!leg) continue;
        r.t += dt;
        // Fire a pulse at the start of a dwell.
        if (leg.kind === "dwell" && leg.pulse && r.t - dt <= 0) {
          const p = s.nodePos.get(leg.at);
          if (p) {
            s.pulses.push({
              x: p.x,
              y: p.y,
              start: now,
              dur: leg.pulse === "think" ? leg.dur : 700,
              rgb: leg.pulse === "fail" ? ACCENT : leg.pulse === "cache" ? OK : BONE,
            });
          }
        }
        while (leg && r.t >= leg.dur) {
          r.t -= leg.dur;
          r.li += 1;
          leg = r.legs[r.li];
          if (!leg) {
            if (r.stage === "done") {
              s.done.push({
                at: now,
                ms: now - r.born,
                failed: r.failed && r.retries === 0 ? true : false,
                rerouted: r.retries > 0,
              });
              r.li = -1; // mark finished
            } else {
              plan(r);
              leg = r.legs[r.li];
            }
          }
        }
      }
      s.reqs = s.reqs.filter((r) => r.li !== -1);

      drawFrame(now);

      if (now - s.lastStats > 400) {
        s.lastStats = now;
        publishStats(now);
      }
    }

    /* ── reduced motion: one static frame ───────────────────── */
    if (reduced) {
      // Scatter a few packets along the paths so it still reads as live.
      const keys = Array.from(s.paths.keys());
      ctx.clearRect(0, 0, s.w, s.h);
      drawPaths();
      for (let i = 0; i < 12; i++) {
        const p = s.paths.get(keys[(i * 5) % keys.length])!;
        drawDot(along(p, ((i * 37) % 100) / 100), 2, i % 4 === 0 ? ACCENT : BONE, 0.7);
      }
      return () => ro.disconnect();
    }

    // Pause when off-screen or the tab is hidden.
    const io = new IntersectionObserver(
      ([entry]) => {
        s.running = entry.isIntersecting && !document.hidden;
        if (s.running) s.lastFrame = 0;
      },
      { threshold: 0.05 },
    );
    io.observe(wrap);
    const onVis = () => {
      s.running = !document.hidden;
      if (s.running) s.lastFrame = 0;
    };
    document.addEventListener("visibilitychange", onVis);

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const layout = layoutName === "wide" ? WIDE : COMPACT;
  const now = typeof performance !== "undefined" ? performance.now() : 0;

  return (
    <div
      ref={wrapRef}
      className={cn("relative", className)}
      onPointerMove={() => {
        sim.current.hotUntil = performance.now() + 900;
      }}
    >
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />

      {/* Nodes */}
      {layout.nodes.map((n) => {
        const isModel = n.kind === "model";
        const m = isModel ? models[n.id] : undefined;
        const down = m?.health === "down" && m.until > now;
        const slow = m?.health === "slow" && m.until > now;
        const dot = down ? `rgb(${ACCENT})` : slow ? `rgb(${WARN})` : `rgb(${OK})`;
        const common =
          "absolute -translate-x-1/2 -translate-y-1/2 select-none rounded-md border px-2.5 py-1.5 text-left transition-[border-color,background-color,transform] duration-200";
        const style = { left: `${n.x * 100}%`, top: `${n.y * 100}%` };

        if (isModel) {
          return (
            <button
              key={n.id}
              type="button"
              style={style}
              onClick={() => kill(n.id)}
              aria-label={`Take ${n.label} offline for a few seconds`}
              title="Click to take this provider down"
              className={cn(
                common,
                "surface hover:border-border-strong hover:bg-bg-raised cursor-pointer",
                down && "border-accent/60",
              )}
            >
              <span className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor: dot,
                    boxShadow: down ? `0 0 10px rgb(${ACCENT})` : undefined,
                  }}
                />
                <span className="label-mono text-fg leading-none">{n.label}</span>
              </span>
              {n.sub && (
                <span className="label-mono text-fg-subtle mt-1 block leading-none tracking-[0.08em] normal-case">
                  {down ? "offline · rerouting" : slow ? "degraded" : n.sub}
                </span>
              )}
            </button>
          );
        }

        return (
          <div
            key={n.id}
            style={style}
            className={cn(
              common,
              n.kind === "edge" ? "surface border-border-strong" : "border-border bg-bg/70",
            )}
          >
            <span className="flex items-center gap-2">
              <span
                className={cn(
                  "h-1.5 w-1.5 shrink-0 rounded-full",
                  n.kind === "client"
                    ? "bg-fg-muted"
                    : n.kind === "edge"
                      ? "bg-fg"
                      : "bg-fg-subtle",
                )}
              />
              <span className="label-mono text-fg-muted leading-none">{n.label}</span>
            </span>
            {n.sub && (
              <span className="label-mono text-fg-subtle mt-1 block leading-none tracking-[0.08em] normal-case">
                {n.sub}
              </span>
            )}
          </div>
        );
      })}

      {/* Readout */}
      <div
        aria-live="off"
        className="text-fg-subtle pointer-events-none absolute right-0 bottom-0 flex flex-wrap items-center justify-end gap-x-3 gap-y-1 px-1 py-1 font-mono text-[11px] tabular-nums"
      >
        <span className="text-fg-muted">sim</span>
        <span aria-hidden>·</span>
        <span>
          <span className="text-fg-muted">{stats.rps.toFixed(1)}</span> req/s
        </span>
        <span aria-hidden>·</span>
        <span>
          p95 <span className="text-fg-muted">{stats.p95}</span> ms
        </span>
        <span aria-hidden>·</span>
        <span>
          errors{" "}
          <span className={stats.errorPct > 0 ? "text-accent" : "text-fg-muted"}>
            {stats.errorPct}%
          </span>
        </span>
        <span aria-hidden>·</span>
        <span>
          rerouted <span className="text-fg-muted">{stats.rerouted}</span>
        </span>
        <span className="hidden sm:inline" aria-hidden>
          ·
        </span>
        <span className="hidden sm:inline">click a provider to kill it</span>
      </div>
    </div>
  );
}
