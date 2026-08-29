import type { SkillGroup } from "./types";

export const skills: SkillGroup[] = [
  {
    category: "AI / LLMs",
    blurb:
      "Where most of my time goes now. Streaming, fallback chains, prompt pipelines, and everything that has to happen when a call fails.",
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
    blurb: "Interfaces that stay fast once the product gets complicated.",
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
    blurb: "APIs shaped around what the product actually needs.",
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
    blurb: "Usually modeled before the first screen gets drawn.",
    items: ["MongoDB", "Mongoose", "Postgres", "Redis"],
  },
  {
    category: "DevOps & Tools",
    blurb: "Enough infrastructure to ship and keep things running.",
    items: ["Git", "GitHub", "GitLab", "CI/CD", "Vercel", "DigitalOcean", "Heroku", "Cloudinary"],
  },
  {
    category: "Product",
    blurb: "The parts that never show up in a stack list but decide whether the product works.",
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
