import type { Project } from "../types";

export const crownKabab: Project = {
  slug: "crown-kabab",
  title: "Crown Kabab",
  tagline: "E-commerce restaurant platform — Stripe, OAuth, bilingual, end-to-end ordering.",
  role: "Full-Stack Engineer",
  company: "Independent",
  period: "Nov 2022 — May 2023",
  status: "shipped",
  featured: false,
  cover: "/work/crown-kabab-cover.svg",
  accent: "#54FBE5",

  summary:
    "An end-to-end ordering platform for a restaurant — Stripe-backed checkout, Google OAuth, order tracking, and Danish/English support. Built solo from Figma to production.",

  problem:
    "The restaurant was losing orders to third-party delivery apps that took 30% per order. They needed their own ordering surface that didn't feel like a 2014 PHP form.",

  approach:
    "Redux Toolkit for cart and order state, RTK Query for server state, Stripe for payments, Google OAuth for frictionless sign-in, i18next for Danish/English. Order tracking ties the kitchen view to the customer view so status changes propagate in one place.",

  outcome:
    "Restaurant ran its own ordering surface end-to-end without depending on aggregators for the recurring-customer base.",

  metrics: [
    { value: "100%", label: "Owned ordering surface", detail: "no aggregator fees on direct orders" },
    { value: "2", label: "Languages", detail: "Danish + English" },
  ],

  responsibilities: [
    "Built shopping cart, payment processing, and order tracking using Redux Toolkit + RTK Query + Stripe API.",
    "Wired Google OAuth for one-tap sign-in.",
    "Implemented i18next for Danish/English with locale-aware copy.",
  ],

  stack: ["React", "Redux Toolkit", "RTK Query", "Stripe", "Google OAuth", "i18next"],
};
