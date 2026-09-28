import { Container } from "@/components/primitives/Container";
import { Ecosystem } from "./Ecosystem";
import { PhoneFrame } from "./PhoneFrame";
import { ShotFrame } from "./ShotFrame";
import type { Project, StoryBlock } from "@/content/types";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="label-mono text-fg-muted">{children}</div>;
}

export function EcosystemSection({ project }: { project: Project }) {
  if (!project.ecosystem?.length) return null;
  return (
    <Container className="pb-24">
      <div className="mb-10 max-w-2xl">
        <Eyebrow>The product family</Eyebrow>
        <h3 className="font-display text-fg mt-4 text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.02] tracking-[-0.02em] text-balance">
          One login, {project.ecosystem.length} products.
        </h3>
        <p className="text-fg-muted mt-4 leading-relaxed text-pretty">
          What schools see as “Tututor” is a set of separate apps, each with its own repo and
          release cycle, sharing one backend and one data model. I built that backend and most of
          what sits on it. The junior developers I led, and later the founder himself, committed
          alongside me.
        </p>
      </div>
      <Ecosystem products={project.ecosystem} accent={project.accent} />
    </Container>
  );
}

export function BeforeAfterSection({ project }: { project: Project }) {
  const ba = project.beforeAfter;
  if (!ba) return null;
  return (
    <Container className="pb-24">
      <div className="mb-10 max-w-2xl">
        <Eyebrow>Then and now</Eyebrow>
        <h3 className="font-display text-fg mt-4 text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.02] tracking-[-0.02em] text-balance">
          {ba.title}
        </h3>
        <p className="text-fg-muted mt-4 leading-relaxed text-pretty">{ba.body}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <ShotFrame
          shot={ba.before}
          label="first version"
          sizes="(max-width: 1024px) 100vw, 560px"
        />
        <ShotFrame shot={ba.after} label="today" sizes="(max-width: 1024px) 100vw, 560px" />
      </div>
    </Container>
  );
}

export function MobileSection({ project }: { project: Project }) {
  const m = project.mobile;
  if (!m?.shots.length) return null;
  return (
    <section className="pb-24">
      <Container>
        <div className="mb-10 max-w-2xl">
          <Eyebrow>On the phone</Eyebrow>
          <h3 className="font-display text-fg mt-4 text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.02] tracking-[-0.02em] text-balance">
            {m.title}
          </h3>
          <p className="text-fg-muted mt-4 leading-relaxed text-pretty">{m.body}</p>
        </div>
      </Container>
      {/* Full-bleed scroller so the phones can run off the edge on small screens. */}
      <div className="mx-auto max-w-7xl [scrollbar-width:thin] overflow-x-auto overscroll-x-contain px-6 pb-4 md:px-10">
        <ul className="flex w-max gap-5 md:gap-6">
          {m.shots.map((s) => (
            <li key={s.src} className="w-[200px] shrink-0 md:w-[230px]">
              <PhoneFrame shot={s} sizes="230px" />
              <div className="text-fg mt-3 text-sm">{s.app}</div>
              {s.caption && <div className="text-fg-subtle mt-0.5 text-xs">{s.caption}</div>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Story({ story, accent }: { story: StoryBlock; accent: string }) {
  return (
    <Container className="pb-24">
      <div className="surface relative overflow-hidden rounded-xl p-6 md:p-12">
        <div
          className={
            story.moments?.length
              ? "relative grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-14"
              : "relative max-w-3xl"
          }
        >
          <div>
            <Eyebrow>{story.eyebrow}</Eyebrow>
            <h3 className="font-display text-fg mt-4 text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.02] tracking-[-0.02em] text-balance">
              {story.title}
            </h3>
            <div className="text-fg-muted mt-6 space-y-5 text-lg leading-relaxed text-pretty">
              {story.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {story.moments && story.moments.length > 0 && (
            <ol className="border-border space-y-6 border-l pl-6 lg:mt-14">
              {story.moments.map((m) => (
                <li key={m.date + m.text} className="relative">
                  <span
                    aria-hidden
                    className="absolute top-1.5 -left-[27px] h-2 w-2 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                  <div className="label-mono text-fg-subtle">{m.date}</div>
                  <div className="text-fg-muted mt-1 text-sm leading-relaxed text-pretty">
                    {m.text}
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </Container>
  );
}

export function StoriesSection({ project }: { project: Project }) {
  if (!project.stories?.length) return null;
  return (
    <>
      {project.stories.map((s) => (
        <Story key={s.title} story={s} accent={project.accent} />
      ))}
    </>
  );
}
