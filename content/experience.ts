import type { Experience } from "./types";

export const experience: Experience[] = [
  {
    company: "Tututor.ai / EduNova",
    companyUrl: "https://tututor.ai",
    role: "Lead Engineer",
    period: "Nov 2023 – Present",
    location: "Murcia, Spain (Remote)",
    summary:
      "Joined to fix one bug in someone else's Next.js app. Rebuilt it three times and grew it into eight products on one backend: an AI toolkit for teachers, a school platform, and parent, student and teacher apps in both stores. 20k+ students, teachers and families use it.",
    highlights: [
      "Rebuilt the frontend in React and Redux, then replaced Firebase with an Express and MongoDB backend I wrote, which moved every AI call and API key off the client.",
      "Grew that backend to about 1,000 endpoints on 90 models: school scoping, realtime chat on Socket.io and Redis, push, R2 storage, Stripe and SEPA direct-debit billing.",
      "Built the Educamos roster import and the Plumier XXI grades export, golden-tested against real files from the regional system.",
      "Shipped three React Native apps to the App Store and Google Play, and started a native Kotlin Multiplatform + SwiftUI rewrite.",
      "Taught the non-technical founder to code. He now ships full features himself.",
    ],
    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.io + Redis",
      "React Native",
      "Kotlin Multiplatform",
      "OpenAI / Claude / Gemini",
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
