import type { Project } from "../types";

export const tututor: Project = {
  slug: "tututor",
  title: "Tututor.ai",
  tagline: "AI-native education platform used daily by 17,000+ students and teachers.",
  role: "Full-Stack / Product Engineer",
  company: "Tututor.ai",
  companyUrl: "https://tututor.ai",
  externalUrl: "https://tututor.ai",
  period: "Nov 2023 — Present",
  status: "live",
  featured: true,
  cover: "/work/tututor-cover.svg",
  accent: "#C7F284",
  screenshot: { src: "/images/screens/tututor.jpg", width: 2160, height: 7800 },

  summary:
    "Tututor is the AI layer that schools in Murcia, Spain use to plan and deliver lessons. I own the AI services, the school CRM, and the student experience surface end-to-end — the same person who designs the flow ships the code.",

  problem:
    "Teachers were spending the majority of their week assembling lesson material, quizzes, and remediation content by hand. Existing 'AI tools' produced generic output that needed so much editing they barely saved time. The school's CRM was a separate product entirely, so admins were duct-taping spreadsheets to track classes, content, and student progress.",

  approach:
    "I treated this as one product, not two. A small set of AI primitives — chatbots, quiz generation, grading, conversation analytics — composed into teacher-facing tools that share a single content + class model with the CRM. Heavy AI flows live behind a microservices boundary so the teacher UI stays responsive while the LLM is thinking. WebSockets stream partial responses, and conversations are stored structured (not blobs) so teachers can review and search them.",

  outcome:
    "Lesson-prep time dropped 90–95% in measured cases. Several schools in Murcia adopted the platform; thousands of students use it daily. The architecture has held as features compounded — adding the quiz generator and conversation analytics didn't require rewriting the core.",

  metrics: [
    { value: "17,000+", label: "Students & teachers", detail: "across schools in Murcia, Spain" },
    { value: "90–95%", label: "Lesson-prep time saved", detail: "in measured teacher workflows" },
    { value: "1", label: "Person", detail: "owning AI services, CRM & student UX" },
    { value: "0→1", label: "AI features", detail: "shipped to production users" },
  ],

  responsibilities: [
    "Designed the AI chatbot system — teachers spin up topic-specific tutors and review every student conversation to surface gaps.",
    "Built the AI quiz generator with automatic grading and per-class performance analytics from lesson content.",
    "Architected the school CRM (students, classes, content) so the AI tools and admin tools share one model.",
    "Migrated heavy AI flows behind WebSockets + a microservices boundary so teacher UX never blocks on the LLM.",
    "Acted as UX designer for every teacher-facing flow — no separate designer on the team.",
  ],

  stack: [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "WebSockets",
    "Microservices",
    "OpenAI API",
    "ElevenLabs",
  ],

  architecture: {
    nodes: [
      { id: "teacher",   label: "Teacher",            kind: "client",   x: 8,  y: 30 },
      { id: "student",   label: "Student",            kind: "client",   x: 8,  y: 70 },
      { id: "web",       label: "React Web App",      kind: "service",  x: 28, y: 50 },
      { id: "ws",        label: "WebSocket Gateway",  kind: "service",  x: 48, y: 30 },
      { id: "api",       label: "Express API",        kind: "service",  x: 48, y: 70 },
      { id: "ai",        label: "AI Service",         kind: "ai",       x: 70, y: 30 },
      { id: "crm",       label: "School CRM",         kind: "service",  x: 70, y: 70 },
      { id: "mongo",     label: "MongoDB",            kind: "data",     x: 92, y: 70 },
      { id: "openai",    label: "OpenAI",             kind: "external", x: 92, y: 18 },
      { id: "eleven",    label: "ElevenLabs",         kind: "external", x: 92, y: 42 },
    ],
    edges: [
      { from: "teacher", to: "web" },
      { from: "student", to: "web" },
      { from: "web", to: "ws", label: "stream" },
      { from: "web", to: "api" },
      { from: "ws", to: "ai" },
      { from: "api", to: "crm" },
      { from: "ai", to: "openai" },
      { from: "ai", to: "eleven" },
      { from: "ai", to: "mongo", label: "transcripts" },
      { from: "crm", to: "mongo" },
    ],
  },
};
