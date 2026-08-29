import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { AuroraMesh } from "@/components/effects/AuroraMesh";
import { writingPosts } from "@/content/writing";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Writing",
  description:
    "Notes on building AI products, and on the unglamorous parts that matter more than the model does.",
  path: "/writing",
});

export default function WritingPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-32 pb-12 md:pt-40">
        <AuroraMesh variant="section" />
        <Container className="relative z-10">
          <div className="text-fg-muted text-xs tracking-[0.18em] uppercase">Writing</div>
          <h1 className="font-display text-fg mt-4 text-5xl leading-[0.96] tracking-[-0.025em] text-balance md:text-7xl">
            Notes from the <em className="text-gradient-accent italic not-italic">workbench.</em>
          </h1>
          <p className="text-fg-muted mt-6 max-w-xl text-lg leading-relaxed text-pretty">
            Things I've picked up building AI features for products people use. Short, and written
            only when I have something worth saying.
          </p>
        </Container>
      </section>

      <Section size="default">
        <ul className="divide-border divide-y">
          {writingPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/writing/${post.slug}`}
                className="group flex flex-col gap-3 py-8 transition-all md:flex-row md:items-baseline md:gap-8"
              >
                <div className="text-fg-subtle font-mono text-xs tracking-[0.16em] uppercase md:w-32 md:shrink-0">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-fg group-hover:text-accent text-2xl leading-tight transition-colors md:text-3xl">
                    {post.title}
                  </h2>
                  <p className="text-fg-muted mt-2 max-w-2xl leading-relaxed text-pretty">
                    {post.description}
                  </p>
                  <div className="text-fg-subtle mt-3 flex flex-wrap items-center gap-3 text-xs">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" strokeWidth={2} />
                      {post.readingMinutes} min read
                    </span>
                    <span>·</span>
                    {post.tags.map((t, i) => (
                      <span key={t}>
                        {t}
                        {i < post.tags.length - 1 ? "," : ""}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowUpRight className="text-fg-muted h-4 w-4 shrink-0 opacity-0 transition-all group-hover:rotate-12 group-hover:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>

        {writingPosts.length === 0 && (
          <div className="border-border text-fg-muted rounded-[var(--radius-glass)] border p-12 text-center">
            Nothing here yet. I'm drafting in private, so subscribe via RSS if you want to know when
            something lands.
          </div>
        )}
      </Section>
    </>
  );
}
