import type { Project } from "../types";

export const yaksport: Project = {
  slug: "yaksport",
  title: "Yaksport",
  tagline:
    "Booking platform for Danish sports clubs looking for training camps abroad. Over 100 clubs use it.",
  role: "Frontend Engineer",
  company: "Danzee Tech",
  period: "Jan 2023 – Aug 2023",
  status: "live",
  featured: true,
  cover: "/work/yaksport-cover.svg",
  accent: "#FFB07A",
  externalUrl: "https://yaksport.dk/",
  screenshot: { src: "/images/screens/yaksport.jpg", width: 2160, height: 5400 },

  summary:
    "A booking platform for a Danish travel agency that arranges training camps abroad for sports clubs. The interesting parts were the bilingual content, keeping filtered search quick once there are hundreds of camps in it, and a booking flow that lets clubs change their mind without starting over.",

  problem:
    "Clubs comparing camps care about facilities, location, season and price all at once. The old site couldn't answer those questions, so every enquiry turned into a phone call to the agency.",

  approach:
    "Search comes first and re-queries on every interaction without the page flashing. Content runs through i18next so the same components render in Danish or English. React Router keeps the funnel state intact when someone goes back a step, which they do constantly.",

  outcome:
    "Over 100 clubs are on the platform. Most bookings now go through without anyone at the agency being involved, so they only handle the unusual requests instead of every single quote.",

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
