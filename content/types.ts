export type Metric = {
  value: string;
  label: string;
  detail?: string;
};

export type ProjectStatus = "live" | "shipped" | "in-progress" | "archived";

export type ArchitectureNode = {
  id: string;
  label: string;
  kind: "client" | "service" | "data" | "external" | "ai";
  x: number; // 0-100
  y: number; // 0-100
};

export type ArchitectureEdge = {
  from: string;
  to: string;
  label?: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  status: ProjectStatus;
  featured: boolean;
  cover: string;
  accent: string;

  summary: string;
  problem: string;
  approach: string;
  outcome: string;

  metrics: Metric[];
  responsibilities: string[];
  stack: string[];
  externalUrl?: string;

  architecture?: {
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
  };
};

export type Experience = {
  company: string;
  companyUrl?: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type WritingPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingMinutes: number;
  tags: string[];
  body: string;
};
