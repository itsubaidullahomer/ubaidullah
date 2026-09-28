import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { ProjectCard } from "@/components/work/ProjectCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { featuredProjects } from "@/content/projects";

export function SelectedWork() {
  return (
    <Section
      id="work"
      index="01"
      eyebrow="Selected work"
      title={
        <>
          Three products, all <em className="accent-italic">in production.</em>
        </>
      }
      description="Each one is live with real users. Hover a card to scroll through the site as it looks today."
    >
      <RevealGroup className="grid gap-4 md:grid-cols-2 md:gap-5">
        {featuredProjects.map((p, i) => (
          <RevealItem key={p.slug} className={i === 0 ? "md:col-span-2" : undefined}>
            <ProjectCard project={p} priority={i < 2} wide={i === 0} index={i + 1} />
          </RevealItem>
        ))}
      </RevealGroup>

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
