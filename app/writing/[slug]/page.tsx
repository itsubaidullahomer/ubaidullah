import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { AuroraMesh } from "@/components/effects/AuroraMesh";
import { writingPosts, getPost } from "@/content/writing";
import { buildMetadata } from "@/lib/seo";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return writingPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/writing/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
    keywords: post.tags,
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Script
        id={`jsonld-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              title: post.title,
              description: post.description,
              slug: post.slug,
              publishedTime: post.publishedAt,
            }),
          ),
        }}
      />
      <Script
        id={`breadcrumb-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Writing", path: "/writing" },
              { name: post.title, path: `/writing/${post.slug}` },
            ]),
          ),
        }}
      />

      <article>
        <section className="relative isolate overflow-hidden pt-32 pb-12 md:pt-40">
          <AuroraMesh variant="section" />
          <Container size="narrow" className="relative z-10">
            <Link
              href="/writing"
              className="group inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              All writing
            </Link>

            <div className="mt-10 flex items-center gap-3 text-xs font-mono uppercase tracking-[0.16em] text-fg-subtle">
              <span>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" strokeWidth={2} />
                {post.readingMinutes} min
              </span>
            </div>

            <h1 className="mt-5 font-display text-4xl md:text-6xl leading-[1.02] tracking-[-0.025em] text-fg text-balance">
              {post.title}
            </h1>
            <p className="mt-6 text-xl text-fg-muted leading-relaxed text-pretty">
              {post.description}
            </p>
          </Container>
        </section>

        <Container size="narrow" className="pb-24">
          <div className="prose-portfolio max-w-none">
            {post.body
              .split("\n\n")
              .map((para, i) => {
                if (para.startsWith("**") && para.endsWith("**")) {
                  return null;
                }
                if (para.startsWith("**")) {
                  const match = para.match(/^\*\*(.+?)\*\*\s+(.+)$/s);
                  if (match) {
                    return (
                      <p
                        key={i}
                        className="mb-6 text-lg leading-relaxed text-fg-muted text-pretty"
                      >
                        <strong className="text-fg font-medium">{match[1]}</strong> {match[2]}
                      </p>
                    );
                  }
                }
                return (
                  <p
                    key={i}
                    className="mb-6 text-lg leading-relaxed text-fg-muted text-pretty"
                  >
                    {para}
                  </p>
                );
              })}
          </div>

          <div className="mt-16 flex flex-wrap gap-2 border-t border-border pt-8">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border px-3 py-1 text-xs text-fg-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </Container>
      </article>
    </>
  );
}
