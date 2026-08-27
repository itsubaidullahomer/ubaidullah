import type { Project } from "../types";

export const animatedLanding: Project = {
  slug: "animated-landing",
  title: "Animated Landing",
  tagline:
    "A landing page that proves you can have complex motion and still hit a 95+ Lighthouse score.",
  role: "Frontend Engineer",
  company: "UI demo",
  period: "Side project",
  status: "shipped",
  featured: false,
  cover: "/work/animated-landing-cover.svg",
  accent: "#54FBE5",
  screenshot: { src: "/images/screens/enomad.png", width: 2546, height: 1287 },

  summary:
    "A UI demo landing page built to prove a point: complex motion design and great Lighthouse scores aren't mutually exclusive. Scroll-triggered effects, parallax interactions, and glassmorphism throughout — all running at 60fps without tanking perf.",

  problem:
    "Most 'animated' marketing pages either run at 30fps and feel like syrup, or strip themselves down to nothing to look good on PageSpeed. There's a sweet spot where the page feels alive AND scores well — and most teams stop trying after the first regression.",

  approach:
    "Treated every animation as a budget question. GPU-composited transforms only; no layout thrash. Framer Motion for orchestration, GSAP for the timeline-heavy bits. Heavy scroll work goes through `requestAnimationFrame` so it can't block the main thread. Critical CSS, deferred everything else.",

  outcome:
    "A landing that breathes — scroll-triggered reveals, parallax depth, glass panels that don't feel like 2014 — while still hitting the green Lighthouse bands.",

  metrics: [
    { value: "95+", label: "Lighthouse score", detail: "performance band with full motion intact" },
    { value: "60fps", label: "Scroll & parallax", detail: "GPU-only transforms" },
    { value: "0", label: "Layout thrash", detail: "no measure→mutate in the hot path" },
  ],

  responsibilities: [
    "Architected the motion layer — Framer Motion + GSAP combined for orchestration vs. timelines.",
    "Implemented scroll-triggered effects, parallax interactions, and glassmorphism design at 60fps.",
    "Performance-engineered the page to hit 95+ Lighthouse while keeping the motion intact.",
  ],

  stack: ["React", "Tailwind CSS", "Framer Motion", "GSAP"],
};
