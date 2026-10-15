/** ProjectShuffle — the archive's interactive index (a shuffle/explore deck).
 *
 *  An editorially-ordered rail of every verified build in the works section,
 *  plus a spotlight stage. Selecting a spine (click, or ← → / Home / End via
 *  the tablist) or hitting Shuffle moves the stage to a new project through a
 *  two-phase GSAP transition; the media plate carries a scrubbed parallax.
 *  Under `prefers-reduced-motion` swaps are instant, the parallax is skipped,
 *  and the loop video does not autoplay.
 *
 *  Content is restricted to what the repository verifies: real names, the real
 *  /media frames and loops, the stack already documented on the site, and links
 *  that actually resolve (501s and private repos are labelled as such, never
 *  invented).
 */

import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "../common/Icon";
import { gsap, MOTION, prefersReducedMotion } from "../../lib/motion";

type Accent = "lime" | "tangerine" | "blue" | "pink" | "dim";
type Tag = "ai" | "systems" | "frontend";

interface ShowcaseProject {
  index: string;
  name: string;
  short: string;
  /** Mono domain line, taken from the section's existing labels. */
  kicker: string;
  /** The filter key this project answers to. */
  tag: Tag;
  /** Small colored marker, matching the mark already used on its card. */
  mark: string;
  accent: Accent;
  /** One concise line — a compression of the long-form copy, no new claims. */
  blurb: string;
  stack: string[];
  media: { src: string; kind: "video" | "image"; poster?: string; label: string };
  link?: { href: string; label: string };
}

const ACCENT: Record<Accent, string> = {
  lime: "bg-bright-lime text-warm-charcoal border-warm-charcoal",
  tangerine: "bg-tangerine text-warm-charcoal border-warm-charcoal",
  blue: "bg-electric-blue text-white border-warm-charcoal",
  pink: "bg-coral-pink text-warm-charcoal border-warm-charcoal",
  dim: "bg-surface-dim text-warm-charcoal border-warm-charcoal",
};

