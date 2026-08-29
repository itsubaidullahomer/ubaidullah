import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { StudyHero } from "@/components/case-study/StudyHero";
import { CaseStudyBody } from "@/components/case-study/CaseStudyBody";
import { projects, getProject } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";
import { caseStudyJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.title,
    description: project.tagline,
    path: `/work/${project.slug}`,
    keywords: [project.title, ...project.stack, "case study", "product engineering"],
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <Script
        id={`jsonld-${project.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            caseStudyJsonLd({
              title: project.title,
              description: project.tagline,
              slug: project.slug,
            }),
          ),
        }}
      />
      <Script
        id={`breadcrumb-${project.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Work", path: "/work" },
              { name: project.title, path: `/work/${project.slug}` },
            ]),
          ),
        }}
      />

      <StudyHero project={project} />
      <CaseStudyBody project={project} />
    </>
  );
}
