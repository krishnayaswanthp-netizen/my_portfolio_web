import { useState } from "react";
import ProjectShuffle from "./ProjectShuffle";

export default function Projects() {
  const [filter, setFilter] = useState<string>("all");

  const filterTags = [
    { id: "all", label: "All Systems" },
    { id: "ai", label: "AI & Retrieval" },
    { id: "systems", label: "Backend & Systems" },
    { id: "frontend", label: "Frontend & UI" },
  ];

  return (
    <section className="w-full bg-vanilla-cream py-24 px-6 md:px-10 border-b-[2.5px] border-warm-charcoal" id="work">
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-bright-lime text-warm-charcoal font-mono text-xs font-bold uppercase border-[1.5px] border-warm-charcoal shadow-[2px_2px_0px_#292820] mb-4 rotate-[-1deg]">
              ★ 01 // ARCHIVE CENTERPIECE
            </div>
            <h2 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-warm-charcoal">
              Featured Engineering Work
            </h2>
            <p className="font-body text-base md:text-lg text-warm-charcoal/80 mt-4 max-w-2xl leading-relaxed">
              Real systems built end-to-end: retrieval-augmented architectures, industrial data pipelines, cybersecurity sanitizers, and responsive web platforms.
            </p>
          </div>

          {/* Filter Pills */}
          <div
            role="group"
            aria-label="Filter projects by discipline"
            className="flex flex-wrap gap-2"
          >
            {filterTags.map((tab) => (
              <button
                key={tab.id}
                type="button"
                aria-pressed={filter === tab.id}
                onClick={() => setFilter(tab.id)}
                className={`font-mono text-xs font-bold uppercase px-4 py-2 rounded-full border-[2px] border-warm-charcoal transition-all cursor-pointer ${
                  filter === tab.id
                    ? "bg-electric-blue text-white shadow-[3px_3px_0px_#292820] -translate-x-0.5 -translate-y-0.5"
                    : "bg-card-cream text-warm-charcoal shadow-[2px_2px_0px_#292820] hover:bg-bright-lime"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ─── INTERACTIVE INDEX: shuffle & explore the archive ────────── */}
        <ProjectShuffle key={filter} filter={filter} />
      </div>
    </section>
  );
}
