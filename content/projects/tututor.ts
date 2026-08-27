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
      {
        id: "teacher",
        label: "Teacher",
        kind: "client",
        x: 4,
        y: 22,
        detail: "Plans lessons, spins up topic-specific tutors, and reviews every student conversation.",
      },
      {
        id: "student",
        label: "Student",
        kind: "client",
        x: 4,
        y: 78,
        detail: "Chats with the tutor, takes generated quizzes, and gets graded feedback in seconds.",
      },
      {
        id: "web",
        label: "Web App",
        kind: "service",
        sub: "React",
        x: 26,
        y: 50,
        detail: "Optimistic UI — nothing on screen blocks while the model is thinking.",
      },
      {
        id: "ws",
        label: "WS Gateway",
        kind: "service",
        sub: "WebSockets",
        x: 48,
        y: 22,
        detail: "The boundary that keeps token streams off the CRUD path. This split is why teacher UX stays responsive under load.",
      },
      {
        id: "api",
        label: "Express API",
        kind: "service",
        sub: "REST",
        x: 48,
        y: 78,
        detail: "Everything that isn't a stream — classes, content, auth, permissions.",
      },
      {
        id: "ai",
        label: "AI Service",
        kind: "ai",
        sub: "Microservice",
        x: 70,
        y: 22,
        detail: "Prompt assembly, provider routing, retries, and transcript capture. Swapping providers never reaches the UI.",
      },
      {
        id: "crm",
        label: "School CRM",
        kind: "service",
        sub: "Domain",
        x: 70,
        y: 78,
        detail: "Students, classes, and content in one model the AI tools read from too.",
      },
      {
        id: "mongo",
        label: "MongoDB",
        kind: "data",
        sub: "Primary store",
        x: 93,
        y: 78,
        detail: "Conversations stored structured, not as blobs — that's what makes them searchable by teachers.",
      },
      {
        id: "openai",
        label: "OpenAI",
        kind: "external",
        sub: "LLM",
        x: 93,
        y: 8,
        detail: "Generation for tutors, quizzes, and automatic grading.",
      },
      {
        id: "eleven",
        label: "ElevenLabs",
        kind: "external",
        sub: "TTS",
        x: 93,
        y: 40,
        detail: "Text-to-speech for listening exercises and audio lessons.",
      },
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
    flows: [
      {
        id: "tutor-chat",
        label: "Student asks the AI tutor",
        description:
          "The streaming path. It never touches the CRM — which is exactly why a slow model can't slow down the rest of the product.",
        hops: [
          { from: "student", to: "web", label: "types a question" },
          { from: "web", to: "ws", label: "opens a socket instead of a request" },
          { from: "ws", to: "ai", label: "routed to the AI service" },
          { from: "ai", to: "openai", label: "assembled prompt + cached context" },
          { from: "openai", to: "ai", label: "tokens stream back" },
          { from: "ai", to: "mongo", label: "transcript stored, structured" },
        ],
      },
      {
        id: "roster",
        label: "Teacher opens a class",
        description:
          "Plain CRUD, deliberately nowhere near the AI path. Boring requests should stay boring.",
        hops: [
          { from: "teacher", to: "web", label: "opens the roster" },
          { from: "web", to: "api", label: "REST — no socket needed" },
          { from: "api", to: "crm", label: "class + student models" },
          { from: "crm", to: "mongo", label: "one read, zero LLM calls" },
        ],
      },
      {
        id: "audio",
        label: "Lesson audio is generated",
        description:
          "Same service, different provider. Adding ElevenLabs meant one route change — no frontend work.",
        hops: [
          { from: "teacher", to: "web", label: "requests audio for a lesson" },
          { from: "web", to: "ws", label: "opens a stream" },
          { from: "ws", to: "ai", label: "routed to the AI service" },
          { from: "ai", to: "eleven", label: "text-to-speech" },
          { from: "eleven", to: "ai", label: "audio streams back" },
        ],
      },
    ],
  },
};
