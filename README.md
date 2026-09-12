# Krishna Yaswanth — Portfolio (Vol. II)

A modern, component-based developer portfolio for **Panchagnula Krishna Yaswanth** — software engineer building systems across agentic AI, backends, and interfaces.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | React 19 + TypeScript (strict) |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Motion | GSAP + ScrollTrigger, Lenis smooth scroll |
| Deployment | Static build → `dist/` (GitHub Pages compatible) |

## Architecture

```
index.html              SEO meta, OG/Twitter, JSON-LD schema, font preloads
src/
  main.tsx              React entry
  App.tsx               Section assembly + reduced-motion / Lenis init
  index.css             Design system: tokens, fonts, grain, reveal states
  data/                 Content separated from presentation
    site.ts             Identity, contact, nav
    projects.ts         4 flagship systems (real media, honest links)
    secondary.ts        8 indexed works (real GitHub URLs)
    writing.ts          3 published articles (real URLs)
    tech.ts             Capability map — tech ↔ projects ↔ related tech
  lib/
    motion.ts           GSAP/Lenis singletons, motion-safe helpers
    hooks.ts            Reveal choreography + artifact video hooks
  components/
    navigation/         Transforming navbar + full-screen mobile menu
    hero/               Editorial hero + interactive SignalField canvas
    projects/           Dark cinematic sheet, immersive project features
    skills/             Interactive system map (no skill bars, ever)
    about/              Portrait + statement + meta band
    writing/            Editorial reading section
    contact/            Email-first finale + Formspree form
    footer/             Colophon
    effects/            SignalField — cursor-reactive 2D flow field
public/
  fonts/                Self-hosted WOFF2 (Playfair/Inter/JetBrains Mono)
  media/                Project videos, mockups, portrait
  resume/               my_resume.pdf
```

## Design language

- **Foundation:** warm bone neutrals + deep warm ink
- **Accents:** rust (signal) + moss (support) — used sparingly and purposefully
- **Type:** serif display voice, quiet sans body, mono for technical metadata only
- **Texture:** one global film grain; rounded surfaces and layered depth where they earn their place
- **Signature:** the hero's SignalField — a living ink flow field that bends around the cursor; 2D by deliberate choice over decorative 3D

## Content integrity

Every project, link, metric, and article comes from the repository's own records. Projects without public sources are labeled "Source — private" rather than linked to nothing. No fabricated clients, testimonials, metrics, or screenshots.

## Commands

```bash
npm install
npm run dev        # local dev server
npm run build      # production build → dist/
npm run preview    # serve the production build
npm run typecheck  # strict TS check
```

## Accessibility & performance

- Semantic HTML, skip link, visible focus states, keyboard-operable video toggles and menus
- `prefers-reduced-motion`: Lenis disabled, reveals become instant, canvas disabled, videos require explicit play
- DPR-capped canvas paused off-screen; lazy-loaded images with explicit dimensions; poster-first videos (`preload="none"`)
