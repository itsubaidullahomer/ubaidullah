import type { Project } from "../types";

export const jurri: Project = {
  slug: "jurri",
  title: "Jurri",
  tagline: "Enterprise cloud storage + multi-email management — built for teams that have stopped trusting Drive.",
  role: "Frontend Engineer",
  company: "Danzee Tech",
  period: "Sep 2023 — Apr 2024",
  status: "shipped",
  featured: false,
  cover: "/work/jurri-cover.svg",
  accent: "#B854FB",

  summary:
    "A unified surface for enterprise teams to manage files, email, and credentials in one place. I owned the frontend: drag-and-drop uploads, unified inbox across multiple accounts, and a password vault — all backed by a Redux Toolkit + RTK Query architecture I built to keep server state coherent.",

  problem:
    "Enterprise teams were juggling four tools to handle what should have been one workflow: storage, multi-account email, shared credentials, and access control. Every context switch leaked productivity, and the tools didn't talk to each other.",

  approach:
    "One product, three surfaces (files, inbox, vault) sharing a common navigation, search, and auth model. RTK Query handled server state with aggressive cache invalidation so the UI never felt stale. I split the frontend into composable components and custom hooks that the team could remix for new screens — what started as my code became the team's library.",

  outcome:
    "Component reuse cut new-feature build time noticeably across the team. Bundle optimization (code splitting + lazy loading) dropped initial load by ~40%. The shared surface meant users stopped tab-juggling.",

  metrics: [
    { value: "~30%", label: "Code duplication removed", detail: "via reusable component + hook library" },
    { value: "~40%", label: "Faster initial load", detail: "code splitting + lazy loading + bundle work" },
    { value: "3-in-1", label: "Product surface", detail: "files, inbox, vault, one app" },
  ],

  responsibilities: [
    "Architected a reusable React component + hooks library that became the team's default ship surface.",
    "Built drag-and-drop file uploads with multi-file progress and resumable behavior.",
    "Implemented the unified inbox aggregating multiple email accounts behind one UI.",
    "Performance-engineered the bundle — code splitting, lazy loading — for a ~40% first-load improvement.",
  ],

  stack: ["React", "Redux Toolkit", "RTK Query", "Node.js", "Express", "MongoDB"],
};
