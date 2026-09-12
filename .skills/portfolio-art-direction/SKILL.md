---
name: portfolio-art-direction
description: >
  Complete art direction for the Krishna Yaswanth portfolio redesign:
  DIGITAL ARCHIVE × SOFT BRUTALISM × EDITORIAL ENGINEERING. Load this skill
  before any UI, layout, styling, motion, or content-presentation work on
  this portfolio. It is the single source of truth for design decisions and
  the checklist for evaluating future changes.
---

# Portfolio Art Direction

## Directive 0 — The Prime Rule

**The existing portfolio is an asset/content reference, NOT a design reference.**

- Reuse: content, copy, project data, images, videos, fonts, resume, metadata.
- Do NOT preserve: layout, component hierarchy, hero composition, color themes,
  card grids, glassmorphism, gradients, particle effects, tilt/cursor/spark
  effects, or any existing visual language.
- Never "improve" or "iterate on" the old design. It is a donor of raw material,
  not a parent of the new one.
- Every design decision starts from this document, not from the current codebase.

## 1. Concept

The site is a **carefully curated digital archive of an engineer's work** —
not a conventional developer portfolio, not a SaaS landing page, not a demo reel.

The personality:

> "An engineer who cares unusually much about how things are built AND how
> they are presented."

It must feel: **authored, confident, experimental, intelligent, tactile,
editorial, technical, minimal, premium, human.**

It must NOT feel: **AI generated, generic, SaaS, corporate, template-like,
futuristic for the sake of it, cyberpunk, gaming-inspired, overly decorative.**

Three pillars:

1. **Digital Archive** — projects are catalogued artifacts with accession
   numbers, metadata, and documentation, treated like museum pieces.
2. **Soft Brutalism** — oversized typography, visible structure, exposed rules,
   asymmetry, hard hierarchy, big negative space. Softness comes from the warm
   paper palette and serif, not from rounded corners and shadows.
3. **Editorial Engineering** — the composition discipline of print editorial
   applied to engineering content: deliberate line breaks, mixed serif/sans
   hierarchy, technical marginalia, numbered entries.

## 2. Visual References — and their limits

- **Digital museum / personal archive sites** — borrow: curated artifacts,
  large visual work, unconventional composition, documentation-as-content,
  cinematic presentation, images/videos treated as objects of evidence.
- **Soft brutalist editorial sites** — borrow: oversized typography, strong
  compositions, visible structural grid, asymmetry, hard hierarchy, negative
  space, exposed dividers, unconventional positioning.
- **basement.studio** — benchmark for **craft only**: interaction quality,
  motion quality, creative confidence, project storytelling, transitions,
  technical execution, performance.

**Hard limits:** Do NOT clone basement.studio. Do NOT copy its colors, layouts,
or dark visual identity. Do NOT make this look like a Basement website. Borrow
the level of ambition, never the identity.

## 3. Color System

| Token | Value | Role |
| --- | --- | --- |
| `paper` | `#F8F6F2` | Primary background |
| `paper-raised` | `#FCFBF8` | Secondary paper, subtle lift |
| `linen` | `#F2EEE7` | Tinted panels, archive trays, alternates |
| `ink` | `#2F2F2F` | Primary text, rules, borders |
| `sage` | `#707B63` | The single accent — sparingly |

Rules:

- The palette is **restrained by default**. Ink-on-paper carries the design;
  sage is an accent, not a theme.
- Ink at reduced opacity is the tool for hierarchy (e.g. 45–70% ink for
  secondary text), NOT new colors.
- Subtle paper grain/texture is allowed **if it genuinely improves the tactile
  archive feeling**. If it reads as decoration, remove it.
- Light-first. No dark mode is required; if ever added, it must obey the same
  restraint (ink/paper inversion, no neon).

## 4. Typography

Typography is a **primary visual element**, equal in importance to imagery.

| Layer | Font | Notes |
| --- | --- | --- |
| Display | Cormorant Garamond (or another high-quality editorial serif) | Oversized headings, deliberate line breaks, italics for emphasis |
| Body / UI | Inter, Geist, or another clean modern sans | Clean, quiet, highly readable |
| Technical metadata | IBM Plex Mono, Geist Mono, or another restrained monospace | Labels, numbering, dates, coordinates, file names |

Existing local fonts (self-hosted, already in `assets/fonts/`): Playfair
Display (serif) and JetBrains Mono (mono). These are acceptable starting
points — JetBrains Mono maps cleanly to the metadata role. The serif role
should be upgraded toward Cormorant Garamond or equivalent editorial serif.

Rules:

