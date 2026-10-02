import type { Project } from "../types";

/**
 * ToolkitJar keeps growing: new tools ship regularly. Never state how many
 * tools it has anywhere on the site, because any number goes stale.
 */
export const toolkitjar: Project = {
  slug: "toolkitjar",
  title: "ToolkitJar",
  tagline:
    "A free online tools website I built, with tools for text, SEO, code and images, including a text compare tool, a word counter and a JSON formatter. Everything runs in the browser, so nothing is uploaded.",
  role: "Developer",
  company: "Independent",
  companyUrl: "https://toolkitjar.com",
  externalUrl: "https://toolkitjar.com",
  // A normal, followed link that passes the referrer.
  externalRel: "noopener",
  period: "Side project",
  status: "live",
  featured: false,
  cover: "/work/toolkitjar-cover.svg",
  accent: "#E8590C",
  screenshot: {
    src: "/images/screens/toolkitjar.png",
    width: 1280,
    height: 800,
    alt: "ToolkitJar – free online tools",
  },

  summary:
    "ToolkitJar is a free online tools website I built and keep adding to: tools for text, SEO, code and images, including a text compare tool, a word counter and a JSON formatter. Everything runs in the browser, so nothing is uploaded.",
  problem:
    "Small everyday jobs, like counting words, comparing two pieces of text or formatting JSON, shouldn't need an account or an upload.",
  approach:
    "Every tool runs in the browser, so nothing you paste or drop in leaves your machine. The tools are grouped by the job they do, and a search that opens with Ctrl K gets you to the right one quickly.",
  outcome: "Live at toolkitjar.com and still growing. I add new tools regularly.",

  metrics: [],
  responsibilities: [],
  stack: [],
};
