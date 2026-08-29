import type { Project } from "../types";

export const jurri: Project = {
  slug: "jurri",
  title: "Jurri",
  tagline: "Cloud storage, a unified inbox and a password vault in one app for enterprise teams.",
  role: "Frontend Engineer",
  company: "Danzee Tech",
  period: "Sep 2023 – Apr 2024",
  status: "live",
  featured: false,
  cover: "/work/jurri-cover.svg",
  accent: "#B854FB",
  externalUrl: "https://jurri.danzeetech.com/",
  screenshot: { src: "/images/screens/jurri.jpg", width: 2160, height: 1350 },

  summary:
    "One app for enterprise teams to handle files, email and shared credentials instead of three. I owned the frontend: drag-and-drop uploads, an inbox that merges several accounts, and a password vault, all sitting on a Redux Toolkit and RTK Query setup I built to keep server state from drifting.",

  problem:
    "Teams were using four separate tools for what was really one workflow: storage, email across several accounts, shared credentials and access control. None of them talked to each other, so people spent half their day moving between tabs.",

  approach:
    "One product with three surfaces (files, inbox, vault) sharing the same navigation, search and auth model. RTK Query handled server state with fairly aggressive cache invalidation so nothing on screen went stale. I split the frontend into small components and hooks the rest of the team could reuse, and over a few months that turned into the library everyone built new screens from.",

  outcome:
    "Reusing those components noticeably cut the time it took the team to put up a new screen. Code splitting and lazy loading brought the initial load down by about 40%. And users stopped juggling tabs, which was the point.",

  metrics: [
    {
      value: "~30%",
      label: "Code duplication removed",
      detail: "via reusable component + hook library",
    },
    {
      value: "~40%",
      label: "Faster initial load",
      detail: "code splitting + lazy loading + bundle work",
    },
    { value: "3-in-1", label: "Product surface", detail: "files, inbox, vault, one app" },
  ],

  responsibilities: [
    "Built the reusable React component and hooks library the team ended up using for everything.",
    "Built drag-and-drop file uploads with multi-file progress and resumable behavior.",
    "Implemented the unified inbox aggregating multiple email accounts behind one UI.",
    "Worked on the bundle with code splitting and lazy loading for roughly a 40% faster first load.",
  ],

  stack: ["React", "Redux Toolkit", "RTK Query", "Node.js", "Express", "MongoDB"],
};
