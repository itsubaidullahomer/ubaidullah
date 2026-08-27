import type { Project } from "../types";

export const yaksport: Project = {
  slug: "yaksport",
  title: "Yaksport",
  tagline: "Sports training-camp booking platform — 100+ Danish clubs, multilingual, fast search.",
  role: "Frontend Engineer",
  company: "Danzee Tech",
  period: "Jan 2023 — Aug 2023",
  status: "live",
  featured: true,
  cover: "/work/yaksport-cover.svg",
  accent: "#FFB07A",
  externalUrl: "https://yaksport.dk/",
  screenshot: { src: "/images/screens/yaksport.jpg", width: 2160, height: 5400 },

  summary:
    "A booking platform for a Danish travel agency serving sports clubs that need training camps abroad. The interesting parts: multilingual content, search with filters that don't lag once you have hundreds of camps, and a flow that doesn't punish clubs for being indecisive.",

  problem:
    "100+ sports clubs evaluating training camps need to compare on facilities, location, season, and price — without giving up and calling the agency. The previous site forced them to call.",

  approach:
    "Filter-first search that re-queries on every interaction without flashing the page. i18next-driven content so the same components render in Danish or English. React Router for a flow that lets users move back and forth across the booking funnel without losing state.",

  outcome:
    "100+ sports clubs onboarded onto the platform. Booking flow became self-serve for the common case; the agency now handles only edge-case requests instead of every quote.",

  metrics: [
    { value: "100+", label: "Sports clubs served" },
    { value: "2", label: "Languages", detail: "Danish + English via i18next" },
    { value: "0", label: "Page reloads on filter", detail: "every search is in-place" },
  ],

  responsibilities: [
    "Built the multi-filter search surface and the booking funnel.",
    "Wired i18next for Danish/English content with locale-aware routing.",
    "Integrated REST APIs for camp data and availability.",
  ],

  stack: ["React", "Tailwind CSS", "i18next", "React Router", "REST APIs"],
};
