import { Container } from "@/components/primitives/Container";
import { ShotFrame } from "./ShotFrame";
import type { JourneyStep } from "@/content/types";

/** The "how it got here" timeline: one chapter per era, screenshots beside each. */
export function Journey({ steps, accent }: { steps: JourneyStep[]; accent: string }) {
  return (
    <Container className="pb-24">
      <div className="mb-12 max-w-2xl">
        <div className="label-mono text-fg-muted">The journey</div>
        <h3 className="font-display text-fg mt-4 text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.02] tracking-[-0.02em] text-balance">
          Three rebuilds and a lot of commits.
        </h3>
        <p className="text-fg-muted mt-4 leading-relaxed text-pretty">
          It didn't start as a platform. It started as someone else's Next.js app with a problem to
          fix. Each chapter below is a real point in the git history, with what the product looked
          like at the time.
        </p>
      </div>

      <ol className="relative space-y-16 md:space-y-24">
        <div
          aria-hidden
          className="absolute top-2 bottom-2 left-[7px] w-px md:left-[11px]"
          style={{
            backgroundImage: `linear-gradient(to bottom, ${accent}, var(--border), transparent)`,
          }}
        />
        {steps.map((s, i) => (
          <li key={s.title} className="relative pl-8 md:pl-12">
            <span
              aria-hidden
              className="bg-bg ring-border absolute top-1.5 left-0 grid h-4 w-4 place-items-center rounded-full ring-1 md:h-6 md:w-6"
            >
              <span
                className="h-1.5 w-1.5 rounded-full md:h-2 md:w-2"
                style={{ backgroundColor: i === steps.length - 1 ? accent : "var(--fg-subtle)" }}
              />
            </span>

            <div className="flex flex-wrap items-center gap-2">
              <span className="label-mono text-fg-subtle">{s.period}</span>
              {s.tag && (
                <span
                  className="label-mono rounded-md border px-2 py-0.5"
                  style={{
                    borderColor: `color-mix(in oklab, ${accent} 45%, transparent)`,
                    color: "var(--fg)",
                  }}
                >
                  {s.tag}
                </span>
              )}
            </div>

            <div
              className={
                s.shots?.length
                  ? "mt-4 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12"
                  : "mt-4 max-w-2xl"
              }
            >
              <div>
                <h4 className="font-display text-fg text-[1.75rem] leading-[1.05] tracking-[-0.02em] md:text-[2rem]">
                  {s.title}
                </h4>
                <p className="text-fg-muted mt-4 leading-relaxed text-pretty">{s.body}</p>
                {s.stack && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {s.stack.map((t) => (
                      <span
                        key={t}
                        className="border-border text-fg-muted rounded-md border px-2 py-0.5 font-mono text-[11px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {s.shots && s.shots.length > 0 && (
                <div className="grid gap-5">
                  {s.shots.map((shot) => (
                    <ShotFrame
                      key={shot.src}
                      shot={shot}
                      sizes="(max-width: 1024px) 100vw, 600px"
                    />
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Container>
  );
}
