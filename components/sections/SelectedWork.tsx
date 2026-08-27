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
          Real products, real users, <em className="italic text-gradient-accent not-italic">real outcomes.</em>
        </>
      }
      description="Products I've shipped end-to-end, shown as they actually run in production. Hover a card to scroll through the live site."
    >
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {featuredProjects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} priority={i < 2} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/work"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
        >
          View all work
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </Section>
  );
}
