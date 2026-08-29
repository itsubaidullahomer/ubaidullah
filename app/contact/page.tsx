import type { Metadata } from "next";
import { Mail, Github, Linkedin, Instagram } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { AuroraMesh } from "@/components/effects/AuroraMesh";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Get in touch with ${site.name}, a product engineer building AI products. Open to select work.`,
  path: "/contact",
});

const SOCIAL_ICONS = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  email: Mail,
} as const;

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-32 pb-12 md:pt-40">
        <AuroraMesh variant="section" />
        <Container className="relative z-10">
          <div className="text-fg-muted text-xs tracking-[0.18em] uppercase">Contact</div>
          <h1 className="font-display text-fg mt-4 text-5xl leading-[0.96] tracking-[-0.025em] text-balance md:text-7xl">
            Let's <em className="text-gradient-accent italic not-italic">talk.</em>
          </h1>
          <p className="text-fg-muted mt-6 max-w-xl text-lg leading-relaxed text-pretty">
            I take on a few engineering and AI projects at a time. If you're building something and
            want to talk about it, send me a note. I usually reply within a day or two.
          </p>
        </Container>
      </section>

      <Container className="pb-24">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <ContactForm />

          <aside className="space-y-8">
            <div>
              <div className="text-fg-subtle text-xs tracking-[0.18em] uppercase">Direct</div>
              <a
                href={`mailto:${site.email}`}
                className="font-display text-fg hover:text-accent mt-3 block text-2xl transition-colors"
              >
                {site.email}
              </a>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="text-fg-muted hover:text-fg mt-2 block text-sm transition-colors"
              >
                {site.phone}
              </a>
              <div className="text-fg-muted mt-2 text-sm">{site.location}</div>
            </div>

            <div>
              <div className="text-fg-subtle text-xs tracking-[0.18em] uppercase">Elsewhere</div>
              <ul className="mt-3 space-y-1">
                {Object.entries(site.socials).map(([key, s]) => {
                  const Icon = SOCIAL_ICONS[key as keyof typeof SOCIAL_ICONS] ?? Mail;
                  return (
                    <li key={s.url}>
                      <a
                        href={s.url}
                        target={s.url.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="group text-fg-muted hover:text-fg -mx-3 flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-[var(--glass-tint)]"
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                        <span className="flex-1">{s.label}</span>
                        <span className="text-fg-subtle font-mono text-xs">
                          @{s.handle.split("@")[0]}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="glass rounded-2xl p-5">
              <div className="text-fg-subtle text-xs tracking-[0.16em] uppercase">
                Response time
              </div>
              <div className="text-fg-muted mt-2 text-sm leading-relaxed">
                Usually within 2 business days. For urgent things, LinkedIn DM is fastest.
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
