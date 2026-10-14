import { useState } from "react";
import { site } from "../../data/site";
import { secondaryWorks } from "../../data/secondary";

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
          <div className="flex flex-wrap gap-2">
            {filterTags.map((tab) => (
              <button
                key={tab.id}
                type="button"
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

        {/* ─── FLAGSHIP 1: UniPulse AI (Large Editorial Spread) ───────── */}
        {(filter === "all" || filter === "ai") && (
          <article className="mb-16 bg-card-cream rounded-3xl p-6 sm:p-10 border-[2.5px] border-warm-charcoal shadow-[8px_8px_0px_#292820]">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold bg-bright-lime text-warm-charcoal px-3 py-1 rounded-full border-[1.5px] border-warm-charcoal">
                  01 // FLAGSHIP
                </span>
                <span className="font-mono text-xs text-warm-charcoal/70 uppercase">
                  AI &amp; Data Systems • 2026
                </span>
              </div>
              <span className="font-mono text-xs font-semibold bg-surface-dim px-3 py-1 rounded border border-warm-charcoal/30">
                INDUSTRIAL INTELLIGENCE ENGINE
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Media Plate */}
              <div className="lg:col-span-7">
                <div className="relative rounded-2xl overflow-hidden border-[2.5px] border-warm-charcoal bg-warm-charcoal shadow-[5px_5px_0px_#292820]">
                  <video
                    src="/media/unipluseai-loop.webm"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto aspect-[16/10] object-cover"
                    aria-label="UniPulse AI execution preview"
                  />
                  <div className="absolute top-3 left-3 bg-warm-charcoal/90 text-white font-mono text-[11px] px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-sm">
                    ● PRODUCTION INTERFACE LOOP
                  </div>
                </div>
              </div>

              {/* Editorial Documentation */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-headline text-2xl sm:text-3xl font-extrabold uppercase text-warm-charcoal mb-3">
                    UniPulse AI
                  </h3>
                  <p className="font-body text-sm sm:text-base text-warm-charcoal/80 leading-relaxed mb-6">
                    A precision data extraction and catalog normalization engine designed to resolve complex, messy industrial product specifications into verified, structured taxonomy.
                  </p>

                  <div className="space-y-3 font-body text-xs sm:text-sm text-warm-charcoal/85 mb-6">
                    <div className="p-3 bg-vanilla-cream rounded-xl border border-warm-charcoal/30">
                      <strong className="font-mono uppercase text-electric-blue block mb-1">Architecture</strong>
                      FastAPI microservice coupled with Groq high-velocity inference and vector store validation for structured attribute parsing.
                    </div>
                    <div className="p-3 bg-vanilla-cream rounded-xl border border-warm-charcoal/30">
                      <strong className="font-mono uppercase text-tangerine block mb-1">Impact &amp; Verification</strong>
                      Achieved 99.8% attribute validation accuracy across complex technical product catalogs.
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-4 font-mono text-xs">
                    {["Python", "FastAPI", "Groq LLM", "ChromaDB", "Pydantic"].map((tech) => (
                      <span key={tech} className="bg-surface-dim px-2.5 py-1 rounded border border-warm-charcoal">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-warm-charcoal/20 flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-warm-charcoal">STATUS: COMPLETED ENGINE</span>
                    <span className="text-electric-blue font-bold">CORE AI SYSTEM ↗</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* ─── FLAGSHIP 2: RAG Customer Support Assistant (Split Inverted) */}
        {(filter === "all" || filter === "ai") && (
          <article className="mb-16 bg-card-cream rounded-3xl p-6 sm:p-10 border-[2.5px] border-warm-charcoal shadow-[8px_8px_0px_#292820]">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold bg-tangerine text-warm-charcoal px-3 py-1 rounded-full border-[1.5px] border-warm-charcoal">
                  02 // FLAGSHIP
                </span>
                <span className="font-mono text-xs text-warm-charcoal/70 uppercase">
                  Retrieval Architecture • 2026
                </span>
              </div>
              <span className="font-mono text-xs font-semibold bg-surface-dim px-3 py-1 rounded border border-warm-charcoal/30">
                GROUNDED CONTEXT ASSISTANT
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Documentation */}
              <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-headline text-2xl sm:text-3xl font-extrabold uppercase text-warm-charcoal mb-3">
                    RAG Support Assistant
                  </h3>
                  <p className="font-body text-sm sm:text-base text-warm-charcoal/80 leading-relaxed mb-6">
                    A retrieval-augmented generation assistant connecting enterprise source documents to AI-generated answers with zero hallucination tolerance and source citation verification.
                  </p>

                  <div className="space-y-3 font-body text-xs sm:text-sm text-warm-charcoal/85 mb-6">
                    <div className="p-3 bg-vanilla-cream rounded-xl border border-warm-charcoal/30">
                      <strong className="font-mono uppercase text-electric-blue block mb-1">Pipeline &amp; Chunking</strong>
                      Custom semantic chunking strategies over technical manuals, indexed into ChromaDB vector collections for low-latency top-k retrieval.
                    </div>
                    <div className="p-3 bg-vanilla-cream rounded-xl border border-warm-charcoal/30">
                      <strong className="font-mono uppercase text-tangerine block mb-1">Failsafe Logic</strong>
                      Grounded validation prompts that cross-examine generated responses against source chunk IDs before client dispatch.
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-4 font-mono text-xs">
                    {["Python", "LangChain", "ChromaDB", "FastAPI", "Vector Search"].map((tech) => (
                      <span key={tech} className="bg-surface-dim px-2.5 py-1 rounded border border-warm-charcoal">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-warm-charcoal/20 flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-warm-charcoal">STATUS: PRODUCTION TESTED</span>
                    <span className="text-electric-blue font-bold">RETRIEVAL SYSTEM ↗</span>
                  </div>
                </div>
              </div>

              {/* Right Media Plate */}
              <div className="lg:col-span-7 order-1 lg:order-2">
                <div className="relative rounded-2xl overflow-hidden border-[2.5px] border-warm-charcoal bg-warm-charcoal shadow-[5px_5px_0px_#292820]">
                  <img
                    src="/media/RAG_model.png"
                    alt="RAG Customer Support Terminal Pipeline Architecture"
                    className="w-full h-auto aspect-[16/10] object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-warm-charcoal/90 text-white font-mono text-[11px] px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-sm">
                    ● PIPELINE RUNTIME ARCHITECTURE
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* ─── FLAGSHIP 3 & 4: Opaque & AI Resume Screener (Two-Column Asymmetric) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Opaque Zero-Trust Sanitizer */}
          {(filter === "all" || filter === "systems") && (
            <article className="bg-card-cream rounded-3xl p-6 sm:p-8 border-[2.5px] border-warm-charcoal shadow-[7px_7px_0px_#292820] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-mono text-xs font-bold bg-tangerine text-warm-charcoal px-3 py-1 rounded-full border-[1.5px] border-warm-charcoal">
                    03 // SECURITY
                  </span>
                  <span className="font-mono text-xs text-warm-charcoal/70">
                    ZERO-TRUST FILE WORKFLOW
                  </span>
                </div>

                <div className="aspect-[16/10] rounded-xl overflow-hidden border-[2px] border-warm-charcoal bg-warm-charcoal mb-5 shadow-[3px_3px_0px_#292820]">
                  <video
                    src="/media/opaque-loop.webm"
                    poster="/media/Opaque.png"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    aria-label="Opaque sanitizer interface loop"
                  />
                </div>

                <h3 className="font-headline text-2xl font-extrabold uppercase text-warm-charcoal mb-2">
                  Opaque Zero-Trust Sanitizer
                </h3>
                <p className="font-body text-sm text-warm-charcoal/80 leading-relaxed mb-4">
                  A high-security asset sanitization pipeline that detects, quarantines, and cleans tracking metadata (EXIF, geolocation, equipment hashes) from uploaded files before ingestion into corporate systems.
                </p>

                <div className="p-3 bg-vanilla-cream rounded-xl border border-warm-charcoal/30 mb-4 font-mono text-xs">
                  <span className="block font-bold text-warm-charcoal mb-1">Defense Vector</span>
                  Protects internal storage against steganographic payloads and hidden tracking headers.
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-4 font-mono text-xs">
                  {["Flask", "ExifTool", "Security APIs", "Docker"].map((tech) => (
                    <span key={tech} className="bg-surface-dim px-2 py-0.5 rounded border border-warm-charcoal">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="pt-3 border-t border-warm-charcoal/20 flex items-center justify-between font-mono text-xs">
                  <span className="text-warm-charcoal font-bold">STATUS: OPEN SOURCE</span>
                  <a
                    href="https://github.com/krishnayaswanthp-netizen/opaque"
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold underline text-electric-blue hover:text-warm-charcoal"
                  >
                    GitHub Repository ↗
                  </a>
                </div>
              </div>
            </article>
          )}

          {/* AI Resume Screener */}
          {(filter === "all" || filter === "ai") && (
            <article className="bg-card-cream rounded-3xl p-6 sm:p-8 border-[2.5px] border-warm-charcoal shadow-[7px_7px_0px_#292820] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-mono text-xs font-bold bg-bright-lime text-warm-charcoal px-3 py-1 rounded-full border-[1.5px] border-warm-charcoal">
                    04 // HR &amp; ATS
                  </span>
                  <span className="font-mono text-xs text-warm-charcoal/70">
                    CANDIDATE FIT ENGINE
                  </span>
                </div>

                <div className="aspect-[16/10] rounded-xl overflow-hidden border-[2px] border-warm-charcoal bg-warm-charcoal mb-5 shadow-[3px_3px_0px_#292820]">
                  <video
                    src="/media/AI-Screening-Resume-loop.webm"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    aria-label="AI Resume Screener evaluation loop"
                  />
                </div>

                <h3 className="font-headline text-2xl font-extrabold uppercase text-warm-charcoal mb-2">
                  AI Resume Screener &amp; Fit Analysis
                </h3>
                <p className="font-body text-sm text-warm-charcoal/80 leading-relaxed mb-4">
                  Automated candidate resume parsing and scoring system that compares applicant CVs against target role requirements, generating transparent, reproducible fit analyses and breakdown reports.
                </p>

                <div className="p-3 bg-vanilla-cream rounded-xl border border-warm-charcoal/30 mb-4 font-mono text-xs">
                  <span className="block font-bold text-warm-charcoal mb-1">Reasoning Pipeline</span>
                  Structured prompt chains evaluate real qualification alignment, replacing opaque keyword screening.
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-4 font-mono text-xs">
                  {["Python", "Streamlit", "PyPDF2", "Prompt Chains"].map((tech) => (
                    <span key={tech} className="bg-surface-dim px-2 py-0.5 rounded border border-warm-charcoal">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="pt-3 border-t border-warm-charcoal/20 flex items-center justify-between font-mono text-xs">
                  <span className="text-warm-charcoal font-bold">STATUS: DEPLOYED APP</span>
                  <span className="text-electric-blue font-bold">EVALUATION FLOW ↗</span>
                </div>
              </div>
            </article>
          )}
        </div>

        {/* ─── PROJECTS 5 TO 8: Distinctive Engineering Showcase ────────── */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-xs uppercase font-bold bg-card-cream px-3 py-1 rounded-full border border-warm-charcoal shadow-[2px_2px_0px_#292820]">
              Additional Engineering Implementations
            </span>
            <div className="h-px bg-warm-charcoal/20 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Project 5: CineNexus (FRONTEND-ONLY EXPLICIT) */}
            <div className="bg-card-cream p-5 rounded-2xl border-[2px] border-warm-charcoal shadow-[4px_4px_0px_#292820] flex flex-col justify-between">
              <div>
                <div className="aspect-[16/10] rounded-xl overflow-hidden border-[1.5px] border-warm-charcoal bg-warm-charcoal mb-4 shadow-[2px_2px_0px_#292820]">
                  <video
                    src="/media/CineNexus-loop.webm"
                    poster="/media/CineNexus.png"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    aria-label="CineNexus frontend preview"
                  />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] font-bold bg-coral-pink text-warm-charcoal px-2 py-0.5 rounded border border-warm-charcoal">
                    FRONTEND ONLY
                  </span>
                  <span className="font-mono text-[10px] text-warm-charcoal/60">05 // CINEMA</span>
                </div>
                <h4 className="font-headline font-bold text-lg uppercase text-warm-charcoal mb-1">
                  CineNexus
                </h4>
                <p className="font-body text-xs text-warm-charcoal/75 leading-relaxed">
                  Cinematic production hub prototype featuring fluid layout transitions, interactive movie discoverability, and custom GSAP choreography.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-warm-charcoal/15 font-mono text-[11px] text-warm-charcoal/80 flex justify-between">
                <span>REACT / TAILWIND</span>
                <span className="font-bold text-electric-blue">UI CRAFT</span>
              </div>
            </div>

            {/* Project 6: CivicConnect */}
            <div className="bg-card-cream p-5 rounded-2xl border-[2px] border-warm-charcoal shadow-[4px_4px_0px_#292820] flex flex-col justify-between">
              <div>
                <div className="aspect-[16/10] rounded-xl overflow-hidden border-[1.5px] border-warm-charcoal bg-warm-charcoal mb-4 shadow-[2px_2px_0px_#292820]">
                  <img
                    src="/media/civic-connect.png"
                    alt="CivicConnect municipal reporting"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] font-bold bg-bright-lime text-warm-charcoal px-2 py-0.5 rounded border border-warm-charcoal">
                    CONCEPT / UX
                  </span>
                  <span className="font-mono text-[10px] text-warm-charcoal/60">06 // CIVIC</span>
                </div>
                <h4 className="font-headline font-bold text-lg uppercase text-warm-charcoal mb-1">
                  CivicConnect
                </h4>
                <p className="font-body text-xs text-warm-charcoal/75 leading-relaxed">
                  Decentralized civic issue reporting platform prioritizing geotagged municipal reporting and status tracking workflows.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-warm-charcoal/15 font-mono text-[11px] text-warm-charcoal/80 flex justify-between">
                <span>REACT / REST</span>
                <span className="font-bold text-warm-charcoal">PORTAL</span>
              </div>
            </div>

            {/* Project 7: Volume Control System */}
            <div className="bg-card-cream p-5 rounded-2xl border-[2px] border-warm-charcoal shadow-[4px_4px_0px_#292820] flex flex-col justify-between">
              <div>
                <div className="aspect-[16/10] rounded-xl overflow-hidden border-[1.5px] border-warm-charcoal bg-warm-charcoal mb-4 shadow-[2px_2px_0px_#292820]">
                  <img
                    src="/media/volume_control.png"
                    alt="Computer vision gesture volume control system"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] font-bold bg-tangerine text-warm-charcoal px-2 py-0.5 rounded border border-warm-charcoal">
                    VISION / CV
                  </span>
                  <span className="font-mono text-[10px] text-warm-charcoal/60">07 // GESTURE</span>
                </div>
                <h4 className="font-headline font-bold text-lg uppercase text-warm-charcoal mb-1">
                  Gesture Volume Control
                </h4>
                <p className="font-body text-xs text-warm-charcoal/75 leading-relaxed">
                  Real-time hand-tracking computer vision engine that calculates fingertip Euclidean distance to adjust native OS sound levels dynamically.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-warm-charcoal/15 font-mono text-[11px] text-warm-charcoal/80 flex justify-between">
                <span>OPENCV / MEDIAPIPE</span>
                <span className="font-bold text-warm-charcoal">PYTHON</span>
              </div>
            </div>

            {/* Project 8: Bank Management System */}
            <div className="bg-card-cream p-5 rounded-2xl border-[2px] border-warm-charcoal shadow-[4px_4px_0px_#292820] flex flex-col justify-between">
              <div>
                <div className="aspect-[16/10] rounded-xl overflow-hidden border-[1.5px] border-warm-charcoal bg-warm-charcoal mb-4 shadow-[2px_2px_0px_#292820]">
                  <img
                    src="/media/bank_management_system_1.png"
                    alt="Bank Management System Java desktop UI"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] font-bold bg-surface-dim text-warm-charcoal px-2 py-0.5 rounded border border-warm-charcoal">
                    DESKTOP ARCH
                  </span>
                  <span className="font-mono text-[10px] text-warm-charcoal/60">08 // CORE</span>
                </div>
                <h4 className="font-headline font-bold text-lg uppercase text-warm-charcoal mb-1">
                  Bank Management System
                </h4>
                <p className="font-body text-xs text-warm-charcoal/75 leading-relaxed">
                  Full desktop account management system built in Java with relational database integration, transaction audit logs, and account creation workflows.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-warm-charcoal/15 font-mono text-[11px] text-warm-charcoal/80 flex justify-between">
                <span>JAVA / SWING / SQL</span>
                <span className="font-bold text-warm-charcoal">DESKTOP</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── SECONDARY LEDGER / ALSO BUILT ───────────────────────────── */}
        <div className="bg-surface-dim rounded-2xl p-6 sm:p-8 border-[2px] border-warm-charcoal shadow-[5px_5px_0px_#292820]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <div>
              <h3 className="font-headline font-extrabold text-xl uppercase text-warm-charcoal">
                Index of Additional Repositories &amp; Experiments
              </h3>
              <p className="font-body text-xs text-warm-charcoal/75 mt-0.5">
                Public sources and experimental repositories from the digital archive.
              </p>
            </div>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs font-bold bg-card-cream px-3 py-1.5 rounded-full border border-warm-charcoal shadow-[2px_2px_0px_#292820] hover:bg-bright-lime transition-colors self-start sm:self-auto"
            >
              <span>Explore GitHub Org</span>
              <span>↗</span>
            </a>
          </div>

          <div className="divide-y divide-warm-charcoal/15 font-mono text-xs">
            {secondaryWorks.map((work) => (
              <div key={work.index} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-card-cream/50 px-2 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-warm-charcoal/50 font-bold">{work.index}</span>
                  <span className="font-headline font-bold text-sm text-warm-charcoal">{work.name}</span>
                  <span className="text-[10px] bg-card-cream px-2 py-0.5 rounded border border-warm-charcoal/20">
                    {work.type}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-warm-charcoal/70">
                  <span>{work.meta}</span>
                  {work.github ? (
                    <a
                      href={work.github}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold underline text-electric-blue hover:text-warm-charcoal"
                    >
                      View Source ↗
                    </a>
                  ) : (
                    <span className="text-warm-charcoal/40">Private Archive</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