- Use **oversized headings with compositional purpose** — every large type
  treatment must earn its place. Do not fill the site with enormous text
  because it is trendy.
- Deliberate line breaks in display type; control rag, don't let it happen.
- Mixed serif/sans hierarchy: serif for the human voice, sans for the working
  voice, mono for the machine voice.
- Technical labels everywhere: small caps or mono uppercase, letter-spaced —
  `ARCHIVE / 003`, `FIELD NOTE`, `2025–2026`.
- Prefer 2–3 weights total per family. No decorative font pairings.

## 5. Layout

Favor:

- Asymmetric, editorial grids with **strong alignment**
- Generous whitespace and vertical rhythm
- **Visible structural rules** — hairline dividers, exposed column lines,
  section numbering as part of the structure
- Unconventional but always understandable composition
- Full-width visual moments (an artifact image or video given the whole page)
- Carefully controlled density: loud sections followed by quiet ones

Avoid:

- Standard 3-column card grids
- Rounded SaaS cards, floating glass cards, dashboard layouts
- Centered-everything layouts
- Excessive pill buttons and border-radius (radius 0–2px unless justified)
- Generic portfolio section names (e.g. "My Services", "Why Choose Me")

## 6. Project Presentation

Projects are the central content. They are **ARCHIVE ENTRIES / ARTIFACTS**,
not cards.

Each entry follows the catalog pattern:

```
ARCHIVE / 003
UNIPULSE AI
Industrial Product Intelligence Engine
2026

[large project artifact — mockup image or looping video]

PROBLEM    ...
SYSTEM     ...
RESULT     ...

TECHNOLOGY  Python · FastAPI · React · Supabase · ...
```

Rules:

- Numbered entries (`ARCHIVE / 001` …), consistent metadata column: index,
  title, domain line, year, stack.
- Problem / System / Result structure preferred for featured entries — it
  reads like documentation, which it is.
- Mockup PNGs and loop WEBMs are **evidence**. Present them large and precise,
  with captions and metadata like figures in a catalog.
- **Never invent fake claims**: no fake metrics, clients, awards, user counts,
  testimonials, or accomplishments. Only reuse claims already present in the
  project's content (e.g. existing descriptions from `projects.json`).
- Secondary/smaller work may be presented as a compact **index list**
  (title, domain, year, stack, link) — a catalog table, not cards.

## 7. Motion

**GSAP is the primary motion tool.** Motion communicates structure and creates
continuity — it is never decoration.

Preferred (in order of value):

- Smooth section reveals tied to the scroll (ScrollTrigger)
- Image/artifact reveals — clip-path or scale-in-settle, catalog-page feel
- Typography transitions — line-masked entrance for display headings
- Project entrance choreography — metadata resolves before the artifact
- Subtle scale transformations; horizontal/vertical movement with purpose
- Page/section transitions that create continuity
- Cursor interactions where they add meaning (e.g. "view artifact" states)
- Video transitions for project WEBMs
- Scroll-linked storytelling on featured archive entries

Avoid:

- Animation everywhere; constant ambient movement
- Excessive parallax, bouncing UI, flashy effects
- Particle backgrounds, decorative 3D, RGB/glow effects
- Animations that slow down navigation or delay content
- Anything that would feel "expensive but noisy" — aim for intentional and
  expensive without the noise

Always respect `prefers-reduced-motion`.

## 8. 3D / WebGL

**Do NOT introduce Three.js or WebGL by default.** No 3D spheres, floating
objects, particles, abstract blobs, rotating models, or decorative 3D
backgrounds. Only introduce 3D if a later, explicit design decision has a
strong conceptual reason. (`threejs-skills` and `animation-3d-skills` require
explicit justification before use.)

## 9. Interaction Principles

- Interactions are **precise, tactile, and quiet** — like handling a physical
  document: weight, resistance, snap.
- Hover states should reveal information or confirm actionability — underlines
  that draw, metadata that resolves, frames that shift a hair.
- Custom cursor only where it communicates (e.g. artifact viewer affordance);
  it must degrade gracefully and stay native on touch devices.
- Keyboard and screen-reader parity is mandatory: focus styles are part of the
  design language (visible, editorial — offset hairline or sage), not an
  afterthought.

## 10. Responsive Philosophy

- **Content-first compression, not scaled-down desktop.** On mobile the
  archive becomes linear: entry header → artifact → documentation.
- Typography scales through a fluid type scale; hierarchy is preserved even
  at small sizes — never flatten to "all 16px".
