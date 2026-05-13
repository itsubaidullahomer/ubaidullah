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
    "Notes on shipping AI products, engineering systems for real users, and the boring parts that matter more than the model.",
  path: "/writing",
});

export default function WritingPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-32 pb-12 md:pt-40">
        <AuroraMesh variant="section" />
        <Container className="relative z-10">
          <div className="text-xs uppercase tracking-[0.18em] text-fg-muted">Writing</div>
          <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[0.96] tracking-[-0.025em] text-fg text-balance">
            Notes from the <em className="italic text-gradient-accent not-italic">workbench.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-fg-muted leading-relaxed text-pretty">
            Things I've learned shipping AI features to real users. Short, opinionated, and written when I actually have something to say.
          </p>
        </Container>
      </section>

      <Section size="default">
        <ul className="divide-y divide-border">
          {writingPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/writing/${post.slug}`}
                className="group flex flex-col gap-3 py-8 transition-all md:flex-row md:items-baseline md:gap-8"
              >
                <div className="font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle md:w-32 md:shrink-0">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-2xl md:text-3xl text-fg leading-tight transition-colors group-hover:text-accent">
                    {post.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-fg-muted leading-relaxed text-pretty">
                    {post.description}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-fg-subtle">
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
                <ArrowUpRight className="h-4 w-4 shrink-0 text-fg-muted opacity-0 transition-all group-hover:opacity-100 group-hover:rotate-12" />
              </Link>
            </li>
          ))}
        </ul>

        {writingPosts.length === 0 && (
          <div className="rounded-[var(--radius-glass)] border border-border p-12 text-center text-fg-muted">
            Nothing here yet — drafting in private. Subscribe via RSS if you want a ping when something lands.
          </div>
        )}
      </Section>
    </>
  );
}
