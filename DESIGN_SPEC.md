# DESIGN SPECIFICATION
**Krishna Yaswanth — Portfolio as Digital Archive**
**Direction: Digital Archive × Soft Brutalism × Editorial Engineering**
Status: PLANNING ONLY — nothing implemented. This document is the bridge between `.skills/portfolio-art-direction/SKILL.md` (source of truth) and future implementation.

---

## 1. Creative Concept

**"The Krishna Yaswanth Archive."** The site is a catalogue of an engineer's work, presented like a carefully produced archival publication: a cover, a catalogue of artifacts, marginalia, an index, and a colophon.

The visitor is a reader of the archive, not a user of a landing page. Every element either advances the catalogue metaphor or is removed.

The personality target: *"An engineer who cares unusually much about how things are built AND how they are presented."*

Identity sentence: **Warm paper, ink, and a single quiet olive accent — engineering presented with editorial discipline.**

Reference boundaries (repeat, since it governs everything):
- basement.studio = interaction/craft benchmark only. No color, layout, dark theme, or specific interaction is copied.
- The old portfolio (maroon/gold, glass, particles, tilt, typing) is a content donor, not a design parent.

---

## 2. Design Principles

1. **Artifacts over cards.** Projects are numbered archive entries with documentation, not interactive tiles.
2. **Typography is the interface.** Hierarchy is created with type (serif/sans/mono, scale, weight) before boxes, shadows, or color.
3. **Structure made visible.** Rules, section numbers, and marginalia are part of the composition, not ornament. The grid shows itself where it means something.
4. **One accent, used sparingly.** Muted olive `#707B63` for ~5% of surface area: underlines, active states, one rule, selected markers.
5. **Evidence, displayed honestly.** Screenshots and videos are captioned figures with real metadata. No invented metrics, clients, awards, users, or claims — only what exists in the repo.
6. **Motion communicates structure.** Every animation states hierarchy or continuity; if an animation states nothing, it is cut.
7. **Paper feel, no skeuomorphism.** Tactile comes from palette, texture (subtle grain), typography, and spacing — not from shadows/rounded "paper" props.
8. **The quiet choice wins.** When two options both work, choose the quieter.

---

## 3. Visual Hierarchy

Five levels, used everywhere consistently:

| Level | Realization |
|---|---|
| **L1 — Voice** | Oversized serif (Cormorant) display lines: name, section openers, project titles |
| **L2 — Structure** | Mono uppercase metadata: section numbers, archive numbers, labels |
| **L3 — Statement** | 18–22px serif statement/lede copy, generous leading |
| **L4 — Working text** | 16–17px sans body copy |
| **L5 — Marginalia** | 12–13px mono uppercase, letterspaced, 55–65% ink |

Composition rules:
- One L1 moment per viewport. Never two competing display sizes.
- Metadata columns (L5) sit left of or above content; the margin is active space, not empty space.
- Rules (`1px solid var(--rule)`) separate sections; heavier 2px rules mark macro-boundaries (cover → catalogue).
- **Density rhythm**: loud → quiet → loud. A dense catalogue row is followed by whitespace; a full-width artifact is followed by stillness.

---

## 4. Color System

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#F8F6F2` | Page background |
| `--paper-raised` | `#FCFBF8` | Figure plates, raised paper surfaces |
| `--linen` | `#F2EEE7` | Figure plates, index rows on hover, side panels |
| `--ink` | `#2F2F2F` | Text, rules, borders, primary actions |
| `--accent` | `#707B63` | Only accent. Underlines, active nav, selected states, one rule per view max |

Derived tokens (not new colors — opacity steps of ink on paper):
- `--ink-70` `rgba(47,47,47,.7)` secondary text
- `--ink-50` `rgba(47,47,55,.5)` metadata, captions
- `--ink-35` `rgba(47,47,47,.35)` placeholders, disabled
- `--ink-15` `rgba(47,47,47,.15)` hairlines, plate borders
- `--rule` `rgba(47,47,47,.18)` structural hairlines
- `--accent-ink` `#59624e` accent at text-safe value for small text (verify contrast in implementation)

Contrast (computed):
- Ink on paper: 10.9:1 → AAA body
- Ink-70 on paper: ~7.1:1 → AA large & small
- Ink-50 on paper: ~4.6:1 → AA for ≥18.66px or bold; marginalia is small so marginalia uses ink-60 (~5.7:1) instead — **decision: marginalia = ink-60**
- Accent on paper: ~4.0:1 → passes AA only for large text or non-text (rules/underlines). Body text is never accent.

Texture: one optional global paper-grain (SVG feTurbulence noise, 2–3% opacity, multiply). If it doesn't survive the squint test, cut it.

