# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal portfolio of Ubaidullah (itsubaidullahomer.com) — Next.js 15 App Router, React 19, TypeScript strict, Tailwind CSS v4, Framer Motion, Lenis. Deployed on Vercel. No test suite exists; verification is `npm run typecheck` + `npm run build` (there is no ESLint config, so `npm run lint` prompts interactively — don't rely on it). For visual checks, build, `next start`, and screenshot with Playwright (Chromium is at `/opt/pw-browsers/chromium` in the cloud container).

Design concept: **the site behaves like a running system**. One dark theme, ink background, bone text, a single signal-orange accent, hairline grid textures, mono readouts. The homepage hero background is a real request-routing simulation, the header carries a live clock, cards and metrics read like service status. Bold typography (Fraunces) carries the editorial side. Keep new work inside that language: no glassmorphism, no blurred gradient blobs, no second accent colour.

## Commands

```bash
npm run dev        # dev server (or dev:turbo for Turbopack)
npm run build      # production build — run this to verify changes compile end-to-end
npm run typecheck  # tsc --noEmit
npm run format     # prettier --write . (prettier-plugin-tailwindcss sorts classes)
```

Environment variables live in `.env.local` (see `.env.example`). All are optional — the site degrades gracefully without them, so never treat a missing key as a blocker.

## Architecture: content is data

The core pattern of this codebase: **all copy lives as typed TypeScript objects in `content/`, and components only render that data.** Changing text, adding a project, or editing experience never means touching a component.

- `content/types.ts` — the schema for everything (`Project`, `Experience`, `WritingPost`, `SkillGroup`, `ArchitectureNode/Edge/Flow`).
- `content/site.ts` — identity: name, role, socials, email, keywords. Imported everywhere (SEO, JSON-LD, footer, hero…).
- `content/projects/` — one file per case study, registered manually in `content/projects/index.ts` (which also defines display order and exports `featuredProjects`, `getProject`, `getAdjacentProjects`). **Adding a case study = create `content/projects/<slug>.ts` + add it to the array in `index.ts`.** `featured: true` marks a flagship (currently Tututor, Insight-X/Illume, Viloi); flagships appear in the hero readout strip and the homepage work section, everything else only on `/work`. Full-page screenshots go in `public/images/screens/`.
- `content/writing/index.ts` — blog posts (body is a markdown-ish string rendered by the writing page).
- `content/experience.ts`, `content/skills.ts`, `content/now.ts` — data for their pages.

Downstream consumers that derive from `content/` automatically (no extra registration needed when content changes): `app/sitemap.ts`, `app/work/[slug]/page.tsx` and `app/writing/[slug]/page.tsx` (`generateStaticParams`), the ⌘K command palette, and the hero readout strip. The README's "Editing the content" table maps every user-facing change to its file.

## Server vs client components

Pages under `app/` are React Server Components by default and export `metadata` via `buildMetadata()` from `lib/seo.ts`. Client components (`"use client"`) are pushed to the leaves: `components/effects/SystemField.tsx`, `components/motion/*`, `components/layout/*` (Header, LocalClock, CommandPalette), `components/providers/SmoothScroll.tsx`, `components/forms/ContactForm.tsx`, `components/playground/FailureLab.tsx`, `components/diagram/SystemMap.tsx`, `components/primitives/Magnetic.tsx`. Keep new pages as RSCs and isolate interactivity in a client child. The hero's streaming headline (`StreamHeadline`) is deliberately a server component driven by CSS, so the full text is in the HTML.

Component directories by role:

