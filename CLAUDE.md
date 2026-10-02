# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal portfolio of Ubaidullah (itsubaidullahomer.com) — Next.js 15 App Router, React 19, TypeScript strict, Tailwind CSS v4, GSAP (scroll and timeline motion), Framer Motion (component transitions), Lenis. Deployed on Vercel. No test suite exists; verification is `npm run typecheck` + `npm run build` (there is no ESLint config, so `npm run lint` prompts interactively — don't rely on it). For visual checks, build, `next start`, and screenshot with Playwright (Chromium is at `/opt/pw-browsers/chromium` in the cloud container).

Design concept: **the site behaves like a running system**. One dark theme, ink background, bone text, a single signal-orange accent, hairline grid textures, mono readouts. The homepage hero background is a real request-routing simulation, the header carries a live clock, cards and metrics read like service status. Bold typography (Fraunces) carries the editorial side. Keep new work inside that language: no glassmorphism, no blurred gradient blobs, no second accent colour.

## Commands

```bash
npm run dev        # dev server (or dev:turbo for Turbopack)
npm run build      # production build — run this to verify changes compile end-to-end
npm run typecheck  # tsc --noEmit
npm run format     # prettier --write . (prettier-plugin-tailwindcss sorts classes)
npm run capture:compare  # phone screenshots for `compare` projects (needs network access to both sites)
```

Environment variables live in `.env.local` (see `.env.example`). All are optional — the site degrades gracefully without them, so never treat a missing key as a blocker.

## Architecture: content is data

The core pattern of this codebase: **all copy lives as typed TypeScript objects in `content/`, and components only render that data.** Changing text, adding a project, or editing experience never means touching a component.

- `content/types.ts` — the schema for everything (`Project`, `Experience`, `WritingPost`, `SkillGroup`, `ArchitectureNode/Edge/Flow`).
- `content/site.ts` — identity: name, role, socials, email, keywords. Imported everywhere (SEO, JSON-LD, footer, hero…).
- `content/projects/` — one file per case study, registered manually in `content/projects/index.ts` (which also defines display order and exports `flagshipProject`, `featuredProjects`, `getProject`, `getAdjacentProjects`). **Adding a case study = create `content/projects/<slug>.ts` + add it to the array in `index.ts`.** `featured: true` puts a project in the hero readout strip and the homepage "More work" grid (currently Tututor, Insight-X/Illume, Viloi); `flagship: true` (Tututor only) gives it the `FlagshipProject` section on the home page and the extended case study. Everything else appears only on `/work`, in the archive registry. `/work` numbers projects in page order: flagship 01, other featured next, archive after. Full-page screenshots go in `public/images/screens/`, flagship product shots under `public/images/<slug>/`.
- Flagship-only fields on `Project`: `pitch`, `showcase` (tabbed real screens, rendered by `ProductShowcase`), `ecosystem` (the product family), `journey` (dated chapters with screenshots), `beforeAfter`, `mobile` (store shots in `PhoneFrame`s), `stories`, and `architecture.intro`. When `journey` is set, `CaseStudyBody` skips the problem/approach/outcome blocks.
- `externalRel` on `Project` sets `rel` on every link out to `externalUrl` (card chip, registry row, case-study link); the default is `noopener noreferrer`. ToolkitJar uses `noopener` so the link is a normal followed link that passes the referrer. Never add `nofollow` to project links. `screenshot.alt` overrides the generated alt text.
- **ToolkitJar** (`content/projects/toolkitjar.ts`) stays last in the projects array, so it sits at the bottom of the archive. The owner keeps adding tools to it: never state how many tools it has, anywhere (copy, metrics, meta descriptions), because any number goes stale.
- Rebuilds shown on a phone set `compare` on `Project` (`DeviceCompare`: before/after label + URL, and `screens`, each with full-page phone shots). That gives the project the `CompareCard` in the work grids (full row, two phones, old one steps back on hover) and a pinned, scroll-linked `PhoneCompare` at the top of its case study. The shots are captured, not hand-made: `npm run capture:compare` (script in `scripts/capture-compare.mjs`, needs `npx playwright install chromium` once) saves full-page phone screenshots to `public/images/<slug>/compare/` and writes their paths and sizes to `content/projects/<slug>.compare.json`, which the content file imports. Until then the phones render a "screens pending" state. Currently used by Ali Foodies.
- `content/writing/index.ts` — blog posts (body is a markdown-ish string rendered by the writing page).
- `content/experience.ts`, `content/skills.ts`, `content/now.ts` — data for their pages.

