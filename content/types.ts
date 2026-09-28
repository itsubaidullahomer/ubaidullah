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
  /** Tech line under the label. */
  sub?: string;
  /** Shown in the map's info strip on hover. */
  detail?: string;
};

export type ArchitectureEdge = {
  from: string;
  to: string;
  label?: string;
};

/** A request path the system map can animate, hop by hop. */
export type ArchitectureFlow = {
  id: string;
  label: string;
  description: string;
  hops: Array<{ from: string; to: string; label: string }>;
};

export type Screenshot = {
  src: string;
  width: number;
  height: number;
};

/** An image with the text a screen reader and caption need. */
export type Shot = Screenshot & {
  alt: string;
  caption?: string;
};

/** One product inside a bigger suite (flagship case studies only). */
export type SubProduct = {
  name: string;
  kind: "web" | "mobile" | "backend" | "native";
  audience: string;
  summary: string;
  stack: string[];
  /** Short evidence line, e.g. "1,240 commits · since Mar 2024". */
  stat?: string;
  shot?: Shot;
};

/** One tab of the product showcase: a real screen, or a row of phones. */
export type ShowcaseSlide = {
  /** Which product the screen belongs to; tabs are grouped by it. */
  group: string;
  label: string;
  /** Shown in the fake address bar. */
  url: string;
  title: string;
  caption: string;
  shot?: Shot;
  phones?: Shot[];
};

/** A chapter of how the product got to where it is. */
export type JourneyStep = {
  period: string;
  /** Small badge, e.g. "Rebuild 1". */
  tag?: string;
  title: string;
  body: string;
  stack?: string[];
  shots?: Shot[];
};

export type StoryBlock = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  /** Optional dated moments shown beside the text. */
  moments?: Array<{ date: string; text: string }>;
};

/** One page of a site, captured on a phone before and after a rebuild. */
export type CompareScreen = {
  /** Tab label, e.g. "Home". */
  name: string;
  /** One line on what to look at. */
  title: string;
  notes?: string[];
  /** Full-page phone screenshots. Missing until they have been captured. */
  before?: Shot;
  after?: Shot;
};

/** The previous version of a product next to the new one, on a phone. */
export type DeviceCompare = {
  before: { label: string; url: string };
  after: { label: string; url: string };
  screens: CompareScreen[];
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
  /** Full-page screenshot of the live product, shown in a browser frame. */
  screenshot?: Screenshot;

  summary: string;
  problem: string;
  approach: string;
  outcome: string;

  metrics: Metric[];
  responsibilities: string[];
  stack: string[];
  externalUrl?: string;

  architecture?: {
    /** One or two sentences above the system map. */
    intro?: string;
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
    flows?: ArchitectureFlow[];
  };

  /** Flagship-only: gets its own section on the home page. */
  flagship?: boolean;
  /** Two-sentence pitch for the home page, shorter than the summary. */
  pitch?: string;
  showcase?: ShowcaseSlide[];
  ecosystem?: SubProduct[];
  journey?: JourneyStep[];
  beforeAfter?: { before: Shot; after: Shot; title: string; body: string };
  mobile?: { title: string; body: string; shots: Array<Shot & { app: string }> };
  stories?: StoryBlock[];

  /**
   * A rebuild shown as the old site next to the new one on a phone. Gives
   * the project the phone card on /work and the home page, and a pinned
   * scroll-linked comparison at the top of its case study.
   */
  compare?: DeviceCompare;
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
  blurb: string;
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
