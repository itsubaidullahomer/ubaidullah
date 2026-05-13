import type { Metadata } from "next";
import { Mail, Github, Linkedin, Instagram } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { AuroraMesh } from "@/components/effects/AuroraMesh";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Get in touch with ${site.name} — senior product engineer building AI products. Open to select work.`,
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
          <div className="text-xs uppercase tracking-[0.18em] text-fg-muted">Contact</div>
          <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[0.96] tracking-[-0.025em] text-fg text-balance">
            Let's <em className="italic text-gradient-accent not-italic">talk.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-fg-muted leading-relaxed text-pretty">
            I take a small number of senior engineering and AI engagements at a time. If you're building something with real users, drop a note — I usually reply within a couple of days.
          </p>
        </Container>
      </section>

      <Container className="pb-24">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <ContactForm />

          <aside className="space-y-8">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-fg-subtle">Direct</div>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 block font-display text-2xl text-fg transition-colors hover:text-accent"
              >
                {site.email}
              </a>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="mt-2 block text-sm text-fg-muted transition-colors hover:text-fg"
              >
                {site.phone}
              </a>
              <div className="mt-2 text-sm text-fg-muted">{site.location}</div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-fg-subtle">Elsewhere</div>
              <ul className="mt-3 space-y-1">
                {Object.entries(site.socials).map(([key, s]) => {
                  const Icon = SOCIAL_ICONS[key as keyof typeof SOCIAL_ICONS] ?? Mail;
                  return (
                    <li key={s.url}>
                      <a
                        href={s.url}
                        target={s.url.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 rounded-xl px-3 py-2 -mx-3 text-sm text-fg-muted transition-colors hover:bg-[var(--glass-tint)] hover:text-fg"
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                        <span className="flex-1">{s.label}</span>
                        <span className="font-mono text-xs text-fg-subtle">@{s.handle.split("@")[0]}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="glass rounded-2xl p-5">
              <div className="text-xs uppercase tracking-[0.16em] text-fg-subtle">Response time</div>
              <div className="mt-2 text-sm text-fg-muted leading-relaxed">
                Usually within 2 business days. For urgent things, LinkedIn DM is fastest.
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
