import { useState, useEffect } from "react";
import { site } from "../../data/site";
import Icon from "../common/Icon";

export default function Footer() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-surface-dim border-t-[2.5px] border-warm-charcoal">
      {/* Tactile Color Strip Accents (Tangerine, Lime, Coral Pink, Electric Blue) */}
      <div className="w-full flex flex-col">
        <div className="h-2.5 w-full bg-tangerine border-b border-warm-charcoal"></div>
        <div className="h-2.5 w-full bg-bright-lime border-b border-warm-charcoal"></div>
        <div className="h-2.5 w-full bg-coral-pink border-b border-warm-charcoal"></div>
        <div className="h-2.5 w-full bg-electric-blue border-b-[2px] border-warm-charcoal"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Brand & Subtitle */}
          <div className="md:col-span-6 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="font-headline text-xl md:text-2xl font-extrabold text-warm-charcoal uppercase">
                Krishna Yaswanth
              </span>
              <span className="font-mono text-xs bg-electric-blue text-white px-2.5 py-0.5 rounded-full border border-warm-charcoal">
                ENGINEER
              </span>
            </div>
            <p className="font-body text-xs md:text-sm text-warm-charcoal/75 max-w-md">
              Backend systems, AI retrieval pipelines, and robust full-stack applications built with precision and craft.
            </p>
          </div>

          {/* Social Pills */}
          <div className="md:col-span-3 flex items-center gap-2 flex-wrap">
            <a
              className="font-mono text-xs font-bold text-warm-charcoal px-3 py-1 bg-card-cream border-[1.5px] border-warm-charcoal rounded-full shadow-[2px_2px_0px_#292820] hover:bg-bright-lime transition-colors"
              href={site.github}
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
            <a
              className="font-mono text-xs font-bold text-warm-charcoal px-3 py-1 bg-card-cream border-[1.5px] border-warm-charcoal rounded-full shadow-[2px_2px_0px_#292820] hover:bg-bright-lime transition-colors"
              href={site.linkedin}
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
            <a
              className="font-mono text-xs font-bold text-warm-charcoal px-3 py-1 bg-card-cream border-[1.5px] border-warm-charcoal rounded-full shadow-[2px_2px_0px_#292820] hover:bg-bright-lime transition-colors"
              href={`mailto:${site.email}`}
            >
              Email
            </a>
            <a
              className="font-mono text-xs font-bold text-warm-charcoal px-3 py-1 bg-card-cream border-[1.5px] border-warm-charcoal rounded-full shadow-[2px_2px_0px_#292820] hover:bg-bright-lime transition-colors"
              href={site.portfolio}
              rel="noreferrer"
              target="_blank"
            >
              Netlify ↗
            </a>
          </div>

          {/* Back to Top & Copyright */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between gap-3">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 font-headline text-xs font-bold uppercase bg-card-cream text-warm-charcoal px-4 py-2 rounded-full border-[2px] border-warm-charcoal shadow-[2px_2px_0px_#292820] hover:bg-bright-lime transition-colors cursor-pointer"
            >
              <Icon name="arrow_upward" size={16} />
              Back to Top
            </button>
            <p className="font-mono text-[11px] text-warm-charcoal/70 md:text-right">
              © {year} {site.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
