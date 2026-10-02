export const site = {
  name: "Ubaidullah Omer",
  handle: "itsubaidullahomer",
  role: "Senior Product Engineer",
  tagline: "I build AI products people rely on.",
  /** The default meta description (152 characters; keep it within 150–160). */
  description:
    "Ubaidullah Omer is a Senior Product Engineer in Rahim Yar Khan, Pakistan, building AI products at Tutor.ai used by 20k+ students, teachers and families.",
  url: "https://itsubaidullahomer.com",
  email: "itsubaidullahomer@gmail.com",
  phone: "+92 329 2380929",
  location: "Rahim Yar Khan, Pakistan",
  /** Structured address for the Person JSON-LD. */
  address: { locality: "Rahim Yar Khan", region: "Punjab", countryCode: "PK" },
  /** Current employer, for the Person JSON-LD `worksFor`. */
  employer: { name: "Tutor.ai", url: "https://tututor.ai" },
  /** Profile photo: JSON-LD image and the photo on /about. */
  photo: "/portrait.png",
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
    "Ubaidullah Omer",
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
    facebook: {
      label: "Facebook",
      handle: "UbaidullahMOmer",
      url: "https://www.facebook.com/UbaidullahMOmer",
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
