import type { Project } from "../types";

export const insightX: Project = {
  slug: "insight-x",
  title: "Insight-X · now Illume",
  tagline:
    "Business analytics for MedSpas that builds its own dashboards from whatever data you connect. Live today as Illume Analytics.",
  role: "Full-Stack Engineer (part-time)",
  company: "Insight-X",
  companyUrl: "https://www.joinillume.com/",
  externalUrl: "https://www.joinillume.com/",
  period: "Dec 2024 – Jun 2025",
  status: "live",
  featured: true,
  cover: "/work/insight-x-cover.svg",
  accent: "#7AC5FF",
  screenshot: { src: "/images/screens/illume.jpg", width: 2160, height: 7800 },

  summary:
    "A BI platform for MedSpa owners who don't have an analyst on staff. You connect your data, the system works out the shape of it and writes the chart logic, and the dashboards render from there. It got enough traction to help the company raise $250k, and it runs today as Illume Analytics.",

  problem:
    "MedSpa operators wanted dashboards for revenue, bookings, provider performance and retention, without paying an analyst to rewrite queries every time their schema changed. The BI tools they tried assumed they could write SQL or spend an afternoon in a chart builder. Neither was true.",

  approach:
    "I built an engine that inspects the incoming data structure and generates the chart logic for it at runtime. Dashboards re-render against whatever the connected platform returns, whether that's Boulevard, Zenoti or Vagaro, with no manual configuration in between. The frontend is React with Chart.js and D3, where every chart is a real component instead of an embedded iframe.",

  outcome:
    "The platform showed enough traction to help the company close $250k in funding. Operators got live dashboards for revenue, bookings, provider performance and client retention in one place without writing a query. The company has since rebranded to Illume Analytics and is still serving wellness practices today.",

  metrics: [
    { value: "$250k", label: "Funding secured", detail: "platform demoed traction" },
    { value: "3", label: "Booking platforms integrated", detail: "Boulevard, Zenoti, Vagaro" },
    { value: "0", label: "Manual chart config", detail: "AI generates the logic" },
    { value: "4", label: "Dashboard surfaces", detail: "revenue, bookings, providers, retention" },
  ],

  responsibilities: [
    "Built the analytics engine that generates chart logic from the raw data structure.",
    "Designed and implemented real-time dashboards for revenue tracking, booking analytics, provider performance, and retention.",
    "Integrated MedSpa platforms (Boulevard, Zenoti, Vagaro) for automatic operational data ingestion.",
    "Owned the frontend architecture: chart composition, state and responsive layouts.",
  ],

  stack: [
    "React",
    "Tailwind CSS",
    "Chart.js",
    "D3.js",
    "OpenAI API",
    "Node.js",
    "Express",
    "MongoDB",
  ],
};
