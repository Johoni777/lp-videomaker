# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page Portuguese-language landing page for **João Vitor Heringer**, a videomaker in Curitiba, BR (heringerdigital.com.br). The whole site is one route ([src/app/page.tsx](src/app/page.tsx)) composed of section components that scroll-stack: `Hero → Marquee → Portfolio → Positioning → Differential → Process → Offer → FinalCta`.

The primary conversion goal is the WhatsApp CTA — every CTA on the page funnels into [src/lib/whatsapp.ts](src/lib/whatsapp.ts) via the shared [`WhatsappButton`](src/components/WhatsappButton.tsx).

## Commands

```powershell
npm run dev      # next dev (Turbopack)
npm run build    # next build
npm run start    # production server
npm run lint     # eslint (flat config; eslint-config-next core-web-vitals + typescript)
```

There is **no test suite**. Don't add one unless asked.

### Asset pipeline (Windows-only, run manually)

Two PowerShell scripts in [scripts/](scripts/) re-encode source clips into the optimized MP4s + JPG posters that ship in `public/videos/`. They are not part of `npm run build` — run them on demand when assets change:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\optimize-videos.ps1   # full portfolio rebuild
powershell -ExecutionPolicy Bypass -File scripts\optimize-hero.ps1     # hero + final-cta + og-image only
```

Both scripts use the bundled `node_modules/ffmpeg-static/ffmpeg.exe` (so `ffmpeg-static` must stay in `devDependencies`) and read **source clips from a sibling Desktop folder** matching `C:\Users\jvher\Desktop\Portf*VideoMaker\`. They will throw if that folder isn't present — that's expected on any other machine.

Targets: vertical clips → 720×1280, horizontal → 1280×720, libx264 with `+faststart`, audio dropped on hero/final-cta.

## Stack

- **Next.js 16 (App Router) + React 19 + TypeScript strict**. Path alias `@/*` → `./src/*`.
- **Tailwind v4** via `@tailwindcss/postcss` — config is CSS-driven through `@theme inline` in [src/app/globals.css](src/app/globals.css), there is no `tailwind.config.*`.
- **shadcn/ui** with the `base-nova` style ([components.json](components.json)). Primitives live in [src/components/ui/](src/components/ui/) and are built on `@base-ui/react`, not Radix.
- **Framer Motion** for animations, **Lenis** for smooth scroll, **lucide-react** for icons.

## Architecture notes

### Layout shell
[src/app/layout.tsx](src/app/layout.tsx) wires four global FX components into every page once: `<SmoothScroll />`, `<ScrollProgress />`, `<CustomCursor />`, `<Grain />`. Three Google fonts are loaded as CSS variables — `--font-geist-sans`, `--font-geist-mono`, `--font-fraunces` (display/heading). The dark theme is hard-coded (`bg-[#0A0A0A]`, `colorScheme: "dark"`) — there is no light mode.

### Design tokens
The brand system lives in `:root` in [src/app/globals.css](src/app/globals.css):
- `--accent-1: #FF6A3D` (orange), `--accent-2: #E0249E` (magenta), `--accent-3: #7B61FF` (violet) — used for the conic-gradient borders, glow shadows, and scroll progress bar.
- Custom utilities: `.conic-border` (animated rotating gradient border via `--angle` `@property`), `.glow-accent`/`.glow-accent-strong`/`.glow-pulse`, `.aurora-blob-1`/`-2`, `.marquee-track`, `.font-display`, `.grain-overlay`.
- All animations are gated by a `@media (prefers-reduced-motion: reduce)` block — preserve this when adding new keyframes.

### Reduced-motion / pointer-coarse handling
Multiple components branch on `matchMedia` to disable expensive behavior on touch devices and accessibility-sensitive users:
- [SmoothScroll](src/components/fx/SmoothScroll.tsx) bails out entirely on coarse pointers (mobile uses native scroll — Lenis was interfering with `IntersectionObserver`-driven reveals).
- [CustomCursor](src/components/fx/CustomCursor.tsx) only renders on `(pointer: fine)` + non-reduced motion, and applies `cursor: none` globally via a `<style jsx global>` block. Mark interactive elements with `data-cursor="hover"` to trigger the enlarged cursor state (in addition to `a, button, [role="button"], video`).

When adding interactive elements, set `data-cursor="hover"` so the custom cursor responds.

### Portfolio data
[src/lib/portfolio.ts](src/lib/portfolio.ts) is the single source of truth — a hand-curated array of `VideoItem`s with `id`, `client`, `category` (`reels | comercial | ugc`), `src`, `poster`, `aspect`. The `id` must match the filename used by `optimize-videos.ps1` (e.g. `fuj-1` → `public/videos/portfolio/fuj-1.mp4` + `public/videos/posters/portfolio/fuj-1.jpg`). Adding a new item means: (1) append to `PORTFOLIO`, (2) add a corresponding `Optimize-Clip` line in [scripts/optimize-videos.ps1](scripts/optimize-videos.ps1), (3) re-run the script.

`VideoCategory` filter labels live in `CATEGORY_LABELS`; `CLIENTS` drives the marquee in [src/components/sections/Marquee.tsx](src/components/sections/Marquee.tsx).

### Portfolio playback behavior
[VideoCard](src/components/VideoCard.tsx) auto-plays muted on viewport entry via `IntersectionObserver` (threshold 0.4) and unmutes on hover. [VideoLightbox](src/components/VideoLightbox.tsx) opens a controls-on full playback on click. Aspect ratios are mapped through a small `aspectClass` lookup — keep both files in sync if a new aspect is added to the `VideoItem.aspect` union.

### Heading animation
[KineticHeading](src/components/KineticHeading.tsx) is the reusable per-word reveal used for hero and section titles. Words can be plain strings or `{ text, italic, className }` objects for inline emphasis. Use `whileInView` for sections that reveal on scroll; the hero passes `delay` to chain after eyebrow text. There is also a static `StaticHeading` export for non-animated headlines.

### LAN dev access
[next.config.ts](next.config.ts) whitelists `192.168.0.126` and `*.local` in `allowedDevOrigins` so a phone on the same Wi-Fi can load `/_next/*`. If testing on a different network, update that list — Next 16 will not auto-discover.

## Conventions

- All section components are `"use client"` because they animate with Framer Motion. The page route itself is a server component.
- Use the `cn()` helper from [src/lib/utils.ts](src/lib/utils.ts) for conditional classes; it merges Tailwind via `tailwind-merge`.
- Copy is **Portuguese (pt-BR)**. Don't translate user-visible strings to English.
- Prefer Tailwind utilities + the existing CSS custom utilities over inline `style` props, except where motion values must drive CSS (see [TiltCard](src/components/TiltCard.tsx), [WhatsappButton](src/components/WhatsappButton.tsx) magnetic effect).
