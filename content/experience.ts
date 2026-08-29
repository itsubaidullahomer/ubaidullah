import type { Experience } from "./types";

export const experience: Experience[] = [
  {
    company: "Tututor.ai",
    companyUrl: "https://tututor.ai",
    role: "Full-Stack / Product Engineer",
    period: "Nov 2023 – Present",
    location: "Murcia, Spain (Remote)",
    summary:
      "Building the platform that around 17,000 students and teachers in Murcia use. Lesson prep that used to take an evening now takes minutes. I'm responsible for the AI services, the school CRM and the student-facing app.",
    highlights: [
      "Built the chatbot system that lets teachers create a tutor for a topic, then read the conversations to see where students struggled.",
      "Built AI quiz generator with automatic grading and per-class performance analytics on top of lesson content.",
      "Architected the school CRM (students, classes, content) so admins manage everything from one platform.",
      "Moved the heavy AI work behind WebSockets and a separate service so the teacher UI stays responsive under load.",
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
    period: "Jan 2022 – Jan 2024",
    location: "Viby, Denmark (Remote)",
    summary:
      "Two years there. I joined as a junior and ended up as the person new teammates asked for help and the one who picked up new features. Mostly frontend, with a decent amount of Node and Express: auth, payments and third-party integrations.",
    highlights: [
      "Built the internal component and hooks library the team ended up using for every new screen.",
      "Diagnosed and fixed query/indexing hotspots when API latency spiked under load.",
      "Shipped frontend for Jurri (cloud storage + multi-email platform): drag-and-drop uploads, unified inbox, password vault.",
      "Code-split and lazy-loaded the bundle to cut initial load by about 40%.",
    ],
    stack: [
      "React",
      "Redux Toolkit",
      "RTK Query",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "Stripe",
    ],
  },
];