Downstream consumers that derive from `content/` automatically (no extra registration needed when content changes): `app/sitemap.ts`, `app/work/[slug]/page.tsx` and `app/writing/[slug]/page.tsx` (`generateStaticParams`), the ⌘K command palette, and the hero readout strip. The README's "Editing the content" table maps every user-facing change to its file.

## Server vs client components

Pages under `app/` are React Server Components by default and export `metadata` via `buildMetadata()` from `lib/seo.ts`. Client components (`"use client"`) are pushed to the leaves: `components/effects/SystemField.tsx` and `Portrait.tsx`, `components/motion/*`, `components/layout/*` (Header, LocalClock, CommandPalette), `components/work/ProductShowcase.tsx`, `components/forms/ContactForm.tsx`, `components/playground/FailureLab.tsx`, `components/diagram/SystemMap.tsx`, `components/primitives/Magnetic.tsx`. Keep new pages as RSCs and isolate interactivity in a client child. The hero's streaming headline (`StreamHeadline`) is deliberately a server component driven by CSS, so the full text is in the HTML.

Component directories by role:

- `primitives/` — Button, Card, Container, Section, Heading, Pill, Magnetic (design-system atoms; reuse these before writing new markup). `Section` takes `index` ("01") + `eyebrow` + `title`.
- `sections/` — homepage sections in order: Hero, FlagshipProject (Tututor pitch, numbers strip, ProductShowcase), SelectedWork (the other featured cards), ExperienceTimeline, Philosophy, ContactCTA. Section indices 01–05 are hard-coded in that order.
- `case-study/` — StudyHero (showcase for flagships, old/new links for rebuilds, scrollable full-page shot otherwise), CaseStudyBody (skips problem/approach/outcome when a project has `journey` or `compare`; hides empty metrics, responsibilities and stack), MetricGrid, Journey, FlagshipSections (Ecosystem, before/after, mobile, stories), PhoneCompare (pinned before/after phones driven by page scroll via the `--p` custom property; one phone with a flip toggle below md; plain synced scroll areas under reduced motion), ShotFrame, PhoneFrame
- `diagram/` — SystemMap (renders a project's `architecture` nodes/edges/flows as an animated map)
- `work/` — ProjectCard (service card: status-bar chrome, hover wipe, readout row of real metrics, a load bar in the project colour; `wide` is the flagship layout and wipes between the first two showcase screens), BrowserFrame (browser chrome around a screenshot; `statusBar` swaps the traffic lights for a status dot and the project number; `STATUS_LABEL` / `STATUS_DOT` live here), ArchiveRegistry (the /work archive as a registry table with a cursor-following screenshot preview, portalled to `<body>`; each row is a full-row case-study link with a "Visit {title}" link above it when the project has an `externalUrl`), CompareCard and PhoneShell (the phone bezel shared with PhoneCompare; its screen is a size container so `.phone-img` can pan by exactly the page's overflow), ProductShowcase (autoplaying tabbed tour of real screens). `spansFullRow()` in `content/projects/index.ts` decides which cards take a full row.
- `layout/` — Header (thin bar, live PKT clock, ⌘K), Footer (readout row with build sha), CommandPalette + provider
- `effects/` — `SystemGrid` (pure-CSS hairline grid behind page heroes), `SystemField` (canvas request-routing simulation behind the homepage hero: clients → api → cache/db/providers, provider outages on a timer or on click, rerouting drawn in accent, live stats readout; pauses off-screen; static frame under reduced motion), `Portrait` (halftone black-and-white print with a colour lens on hover, used on /about)
- `motion/` — GSAP layer. `gsap.ts` registers ScrollTrigger once (import gsap from here, never from "gsap"). `MotionRoot` (mounted once in the layout) owns Lenis on the GSAP ticker, the top progress line, the `.spotlight` cursor tracking and the `[data-reveal]` safety net. `Reveal` rises its direct children on scroll, `CountUp` animates a stat, `Tilt` tilts toward the cursor. `lib/lenis-store.ts` exposes the Lenis instance so the Header can pause it. Add `data-lenis-prevent` to any scroll area that must never be smoothed.
- Framer Motion remains only for component-level transitions (ProductShowcase wipes, CommandPalette, Magnetic). Don't add a third motion library.

## Theming (Tailwind v4, CSS-first)

There is **no `tailwind.config`** — this is Tailwind v4. All design tokens live in `app/globals.css`:

- `@theme` block — fonts (`--font-display` is Fraunces, loaded in `app/layout.tsx` with the `SOFT`, `WONK`, `opsz` axes), easings, radius scale (deliberately tight), animations.
- `:root` — the single theme's variables: `--bg`, `--bg-elevated`, `--bg-raised`, `--fg`, `--fg-muted`, `--fg-subtle`, `--border`, `--border-strong`, `--tint`, `--tint-strong`, `--accent`, `--accent-bright`, `--accent-fg`, `--accent-glow`, `--ok`, `--warn`, `--grid-line`. Components consume the variables (via `bg-bg`, `text-fg`, `border-border`, `bg-ok`…), never raw colours. `SystemField.tsx` mirrors a few RGB triplets for canvas drawing; keep them in sync if the palette changes.
- Custom utilities via `@utility`: `surface`, `surface-raised` (flat bordered panels), `font-display`, `accent-italic` (the one accent phrase in a headline), `label-mono` (uppercase mono metadata), `text-display` / `text-title` / `text-heading` (the type scale), `bg-grid`, `rise-in`, `ring-accent`. Plain-CSS blocks: `.stream .tok` (streaming headline), `.shot-a/.shot-b/.shot-tag` (card hover wipe), `.phone-viewport/.phone-img/.phone-img-hover` (phone screens), `.spotlight` (cursor light on surfaces), `html.js-motion [data-reveal]` (reveal gate, set by the inline script in `app/layout.tsx`), `.portrait-*`.
- `lib/cn.ts` extends tailwind-merge so `text-display/title/heading` are treated as font sizes; without that, `cn("text-display", "text-fg")` would drop the size. Register any new `text-*` utility there.
- Per-project accent (`project.accent`) is used only as a hairline/dot on that project's card and case study; the site accent stays orange.

## Graceful degradation (intentional — preserve it)

- **Contact form** (`lib/contact-action.ts`, a server action): Zod validation + honeypot field (`website` must be empty). Without `RESEND_API_KEY` it logs a warning and still returns success. With it, sends via Resend to `CONTACT_TO_EMAIL`.
- **Playground** (`components/playground/FailureLab.tsx`) and the hero **SystemField** are client-side simulations with no API calls and no keys.
- Every animation respects `prefers-reduced-motion`: the global rule in `globals.css` zeroes durations and delays, `MotionRoot` skips Lenis, the `js-motion` class is never added so nothing starts hidden, `SystemField` draws one static frame, and the GSAP helpers all check `prefersReducedMotion()` first.

## SEO plumbing

The site should rank for "Ubaidullah Omer". `site.name` is the full name and is used in titles, the H1, the header wordmark, photo alt text and JSON-LD; don't shorten it.

- Every route's `metadata` goes through `buildMetadata()` in `lib/seo.ts`: title (`Page – Ubaidullah Omer`; the home page is `Ubaidullah Omer – Senior Product Engineer`), description (default `site.description`, kept at 150–160 characters), canonical, Open Graph (1200×630 image from `/api/og?title=…`, rendered by `app/api/og/route.tsx`) and a `summary_large_image` Twitter card. New pages call `buildMetadata({ title, description, path })`.
- **One URL form everywhere:** `siteUrl` / `absoluteUrl()` in `lib/seo.ts` produce `https://itsubaidullahomer.com` (no www, no trailing slash; the home page is the bare origin). Canonicals, og:url, the sitemap and JSON-LD all use them. The origin comes from `site.url`, never from an environment variable.
- **Structured data is rendered with `components/seo/JsonLd.tsx`**, a plain server `<script type="application/ld+json">`. Never use `next/script` for it: that injects the JSON with JavaScript after load, so it is missing from the HTML crawlers read. Builders live in `lib/jsonld.ts`. Person (with `sameAs` from `site.socials`, address and employer from `site.ts`) and WebSite are on the home page only; detail pages carry BreadcrumbList plus CreativeWork or BlogPosting.
- `app/sitemap.ts` derives every public URL from `content/`; `app/robots.ts` allows everything (the share images live under `/api/`, so don't disallow it).

## Conventions

- Path alias `@/*` maps to the repo root (`tsconfig.json`).
- `lib/cn.ts` exports `cn()` (clsx + extended tailwind-merge) — use it for conditional classes.
- `lib/motion.ts` holds the shared durations/easings for Framer Motion.
- TypeScript is strict; content objects must satisfy the types in `content/types.ts`.
- Security headers and image config are in `next.config.ts`; `vercel.json` handles deploy config.