---

## 5. Typography System

### 5.1 Font stack decision

**Recommendation: keep Playfair + JetBrains Mono, ADD Inter for body/UI.**

| Layer | Font | Weights loaded | Role |
|---|---|---|6 weights total|
| Display serif | **Playfair Display** (self-hosted) | 400, italic 400, 700 | L1 display, statement copy, project titles |
| Body sans | **Inter** (self-hosted) | 400, 500 | Body copy, buttons, forms, nav |
| Metadata mono | **JetBrains Mono** (self-hosted) | 400, 500 | Labels, numbers, metadata, captions |

**Evaluation of current fonts:** Playfair + JetBrains Mono alone are not sufficient — the system lacks a quiet sans for body/UI. Playfair at body sizes is too high-contrast for reading (Didone-style high stroke contrast tires at small sizes); JetBrains Mono as body text reads as code, not prose. Both remain essential to the identity (Playfair = the human/editorial voice; JBM = the machine/technical voice). The missing layer is the working voice.

**Why Inter specifically:**
1. It is the sans actually paired with editorial systems of this kind; its design (Nielsen-like large x-height, open apertures) sits quietly beside a Didone without competing — unlike geometric sans (Poppins) or quirky grotesks (Space Grotesk) which pull identity away from the serif.
2. x-height sits close to Playfair's, so serif/sans mixing on shared baselines aligns optically.
3. Excellent hinting at 15–17px, tabular numerals for index tables, complete weights.
4. Open license, variable font available (single file covers 400–500 if we use the variable axis), self-hostable, tiny WOFF2 (~15KB/weight, ~30KB variable).

Alternatives considered: **Geist** (beautiful, but pairs with its own display family; identity competes with Playfair; also add a dep just for body), **IBM Plex Sans** (good, slightly more personality than needed at body sizes; fine fallback), **Söhne/Karla** (Söhne is paid), **system-ui** (free, quiet, but slightly generic; the fallback if we reject a third font).

Fallback if "2 fonts only" is preferred: keep Playfair + JBM and set body in Playfair 400 (slightly larger, more leading to compensate for contrast). This is acceptable but a measurable readability/consistency compromise — Inter is the stronger system.

### 5.2 Type scale

All display sizes use `clamp()` for fluid scaling. Root 16px.

| Token | Size (desktop → mobile) | Weight/Style | Usage |
|---|---|---|---|
| `display-xl` | clamp(64px, 12vw, 200px) | Playfair 400, lh 0.95, ls -0.02em | Cover name only |
| `display-lg` | clamp(48px, 8vw, 128px) | Playfair 400, lh 1.0, ls -0.01em | Section openers, project titles |
| `display-md` | clamp(32px, 4.5vw, 72px) | Playfair 400 italic for emphasis words | Emphasis lines, pull facts |
| `display-sm` | 28–36px | Playfair 400 | Sub-lines, lede heads |
| `statement` | 20–24px | Playfair 400, lh 1.5 | Editorial statements, project ledes |
| `body` | 16–17px | Inter 400, lh 1.65 | Paragraphs, documentation |
| `body-lg` | 18px | Inter 400, lh 1.65 | Contact/about lede if needed |
| `label` | 13px mono, ls .08em, uppercase | JBM 500 | Section numbers, archive numbers, captions |
| `micro` | 11–12px mono, ls .12em, uppercase | JBM 400 | Micro-metadata, coordinates, marginalia |

Rules: root 16px. Uppercase is reserved for mono labels only (serif never all-caps — it weakens the editorial voice). Serif italic is the emphasis tool (single words: *evidence*, *catalogued*, *built*), never whole paragraphs in italic.

---

## 6. Grid System

**12-column grid, desktop ≥1024px**, 96px side margins, 24px gutter, max-width 1440px.

The grid is **visible where structure matters, invisible where breathing matters**:
- Visible: section boundaries (full-width hairlines), archive entry headers (rule spanning content width), index/ledger rows (full-width hairlines), footer bands.
- Invisible: between statement blocks and artifacts — whitespace does the separating.

**Signature layout devices (used consistently):**

1. **The margin column.** Columns 1–2 are a working margin: section numbers, vertical labels, metadata. Content starts at column 3. This creates the "engineered publication" feel and is the strongest asymmetry device.
2. **The 8/4 split.** Content/artifacts span columns 3–10 (8 cols); metadata sits 11–12. Used for archive entries. Mirrored (4/8) for alternation between entries — every other entry mirrors.
3. **Full-bleed artifacts.** Selected artifacts (cover-era imagery or a flagship artifact) run edge-to-edge, breaking the 96px margins. Not every entry gets one; full-bleed is earned by being the section's single full-width moment.
4. **Offsets.** Statement blocks start at column 4 with `display-md` serif and 8-col width; section headers sit at columns 3–5 with marginalia at 1–2. Intentional, repeated offsets build rhythm without chaos.
5. **Full-width hairline boundaries** between all sections with a mono section number in the margin column.

