/** Flagship projects — content preserved verbatim from the prior implementation. */

export interface Flagship {
  index: string;
  id: string;
  title: string;
  domain: string;
  year: string;
  tagline: string;
  description: string;
  problem: string;
  approach: string;
  evidence: string;
  stack: string[];
  video: string;
  videoLabel: string;
  poster?: string;
  figures: { src: string; caption: string }[];
  github?: string;
  /** The one repo-supported metric in the archive. */
  metric?: { value: string; label: string };
}

export const flagships: Flagship[] = [
  {
    index: "001",
    id: "ai-resume-screener",
    title: "AI Resume Screener & Fit Analysis",
    domain: "AI / Recruitment",
    year: "2026",
    tagline: "Tactile & objective candidate evaluation.",
    description:
      "Replaces subjective candidate filtering with deep LLM reasoning. Evaluates technical profiles against custom job requirements with clear, reproducible scoring metrics.",
    problem:
      "Subjective candidate filtering — screening decisions that resist comparison and repeat poorly.",
    approach:
      "Deep LLM reasoning over technical profiles against custom job requirements, with clear, reproducible scoring metrics.",
    evidence:
      "Objective, reproducible candidate–role fit analysis; the full evaluation flow is recorded in the interface loop.",
    stack: ["Python", "LangChain", "Groq", "FastAPI"],
    video: "/media/AI-Screening-Resume-loop.webm",
    videoLabel: "Screen recording of the AI Resume Screener evaluation interface",
    figures: [],
  },
  {
    index: "002",
    id: "cinenexus",
    title: "CineNexus — Cinema Production Hub",
    domain: "Cinema / Platform",
    year: "2026",
    tagline: "Frame your legacy.",
    description:
      "Digital ecosystem connecting indie filmmakers, production crews, and talent with real-time casting calls and interactive production sets.",
    problem:
      "Independent filmmakers, crews, and talent work without a connected ecosystem.",
    approach:
      "A digital ecosystem with real-time casting calls and interactive production sets.",
    evidence: "The production hub, recorded and framed in the loop and still frame.",
    stack: ["TypeScript", "Tailwind CSS", "GSAP", "Vite"],
    video: "/media/CineNexus-loop.webm",
    videoLabel: "Screen recording of the CineNexus production hub interface",
    poster: "/media/CineNexus.png",
    figures: [
      { src: "/media/CineNexus.png", caption: "Production hub, still frame" },
    ],
  },
  {
    index: "003",
    id: "opaque",
    title: "Opaque — Zero-Trust Sanitizer",
    domain: "Security / File Systems",
    year: "2026",
    tagline: "Meta-shield security engine.",
    description:
      "Scans and strips hidden tracking metadata from enterprise uploads, generating tamper-proof sanitized assets without disrupting ingestion pipelines.",
    problem: "Hidden tracking metadata rides inside enterprise uploads.",
    approach:
      "Scan and strip concealed metadata, producing tamper-proof sanitized assets inside existing ingestion pipelines.",
    evidence:
      "Sanitized uploads delivered without disrupting enterprise ingestion; the workflow is recorded in the interface loop.",
    stack: ["Flask", "Security APIs", "Docker", "REST"],
    video: "/media/opaque-loop.webm",
    videoLabel: "Screen recording of the Opaque sanitizer dashboard",
    poster: "/media/Opaque.png",
    github: "https://github.com/krishnayaswanthp-netizen/opaque",
    figures: [
      { src: "/media/Opaque.png", caption: "Sanitizer dashboard, still frame" },
    ],
  },
  {
    index: "004",
    id: "unipulse-ai",
    title: "UniPulse AI",
    domain: "AI / Data Systems",
    year: "2026",
    tagline: "Industrial intelligence engine.",
    description:
      "Precision data extraction and normalization engine built for complex manufacturing catalogs.",
    problem:
      "Complex manufacturing catalogs resist clean data extraction and normalization.",
    approach:
      "A precision extraction and normalization engine built for complex manufacturing catalogs.",
    evidence: "Attribute validation accuracy measured across the extraction pipeline.",
    stack: ["Python", "RAG Pipeline", "ChromaDB", "FastAPI"],
    video: "/media/unipluseai-loop.webm",
    videoLabel: "Screen recording of the UniPulse AI extraction engine",
    metric: { value: "99.8%", label: "Attribute validation accuracy" },
    figures: [],
  },
];
