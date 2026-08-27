import type { SkillGroup } from "./types";

export const skills: SkillGroup[] = [
  {
    category: "AI / LLMs",
    blurb:
      "The part of the stack I spend the most time in — production LLM features, not demos. Streaming, fallback chains, prompt pipelines, and the failure cases in between.",
    items: [
      "OpenAI API",
      "Anthropic Claude",
      "Google Gemini",
      "ElevenLabs",
      "Prompt engineering",
      "Streaming responses",
      "Function calling",
    ],
  },
  {
    category: "Frontend",
    blurb: "Interfaces that feel fast and hold up under real product complexity.",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Redux Toolkit",
      "RTK Query",
      "Tailwind CSS",
      "React Native",
      "Framer Motion",
      "Chart.js",
      "D3.js",
    ],
  },
  {
    category: "Backend",
    blurb: "APIs designed around the product, not the other way around.",
    items: [
      "Node.js",
      "Express.js",
      "NestJS",
      "REST APIs",
      "WebSockets",
      "JWT",
      "Microservices",
      "Server Actions",
    ],
  },
  {
    category: "Data",
    blurb: "Modeled before the first screen gets drawn.",
    items: ["MongoDB", "Mongoose", "Postgres", "Redis"],
  },
  {
    category: "DevOps & Tools",
    blurb: "Enough infra to ship and stay shipped.",
    items: ["Git", "GitHub", "GitLab", "CI/CD", "Vercel", "DigitalOcean", "Heroku", "Cloudinary"],
  },
  {
    category: "Product",
    blurb: "The skills that don't show up in a stack list but decide if the product works.",
    items: [
      "0→1 architecture",
      "UX-led engineering",
      "CRM systems",
      "Stripe payments",
      "Performance optimization",
      "Data visualization",
    ],
  },
];
