import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-20 border-t border-border py-16">
      <Container>
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr] md:gap-16">
          <div>
            <div className="font-display text-3xl text-fg leading-tight max-w-md text-balance">
              Let's build something that <em className="not-italic text-gradient-accent">actually ships.</em>
            </div>
            <p className="mt-4 max-w-md text-sm text-fg-muted leading-relaxed">
              I take on a small number of product engineering engagements at a time. If you're building something AI-shaped and need someone who can own end-to-end, that's where I'm useful.
            </p>
            <Link
              href="/contact"
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-accent"
            >
              Start a conversation
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <nav aria-label="Footer">
            <div className="text-xs uppercase tracking-[0.18em] text-fg-subtle">Sitemap</div>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ["/work", "Work"],
                ["/about", "About"],
                ["/writing", "Writing"],
                ["/now", "Now"],
                ["/uses", "Uses"],
                ["/playground", "Playground"],
                ["/contact", "Contact"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-fg-muted transition-colors hover:text-fg">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Social">
            <div className="text-xs uppercase tracking-[0.18em] text-fg-subtle">Elsewhere</div>
            <ul className="mt-4 space-y-2 text-sm">
              {Object.values(site.socials).map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target={s.url.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-fg-muted transition-colors hover:text-fg"
                  >
                    {s.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-border pt-8 text-xs text-fg-subtle md:flex-row md:items-center md:justify-between">
          <div>© {year} {site.name}. Built in {site.location}.</div>
          <div className="font-mono text-[11px]">
            Next.js · React 19 · Tailwind v4 · Vercel
          </div>
        </div>
      </Container>
    </footer>
  );
}
