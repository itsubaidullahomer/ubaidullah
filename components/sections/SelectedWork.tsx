import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { ProjectCard } from "@/components/work/ProjectCard";
import { featuredProjects } from "@/content/projects";

export function SelectedWork() {
  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title={
        <>
          A few things I've <em className="text-gradient-accent italic not-italic">built.</em>
        </>
      }
      description="All of these are live. Hover a card to scroll through the site as it looks today."
    >
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {featuredProjects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} priority={i < 2} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/work"
          className="group text-fg-muted hover:text-fg inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
        >
          View all work
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </Section>
  );
}
