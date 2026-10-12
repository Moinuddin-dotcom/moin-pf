# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

The package manager is pnpm (`packageManager: pnpm@10.15.1`). Don't use npm or yarn, so `pnpm-lock.yaml` stays the only lockfile.

- `pnpm dev`: start the dev server at http://localhost:3000
- `pnpm build`: production build, which also type-checks
- `pnpm lint`: ESLint 9 flat config (`eslint.config.mjs`, Next core-web-vitals and TypeScript presets)
- `pnpm exec tsc --noEmit`: type-check without building

The project has no test suite or test runner.

## Stack

Next.js 16 (App Router), React 19, TypeScript (strict), and Tailwind CSS v4 through `@tailwindcss/postcss`. There is no `tailwind.config`: theme tokens live in `app/globals.css` (`@theme inline`, plus `:root` and `.dark` CSS variables). The animation libraries are GSAP with ScrollTrigger (most scroll-driven section animation) and `motion`/`framer-motion`. Theming:
- **Always loads dark, never persisted:** `app/layout.tsx` renders `<html className="dark">`. The navbar's `AnimatedThemeToggler` flips that class for the current visit only, and nothing is saved, so a reload goes back to dark. There is no `next-themes`. Components read the current theme with `useIsDark()` from `@/hooks/use-is-dark`, which watches the class on `<html>`.
- **Use the palette tokens:** section components use `surface` (page background), `ink` (text, borders, translucent panels such as `text-ink/65` or `border-ink/10`) and `brand` (the green accent). These are defined for `:root` (light) and `.dark` in `globals.css`. Use them instead of hard-coded `white`, `#0a0a0a` or `#00ffb2`. The exception is text over images or the black lightbox, which stays white.

## Architecture

- **Split layout:** routes live in `app/` at the repo root, but everything else lives in `src/`. The `@/*` alias resolves to `./src/*` (`@/components/...`, `@/data/...`, `@/lib/utils`), so it cannot reach `app/`.
- **Single-page portfolio:** `app/page.tsx` stacks the section components (`WelcomeScreen` → `Navbar` → `Hero` → `About` → `Skills` → `ProjectShowcase` → `Experience` → `Contact` → `Footer`). Each section is a `"use client"` component under `src/components/<section>/` and has an `id` (`home`, `about`, `skills`, `projects`, `experience`, `contact`). `Navbar` and `Footer` link to these ids with `#hash` anchors, so if you rename an id, update those links too.
- **Data-driven content:** project and skill content lives in `src/data/projects.ts` and `src/data/skills.ts` as plain untyped arrays (no shared interface). Skill icons come from `simple-icons` (`si*` exports).
  - `projects` feeds the pinned, scroll-scrubbed GSAP showcase in `ProjectShowcase` (desktop only, through `gsap.matchMedia("(min-width: 768px)")`, with scroll length scaled by `projects.length`).
  - `projects` also feeds the static detail route `app/projects/[slug]/page.tsx`, which uses `generateStaticParams` over `projects` and renders `ProjectDetails`.
  - Project images are paths under `public/projects/`. Videos are Loom share URLs, rendered by `ProjectVideo`.
- **Async route params:** in this version of Next, `params` is a `Promise` and must be awaited, as in `app/projects/[slug]/page.tsx`.
- **UI primitives:** `src/components/ui/` holds shadcn components (style `base-nova`, built on `@base-ui/react` rather than Radix) and Magic UI registry components (the `@magicui` registry in `components.json`). Add new ones with `pnpm dlx shadcn@latest add <name>` or `@magicui/<name>`. Use `cn()` from `@/lib/utils` to merge classes.
- **Global client widgets:** `app/layout.tsx` mounts `SmoothCursor` (a custom cursor) and `ThemeProvider` around every page.
- **Contact form:** `Contact.tsx` uses `react-hook-form` and posts directly from the client to Web3Forms (`https://api.web3forms.com/submit`). The access key is inline. There is no API route or backend.