- `primitives/` — Button, Card, Container, Section, Heading, Pill, Magnetic (design-system atoms; reuse these before writing new markup). `Section` takes `index` ("01") + `eyebrow` + `title`.
- `sections/` — homepage sections (Hero, StreamHeadline, SelectedWork, ExperienceTimeline, Philosophy, ContactCTA)
- `case-study/` — StudyHero, CaseStudyBody, MetricGrid
- `diagram/` — SystemMap (renders a project's `architecture` nodes/edges/flows as an animated map)
- `work/` — ProjectCard, BrowserFrame (live-site screenshot in browser chrome; hover pans the page)
- `layout/` — Header (thin bar, live PKT clock, ⌘K), Footer (readout row with build sha), CommandPalette + provider
- `effects/` — `SystemGrid` (pure-CSS hairline grid behind page heroes) and `SystemField` (canvas request-routing simulation behind the homepage hero: clients → api → cache/db/providers, provider outages on a timer or on click, rerouting drawn in accent, live stats readout; pauses off-screen; static frame under reduced motion)
- `motion/` — `Reveal`, `RevealGroup`, `RevealItem` (Framer Motion in-view fades; respect reduced motion)
- `providers/` — `SmoothScroll` (Lenis on the window, `allowNestedScroll`; add `data-lenis-prevent` to any scroll area that must never be smoothed)

## Theming (Tailwind v4, CSS-first)

There is **no `tailwind.config`** — this is Tailwind v4. All design tokens live in `app/globals.css`:

- `@theme` block — fonts (`--font-display` is Fraunces, loaded in `app/layout.tsx` with the `SOFT`, `WONK`, `opsz` axes), easings, radius scale (deliberately tight), animations.
- `:root` — the single theme's variables: `--bg`, `--bg-elevated`, `--bg-raised`, `--fg`, `--fg-muted`, `--fg-subtle`, `--border`, `--border-strong`, `--tint`, `--tint-strong`, `--accent`, `--accent-bright`, `--accent-fg`, `--accent-glow`, `--ok`, `--warn`, `--grid-line`. Components consume the variables (via `bg-bg`, `text-fg`, `border-border`, `bg-ok`…), never raw colours. `SystemField.tsx` mirrors a few RGB triplets for canvas drawing; keep them in sync if the palette changes.
- Custom utilities via `@utility`: `surface`, `surface-raised` (flat bordered panels), `font-display`, `accent-italic` (the one accent phrase in a headline), `label-mono` (uppercase mono metadata), `text-display` / `text-title` / `text-heading` (the type scale), `bg-grid`, `rise-in`, `ring-accent`. The `.stream .tok` rules drive the streaming headline.
- `lib/cn.ts` extends tailwind-merge so `text-display/title/heading` are treated as font sizes; without that, `cn("text-display", "text-fg")` would drop the size. Register any new `text-*` utility there.
- Per-project accent (`project.accent`) is used only as a hairline/dot on that project's card and case study; the site accent stays orange.

## Graceful degradation (intentional — preserve it)

- **Contact form** (`lib/contact-action.ts`, a server action): Zod validation + honeypot field (`website` must be empty). Without `RESEND_API_KEY` it logs a warning and still returns success. With it, sends via Resend to `CONTACT_TO_EMAIL`.
- **Playground** (`components/playground/FailureLab.tsx`) and the hero **SystemField** are client-side simulations with no API calls and no keys.
- Every animation respects `prefers-reduced-motion`: the global rule in `globals.css` zeroes durations and delays, Lenis disables smoothing, `SystemField` draws one static frame, `Reveal` skips the vertical travel.

## SEO plumbing

Every route's `metadata` goes through `buildMetadata()` in `lib/seo.ts` (canonical URL, OG/Twitter cards, dynamic OG image via `/api/og?title=...` rendered by `app/api/og/route.tsx` with `@vercel/og`, styled with the same ink/bone/orange palette). Structured data lives in `lib/jsonld.ts` (Person + WebSite injected in `app/layout.tsx`; BreadcrumbList/CreativeWork/BlogPosting on detail pages). New pages should call `buildMetadata({ title, description, path })` rather than hand-rolling `Metadata`.

## Conventions

- Path alias `@/*` maps to the repo root (`tsconfig.json`).
- `lib/cn.ts` exports `cn()` (clsx + extended tailwind-merge) — use it for conditional classes.
- `lib/motion.ts` holds the shared durations/easings for Framer Motion.
- TypeScript is strict; content objects must satisfy the types in `content/types.ts`.
- Security headers and image config are in `next.config.ts`; `vercel.json` handles deploy config.
