import type { Project } from "../types";

export const crownKabab: Project = {
  slug: "crown-kabab",
  title: "Crown Kabab",
  tagline:
    "Ordering site for a restaurant, with Stripe checkout, Google sign-in and Danish/English support.",
  role: "Full-Stack Engineer",
  company: "Independent",
  period: "Nov 2022 – May 2023",
  status: "shipped",
  featured: false,
  cover: "/work/crown-kabab-cover.svg",
  accent: "#54FBE5",
  screenshot: { src: "/images/screens/crownkabab.png", width: 2544, height: 1288 },

  summary:
    "An ordering site for a restaurant, with Stripe checkout, Google sign-in, order tracking and both Danish and English. I built it on my own from the Figma file to production.",

  problem:
    "The restaurant was handing 30% of every order to delivery apps. They wanted their own ordering page, and one that didn't look like a form from 2014.",

  approach:
    "Redux Toolkit for cart and order state, RTK Query for server state, Stripe for payments, Google OAuth so nobody has to make an account, and i18next for the two languages. Order tracking connects the kitchen view to the customer view, so a status change only has to be made once.",

  outcome:
    "The restaurant now takes its regulars' orders directly instead of paying an aggregator for them.",

  metrics: [
    {
      value: "100%",
      label: "Owned ordering surface",
      detail: "no aggregator fees on direct orders",
    },
    { value: "2", label: "Languages", detail: "Danish + English" },
  ],

  responsibilities: [
    "Built shopping cart, payment processing, and order tracking using Redux Toolkit + RTK Query + Stripe API.",
    "Wired Google OAuth for one-tap sign-in.",
    "Implemented i18next for Danish/English with locale-aware copy.",
  ],

  stack: ["React", "Redux Toolkit", "RTK Query", "Stripe", "Google OAuth", "i18next"],
};
