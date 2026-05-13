import type { Project } from "../types";
import { tututor } from "./tututor";
import { insightX } from "./insight-x";
import { jurri } from "./jurri";
import { yaksport } from "./yaksport";
import { crownKabab } from "./crown-kabab";

export const projects: Project[] = [tututor, insightX, jurri, yaksport, crownKabab];

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
