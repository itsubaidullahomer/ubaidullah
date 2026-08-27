# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal portfolio of Ubaidullah (itsubaidullahomer.com) — Next.js 15 App Router, React 19, TypeScript strict, Tailwind CSS v4, Framer Motion. Deployed on Vercel. No test suite exists; verification is typecheck + lint + build.

## Commands

```bash
npm run dev        # dev server (or dev:turbo for Turbopack)
npm run build      # production build — run this to verify changes compile end-to-end
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
npm run format     # prettier --write . (prettier-plugin-tailwindcss sorts classes)
```

Environment variables live in `.env.local` (see `.env.example`). All are optional — the site degrades gracefully without them (see "Graceful degradation" below), so never treat a missing key as a blocker.

## Architecture: content is data

The core pattern of this codebase: **all copy lives as typed TypeScript objects in `content/`, and components only render that data.** Changing text, adding a project, or editing experience never means touching a component.

- `content/types.ts` — the schema for everything (`Project`, `Experience`, `WritingPost`, `SkillGroup`, `ArchitectureNode/Edge`).
- `content/site.ts` — identity: name, role, socials, email, keywords. Imported everywhere (SEO, JSON-LD, chatbot system prompt, footer…).
- `content/projects/` — one file per case study, registered manually in `content/projects/index.ts` (which also defines display order and exports `featuredProjects`, `getProject`, `getAdjacentProjects`). **Adding a case study = create `content/projects/<slug>.ts` + add it to the array in `index.ts`.** Cover images go in `public/images/`.
- `content/writing/index.ts` — blog posts (body is a markdown-ish string rendered by the writing page).
- `content/experience.ts`, `content/skills.ts`, `content/now.ts`, `content/uses.ts` — data for their pages.

Downstream consumers that derive from `content/` automatically (no extra registration needed when content changes): `app/sitemap.ts`, `app/work/[slug]/page.tsx` and `app/writing/[slug]/page.tsx` (`generateStaticParams`), and the chatbot's system prompt in `app/api/chat/route.ts`. The README's "Editing the content" table maps every user-facing change to its file.

## Server vs client components

Pages under `app/` are React Server Components by default and export `metadata` via `buildMetadata()` from `lib/seo.ts`. Client components (`"use client"`) are pushed to the leaves: `components/effects/*`, `components/layout/*` (Header, CommandPalette, ThemeToggle), `components/forms/ContactForm.tsx`, `components/playground/AskResume.tsx`, and anything using Framer Motion. Keep new pages as RSCs and isolate interactivity in a client child.

Component directories by role:

- `primitives/` — Button, Card, Container, Section, Heading, Pill, Magnetic (design-system atoms; reuse these before writing new markup)
- `sections/` — homepage sections (Hero, SelectedWork, Philosophy, ExperienceTimeline, ContactCTA)
- `case-study/` — StudyHero, CaseStudyBody, MetricGrid, ArchitectureDiagram (renders the `architecture` nodes/edges from a project file as SVG)
- `layout/` — Header, Footer, ThemeToggle, CommandPalette (⌘K) + its provider
- `effects/` — AuroraMesh, GrainOverlay, CursorHalo (pure visual, all respect `prefers-reduced-motion`; CursorHalo is desktop/hover-only)

## Theming (Tailwind v4, CSS-first)

There is **no `tailwind.config`** — this is Tailwind v4. All design tokens live in `app/globals.css`:

- `@theme` block — fonts, motion easings, radii, animations.
- Three themes driven by a `[data-theme]` attribute on `<html>`: `aurora-dark` (default), `aurora-light`, `monochrome`. Each theme is a block of CSS custom properties (`--bg`, `--fg`, `--accent`, `--aurora-*`, …). Components consume the variables, never raw colors.
- Custom utilities via `@utility` (e.g. `glass`, `glass-strong`, `text-gradient-accent`).

Theme switching uses `next-themes` (`components/providers/ThemeProvider.tsx`), but note the FOUC-prevention inline script in `app/layout.tsx` hardcodes the `'aurora-dark'` fallback — changing the default theme means updating **both** that script and the ThemeProvider.

## Graceful degradation (intentional — preserve it)

Two features run without their API keys, by design:

- **Contact form** (`lib/contact-action.ts`, a server action): Zod validation + honeypot field (`website` must be empty). Without `RESEND_API_KEY` it logs a warning and still returns success. With it, sends via Resend to `CONTACT_TO_EMAIL`.
- **Playground chatbot** (`app/api/chat/route.ts`, edge runtime): builds its system prompt from `content/` at request time and calls the Anthropic Messages API directly via `fetch` (no SDK) with prompt caching (`cache_control: ephemeral`), model `claude-haiku-4-5-20251001`, last 8 turns of history. Without `ANTHROPIC_API_KEY` it returns a static demo reply.

Any change to these paths must keep the no-key path working.

## SEO plumbing

Every route's `metadata` goes through `buildMetadata()` in `lib/seo.ts` (canonical URL, OG/Twitter cards, dynamic OG image via `/api/og?title=...` rendered by `app/api/og/route.tsx` with `@vercel/og`). Structured data lives in `lib/jsonld.ts` (Person + WebSite injected in `app/layout.tsx`; BreadcrumbList/CreativeWork/BlogPosting on detail pages). New pages should call `buildMetadata({ title, description, path })` rather than hand-rolling `Metadata`.

## Conventions

- Path alias `@/*` maps to the repo root (`tsconfig.json`).
- `lib/cn.ts` exports `cn()` (clsx + tailwind-merge) — use it for conditional classes.
- TypeScript is strict; content objects must satisfy the types in `content/types.ts`.
- Security headers and image config are in `next.config.ts`; `vercel.json` handles deploy config.
