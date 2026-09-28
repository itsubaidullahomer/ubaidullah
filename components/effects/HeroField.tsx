"use client";

import { useEffect, useRef } from "react";

/** Product names shown faintly beside some nodes: the background is the real system. */
const LABELS = [
  "api",
  "edunova",
  "tutor.ai",
  "familias",
  "profesores",
  "alumnos",
  "mongo",
  "sockets",
];

const NODE_COUNT = 26;

type Node = {
  ax: number;
  ay: number;
  x: number;
  y: number;
  phase: number;
  speed: number;
  r: number;
  label?: string;
};
type Packet = { from: number; to: number; t: number; dur: number };

/** Small deterministic PRNG so the layout is the same on every visit. */
function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

/**
 * The home hero's background: a dot grid that lights up around the cursor,
 * a slow network of nodes with data packets travelling between them, and a
 * horizon glow at the bottom. Canvas + CSS only; pauses when off screen and
 * holds still for reduced motion.
 */
export function HeroField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rand = rng(7);

    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let edges: Array<[number, number]> = [];
    let neighbours: number[][] = [];
    let packets: Packet[] = [];
    let accent = "#CDFF3A";
    let fg = "#FFFFFF";
    const mouse = { x: -9999, y: -9999 };

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      accent = cs.getPropertyValue("--accent").trim() || accent;
      fg = cs.getPropertyValue("--fg").trim() || fg;
    };

    const build = () => {
      const r = rng(7);
      nodes = Array.from({ length: NODE_COUNT }, (_, i) => {
        // Keep most nodes away from the headline on the left.
        const ax = i % 3 === 0 ? 0.05 + r() * 0.4 : 0.42 + r() * 0.56;
        const ay = 0.08 + r() * 0.84;
        return {
          ax,
          ay,
          x: ax * w,
          y: ay * h,
          phase: r() * Math.PI * 2,
          speed: 0.15 + r() * 0.25,
          r: 1.2 + r() * 1.4,
          label: i % 3 === 1 ? LABELS[(i / 3) | 0] : undefined,
        };
      });
      // Each node links to its two nearest neighbours: a stable graph, no flicker.
      const set = new Set<string>();
      edges = [];
      nodes.forEach((a, i) => {
        const near = nodes
          .map((b, j) => ({ j, d: (a.ax - b.ax) ** 2 * (w / h) ** 2 + (a.ay - b.ay) ** 2 }))
          .filter((o) => o.j !== i)
          .sort((p, q) => p.d - q.d)
          .slice(0, 2);
        near.forEach(({ j }) => {
          const key = i < j ? `${i}-${j}` : `${j}-${i}`;
          if (!set.has(key)) {
            set.add(key);
            edges.push([i, j]);
          }
        });
      });
      neighbours = nodes.map(() => []);
      edges.forEach(([a, b]) => {
        neighbours[a].push(b);
        neighbours[b].push(a);
      });
      packets = Array.from({ length: 9 }, () => {
        const [a, b] = edges[(rand() * edges.length) | 0];
        return { from: a, to: b, t: rand(), dur: 1.4 + rand() * 1.6 };
      });
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const alpha = (hex: string, a: number) => {
      if (hex.startsWith("#") && (hex.length === 7 || hex.length === 4)) {
        const full = hex.length === 4 ? "#" + [...hex.slice(1)].map((c) => c + c).join("") : hex;
        const n = parseInt(full.slice(1), 16);
        return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
      }
      return hex;
    };

    let last = performance.now();
    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const time = now / 1000;
      ctx.clearRect(0, 0, w, h);

      // Nodes drift around their anchors and lean gently towards the cursor.
      for (const n of nodes) {
        const tx = n.ax * w + Math.cos(time * n.speed + n.phase) * 14;
        const ty = n.ay * h + Math.sin(time * n.speed * 1.3 + n.phase) * 10;
        const dx = mouse.x - tx;
        const dy = mouse.y - ty;
        const d = Math.hypot(dx, dy);
        const pull = d < 220 ? (1 - d / 220) * 18 : 0;
        n.x = tx + (d ? (dx / d) * pull : 0);
        n.y = ty + (d ? (dy / d) * pull : 0);
      }

      // Edges, brighter near the cursor.
      for (const [a, b] of edges) {
        const A = nodes[a];
        const B = nodes[b];
        const mx = (A.x + B.x) / 2;
        const my = (A.y + B.y) / 2;
        const near = Math.max(0, 1 - Math.hypot(mouse.x - mx, mouse.y - my) / 260);
        ctx.strokeStyle = near > 0 ? alpha(accent, 0.1 + near * 0.35) : alpha(fg, 0.07);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.stroke();
      }

      // Nodes and their labels.
      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
      for (const n of nodes) {
        const near = Math.max(0, 1 - Math.hypot(mouse.x - n.x, mouse.y - n.y) / 200);
        ctx.fillStyle = near > 0 ? alpha(accent, 0.5 + near * 0.5) : alpha(fg, 0.28);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + near * 1.5, 0, Math.PI * 2);
        ctx.fill();
        if (n.label) {
          ctx.fillStyle = alpha(fg, 0.22 + near * 0.5);
          ctx.fillText(n.label, n.x + 8, n.y + 3);
        }
      }

      // Packets: data travelling through the system.
      for (const p of packets) {
        if (!reduced) p.t += dt / p.dur;
        if (p.t >= 1) {
          const next = neighbours[p.to];
          p.from = p.to;
          p.to = next[(rand() * next.length) | 0] ?? p.from;
          p.t = 0;
          p.dur = 1.4 + rand() * 1.6;
        }
        const A = nodes[p.from];
        const B = nodes[p.to];
        const e = p.t < 0.5 ? 2 * p.t * p.t : 1 - (-2 * p.t + 2) ** 2 / 2;
        const x = A.x + (B.x - A.x) * e;
        const y = A.y + (B.y - A.y) * e;
        const tail = Math.max(0, e - 0.12);
        const grad = ctx.createLinearGradient(
          A.x + (B.x - A.x) * tail,
          A.y + (B.y - A.y) * tail,
          x,
          y,
        );
        grad.addColorStop(0, alpha(accent, 0));
        grad.addColorStop(1, alpha(accent, 0.9));
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(A.x + (B.x - A.x) * tail, A.y + (B.y - A.y) * tail);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.shadowColor = accent;
        ctx.shadowBlur = 12;
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    let raf = 0;
    let running = false;
    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      wrap.style.setProperty("--hx", `${mouse.x}px`);
      wrap.style.setProperty("--hy", `${mouse.y}px`);
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    readColors();
    resize();
    if (reduced) draw(performance.now());

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(performance.now());
    });
    ro.observe(wrap);
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(wrap);
    const mo = new MutationObserver(readColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(var(--grid-dot) 1px, transparent 1.2px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 80% 70% at 60% 40%, #000 30%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 60% 40%, #000 30%, transparent 78%)",
        }}
      />
      {/* The same grid, lit around the cursor */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage: "radial-gradient(var(--grid-dot-lit) 1.2px, transparent 1.6px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(180px circle at var(--hx, -500px) var(--hy, -500px), #000, transparent)",
          WebkitMaskImage:
            "radial-gradient(180px circle at var(--hx, -500px) var(--hy, -500px), #000, transparent)",
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Keep the headline side calm */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 45% 55% at 22% 50%, color-mix(in oklab, var(--bg) 85%, transparent), transparent 70%)",
        }}
      />

      {/* Horizon */}
      <div
        className="absolute top-[86%] left-1/2 h-[140vh] w-[220vw] -translate-x-1/2 rounded-[50%] md:w-[160vw]"
        style={{
          background: "var(--bg)",
          borderTop: "1px solid color-mix(in oklab, var(--accent) 55%, transparent)",
          boxShadow:
            "0 -1px 30px -4px var(--accent-glow), 0 -40px 160px -30px color-mix(in oklab, var(--accent) 30%, transparent), inset 0 40px 120px -60px color-mix(in oklab, var(--accent) 35%, transparent)",
        }}
      />
    </div>
  );
}
