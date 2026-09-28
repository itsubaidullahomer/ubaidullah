import type { Project, Shot } from "../types";
import captured from "./ali-foodies.compare.json";

/**
 * Screenshots are written by `npm run capture:compare`, which saves the
 * images under public/images/ali-foodies/compare/ and records their paths
 * and sizes in ali-foodies.compare.json. Until then the phones render an
 * empty "pending" screen instead of a broken image.
 */
const shots = captured.shots as Record<string, Omit<Shot, "alt">>;
const shot = (side: "before" | "after", key: string, alt: string): Shot | undefined => {
  const s = shots[`${side}-${key}`];
  return s ? { ...s, alt } : undefined;
};

export const aliFoodies: Project = {
  slug: "ali-foodies",
  title: "Ali Foodies",
  tagline:
    "Rebuilding Ali Foodies' website for the phone, because that's where almost every customer finds it.",
  role: "Redesign and rebuild",
  company: "Ali Foodies",
  companyUrl: "https://alifoodies.com",
  externalUrl: "https://alifoodiess.vercel.app",
  period: "2026 – present",
  status: "in-progress",
  featured: true,
  cover: "/work/ali-foodies-cover.svg",
  accent: "#F2C14E",

  summary:
    "Ali Foodies already had a website. Around 99.9% of the people who use it are on a phone, so the new version is built for that screen first and everything else second. Rather than list every change, the comparison above puts the previous site and the new build on the same phone and scrolls them together. The new version is live as a preview while I finish it.",
  problem:
    "Almost every Ali Foodies customer reaches the website on a phone, so the phone experience is the whole product.",
  approach:
    "A new build, designed at phone width first and scaled up from there, running as a preview while it is finished.",
  outcome: "In progress. The new version is live as a preview at alifoodiess.vercel.app.",

  metrics: [
    {
      value: "99.9%",
      label: "Customers on a phone",
      detail: "why the phone layout comes first",
    },
  ],
  responsibilities: [],
  stack: [],

  compare: {
    before: { label: "alifoodies.com", url: "https://alifoodies.com" },
    after: { label: "alifoodiess.vercel.app", url: "https://alifoodiess.vercel.app" },
    screens: [
      {
        name: "Home",
        title: "The home page, top to bottom, on the same phone.",
        before: shot("before", "home", "The previous Ali Foodies home page on a phone"),
        after: shot("after", "home", "The new Ali Foodies home page on a phone"),
      },
    ],
  },
};
