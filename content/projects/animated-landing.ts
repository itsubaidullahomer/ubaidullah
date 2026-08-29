import type { Project } from "../types";

export const animatedLanding: Project = {
  slug: "animated-landing",
  title: "Animated Landing",
  tagline:
    "A landing page built to find out how much motion I could add before the Lighthouse score dropped.",
  role: "Frontend Engineer",
  company: "UI demo",
  period: "Side project",
  status: "shipped",
  featured: false,
  cover: "/work/animated-landing-cover.svg",
  accent: "#54FBE5",
  screenshot: { src: "/images/screens/enomad.png", width: 2546, height: 1287 },

  summary:
    "A demo landing page I built to settle an argument with myself about whether heavy motion has to cost you performance. Scroll-triggered reveals, parallax and glass panels throughout, all running at 60fps.",

  problem:
    "Most animated marketing pages either run at 30fps and feel like syrup, or get stripped back to nothing so they look good on PageSpeed. There is a middle ground, but it takes enough fiddling that most teams give up after the first regression.",

  approach:
    "I treated every animation as a budget question. GPU-composited transforms only, and nothing that forces layout mid-scroll. Framer Motion handles orchestration and GSAP the timeline-heavy parts. The scroll work goes through requestAnimationFrame so it can't block the main thread, and only the critical CSS loads up front.",

  outcome:
    "A page with reveals, parallax depth and glass panels that still lands in the green Lighthouse bands.",

  metrics: [
    { value: "95+", label: "Lighthouse score", detail: "performance band with full motion intact" },
    { value: "60fps", label: "Scroll & parallax", detail: "GPU-only transforms" },
    { value: "0", label: "Layout thrash", detail: "no measure→mutate in the hot path" },
  ],

  responsibilities: [
    "Built the motion layer, combining Framer Motion for orchestration with GSAP for timelines.",
    "Implemented scroll-triggered effects, parallax interactions, and glassmorphism design at 60fps.",
    "Tuned the page to 95+ on Lighthouse without cutting any of the motion.",
  ],

  stack: ["React", "Tailwind CSS", "Framer Motion", "GSAP"],
};
