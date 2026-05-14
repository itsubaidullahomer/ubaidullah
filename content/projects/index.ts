import type { Project } from "../types";
import { tututor } from "./tututor";
import { nobukoJapan } from "./nobuko-japan";
import { insightX } from "./insight-x";
import { aiHumanizer } from "./ai-humanizer";
import { jurri } from "./jurri";
import { yaksport } from "./yaksport";
import { crownKabab } from "./crown-kabab";
import { animatedLanding } from "./animated-landing";

export const projects: Project[] = [
  tututor,
  nobukoJapan,
  insightX,
  aiHumanizer,
  jurri,
  yaksport,
  crownKabab,
  animatedLanding,
];

export const featuredProjects = projects.filter((p) => p.featured);

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
