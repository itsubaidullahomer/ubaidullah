export const site = {
  name: "Ubaidullah",
  handle: "itsubaidullahomer",
  role: "Senior Product Engineer",
  tagline: "I build AI products people rely on.",
  description:
    "Product engineer building AI and education products. I rebuilt Tututor.ai three times and grew it into eight products on one backend, used by 20k+ students, teachers and families. Four years with React, Node.js, MongoDB and LLM APIs.",
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
    github: {
      label: "GitHub",
      handle: "itsubaidullahomer",
      url: "https://github.com/itsubaidullahomer",
    },
    linkedin: {
      label: "LinkedIn",
      handle: "itsubaidullahomer",
      url: "https://www.linkedin.com/in/itsubaidullahomer/",
    },
    instagram: {
      label: "Instagram",
      handle: "itsubaidullahomer",
      url: "https://www.instagram.com/itsubaidullahomer",
    },
    email: {
      label: "Email",
      handle: "itsubaidullahomer@gmail.com",
      url: "mailto:itsubaidullahomer@gmail.com",
    },
  },
} as const;

export type Site = typeof site;