/** Order follows the reading order of the works section (01 → 08). */
const SHOWCASE: ShowcaseProject[] = [
  {
    index: "01",
    name: "UniPulse AI",
    short: "UniPulse AI",
    kicker: "AI & Data Systems",
    tag: "ai",
    mark: "FLAGSHIP ENGINE",
    accent: "lime",
    blurb:
      "Precision extraction and catalog normalization that resolves messy industrial product specifications into verified, structured taxonomy.",
    stack: ["Python", "FastAPI", "Groq LLM", "ChromaDB", "Pydantic"],
    media: {
      src: "/media/unipluseai-loop.webm",
      kind: "video",
      label: "UniPulse AI execution preview",
    },
  },
  {
    index: "02",
    name: "RAG Support Assistant",
    short: "RAG Assistant",
    kicker: "Retrieval Architecture",
    tag: "ai",
    mark: "GROUNDED ASSISTANT",
    accent: "tangerine",
    blurb:
      "Retrieval-augmented assistant that connects source documents to generated answers with source-citation verification.",
    stack: ["Python", "LangChain", "ChromaDB", "FastAPI", "Vector Search"],
    media: {
      src: "/media/RAG_model.png",
      kind: "image",
      label: "RAG customer support pipeline architecture",
    },
    link: {
      href: "https://github.com/krishnayaswanthp-netizen/RAG_System_for_Food_Application",
      label: "View source ↗",
    },
  },
  {
    index: "03",
    name: "Opaque Zero-Trust Sanitizer",
    short: "Opaque",
    kicker: "Zero-Trust File Workflow",
    tag: "systems",
    mark: "SECURITY PIPELINE",
    accent: "tangerine",
    blurb:
      "Detects, quarantines, and cleans tracking metadata (including EXIF, geolocation, and equipment hashes) from uploads before ingestion.",
    stack: ["Flask", "ExifTool", "Security APIs", "Docker"],
    media: {
      src: "/media/opaque-loop.webm",
      kind: "video",
      poster: "/media/Opaque.png",
      label: "Opaque sanitizer interface loop",
    },
    link: {
      href: "https://github.com/krishnayaswanthp-netizen/opaque",
      label: "View source ↗",
    },
  },
  {
    index: "04",
    name: "AI Resume Screener & Fit Analysis",
    short: "AI Screener",
    kicker: "HR & ATS",
    tag: "ai",
    mark: "CANDIDATE FIT ENGINE",
    accent: "lime",
    blurb:
      "Automated resume parsing and scoring that compares CVs against role requirements and returns transparent, reproducible fit analyses.",
    stack: ["Python", "Streamlit", "PyPDF2", "Prompt Chains"],
    media: {
      src: "/media/AI-Screening-Resume-loop.webm",
      kind: "video",
      label: "AI resume screener evaluation loop",
    },
  },
  {
    index: "05",
    name: "CineNexus",
    short: "CineNexus",
    kicker: "Cinema / Frontend",
    tag: "frontend",
    mark: "FRONTEND ONLY",
    accent: "pink",
    blurb:
      "Cinematic production hub prototype built for the browser with fluid layout transitions, interactive movie discoverability, and custom GSAP choreography.",
    stack: ["TypeScript", "React", "Tailwind CSS", "GSAP"],
    media: {
      src: "/media/CineNexus-loop.webm",
      kind: "video",
      poster: "/media/CineNexus.png",
      label: "CineNexus frontend preview",
    },
  },
  {
    index: "06",
    name: "CivicConnect",
    short: "CivicConnect",
    kicker: "Civic / Reporting",
    tag: "frontend",
    mark: "CONCEPT / UX",
    accent: "lime",
    blurb:
      "Civic issue reporting platform prioritizing geotagged municipal reporting and status-tracking workflows.",
    stack: ["React", "REST"],
    media: {
      src: "/media/civic-connect.png",
      kind: "image",
      label: "CivicConnect municipal reporting interface",
    },
    link: {
      href: "https://github.com/krishnayaswanthp-netizen/CivicConnect",
      label: "View source ↗",
    },
  },
  {
    index: "07",
    name: "Gesture Volume Control",
    short: "Gesture Volume",
    kicker: "Vision / CV",
    tag: "systems",
    mark: "COMPUTER VISION",
    accent: "tangerine",
    blurb:
      "Real-time hand tracking that maps fingertip distance to native system volume.",
    stack: ["Python", "OpenCV", "MediaPipe"],
    media: {
      src: "/media/volume_control.png",
      kind: "image",
      label: "Gesture volume control tracking frame",
    },
    link: {
      href: "https://github.com/krishnayaswanthp-netizen/volume-control-system-using-hand-gesture-recognition",
      label: "View source ↗",
    },
  },
  {
    index: "08",
    name: "Bank Management System",
    short: "Bank System",
    kicker: "Desktop / SQL",
    tag: "systems",
    mark: "DESKTOP ARCH",
    accent: "dim",
    blurb:
      "Desktop account management with relational database integration, transaction audit logs, and account creation workflows.",
    stack: ["Java", "Swing", "SQL"],
    media: {
      src: "/media/bank_management_system_1.png",
      kind: "image",
      label: "Bank management system desktop UI",
    },
    link: {
      href: "https://github.com/krishnayaswanthp-netizen/project-1",
      label: "View source ↗",
    },
  },
];

