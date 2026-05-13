# itsubaidullahomer.com

Personal portfolio of **Ubaidullah** — Senior Product Engineer.

Built with **Next.js 15 (App Router)**, **React 19**, **TypeScript** (strict), **Tailwind CSS v4**, and **Framer Motion**. Deployed on Vercel.

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 — App Router, RSC by default |
| Styling | Tailwind v4 — CSS-first design tokens |
| Animation | Framer Motion |
| Theming | next-themes + CSS custom properties (3 themes) |
| Forms | React Server Actions + Resend |
| AI | Claude Haiku 4.5 (with prompt caching) |
| Analytics | Vercel Analytics + Speed Insights |

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
ANTHROPIC_API_KEY=     # /playground chatbot (optional — shows static demo without it)
```

## Editing the content

Everything is data — **no rebuilding components to change copy**.

| What you want to change | File |
|---|---|
| Name, tagline, socials, email | [content/site.ts](content/site.ts) |
| Job experience | [content/experience.ts](content/experience.ts) |
| A specific case study | `content/projects/<slug>.ts` |
| Add a new case study | Create `content/projects/new.ts`, add it to [content/projects/index.ts](content/projects/index.ts) |
| Skills | [content/skills.ts](content/skills.ts) |
| /now page | [content/now.ts](content/now.ts) |
| /uses page | [content/uses.ts](content/uses.ts) |
| Blog posts | [content/writing/index.ts](content/writing/index.ts) |

## Editing the design

| What | File |
|---|---|
| Colors, themes, fonts, motion tokens | [app/globals.css](app/globals.css) — `@theme` block + `[data-theme]` selectors |
| Glass effect | `@utility glass` in the same file |
| Aurora background | [components/effects/AuroraMesh.tsx](components/effects/AuroraMesh.tsx) |
| Grain noise | [components/effects/GrainOverlay.tsx](components/effects/GrainOverlay.tsx) |
| Cursor halo | [components/effects/CursorHalo.tsx](components/effects/CursorHalo.tsx) |
| Header / nav | [components/layout/Header.tsx](components/layout/Header.tsx) |
| Command palette (⌘K) | [components/layout/CommandPalette.tsx](components/layout/CommandPalette.tsx) |

## Folder structure

```
app/                  Routes (App Router)
  api/chat            Edge function — Anthropic chatbot
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
  uses.ts

components/
  primitives/         Button, Card, Glass, Pill, Section…
  effects/            AuroraMesh, GrainOverlay, CursorHalo
  layout/             Header, Footer, ThemeToggle, CommandPalette
  sections/           Hero, SelectedWork, etc.
  case-study/         StudyHero, ArchitectureDiagram, MetricGrid
  playground/         AskResume (AI chat)
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

## Theme system

Three themes, all driven by `[data-theme]` CSS variables:

- **aurora-dark** (default) — near-black canvas, lime accent, aurora mesh
- **aurora-light** — warm off-white, deep accent
- **monochrome** — pure greyscale, no aurora

Switch via header toggle, ⌘K command palette, or `setTheme()` from `next-themes`.

## Notes

- The contact form falls back to console.log if `RESEND_API_KEY` isn't set
- The /playground chatbot falls back to a static demo if `ANTHROPIC_API_KEY` isn't set
- All animations respect `prefers-reduced-motion`
- Cursor halo is desktop-only (hover capability check)

---

© Ubaidullah · Built in Pakistan
