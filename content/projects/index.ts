import type { Project } from "../types";
import { tututor } from "./tututor";
import { aliFoodies } from "./ali-foodies";
import { insightX } from "./insight-x";
import { aiHumanizer } from "./ai-humanizer";
import { jurri } from "./jurri";
import { yaksport } from "./yaksport";
import { crownKabab } from "./crown-kabab";
import { animatedLanding } from "./animated-landing";

export const projects: Project[] = [
  tututor,
  aliFoodies,
  insightX,
  aiHumanizer,
  jurri,
  yaksport,
  crownKabab,
  animatedLanding,
];

/** The one project that leads the home page with its own section. */
export const flagshipProject = projects.find((p) => p.flagship);

/** Home-page grid: featured work, minus the flagship shown above it. */
export const featuredProjects = projects.filter((p) => p.featured && !p.flagship);

/** Cards that take a full row in the work grids: the flagship and phone comparisons. */
export function spansFullRow(p: Project) {
  return !!p.flagship || !!p.compare;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: undefined, next: undefined };
  return {
    prev: idx > 0 ? projects[idx - 1] : undefined,
    next: idx < projects.length - 1 ? projects[idx + 1] : undefined,
  };
}