Mobile (<768px): single column; the margin column becomes a horizontal band — metadata moves above content, still mono-uppercase; 20px side padding. Tablet (768–1023px): 12-col grid retained at 48px margins, margin column collapses (metadata above content).

Vertical rhythm: 8px base unit. Section spacing: 160px desktop / 96px mobile (via `clamp`). In-section blocks: 64px. Figure captions 12px below figures. Everything on the 8px unit.

---

## 7. Component Philosophy

**Everything is either a document or a figure.** Components are not "cards" or "modules"; they are archival objects:

- **Plate** — a bordered figure: artifact (image/video) + caption row (mono: `FIG. 03-A — UNIPULSE AI — 2026`), `background: paper-raised`, 1px `--ink-15` border, zero radius, no shadow. Plates never float or lift; interaction = a rule inside the plate shifts to accent, or frame offset (2px translate of frame, content static).
- **Ledger row** — the atomic interactive unit: hairline-topped row with mono index (`001`), name (serif), mono metadata right-aligned (year · category · link). Hover: background linen + accent underline draw. This is the secondary works, writings, and nav index unit.
- **Index header** — mono section number in margin + serif title + full-width rule.
- **Statement block** — serif at display-md/sm, starting col 4, max 10 cols, deliberate line breaks.
- **Field pair** — label (mono) + value (serif/sans): the Problem/Approach/Result units.
- **Document link** (resume) — plate-like link with mono metadata (file size, year, pages), drawn underline on hover, `download` attribute.

**Border system:** only two border treatments exist: (a) hairline `--rule` for structure, (b) plate border `--ink-15` for figures. Radius: **0 everywhere** (plates) — exception: none. Buttons are rectangles with 1px ink borders.

No shadows. Elevation is expressed by paper tokens and rules, not blur.

---

## 8. Navigation Concept

**A fixed top band + an archive index as the primary navigation.**

- **Top band (fixed, 64px):** left: `KY — THE ARCHIVE` in mono 13px (site identity); center/right: index links `INDEX / WORKS / ABOUT / WRITING / CONTACT` mono 13px uppercase, letterspaced; far right: `RESUME ↓` text link (not a button).
- Band styling: `paper` at 92% with backdrop blur(8px) — **no glass effect**, a working paper band with a 1px bottom hairline that appears after 80px scroll.
- **Archive index** (the in-page navigation): every section header row contains a mono index number (`00 — INDEX`, `01 — WORKS`, …) and the top band links map to these numbers; the active section's number turns accent while scrolling (ScrollTrigger).
- **Footer nav** mirrors the top band (complete sitemap: all sections + GitHub/LinkedIn/email/resume).
- Mobile: band shows `KY — ARCHIVE` + a mono `[ MENU ]` button; a full-screen paper overlay with a serif index (large serif entries + mono numbers) — an archive table of contents, not a hamburger menu.

No mega menu, no pill nav, no floating action button.

---

## 9. The Opening / Cover — Three Concepts

### Concept A — "The Cover Page"
- **Composition:** The viewport is the archive's cover. Top band + bottom meta band (mono: location, coordinates? no, availability, year). Left margin column carries a vertical mono label `DIGITAL ARCHIVE — VOL. I`. The name is set in `display-xl` Playfair, broken deliberately across three lines, left-aligned at col 3:
  ```
  KRISHNA
      YASWANTH
  PANCHAGNULA   ← serif italic, display-md, offset to col 5
  ```
  Under it, one statement line (statement size, ink-70): *"Full-stack engineering, catalogued."*
- **Typography:** the only serif moment on the screen; all supporting text is mono metadata.
- **Hierarchy:** WHO (name) → WHAT (statement) → BODY OF WORK (mono index of sections, bottom: `01 WORKS / 02 ABOUT / 03 SKILLS / 04 WRITING / 05 CONTACT` as a mono footer index with counts `WORKS — 4 FEATURED · 8 INDEXED`).
- **Interaction:** on load, name lines rise from line-masks (staggered 90ms), metadata fades after (staggered 40ms), rules draw from left (scaleX 0→1, 0.8s). Cursor over name → italic alternates? No: over the name, the accent underline draws under the last name only.
- **Scroll transition:** the cover is 100vh. Scrolling, the name's lines translate at slightly different rates (parallax ≤40px, restrained) while the statement stays pinned briefly; the first section rule draws in.
- **Why it fits:** the archive metaphor from the first pixel; typography-only, zero decoration; scale does the work; no profile photo competes with the name.

