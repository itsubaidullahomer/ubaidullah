import type { Project } from "../types";

export const aiHumanizer: Project = {
  slug: "ai-humanizer",
  title: "AI Humanizer",
  tagline:
    "AI text humanization SaaS — multi-LLM pipeline that bypasses ZeroGPT detection, with Stripe billing baked in.",
  role: "Full-Stack Engineer",
  company: "Independent",
  period: "Side project",
  status: "shipped",
  featured: false,
  cover: "/work/ai-humanizer-cover.svg",
  accent: "#A78BFA",

  summary:
    "An AI text humanization SaaS that takes machine-generated text and reshapes it until it bypasses ZeroGPT detection. Built solo end-to-end — multi-LLM transformation pipeline, Stripe-backed subscriptions, and a glassmorphism UI that doesn't look like every other AI tool from 2024.",

  problem:
    "Single-model humanizers fail unpredictably — one model's output gets flagged, the next doesn't, and there's no automated way to pick the right pipeline for a given input. Most also lack actual payment infrastructure, so they never grow past the prototype stage.",

  approach:
    "A multi-LLM pipeline routes content through GPT-4, Claude, and Gemini with intelligent fallback logic — if one model produces flagged output, the next takes a different angle. Stripe handles subscriptions with webhook-driven plan changes; JWT auth keeps sessions stateless. UI is built around a glassmorphism design system to differentiate from the wall of generic AI tools.",

  outcome:
    "Live SaaS with paying customers, automated billing, and a transformation pipeline that's resilient when any single provider gets stricter. The fallback architecture makes the product stay reliable as detection models evolve.",

  metrics: [
    { value: "3", label: "LLM providers", detail: "GPT-4, Claude, Gemini with fallback routing" },
    { value: "0", label: "Manual billing", detail: "Stripe + webhook-driven subscriptions" },
    { value: "JWT", label: "Stateless auth", detail: "no server-side session storage" },
  ],

  responsibilities: [
    "Built the multi-LLM pipeline with intelligent fallback — when one model's output gets flagged, the next takes a different angle.",
    "Implemented Stripe subscription billing with webhook automation for plan changes, cancellations, and dunning.",
    "Designed and implemented JWT-based authentication so the API stays stateless.",
    "Designed and shipped the glassmorphism UI to stand out from generic AI tooling.",
  ],

  stack: ["React", "Node.js", "Express", "MongoDB", "OpenAI", "Anthropic", "Gemini", "Stripe", "JWT"],
};
