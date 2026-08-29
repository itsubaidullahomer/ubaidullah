import type { Project } from "../types";

export const tututor: Project = {
  slug: "tututor",
  title: "Tututor.ai",
  tagline: "Education platform for schools in Spain, used by about 17,000 students and teachers.",
  role: "Full-Stack / Product Engineer",
  company: "Tututor.ai",
  companyUrl: "https://tututor.ai",
  externalUrl: "https://tututor.ai",
  period: "Nov 2023 – Present",
  status: "live",
  featured: true,
  cover: "/work/tututor-cover.svg",
  accent: "#C7F284",
  screenshot: { src: "/images/screens/tututor.jpg", width: 2160, height: 7800 },

  summary:
    "Tututor is what schools around Murcia use to plan and run their lessons. I look after the AI services, the school CRM and the student side of the app, which in practice means I design the flow and then go and write it.",

  problem:
    "Teachers were spending the majority of their week assembling lesson material, quizzes, and remediation content by hand. Existing 'AI tools' produced generic output that needed so much editing they barely saved time. The school's CRM was a separate product entirely, so admins were duct-taping spreadsheets to track classes, content, and student progress.",

  approach:
    "I built it as one product instead of two. A handful of AI pieces (chatbots, quiz generation, grading, conversation analytics) sit on top of the same class and content model the CRM uses. The heavy AI work runs in its own service so the teacher UI never waits on it, WebSockets stream partial answers as they arrive, and conversations are stored as structured records rather than blobs so teachers can search them afterwards.",

  outcome:
    "Lesson prep that used to take most of an evening dropped to minutes, between 90 and 95% faster in the cases we measured. Several schools in Murcia are on it and thousands of students use it daily. The structure has held up as we added things: the quiz generator and the conversation analytics both went in without touching the core.",

  metrics: [
    { value: "17,000+", label: "Students & teachers", detail: "across schools in Murcia, Spain" },
    { value: "90–95%", label: "Lesson-prep time saved", detail: "in measured teacher workflows" },
    { value: "1", label: "Person", detail: "owning AI services, CRM & student UX" },
    { value: "0→1", label: "AI features", detail: "shipped to production users" },
  ],

  responsibilities: [
    "Designed the chatbot system, where teachers create tutors for a specific topic and then read back the conversations to find where students got stuck.",
    "Built the AI quiz generator with automatic grading and per-class performance analytics from lesson content.",
    "Architected the school CRM (students, classes, content) so the AI tools and admin tools share one model.",
    "Moved the heavy AI work behind WebSockets and a separate service so the teacher UI never blocks on a model call.",
    "Did the UX for every teacher-facing flow, since there was no designer on the team.",
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
        detail:
          "Plans lessons, spins up topic-specific tutors, and reviews every student conversation.",
      },
      {
        id: "student",
        label: "Student",
        kind: "client",
        x: 4,
        y: 78,
        detail:
          "Chats with the tutor, takes generated quizzes, and gets graded feedback in seconds.",
      },
      {
        id: "web",
        label: "Web App",
        kind: "service",
        sub: "React",
        x: 26,
        y: 50,
        detail: "Optimistic UI, so nothing on screen waits for the model.",
      },
      {
        id: "ws",
        label: "WS Gateway",
        kind: "service",
        sub: "WebSockets",
        x: 48,
        y: 22,
        detail:
          "Keeps token streams off the CRUD path. This split is the reason the app stays responsive when the model is slow.",
      },
      {
        id: "api",
        label: "Express API",
        kind: "service",
        sub: "REST",
        x: 48,
        y: 78,
        detail: "Everything that isn't a stream: classes, content, auth and permissions.",
      },
      {
        id: "ai",
        label: "AI Service",
        kind: "ai",
        sub: "Microservice",
        x: 70,
        y: 22,
        detail:
          "Prompt assembly, provider routing, retries and transcript capture. Swapping providers never reaches the UI.",
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
        detail:
          "Conversations are stored as structured records rather than blobs, which is what makes them searchable later.",
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
          "The streaming path. Worth noticing that it never touches the CRM, which is why a slow model doesn't make the rest of the app slow.",
        hops: [
          { from: "student", to: "web", label: "types a question" },
          { from: "web", to: "ws", label: "opens a socket rather than a request" },
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
          "An ordinary read, deliberately kept away from the AI path so it stays fast and predictable.",
        hops: [
          { from: "teacher", to: "web", label: "opens the roster" },
          { from: "web", to: "api", label: "a plain REST call" },
          { from: "api", to: "crm", label: "class + student models" },
          { from: "crm", to: "mongo", label: "one read, zero LLM calls" },
        ],
      },
      {
        id: "audio",
        label: "Lesson audio is generated",
        description:
          "Same service, different provider. Adding ElevenLabs took one route change and no frontend work.",
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
