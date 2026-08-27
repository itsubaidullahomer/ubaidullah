export const site = {
  name: "Ubaidullah",
  handle: "itsubaidullahomer",
  role: "Senior Product Engineer",
  tagline: "I build production-grade AI products.",
  description:
    "Senior product engineer building AI-native education and analytics products. Currently shipping Tututor.ai to 17,000+ students and teachers. 4+ years of MERN, React, Node.js, and LLM integrations.",
  url: "https://itsubaidullahomer.com",
  email: "itsubaidullahomer@gmail.com",
  phone: "+92 329 2380929",
  location: "Pakistan",
  availability: "Available for select work",
  resumeUrl: "/Ubaidullah-CV.pdf",
  keywords: [
    "MERN developer",
    "React developer",
    "Next.js developer",
    "Node.js engineer",
    "AI engineer",
    "OpenAI integration",
    "Anthropic Claude",
    "full stack developer Pakistan",
    "product engineer",
    "Tututor.ai",
    "Ubaidullah",
    "itsubaidullahomer",
  ],
  socials: {
    github:    { label: "GitHub",    handle: "itsubaidullahomer", url: "https://github.com/itsubaidullahomer" },
    linkedin:  { label: "LinkedIn",  handle: "itsubaidullahomer", url: "https://www.linkedin.com/in/itsubaidullahomer/" },
    instagram: { label: "Instagram", handle: "itsubaidullahomer", url: "https://www.instagram.com/itsubaidullahomer" },
    email:     { label: "Email",     handle: "itsubaidullahomer@gmail.com", url: "mailto:itsubaidullahomer@gmail.com" },
  },
} as const;

export type Site = typeof site;
