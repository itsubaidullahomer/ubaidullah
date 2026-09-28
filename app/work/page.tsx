import type { Metadata } from "next";
import Script from "next/script";
import { Container } from "@/components/primitives/Container";
import { SystemGrid } from "@/components/effects/SystemGrid";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { Tilt } from "@/components/motion/Tilt";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ArchiveRegistry } from "@/components/work/ArchiveRegistry";
import { projects, spansFullRow } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description:
    "Case studies from products I've built: AI tools, business analytics, enterprise SaaS and consumer e-commerce. All of them shipped and in use.",
  path: "/work",
});

// Flagship first, then the other featured work, then everything else.
const lead = projects.filter((p) => p.flagship);
const featured = projects.filter((p) => p.featured && !p.flagship);
const archive = projects.filter((p) => !p.featured && !p.flagship);
const top = [...lead, ...featured];

const liveCount = projects.filter((p) => p.status === "live").length;
const firstYear = Math.min(
  ...projects.flatMap((p) => (p.period.match(/\d{4}/g) ?? []).map(Number)),
);
const headline = lead[0]?.metrics[0];

const READOUTS = [
  { value: String(projects.length), label: "Products shipped", count: true },
  { value: String(liveCount), label: "Live right now", count: true },
  ...(headline
    ? [{ value: headline.value, label: `${headline.label} on ${lead[0].title}`, count: true }]
    : []),
  ...(Number.isFinite(firstYear)
    ? [{ value: String(firstYear), label: "Shipping since", count: false }]
    : []),
];

/** A thin labelled rule that opens each block of the page. */
function Rule({ index, label, note }: { index: string; label: string; note: string }) {
  return (
    <div className="label-mono text-fg-muted mb-6 flex items-center gap-3 md:mb-8">
      <span className="text-accent">{index}</span>
      <span>{label}</span>
      <span aria-hidden className="bg-border h-px flex-1" />
      <span className="text-fg-subtle">{note}</span>
    </div>
  );
}

export default function WorkPage() {
  return (
    <>
      <Script
        id="work-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Work", path: "/work" },
            ]),
          ),
        }}
      />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden pt-28 pb-14 md:pt-36 md:pb-20">
        <SystemGrid fade="top" />
        <Container size="wide" className="relative z-10">
          <Reveal>
            <div className="label-mono text-fg-muted">Work</div>
            <h1 className="font-display text-display text-fg mt-5 max-w-5xl text-balance">
              Things I&apos;ve <em className="accent-italic">shipped.</em>
            </h1>
            <p className="text-fg-muted mt-7 max-w-2xl text-lg leading-relaxed text-pretty">
              Every one of these went to production with real people using it. The three at the top
              are the ones I&apos;d point you to first. The rest are older or smaller, and each
              still has a case study.
            </p>
          </Reveal>

          <Reveal>
            <dl className="border-border bg-border mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border md:mt-16 md:grid-cols-4">
              {READOUTS.map((r) => (
                <div
                  key={r.label}
                  className="bg-bg-elevated spotlight flex flex-col-reverse justify-end px-5 py-5 md:px-6 md:py-6"
                >
                  <dt className="text-fg-muted mt-2 text-xs leading-snug">{r.label}</dt>
                  <dd className="font-display text-fg text-3xl leading-none tracking-[-0.02em] md:text-4xl">
                    {r.count ? <CountUp value={r.value} /> : r.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* ── Flagships ──────────────────────────────────────── */}
      <section className="pb-20 md:pb-28">
        <Container size="wide">
          <Rule index="01" label="Flagships" note={`${top.length} projects`} />
          <Reveal className="grid gap-4 md:grid-cols-2 md:gap-5" stagger={0.1}>
            {top.map((p, i) =>
              spansFullRow(p) ? (
                <div key={p.slug} className="md:col-span-2">
                  <ProjectCard project={p} wide={p.flagship} priority={i < 2} index={i + 1} />
                </div>
              ) : (
                <Tilt key={p.slug} max={3} className="h-full">
                  <ProjectCard project={p} priority={i < 3} index={i + 1} />
                </Tilt>
              ),
            )}
          </Reveal>
        </Container>
      </section>

      {/* ── Archive ────────────────────────────────────────── */}
      {archive.length > 0 && (
        <section className="pb-24 md:pb-32">
          <Container size="wide">
            <Rule index="02" label="Archive" note={`${archive.length} projects`} />
            <ArchiveRegistry projects={archive} startIndex={top.length + 1} />
          </Container>
        </section>
      )}
    </>
  );
}
