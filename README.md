# itsubaidullahomer.com

Personal portfolio of **Ubaidullah** — Senior Product Engineer.

Built with **Next.js 15 (App Router)**, **React 19**, **TypeScript** (strict), **Tailwind CSS v4**, and **Framer Motion**. Deployed on Vercel.

## Stack

| Layer     | Tech                                                       |
| --------- | ---------------------------------------------------------- |
| Framework | Next.js 15 — App Router, RSC by default                    |
| Styling   | Tailwind v4 — CSS-first design tokens                      |
| Animation | Framer Motion                                              |
| Theming   | One dark theme, CSS custom properties in `app/globals.css` |
| Forms     | React Server Actions + Resend                              |
| Scrolling | Lenis (smooth scroll, honours reduced motion)              |
| Analytics | Vercel Analytics + Speed Insights                          |

## Getting started

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Environment variables

Copy `.env.example` → `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://itsubaidullahomer.com
RESEND_API_KEY=        # contact form (optional — gracefully degrades)
CONTACT_TO_EMAIL=itsubaidullahomer@gmail.com
```

## Editing the content

Everything is data — **no rebuilding components to change copy**.

| What you want to change       | File                                                                                               |
| ----------------------------- | -------------------------------------------------------------------------------------------------- |
| Name, tagline, socials, email | [content/site.ts](content/site.ts)                                                                 |
| Job experience                | [content/experience.ts](content/experience.ts)                                                     |
| A specific case study         | `content/projects/<slug>.ts`                                                                       |
| Add a new case study          | Create `content/projects/new.ts`, add it to [content/projects/index.ts](content/projects/index.ts) |
| Skills                        | [content/skills.ts](content/skills.ts)                                                             |
| /now page                     | [content/now.ts](content/now.ts)                                                                   |
| Blog posts                    | [content/writing/index.ts](content/writing/index.ts)                                               |

## Editing the design

| What                                | File                                                                                                        |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Colors, fonts, radii, motion tokens | [app/globals.css](app/globals.css) — `@theme` block + `:root` variables                                     |
| Surfaces, type scale, mono labels   | `@utility surface`, `text-display/title/heading`, `label-mono` in the same file                             |
| Hairline grid behind page heroes    | [components/effects/SystemGrid.tsx](components/effects/SystemGrid.tsx)                                      |
| Homepage request-routing simulation | [components/effects/SystemField.tsx](components/effects/SystemField.tsx)                                    |
| Streaming headline                  | [components/sections/StreamHeadline.tsx](components/sections/StreamHeadline.tsx) + `.stream` in globals.css |
| Scroll reveals                      | [components/motion/Reveal.tsx](components/motion/Reveal.tsx)                                                |
| Header / nav                        | [components/layout/Header.tsx](components/layout/Header.tsx)                                                |
| Command palette (⌘K)                | [components/layout/CommandPalette.tsx](components/layout/CommandPalette.tsx)                                |

## Folder structure

```
app/                  Routes (App Router)
  api/og              Dynamic OG image generation
  work/[slug]         Dynamic case studies
  writing/[slug]      Dynamic blog posts
  sitemap.ts          Auto-generated from content/
  robots.ts
  manifest.ts

content/              Single source of truth for all copy
  site.ts             Name, socials, role, etc.
  experience.ts
  projects/           One file per case study
  writing/            Blog posts
  skills.ts
  now.ts

components/
  primitives/         Button, Card, Pill, Section, Heading, Container, Magnetic
  effects/            SystemGrid (hairline grid), SystemField (hero simulation), Portrait
  motion/             gsap.ts, MotionRoot (Lenis + progress line + spotlight), Reveal, CountUp, Tilt
  layout/             Header, LocalClock, Footer, CommandPalette
  sections/           Hero, StreamHeadline, FlagshipProject, SelectedWork, ExperienceTimeline, Philosophy, ContactCTA
  case-study/         StudyHero, CaseStudyBody, MetricGrid, Journey, FlagshipSections, ShotFrame, PhoneFrame
  work/               ProjectCard, BrowserFrame, ArchiveRegistry, ProductShowcase
  diagram/            SystemMap (interactive architecture diagram)
  playground/         FailureLab (client-side resilience simulation)
  forms/              ContactForm

lib/
  seo.ts              buildMetadata() helper
  jsonld.ts           Person, WebSite, BreadcrumbList schemas
  cn.ts               clsx + tailwind-merge
  contact-action.ts   Server action for contact form
```

## SEO checklist

- [x] App Router `metadata` exports on every route
- [x] Dynamic OG images via `/api/og` with title in query
- [x] JSON-LD schemas: Person, WebSite, BreadcrumbList, BlogPosting, CreativeWork
- [x] `sitemap.xml` auto-generated from content
- [x] `robots.txt` allowing all
- [x] Web app manifest
- [x] Per-page canonical URLs
- [x] OpenGraph + Twitter cards
- [x] Semantic HTML, single h1/page

## Deploy

Push to GitHub, import in Vercel, add env vars, point `itsubaidullahomer.com` at it. That's it.

## Design system

One dark theme. Ink background (`--bg`), bone text (`--fg`), one signal-orange accent (`--accent`) used sparingly, and a green `--ok` for live status. Every colour a component uses is a variable in `app/globals.css`.

- **Type**: Fraunces (variable serif) for display, Geist for body, Geist Mono for labels and readouts. `accent-italic` turns on Fraunces' WONK axis for the one accent phrase in a headline.
- **Surfaces**: `surface` / `surface-raised` are flat and bordered. Nothing blurs or glows.
- **Concept**: the site behaves like a running system. The hero background is a request-routing simulation with real provider health, the header carries a live clock, cards and metrics read like service readouts.

## Notes

- The contact form falls back to console.log if `RESEND_API_KEY` isn't set
- The /playground Failure Lab and the hero simulation run entirely in the browser; no API keys involved
- All animations respect `prefers-reduced-motion` (the hero simulation renders a single static frame)

---

© Ubaidullah · Built in Pakistan