### Concept B — "The Evidence Table"
- **Composition:** The cover is a **specimen table**: the name at display-lg at cols 3–9, and below it, a 2-column mono table of "evidence" with hairline rows — `WORKS FEATURED — 04`, `WORKS INDEXED — 08`, `DISCIPLINES — 06`, `ARTIFACTS — 12 IMAGES · 4 FILMS`, `LOCATION — HYDERABAD, IN`, `STATUS — OPEN TO WORK`. A single portrait plate (2nd-photo, small, editorial crop) sits at cols 11–12, captioned `FIG. 000 — THE ENGINEER, 2026`.
- **Typography:** serif name + mono table = immediate archive identity.
- **Hierarchy:** WHO (name) → BODY OF WORK (the evidence counts) → artifact portrait as a small artifact among evidence.
- **Interaction:** rows of the evidence table highlight (background linen) sequentially on load; portrait plate caption draws its underline on hover.
- **Scroll transition:** the evidence table rows stagger-reveal on scroll-into-view; the portrait stays static (evidence doesn't move; the catalogue does).
- **Concept B is a strong "data is the hero" cover** — the archive presents its own holdings. Slightly busier than A; risks reading as a dashboard if not carefully spaced.

### Concept C — "The Specimen" (typographic poster)
- **Composition:** pure typographic poster: name in display-xl at 12vw spanning cols 1–12 with tight leading; behind/below, a mono metadata lattice: letterspaced mono micro text in the four corners (`EST. HYDERABAD`, `FULL-STACK / AI`, `ARCHIVE OPEN`, `VOL. I — 2026`) + one center statement at cols 4–9 (*"Engineering, catalogued as evidence."*). No imagery at all.
- **Typography:** the poster IS the type. Two sizes total on screen (display-xl + micro mono).
- **Hierarchy:** WHO → WHAT → (body of work deferred to next section).
- **Interaction:** on hover of the name, an accent rule draws beneath the last name.
- **Scroll transition:** the poster scales to 0.94 and fades as the cover scrolls away (exit choreography, 0.6s, ease power2.inOut).
- **Why it fits:** most brutalist, most confident; but weakest WHO+WHAT+ARCHIVE delivery — the archive contents arrive late.

### Recommendation: **Concept A — "The Cover Page"** (with Concept B's evidence-table as its lower half)

A alone establishes WHO+WHAT beautifully but defers the body-of-work; B alone risks dashboard-adjacency. **A + the evidence band**: cover with name (WHO/WHAT) + a slim evidence strip along the bottom (mono: `04 FEATURED WORKS · 08 INDEXED WORKS · HYDERABAD, IN · OPEN TO WORK`). Portrait is **not** on the cover — it appears in ABOUT as a plate (`FIG. 000`), which strengthens the catalogue metaphor (the engineer is also an artifact). This is my recommendation.

---

## 10. Project-Entry Concept (the flagship system)

Each flagship entry is a **full catalogue row** — a repeated pattern, mirrored alternately for rhythm:

```
────────────────────────────────────────────── (rule)
ARCHIVE / 001                        AI + LLM
AI Resume Screener            2025–2026
Tactile & objective candidate evaluation.
│
├─ margin col: ARCHIVE/001, year, domain (mono, vertical or stacked)
├─ cols 3–10: PRIMARY ARTIFACT (plate)
│    ├─ image plate OR video plate
│    └─ caption row: FIG. 001-A — interface loop, muted, looping
├─ cols 3–10: PROBLEM / APPROACH / RESULT field pairs (from projects.json, honest only)
└─ cols 11–12: TECHNOLOGY (mono list, one per line), LINKS (GITHUB ↗)
────────────────────────────────────────────── (rule)
```

**Structure per entry:**
1. **Entry header** — `ARCHIVE / 001` (mono) + title (Playfair display-lg) + one-line tagline (statement size). Full-width rule above.
2. **Primary artifact** — plate, full 8-col width, 16:10 or native ratio. This is the single most important image of the entry.
3. **Documentation** — Problem / Approach / Result as field pairs (mono label + serif/sans value). From `projects.json` description + secondary_projects data only. No invented metrics.
4. **Technology** — mono, one per line in margin, or inline separated by `·`.
5. **Links** — `GITHUB ↗` text links (honest: `#` placeholders get hidden until real URLs exist — decision point).

**Image vs. video decision rule:**
- **Video when motion is the evidence** — the artifact demonstrates interface behavior: AI-Screening-Resume-loop.webm, CineNexus-loop.webm, opaque-loop.webm, unipluseai-loop.webm → all four flagships have loops → **video plate** (autoplay muted loop playsinline, poster image as the plate's initial state, play/pause toggle for a11y).
- **Image when structure is the evidence** — layouts, data displays, dashboards → CineNexus.png, Opaque.png as high-res figures. 
- **Combination**: video plate as primary + 1–2 image plates as secondary figures (`FIG. 001-B`).

Per-flagship artifact assignments (from what exists):
| Entry | Primary artifact | Secondary |
|---|---|---|
| 001 AI Resume Screener | AI-Screening-Resume-loop.webm | — |
| 002 CineNexus | CineNexus-loop.webm | CineNexus.png as FIG 002-B |
| 003 Opaque | opaque-loop.webm | Opaque.png as FIG 003-B |
| 004 UniPulse AI | unipluseai-loop.webm | — |

Mirror alternation: 001 left-artifact, 002 right-artifact, 3 left, 4 right — catalog rhythm.

**Honesty rules:** descriptions from `projects.json` verbatim (lightly edited for grammar only). The one quantitative claim that exists ("99.8% attribute validation accuracy" for UniPulse) is kept since it's in the repo's data — presented as a mono pull-fact, not a metric banner. No new numbers. `github: "#"` links: render the entry without the link row, or with `SOURCE — PRIVATE` mono note. **Decision to lock: how to handle dead links.**

---

## 11. Secondary Works — The Index

**A ledger, not cards.** Full-width hairline rows:

```
001  BANK MANAGEMENT SYSTEM          JAVA AWT · MYSQL        2025   ↗
002  LIVE CRICKET SCORE              PYTHON · WEB SCRAPING   2025   ↗
003  VOLUME CONTROL                  OPENCV · MEDIAPIPE      2025   ↗
004  PORTFOLIO (V1)                  HTML · CSS · JS         2025   ↗
005  RAG CUSTOMER SUPPORT ASSISTANT  PYTHON · CHROMADB · GROQ 2025  ↗
006  CIVICCONNECT                    REACT · NODE · POSTGRES 2025   ↗
007  HAVEN                           FASTAPI · DOCKER · PYTORCH 2025 ↗
```

- Row: mono index + name (serif, 20–24px) + tech (mono, ink-60) + year + arrow glyph. On hover: background linen, accent underline draws under the name, arrow translates 4px. Keyboard: rows are real links (`<a>`), focus style = accent outline offset.
- Secondary entries from `secondary_projects` (CivicConnect, Vision Volume, Dense RAG) plus the legacy projects from `index.html` (Bank Mgmt, Live Score, Volume Control, Portfolio, RAG Assistant, CivicConnect, Haven) — **merged, deduped** into one ledger. Vision Volume = Volume Control (same project, different names) — merge. Dense RAG → the RAG Customer Support Assistant (same family, merge or list separately — lock decision).
- Domain labels (`CIVIC TECH`, `COMPUTER VISION`, `AI/RAG`) from projects.json stay as the mono tech/domain column source.

**The point:** the secondary archive is scannable evidence of range — one glance = breadth; no image noise.

---

## 12. About Concept — "The Statement"

Editorial statement, not resume summary. Structure:

1. **Section header:** `03 — ABOUT` (or whatever final numbering) + rule.
2. **Statement (Playfair, display-md, cols 4–11):** built strictly from existing bio copy:
   *"I'm Krishna Yaswanth Panchagnula — a Computer Science undergraduate in Hyderabad who builds real-world applications: from a Java bank management system to Python fraud detection systems, agentic AI products, and the interface engineering you're reading now."*
   (Assembled from existing about text + projects; no new claims.)
3. **Metadata band (mono, 3-col definition list):** LOCATION — Hyderabad, Telangana, IN · EDUCATION — B.E. Computer Science (ongoing) · STATUS — Open to work.
4. **Interests line:** mono list: `FULL-STACK DEV / UI/UX / AI-ML / EDITORIAL ENGINEERING` — from existing "Interests" list.
5. **Portrait plate:** `FIG. 000 — THE ENGINEER, 2026` — 2nd-photo.png (compress), editorial crop, placed after the statement, 4-col width. The portrait as an artifact, captioned like everything else.
6. **Experience honesty:** existing claim "2+ years building web apps & interfaces" may be kept as a mono fact line. No other experience claims.

---

## 13. Skills Concept — The Capability Matrix

From `projects.json` `skills_matrix` (4 groups) — presented as a **matrix of field pairs**, not cards:

```
01 — BACKEND & SYSTEMS
  Python · FastAPI · Flask · Docker · REST APIs · JWT Auth · Nginx
  Multi-agent orchestration, tool-use execution, MCP protocol.
```

Format: full-width hairline rows (ledger-like), each with:
- mono group number + name (`01 — BACKEND & SYSTEMS`)
- serif one-line focus statement (from skills_matrix.focus, lightly edited)
- mono stack list (from skills_matrix.stack + merged tech tags from index.html skills grid — merged, deduped)

**Groupings (rebuilt from actual data, merged from skills_matrix + index.html's 6 tech-cards):**
1. `01 — LANGUAGES & CORE` — Python, Java, JavaScript, SQL, HTML, CSS
2. `02 — BACKEND & SYSTEMS` — FastAPI, Flask, REST APIs, Microservices, JWT Auth, bcrypt, Docker, Nginx
3. `03 — AI & RAG SYSTEMS` — LangChain, Agent architectures, Tool calling, ChromaDB, Vector search, Groq, LLM fine-tuning, PyTorch, Hugging Face, OpenCV, MediaPipe
4. `04 — DATA & STORAGE` — PostgreSQL, MongoDB, MySQL, ChromaDB, JDBC
5. `05 — FRONTEND & INTERFACES` — Responsive UI, Vanilla JS, Multi-page apps, Dashboard UX, Accessibility, GSAP ScrollTrigger, Lenis
6. `06 — DEVOPS & SECURITY` — Docker Compose, Nginx, Environment config, API Gateway, File sanitization

- The `focus` sentences from skills_matrix get merged into groups 2/3/5 focus lines (agentic → 3, generative → 3, backend → 2, creative frontend → 5).
- Interactive refinement: hovering a group row highlights its stack items; hovering a stack item underlines it (small, purposeful). No filtering UI, no percentage bars, no radar charts, no star ratings.

---

## 14. Writing Concept — The Reading Archive

Real articles → `READING / 001…003` ledger rows (same ledger component as secondary works — visual continuity):

```
READING / 001   LangChain Deep Dive: Designing Modular LLM Applications     MEDIUM   APR 2026
READING / 002   The End of the "Reading Grind" — NotebookLM's Cinematic Overviews  LINKEDIN  MAR 2026
READING / 003   The Ripple Effect of DNS: Analyzing the AWS Outage          LINKEDIN  OCT 2025
```

- Fields: mono index, title (serif), publication (mono), date (mono), ↗. Same hover/focus behavior as the works ledger.
- Short descriptions exist in index.html for each — one-line lede (serif italic) under the title, ink-70. Keep descriptions to one line.
- All three articles are real (Medium + two LinkedIn posts with URLs in index.html).
- No cards, no thumbnails. Read-time exists in `index.html` (25/8/6 min) — optional as quiet mono metadata (lock decision #9).

---

## 15. Contact Concept — "The Closing Page"

The last page of a publication. Structure:

1. `05 — CONTACT` header + rule.
2. **Serif statement (display-md):** *"The archive is open."* or *"Reachable, and glad you looked."* — confident, short. Copy decision at implementation.
3. **Primary channel:** email as large serif link with drawn accent underline on hover: `krishnayaswanthp@gmail.com` (email from index.html — note: the visible text `krishnayaswanth@gmail.com` in the current HTML is a typo of the mailto href; the correct one from the mailto is `krishnayaswanthp@gmail.com` — fix on implementation).
4. **Channels ledger:** GitHub ↗ / LinkedIn ↗ / Resume ↓ — ledger rows (same component again).
- 5. **The form:** keep the existing Formspree form but restyle: mono labels, transparent inputs with only a 1px bottom ink border (paper remains), focus = 2px accent bottom border, inline validation messages in mono 13px, submit = rectangle button (1px ink border, paper-raised background, hover: ink bg / paper text). Toast/status as mono line.
- 6. **Resume as archive document:** rendered as a **document plate**: `DOCUMENT — 001 / MY_RESUME.PDF / 100KB / PDF / ↓ DOWNLOAD` — mono metadata + download link, no thumbnail. (Or a ledger row.) The resume is catalogued like any artifact.
- 7. Optional mono note: `RESPONSE TIME — WITHIN 48H` **only if** we can honor it. Default: omit. Honesty rule.

---

## 16. Motion System

**Tools: GSAP + ScrollTrigger + Lenis (already in package.json).** No Three.js. No particles. No custom cursor (Decision #4).

**Timing tokens:**
| Token | Value | Use |
|---|---|---|
| `t-quick` | 200ms | hovers |
| `t-base` | 450ms | entrances |
| `t-slow` | 800ms | rules, reveals |
| `t-page` | 1.0s | cover entrance |
| ease | `power2.out` default, `power2.inOut` for rules/scale | |
| stagger unit | 80ms siblings, 40ms metadata | |

**Choreography:**

1. **Page entrance (cover):** name lines rise from masks (stagger 90ms, 0.9s, power3.out); metadata/rules follow (40ms stagger, 0.5s); evidence strip fades last. Total ≤1.2s to interactive-looking. No preloader screen — content renders immediately, entrance is choreography, not blocking.
2. **Archive reveal (per section):** header rule draws scaleX 0→1 (0.8s) while mono number fades in (0.4s, 0.2s delay); title lines rise from masks (90ms stagger).
3. **Project reveal:** header → artifact plate (clip-path inset reveal from bottom, 0.9s, power2.inOut) → caption fade → field pairs fade-up 24px, 60ms stagger → tech list stagger.
4. **Image reveal:** plate clip-path reveal + content scale 1.06→1.0 (1.2s). Subtle, once.
5. **Video behavior:** posters shown as plate content; video plays when 40% in view (IntersectionObserver or ScrollTrigger onEnter/onLeave → pause), muted/loop/playsinline, `preload="none"` with poster. Play/pause button for a11y.
6. **Typography transitions:** display lines always from y:110% line-mask; never fade-only (cheapens display type).
7. **Navigation behavior:** top band hairline appears after 80px scroll; active section number turns accent (ScrollTrigger per section); overlay menu opens with paper wipe (clip-path from top, 0.6s) + serif index lines stagger.
8. **Hover interactions:** underline draws (scaleX 0→1, origin left, 250ms) on all text links; plate hover = 1px accent inner border or caption underline (never lift/tilt/scale-up); ledger rows = linen background + arrow nudge.
9. **Page transitions:** single-page site — section continuity via Lenis + reveals. (Multi-page not planned.)
10. **Reduced motion:** `prefers-reduced-motion` → Lenis disabled (native scroll), all reveals become opacity-only (or none), videos play on user gesture only, entrance reduced to ≤200ms fades.

**Not doing:** parallax beyond the cover's restrained name drift; scroll-jacking; bouncing; decorative loops; cursor followers.

---

## 17. Mobile Strategy (designed simultaneously, not a collapse)

**Mobile is a re-composition, not a stacked desktop.**

- **Grid:** single column, 20px padding. The margin column becomes a **horizontal metadata band** above content: `ARCHIVE / 001 — 2025 — AI+LLM` (mono, wraps to 2 lines max).
- **Typography:** fluid clamp handles scale; display-lg lands ~44–56px — hierarchy is preserved, not flattened. Statement 18px; body 16px.
- **Entries:** header → artifact plate (full-width, poster-first) → documentation → tech as inline mono wrap → no mirror alternation (always artifact-first).
- **Videos:** poster image + tap-to-play with visible mono play control (`PLAY FILM ▶` / `STOP ■`), or autoplay if data-saver off — poster + explicit play (data-saver friendly, honest). Small sizes (100–370KB) keep autoplay viable, but explicit play is the default.
- **Navigation:** band with `[ MENU ]` → full-screen paper overlay, large serif index entries + mono numbers, body scroll lock.
- **Ledger rows:** two-line layout: line 1 = index + name; line 2 = tech + year; arrow end-aligned. Touch target ≥44px (rows are ~56–64px tall).
- **Hover fallbacks:** all hover states have focus/touch equivalents; rows are real links; plates respond to tap (caption underline persists on :focus-visible).
- **Spacing:** section spacing 96px (vs 160px desktop); in-section 48px.
- **Whitespace/overflow:** no horizontal overflow; artifacts reserve aspect-ratio space (no CLS).

## 18. Accessibility Strategy

- Semantic: one `h1` (cover name); sections with `aria-labelledby`; artifacts in `<figure>/<figcaption>`; ledger rows are `<a>` elements in `<ul>`; form inputs with real `<label>`.
- **Focus states are part of the language:** `:focus-visible` = 2px accent outline, 2px offset. Never removed.
- Contrast: verified in Section 4 (marginalia = ink-60; accent not used for body text; check accent-on-paper for text — only ≥18.66px or non-text uses).
- `prefers-reduced-motion`: full fallback (Section 16, item 10).
- `prefers-color-scheme`: **no dark mode in v1** — paper identity is the brand. A future dark variant would be ink/paper inversion with same restraint.
- Media: all images have descriptive alt (mockups: describe the interface, not "screenshot"); videos have poster + captions of what they show in figcaption; decorative glyphs `aria-hidden`.
- Keyboard: overlay menu traps focus, ESC closes; play/pause toggle keyboard-operable; skip link to `#main`.
- Forms: inline mono errors (`aria-describedby`), `aria-live` status line, real labels, no placeholder-as-label.

---

## 19. Performance Strategy

- **Runtime JS:** GSAP + ScrollTrigger + Lenis (~60KB gz total) — acceptable, already owned. Tree-shake GSAP plugins (only ScrollTrigger). No Three.js (drop `three` from the build at implementation — decision). No custom cursor JS.
- **Fonts:** self-host WOFF2 with `font-display: swap`; preload the two most critical (Playfair 400, JBM 400); Inter 400/500 added (~15KB/weight). Subset check at implementation.
- **Images:** mockups 0.06–1.6MB → convert to WebP (~60–70% savings), `loading="lazy"` + `decoding="async"` + explicit `width/height` (no CLS); portrait 1.6–2.2MB → WebP ~80–120KB; resume PDF stays (100KB).
- **Videos:** 100–370KB WEBMs kept; `preload="none"` + poster (poster = first-frame WebP, ~20–40KB each); play on intersection (desktop) / gesture (mobile).
- **Targets:** Lighthouse desktop ≥90 Performance, 100 A11y/BP/SEO; LCP < 2.5s (cover is typography → fast LCP); CLS ≈ 0; INP < 200ms.
- **No:** WebGL, particles, canvas backgrounds, animation libraries beyond GSAP, fonts beyond 8 files, trackers.

---

## 20. Complete Page Flow

```
00 — COVER            100vh. Top band. Name (3 lines, display-xl). Statement line.
                      Bottom evidence strip (mono: works counts · location · status).
                      Scroll cue: mono "SCROLL ↓" bottom-right? — subtle, optional.
────────────────────────────────────────────
01 — WORKS            Section header. Four flagship archive entries (001–004),
                      mirrored alternation, video plates + image figures,
                      P/A/R documentation, tech margin, ledger rhythm.
                      → Ends with THE INDEX (secondary works ledger, 7 rows).
────────────────────────────────────────────
02 — ABOUT            Statement (serif, from real bio). Metadata band (location/
                      education/status). Interests line. Portrait plate FIG. 000.
────────────────────────────────────────────
03 — CAPABILITIES     Capability matrix: 6 ledger-style group rows with focus
                      lines + stack lists. (Skills named CAPABILITIES in nav? — lock)
────────────────────────────────--------────
04 — WRITING          Reading archive: READING/001–003 ledger rows, publication
                      + date + external links.
────────────────────────────────────────────
05 — CONTACT          Serif statement, email as large serif link, channels ledger
                      (GitHub/LinkedIn/Resume), restyled Formspree form,
                      resume as document plate.
────────────────────────────────────────────
COLOPHON              Full-width ink? No — paper band with rules: site identity,
                      year, "Designed & built by Krishna Yaswanth", type credits
                      (Playfair / Inter / JetBrains Mono), last-updated mono stamp,
                      back-to-top. Footer nav mirrors top band + complete sitemap.
```

Numbering: cover is 00; sections 01–05; colophon unnumbered. Nav labels: `WORKS / ABOUT / CAPABILITIES / WRITING / CONTACT`.

---

## DESIGN DECISIONS TO LOCK

1. **Hero:** Concept A+B hybrid ("Cover Page" with bottom evidence strip, no portrait on cover, portrait in About). Approve?
2. **Fonts:** keep Playfair + JetBrains Mono, **add Inter (2 weights)** as body/UI. Approve? (Fallback: body in Playfair.)
3. **Three.js:** remove `three` from runtime (no decorative WebGL). Approve removal?
4. **Custom cursor:** **none.** Native cursor; hover states do the work. Approve?
5. **Dead links** (`github: "#"`): render `SOURCE — PRIVATE` mono note instead of dead links. Approve?
6. **Secondary works dedup:** merge Vision Volume ≡ Volume Control; RAG Customer Support Assistant vs "Dense RAG Knowledge Engine" — treat as one entry? (Recommend: one entry.)
7. **UniPulse "99.8% accuracy" claim:** keep (it exists in repo data) as a quiet mono pull-fact. Approve?
8. **Skills naming:** section named **CAPABILITIES** (nav) — approve? (Alt: PROFICIENCIES, STACK.)
9. **Read-time metadata** on writing rows: keep (mono, quiet) or drop? (Recommend: keep.)
10. **Paper grain texture:** include subtle SVG grain (2–3%) or keep pure flat paper? (Recommend: include, evaluate visually, cut if it reads as noise.)
11. **Contact email typo:** visible text currently says `krishnayaswanth@gmail.com` but mailto says `krishnayaswanthp@gmail.com` — implement with the mailto's address. Confirm?
12. **Section order** (Cover → Works → About → Capabilities → Writing → Contact → Colophon): locked unless you want Writing before About.

---

*End of specification. Nothing implemented — awaiting lock approvals.*
