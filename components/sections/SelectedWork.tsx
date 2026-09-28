import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { ProjectCard } from "@/components/work/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { Tilt } from "@/components/motion/Tilt";
import { featuredProjects, spansFullRow } from "@/content/projects";

/** The featured products that aren't the flagship, which has its own section above. */
export function SelectedWork() {
  return (
    <Section
      id="work"
      index="02"
      eyebrow="More work"
      title={
        <>
          Also <em className="accent-italic">in production.</em>
        </>
      }
      description="Each one has real users and its own case study. Hover a card to see more of it."
    >
      <Reveal className="grid gap-4 md:grid-cols-2 md:gap-5" stagger={0.12}>
        {featuredProjects.map((p, i) =>
          spansFullRow(p) ? (
            <div key={p.slug} className="md:col-span-2">
              <ProjectCard project={p} priority={i < 2} index={i + 2} />
            </div>
          ) : (
            <Tilt key={p.slug} max={4} className="h-full">
              <ProjectCard project={p} priority={i < 2} index={i + 2} />
            </Tilt>
          ),
        )}
      </Reveal>

      <div className="mt-10 flex justify-end">
        <Link
          href="/work"
          className="group text-fg-muted hover:text-fg inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
        >
          All work, including the archive
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </Section>
  );
}
