import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-border relative mt-20 border-t py-16">
      <Container>
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr] md:gap-16">
          <div>
            <div className="font-display text-fg max-w-md text-3xl leading-tight text-balance">
              Let's build something <em className="text-gradient-accent not-italic">that ships.</em>
            </div>
            <p className="text-fg-muted mt-4 max-w-md text-sm leading-relaxed">
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
            <div className="text-fg-subtle text-xs tracking-[0.18em] uppercase">Sitemap</div>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ["/work", "Work"],
                ["/about", "About"],
                ["/now", "Now"],
                ["/playground", "Playground"],
                ["/contact", "Contact"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-fg-muted hover:text-fg transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Social">
            <div className="text-fg-subtle text-xs tracking-[0.18em] uppercase">Elsewhere</div>
            <ul className="mt-4 space-y-2 text-sm">
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

        <div className="border-border text-fg-subtle mt-16 flex flex-col gap-2 border-t pt-8 text-xs md:flex-row md:items-center md:justify-between">
          <div>
            © {year} {site.name}. Built in {site.location}.
          </div>
          <div className="font-mono text-[11px]">Next.js · React 19 · Tailwind v4 · Vercel</div>
        </div>
      </Container>
    </footer>
  );
}
