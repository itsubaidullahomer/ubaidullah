import type { Project } from "../types";

export const insightX: Project = {
  slug: "insight-x",
  title: "Insight-X · now Illume",
  tagline: "AI business analytics for MedSpas — generates custom dashboards from any data shape. Live today as Illume Analytics.",
  role: "Full-Stack Engineer (part-time)",
  company: "Insight-X",
  companyUrl: "https://www.joinillume.com/",
  externalUrl: "https://www.joinillume.com/",
  period: "Dec 2024 — Jun 2025",
  status: "live",
  featured: true,
  cover: "/work/insight-x-cover.svg",
  accent: "#7AC5FF",
  screenshot: { src: "/images/screens/illume.jpg", width: 2160, height: 7800 },

  summary:
    "A business-intelligence platform for MedSpas where the AI writes the analytics, not the analyst. Visitors drop in their data, the system generates JavaScript chart logic that adapts to whatever shape it sees, and the dashboards just render. The traction it produced helped the company secure $250k in funding — and the product lives on today as Illume Analytics, 'the intelligence platform for the wellness industry.'",

  problem:
    "MedSpa operators wanted real dashboards — revenue, bookings, provider performance, retention — without paying for a data analyst to write queries every time their schema changed. Existing BI tools assumed the operator could write SQL or wrangle a chart builder. Neither was true.",

  approach:
    "I built an AI analytics engine that inspects the incoming data structure and generates JavaScript chart logic on the fly. Dashboards re-render against whatever the connected MedSpa platform returns — Boulevard, Zenoti, Vagaro — without manual configuration. The frontend is a React + Chart.js/D3 surface that treats every chart as a first-class component, not a Tableau iframe.",

  outcome:
    "The platform demonstrated enough traction to help the company close $250k in funding. Operators got live dashboards for revenue, booking analytics, provider performance, and client retention in a single interface — without ever touching a query. The company has since rebranded to Illume Analytics and serves wellness practices in production today.",

  metrics: [
    { value: "$250k", label: "Funding secured", detail: "platform demoed traction" },
    { value: "3", label: "Booking platforms integrated", detail: "Boulevard, Zenoti, Vagaro" },
    { value: "0", label: "Manual chart config", detail: "AI generates the logic" },
    { value: "4", label: "Dashboard surfaces", detail: "revenue, bookings, providers, retention" },
  ],

  responsibilities: [
    "Built the AI analytics engine — generates JavaScript chart logic from raw data structure.",
    "Designed and implemented real-time dashboards for revenue tracking, booking analytics, provider performance, and retention.",
    "Integrated MedSpa platforms (Boulevard, Zenoti, Vagaro) for automatic operational data ingestion.",
    "Owned the frontend architecture top-to-bottom — chart composition, state, responsive layouts.",
  ],

  stack: ["React", "Tailwind CSS", "Chart.js", "D3.js", "OpenAI API", "Node.js", "Express", "MongoDB"],
};