- Asymmetry relaxes on mobile but alignment discipline never does.
- Videos degrade to poster images or smaller loops; heavy artifact imagery
  loads lazily with layout-reserved space (no CLS).
- Touch targets ≥ 44px; hover-dependent features have touch equivalents.

## 11. Accessibility Expectations

- Semantic HTML: real headings in order, landmarks, skip link, figure/figcaption
  for artifacts.
- Full alt text on imagery; `prefers-reduced-motion` honored everywhere.
- Contrast: ink `#2F2F2F` on paper `#F8F6F2` passes AA; verify sage-on-paper
  for any text usage (sage is primarily for non-essential accents — do not put
  body text in sage).
- Visible focus states, logical tab order, aria-labels on icon-only controls.
- `lang`, meta description, and Open Graph metadata preserved and updated.

## 12. Performance Expectations

- Budget-conscious: optimize/compress artifacts (mockups are 0.1–1.6MB —
  convert to WebP/AVIF where possible; videos are 0.1–0.4MB, keep looping
  WEBMs but add poster frames).
- Self-host fonts with `font-display: swap`; preloaded WOFF2s only.
- Lazy-load below-fold artifacts; reserve space; no layout shift.
- GSAP + ScrollTrigger + Lenis are acceptable runtime deps; bundle via Vite,
  code-split heavy work, respect `prefers-reduced-motion` to skip animations.
- Lighthouse targets: 90+ Performance, 100 Accessibility, 100 Best Practices,
  100 SEO on desktop.

## 13. Existing Asset Guidance

| Asset | Status | Guidance |
| --- | --- | --- |
| `assets/mockups/*.png` (8 mockups: AI Screening, CineNexus, CivicConnect, Live Score, Opaque, RAG model, ray_ai/Haven, Volume Control, Bank Mgmt) | **Preserve** | Core artifacts. Present large as figures in archive entries; compress to WebP/AVIF; alt text describes what is shown |
| `assets/videos/*.webm` (4 loops: AI-Screening-Resume, CineNexus, opaque, unipluseai) | **Preserve** | Motion evidence for featured entries; add posters; keep file sizes small |
| `assets/profile/my_pro_pic.png`, `2nd-photo.png`, `first-photo.png` | **Preserve (curate)** | Portrait treated as an archive artifact — editorial crop, metadata caption. Choose one primary; compress (1.6–2.2MB is too heavy) |
| `assets/fonts/` (Playfair 400/700/italic, JetBrains Mono 400/500/700) | **Preserve** | JetBrains Mono → metadata layer now; Playfair acceptable until serif is upgraded |
| `assets/resume/my_resume.pdf` | **Preserve** | Keep the download affordance, restyled as an archive document |
| `projects.json` | **Preserve, extend** | Single source of truth. Extend entries with problem/system/result fields and year/domain; do not invent content |
| Root `my_pro_pic1.png` | **Superseded** | Duplicate of profile imagery; keep as donor only |
| `index.html` (current) | **Replace** | Visual language is the opposite of this direction (glass, gradients, particles) |
| `css/styles.css` | **Replace** | Built around the old theme; new token system required |
| `js/modules/*` | **Replace** (selective salvage) | `utils.js` helpers may be salvaged; hero-canvas, tilt, cursor-spark, click-spark are anti-patterns under this direction; form validation logic is reusable content-behavior |
| `partials/*.html` | **Replace** | Same old design language (WebGL backdrop, backlight layers) |
| `coming_soon.html` | **Keep** (utility page) | Restyle lightly if touched; not a design driver |
| Blog/LinkedIn article links, GitHub links, contact info | **Preserve** | Real content — carry into new site |

## 14. Evaluating Future Design Decisions

Before shipping any change, test it against these questions:

1. **Archive test** — Does it read as a curated artifact/documentation, or as a
   template section?
2. **Restraint test** — Would removing one more element make it stronger?
   Can this be done with ink hierarchy instead of a new color/weight?
3. **Type test** — Does typography carry the hierarchy, or are boxes and
   shadows doing the work?
4. **Evidence test** — Are images/videos presented as evidence (large, precise,
   captioned) or as decoration?
5. **Motion test** — Does this animation communicate structure or continuity?
   If removed, is anything lost? If nothing is lost, remove it.
6. **Honesty test** — Is every claim traceable to existing content?
7. **Human test** — Would a person plausibly have made this choice? Does it
   feel authored rather than generated?
8. **Performance test** — Does this make load or interaction slower? If yes,
   it needs strong justification.
9. **Identity test** — If this looks like basement.studio, a SaaS product, or
   the old portfolio, it fails.

When two options both pass, choose the **quieter** one.
