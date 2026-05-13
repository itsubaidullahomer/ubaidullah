import type { SkillGroup } from "./types";

export const skills: SkillGroup[] = [
  {
    category: "Frontend",
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
      "Vite",
    ],
  },
  {
    category: "Backend",
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
    items: ["MongoDB", "Mongoose", "Postgres (basic)", "Redis (basic)"],
  },
  {
    category: "AI / LLMs",
    items: [
      "OpenAI API",
      "Anthropic Claude",
      "Google Gemini",
      "ElevenLabs",
      "ZeroGPT API",
      "Prompt engineering",
      "Streaming responses",
      "Function calling",
    ],
  },
  {
    category: "DevOps & Tools",
    items: ["Git", "GitHub", "GitLab", "CI/CD", "Vercel", "DigitalOcean", "Heroku", "Cloudinary"],
  },
  {
    category: "Product",
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
