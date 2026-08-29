import type { Project } from "../types";

export const aiHumanizer: Project = {
  slug: "ai-humanizer",
  title: "Viloi",
  tagline:
    "A writing tool at viloi.com that rewrites machine-generated text so it reads naturally. Multi-model pipeline, Stripe billing, built solo.",
  role: "Full-Stack Engineer",
  company: "Independent",
  companyUrl: "https://viloi.com",
  externalUrl: "https://viloi.com",
  period: "Side project",
  status: "live",
  featured: true,
  cover: "/work/ai-humanizer-cover.svg",
  accent: "#A78BFA",
  screenshot: { src: "/images/screens/viloi.jpg", width: 2160, height: 7800 },

  summary:
    "Viloi takes machine-generated text and rewrites it until it reads like a person wrote it. I built the whole thing on my own: the transformation pipeline across three model providers, Stripe subscriptions, and a UI that doesn't look like every other AI tool from 2024. It's live at viloi.com.",

  problem:
    "Tools built on a single model fail unpredictably. One model's output gets flagged, another one's doesn't, and there's no good way to know in advance which will work for a given piece of text. Most of them also have no real billing, so they never get past the prototype stage.",

  approach:
    "The pipeline routes text through GPT-4, Claude and Gemini with fallback logic between them, so if one model's output comes back flagged the next one takes a different angle at it. Stripe handles subscriptions and plan changes through webhooks, and JWT keeps sessions stateless. I gave the UI its own look mostly so it wouldn't blend into the wall of identical AI tools.",

  outcome:
    "It's live with paying customers and billing that runs itself. The fallback design means the product keeps working when one provider changes behavior, which happens more often than you'd expect.",

  metrics: [
    { value: "3", label: "LLM providers", detail: "GPT-4, Claude, Gemini with fallback routing" },
    { value: "0", label: "Manual billing", detail: "Stripe + webhook-driven subscriptions" },
    { value: "JWT", label: "Stateless auth", detail: "no server-side session storage" },
  ],

  responsibilities: [
    "Built the multi-model pipeline with fallback, so a flagged result gets retried through a different model.",
    "Implemented Stripe subscription billing with webhook automation for plan changes, cancellations, and dunning.",
    "Designed and implemented JWT-based authentication so the API stays stateless.",
    "Designed and built the UI so the product didn't look like every other AI tool.",
  ],

  stack: [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "OpenAI",
    "Anthropic",
    "Gemini",
    "Stripe",
    "JWT",
  ],
};