export default function ProjectShuffle({ filter }: { filter: string }) {
  const list = useMemo(
    () => (filter === "all" ? SHOWCASE : SHOWCASE.filter((p) => p.tag === filter)),
    [filter],
  );

  const [active, setActive] = useState(0);
  // Read once — the deck is client-rendered only (no SSR in this app).
  const [reduced] = useState(() => prefersReducedMotion());

  const rootRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const queueRef = useRef<number[]>([]);
  const tlRef = useRef<ReturnType<typeof gsap.timeline> | null>(null);

  const total = list.length;
  const index = Math.min(active, Math.max(total - 1, 0));
  const project = list[index];

  /** Move to a project: fade the old stage out, then swap and fade the new one in. */
  const goTo = (next: number, focusTab = false) => {
    if (total === 0) return;
    const target = ((next % total) + total) % total;
    const tab = tabRefs.current[target];

    if (focusTab && tab) {
      tab.focus();
      tab.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: reduced ? "auto" : "smooth",
      });
    }
    if (target === index) return;

    const stage = stageRef.current;
    if (reduced || !stage) {
      setActive(target);
      return;
    }

    tlRef.current?.kill();
    const out = Array.from(stage.querySelectorAll<HTMLElement>("[data-stage-out]"));
    const plate = stage.querySelector<HTMLElement>("[data-plate]");
    const tl = gsap.timeline({ onComplete: () => setActive(target) });
    tl.to(out, { opacity: 0, y: -12, duration: 0.2, stagger: 0.012, ease: "power2.in" }, 0);
    if (plate) tl.to(plate, { opacity: 0, y: -8, duration: 0.24, ease: "power2.in" }, 0);
    tlRef.current = tl;
  };

  /** Shuffle: walk a shuffled queue so the next project is always unseen first. */
  const shuffle = () => {
    if (total < 2) return;
    if (queueRef.current.length === 0) {
      const pool = list.map((_, i) => i).filter((i) => i !== index);
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      queueRef.current = pool;
    }
    const next = queueRef.current.shift();
    if (next !== undefined) goTo(next);
  };

  /* Stage entrance — the new project's elements fade up into place. */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || reduced) return;
    const out = Array.from(stage.querySelectorAll<HTMLElement>("[data-stage-out]"));
    const plate = stage.querySelector<HTMLElement>("[data-plate]");
    const tl = gsap.timeline();
    tl.fromTo(
      out,
      { opacity: 0, y: 14 },
      {
        opacity: 1,
        y: 0,
        duration: MOTION.fast,
        stagger: MOTION.stagger,
        ease: MOTION.easeOut,
        overwrite: true,
      },
      0,
    );
    if (plate) {
      tl.fromTo(
        plate,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: MOTION.base, ease: MOTION.easeOut, overwrite: true },
        0,
      );
    }
    return () => {
      tl.kill();
    };
  }, [index, reduced]);

  /* Deck entrance on first scroll into view — one trigger, fires once. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll<HTMLElement>("[data-rail-item]"), {
        y: 14,
        opacity: 0,
        duration: MOTION.fast,
        stagger: 0.035,
        ease: MOTION.easeOut,
        immediateRender: false,
        scrollTrigger: { trigger: root, start: "top 88%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  /* Scroll-driven parallax on the spotlight media — re-attached per project. */
  useEffect(() => {
    const root = rootRef.current;
    const media = root?.querySelector<HTMLElement>("[data-plate-media]");
    if (!root || !media || reduced) return;
    const ctx = gsap.context(() => {
      gsap.set(media, { scale: 1.12, willChange: "transform" });
      gsap.fromTo(
        media,
        { yPercent: -4.5 },
        {
          yPercent: 4.5,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, [index, reduced]);

  /* Kill any in-flight swap timeline when the deck unmounts. */
  useEffect(
    () => () => {
      tlRef.current?.kill();
    },
    [],
  );

  if (!project) return null;

  const flip = index % 2 === 1;
  const countLabel = `${String(total).padStart(2, "0")} ${filter === "all" ? "verified builds" : "matching builds"}`;

  return (
    <div ref={rootRef} className="w-full">
      {/* Console header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-warm-charcoal text-bright-lime font-mono text-xs font-bold uppercase border-[1.5px] border-warm-charcoal shadow-[2px_2px_0px_#292820] rotate-[-1deg]">
            ★ Interactive Index // {countLabel}
          </span>
          <span className="font-mono text-xs text-warm-charcoal/70">
            Shuffle the archive, or browse with the arrow keys.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold bg-card-cream text-warm-charcoal px-2.5 py-1 rounded border-[2px] border-warm-charcoal">
            {project.index} / {String(total).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => goTo(index - 1, true)}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-card-cream text-warm-charcoal border-[2px] border-warm-charcoal shadow-[2px_2px_0px_#292820] hover:bg-bright-lime active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            aria-label="Previous project"
          >
            <Icon name="arrow_forward" size={16} className="rotate-180" />
          </button>
          <button
            type="button"
            onClick={shuffle}
            className="inline-flex items-center gap-2 font-headline text-xs font-bold uppercase bg-electric-blue text-white px-4 py-2 rounded-full border-[2px] border-warm-charcoal shadow-[3px_3px_0px_#292820] hover:bg-warm-charcoal active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
          >
            <Icon name="shuffle" size={16} />
            <span>Shuffle</span>
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1, true)}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-card-cream text-warm-charcoal border-[2px] border-warm-charcoal shadow-[2px_2px_0px_#292820] hover:bg-bright-lime active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            aria-label="Next project"
          >
            <Icon name="arrow_forward" size={16} />
          </button>
        </div>
      </div>

      {/* Index rail — a card-catalogue strip; horizontal tablist */}
      <div className="bg-warm-charcoal rounded-t-2xl border-[2.5px] border-warm-charcoal border-b-0 overflow-hidden">
        <div
          role="tablist"
          aria-label="Project index"
          className="flex snap-x snap-mandatory overflow-x-auto md:snap-none md:flex-wrap md:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              goTo(index + 1, true);
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              goTo(index - 1, true);
            } else if (e.key === "Home") {
              e.preventDefault();
              goTo(0, true);
            } else if (e.key === "End") {
              e.preventDefault();
              goTo(total - 1, true);
            }
          }}
        >
          {list.map((item, i) => {
            const selected = i === index;
            return (
              <button
                key={item.index}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`deck-tab-${item.index}`}
                aria-selected={selected}
                aria-controls="deck-stage"
                tabIndex={selected ? 0 : -1}
                data-rail-item
                onClick={() => goTo(i)}
                className={`group flex shrink-0 snap-start items-center gap-2 px-4 py-3.5 border-r border-white/10 last:border-r-0 transition-colors cursor-pointer md:min-w-[7.5rem] md:flex-1 md:justify-center ${
                  selected
                    ? "bg-bright-lime text-warm-charcoal"
                    : "text-vanilla-cream/60 hover:text-vanilla-cream hover:bg-white/5"
                }`}
              >
                <span className="font-mono text-[10px] font-bold opacity-70">{item.index}</span>
                <span className="font-headline text-xs font-bold uppercase tracking-tight whitespace-nowrap">
                  {item.short}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Spotlight stage */}
      <div
        id="deck-stage"
        role="tabpanel"
        aria-labelledby={`deck-tab-${project.index}`}
        ref={stageRef}
        className="relative bg-card-cream rounded-b-2xl border-[2.5px] border-warm-charcoal shadow-[8px_8px_0px_#292820] overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 p-6 sm:p-8 items-center">
          {/* Media plate */}
          <div data-plate className={`lg:col-span-7 ${flip ? "lg:order-2" : "lg:order-1"}`}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border-[2.5px] border-warm-charcoal bg-warm-charcoal shadow-[5px_5px_0px_#292820]">
              {project.media.kind === "video" ? (
                <video
                  key={project.index}
                  src={project.media.src}
                  poster={project.media.poster}
                  autoPlay={!reduced}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  data-plate-media
                  className="absolute inset-0 w-full h-full object-cover"
                  aria-label={project.media.label}
                />
              ) : (
                <img
                  src={project.media.src}
                  alt={project.media.label}
                  loading="lazy"
                  decoding="async"
                  data-plate-media
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              )}
              <span className="absolute top-3 left-3 bg-warm-charcoal/90 text-white font-mono text-[11px] px-2.5 py-1 rounded-full border border-white/20">
                ● {project.media.kind === "video" ? "INTERFACE LOOP" : "ARCHITECTURE STILL"}
              </span>
            </div>
          </div>

          {/* Documentation */}
          <div className={`lg:col-span-5 relative ${flip ? "lg:order-1" : "lg:order-2"}`}>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 right-0 select-none font-headline text-[7rem] leading-none text-warm-charcoal/[0.05]"
            >
              {project.index}
            </span>

            <div className="relative">
              <div data-stage-out className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className={`font-mono text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border-[1.5px] ${ACCENT[project.accent]}`}
                >
                  {project.mark}
                </span>
                <span className="font-mono text-[10px] font-semibold uppercase text-warm-charcoal/70">
                  {project.kicker}
                </span>
              </div>

              <h3
                data-stage-out
                className="font-headline text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-warm-charcoal mb-3"
              >
                {project.name}
              </h3>

              <p data-stage-out className="font-body text-sm text-warm-charcoal/80 leading-relaxed">
                {project.blurb}
              </p>

              <div data-stage-out className="flex flex-wrap gap-1.5 mt-5 font-mono text-[11px]">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="bg-surface-dim px-2.5 py-1 rounded border border-warm-charcoal"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div
                data-stage-out
                className="mt-5 pt-3 border-t border-warm-charcoal/20 flex items-center justify-between gap-3 font-mono text-xs"
              >
                {project.link ? (
                  <a
                    href={project.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold underline text-electric-blue hover:text-warm-charcoal"
                  >
                    {project.link.label}
                  </a>
                ) : (
                  <span className="text-warm-charcoal/70">Source not public</span>
                )}
                <button
                  type="button"
                  onClick={shuffle}
                  className="font-bold uppercase text-warm-charcoal/70 hover:text-electric-blue transition-colors cursor-pointer"
                >
                  Next ▸
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {`Showing project ${index + 1} of ${total}: ${project.name}`}
        </p>
      </div>
    </div>
  );
}
