import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { site } from "@/content/site";

const NAV = [
  ["/work", "Work"],
  ["/about", "About"],
  ["/now", "Now"],
  ["/playground", "Playground"],
  ["/writing", "Writing"],
  ["/contact", "Contact"],
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  const sha = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7);

  return (
    <footer className="border-border relative mt-24 border-t">
      <Container size="wide" className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr] md:gap-16">
          <div>
            <div className="font-display text-fg max-w-md text-[2rem] leading-[1.02] tracking-[-0.02em] text-balance md:text-[2.5rem]">
              Let's build something <em className="accent-italic">that ships.</em>
            </div>
            <p className="text-fg-muted mt-5 max-w-md text-sm leading-relaxed">
              I take on a few product engineering projects at a time. If you need someone who can
              own a feature from the data model to the last CSS fix, that's the part I'm good at.
            </p>
            <Link
              href="/contact"
              className="group text-fg hover:text-accent mt-6 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
            >
              Start a conversation
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <nav aria-label="Footer">
            <div className="label-mono text-fg-subtle">Sitemap</div>
            <ul className="mt-5 space-y-2.5 text-sm">
              {NAV.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-fg-muted hover:text-fg transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Social">
            <div className="label-mono text-fg-subtle">Elsewhere</div>
            <ul className="mt-5 space-y-2.5 text-sm">
              {Object.values(site.socials).map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target={s.url.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group text-fg-muted hover:text-fg inline-flex items-center gap-1.5 transition-colors"
                  >
                    {s.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Readout row */}
        <div className="border-border label-mono text-fg-subtle mt-16 flex flex-col gap-3 border-t pt-6 md:flex-row md:items-center md:justify-between">
          <div>
            © {year} {site.name} · Built in {site.location}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="inline-flex items-center gap-1.5">
              <span className="bg-ok h-1.5 w-1.5 rounded-full" />
              All systems normal
            </span>
            {sha && <span>build {sha}</span>}
            <span>Next.js · React 19 · Vercel</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
