import { useState, useEffect } from "react";
import { site, nav } from "../../data/site";
import Icon from "../common/Icon";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("work");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = nav.length - 1; i >= 0; i--) {
        const el = document.getElementById(nav[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(nav[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-vanilla-cream/90 backdrop-blur-md border-b-[2.5px] border-warm-charcoal">
      <div className="h-20 max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <a className="group flex items-center gap-2.5" href="#">
            <span className="font-headline text-xl md:text-2xl font-extrabold uppercase tracking-tight text-warm-charcoal group-hover:text-electric-blue transition-colors">
              Krishna Yaswanth
            </span>
            <span className="hidden sm:inline-block font-mono text-xs font-bold bg-bright-lime text-warm-charcoal px-2.5 py-0.5 border-[2px] border-warm-charcoal shadow-[2px_2px_0px_#292820] rounded-full rotate-[-2deg]">
              // PORTFOLIO '26
            </span>
          </a>
        </div>

        {/* Desktop Navigation Pill Group */}
        <nav
          className="hidden lg:flex items-center gap-1.5 p-1 bg-surface-dim border-[2px] border-warm-charcoal rounded-full"
          aria-label="Primary"
        >
          {nav.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`font-headline font-semibold text-sm px-4 py-1.5 rounded-full transition-all ${
                  isActive
                    ? "bg-electric-blue text-white shadow-[2px_2px_0px_#292820]"
                    : "text-warm-charcoal/80 hover:text-warm-charcoal hover:bg-card-cream"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            className="inline-flex items-center justify-center font-headline font-bold text-xs md:text-sm uppercase bg-bright-lime text-warm-charcoal px-4 md:px-5 py-2.5 rounded-full border-[2.5px] border-warm-charcoal shadow-[3px_3px_0px_#292820] hover:shadow-[5px_5px_0px_#292820] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            href="#contact"
          >
            Get In Touch
          </a>
          <a
            className="hidden sm:inline-flex items-center justify-center font-mono text-xs font-bold uppercase bg-card-cream text-warm-charcoal px-3.5 py-2 rounded-full border-[2px] border-warm-charcoal shadow-[2px_2px_0px_#292820] hover:bg-tangerine transition-colors"
            href={site.github}
            rel="noreferrer"
            target="_blank"
          >
            GitHub ↗
          </a>
          {/* Gated at xl: the header row is already tight once the desktop nav
              appears at lg, so this pill only renders where it fits on screen. */}
          <a
            className="hidden xl:inline-flex items-center justify-center font-mono text-xs font-bold uppercase bg-card-cream text-warm-charcoal px-3.5 py-2 rounded-full border-[2px] border-warm-charcoal shadow-[2px_2px_0px_#292820] hover:bg-bright-lime transition-colors"
            href={site.resume}
            rel="noreferrer"
            target="_blank"
          >
            Resume ↗
          </a>
          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex lg:hidden p-2 rounded-xl border-[2px] border-warm-charcoal bg-card-cream shadow-[2px_2px_0px_#292820] cursor-pointer text-warm-charcoal"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <Icon
              name={mobileMenuOpen ? "close" : "menu"}
              size={24}
              label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-[2px] border-warm-charcoal bg-vanilla-cream px-6 py-6 flex flex-col gap-3 shadow-lg animate-fade-in">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className="font-headline font-bold text-base uppercase py-2 px-4 rounded-xl border-[1.5px] border-warm-charcoal bg-card-cream shadow-[2px_2px_0px_#292820] text-warm-charcoal hover:bg-bright-lime transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs font-bold uppercase py-2.5 px-4 rounded-xl border-[1.5px] border-warm-charcoal bg-surface-dim text-warm-charcoal text-center"
          >
            GitHub ↗
          </a>
          <a
            href={site.resume}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs font-bold uppercase py-2.5 px-4 rounded-xl border-[1.5px] border-warm-charcoal bg-card-cream text-warm-charcoal text-center"
          >
            Resume ↗
          </a>
        </div>
      )}
    </header>
  );
}
