import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Cpu, Globe, Server, Smartphone } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { Button } from "@/components/primitives/Button";
import { PhoneFrame } from "@/components/case-study/PhoneFrame";
import { flagshipProject } from "@/content/projects";

const KIND_ICON = { web: Globe, mobile: Smartphone, backend: Server, native: Cpu } as const;

/**
 * The home page's lead: the flagship project shown as the suite it is,
 * not one card among many.
 */
export function FlagshipProject() {
  const p = flagshipProject;
  if (!p) return null;

  const hero = p.beforeAfter?.after ?? p.journey?.at(-1)?.shots?.[0];
  const phones = p.mobile?.shots.slice(0, 3) ?? [];
  const lead = phones.length > 1 ? 1 : 0;

  return (
    <Section
      id="flagship"
      eyebrow="Flagship"
      size="wide"
      title={
        <>
          {p.title}: one product that became{" "}
          <em className="text-gradient-accent italic not-italic">
            {p.ecosystem?.length ?? "many"}.
          </em>
        </>
      }
      description={p.summary}
    >
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-14">
        {/* Left: numbers + product list */}
        <div className="min-w-0">
          <div className="grid grid-cols-2 gap-3">
            {p.metrics.map((m) => (
              <div key={m.label} className="glass rounded-2xl p-4 md:p-5">
                <div className="font-display text-fg text-3xl leading-none tracking-[-0.02em]">
                  {m.value}
                </div>
                <div className="text-fg-muted mt-2 text-xs leading-snug">{m.label}</div>
              </div>
            ))}
          </div>

          {p.ecosystem && (
            <ul className="border-border mt-8 divide-y divide-[var(--border)] border-y">
              {p.ecosystem.map((s) => {
                const Icon = KIND_ICON[s.kind];
                return (
                  <li key={s.name} className="flex items-center gap-3 py-3">
                    <Icon className="text-fg-muted h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
                    <span className="text-fg min-w-0 flex-1 truncate text-sm">{s.name}</span>
                    <span className="text-fg-subtle shrink-0 text-xs">{s.audience}</span>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`/work/${p.slug}`} variant="primary" withArrow>
              Read how I built it
            </Button>
            {p.externalUrl && (
              <Button href={p.externalUrl} external variant="secondary">
                Visit {p.title}
              </Button>
            )}
          </div>
        </div>

        {/* Right: the web app with the phone apps in front of it */}
        <Link
          href={`/work/${p.slug}`}
          aria-label={`${p.title}: read the case study`}
          className="group relative block min-w-0 pb-16 md:pb-24 lg:sticky lg:top-28"
        >
          {hero && (
            <div className="glass overflow-hidden rounded-2xl transition-transform duration-500 group-hover:-translate-y-1">
              <Image
                src={hero.src}
                width={hero.width}
                height={hero.height}
                alt={hero.alt}
                sizes="(max-width: 1024px) 100vw, 720px"
                quality={75}
                className="block h-auto w-full"
              />
            </div>
          )}
          {phones.length > 0 && (
            <div className="absolute right-2 bottom-0 flex items-end gap-2 md:right-6 md:gap-3">
              {phones.map((s, i) => (
                <PhoneFrame
                  key={s.src}
                  shot={s}
                  sizes="160px"
                  className={
                    i === lead
                      ? "w-[92px] sm:w-[120px] md:w-[150px]"
                      : "hidden w-[80px] translate-y-3 sm:block sm:w-[104px] md:w-[130px]"
                  }
                />
              ))}
            </div>
          )}
          <span className="glass-strong text-fg absolute top-3 left-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs">
            Case study
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
          </span>
        </Link>
      </div>
    </Section>
  );
}
