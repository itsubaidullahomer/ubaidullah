import type { Experience } from "./types";

export const experience: Experience[] = [
  {
    company: "Nobuko Japan",
    role: "AI Voice Agent Developer & Full-Stack Engineer · Part-time",
    period: "Mar 2026 — Present",
    location: "Tokyo, Japan (Remote)",
    summary:
      "Owning AI and automation end-to-end at a Tokyo-based used-vehicle exporter shipping to the UK, Ireland, Cyprus, and Pakistan. The existing team maintains the legacy CRM; I handle everything voice-AI and automation, frontend through backend. Currently in demo phase, validating before full production rollout.",
    highlights: [
      "Built a pluggable multi-provider voice agent — Gemini Live alongside a custom ElevenLabs + STT pipeline; users pick the model, the voice, and bring their own API keys.",
      "Shipped live agent supervision — human agents listen to AI calls in real time, see streaming transcripts, inject context to steer mid-call, or take over entirely.",
      "Built the campaign system — Excel contact import, campaign builder, outbound SIP calling at scale through the company's SIP server.",
      "Designed the full audit trail — every call's audio, transcript, exact prompt, supervisor actions, and QA review stored and fed back into prompt improvements.",
    ],
    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "SIP",
      "Gemini Live",
      "ElevenLabs",
      "STT / TTS",
      "Prompt engineering",
    ],
  },
  {
    company: "Tututor.ai",
    companyUrl: "https://tututor.ai",
    role: "Full-Stack / Product Engineer",
    period: "Nov 2023 — Present",
    location: "Murcia, Spain (Remote)",
    summary:
      "Building an AI-native education platform serving 17,000+ students and teachers across schools in Murcia, Spain. Reduced lesson-prep time by 90–95% via AI-generated content. Own architecture for AI services, the school CRM, and core student experience.",
    highlights: [
      "Designed and shipped an AI chatbot system letting teachers spin up topic-specific tutors; teachers review student conversations to surface gaps.",
      "Built AI quiz generator with automatic grading and per-class performance analytics on top of lesson content.",
      "Architected the school CRM (students, classes, content) so admins manage everything from one platform.",
      "Migrated heavy AI flows behind WebSockets + a microservices boundary to keep teacher UX responsive under load.",
    ],
    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "WebSockets",
      "Microservices",
      "OpenAI API",
      "ElevenLabs API",
    ],
  },
  {
    company: "Danzee Tech",
    role: "React Developer",
    period: "Jan 2022 — Jan 2024",
    location: "Viby, Denmark (Remote)",
    summary:
      "Joined as a junior, grew into the go-to for new teammates and feature owner across two years. Frontend-led but owned chunks of Node/Express — JWT auth, payments, third-party integrations.",
    highlights: [
      "Built an internal component + hooks library that became the team's default ship surface, cutting handoff churn on new screens.",
      "Diagnosed and fixed query/indexing hotspots when API latency spiked under load.",
      "Shipped frontend for Jurri (cloud storage + multi-email platform): drag-and-drop uploads, unified inbox, password vault.",
      "Code-split + lazy-loaded the bundle to drop initial load ~40%.",
    ],
    stack: ["React", "Redux Toolkit", "RTK Query", "Node.js", "Express", "MongoDB", "JWT", "Stripe"],
  },
];
