/** Navbar — minimal, transforming. Gains a hairline + frost after scrolling.
 *  Mobile: full-screen ink overlay with a staggered serif index.
 */

import { useEffect, useRef, useState } from "react";
import { site, nav } from "../../data/site";
import { scrollToSection, prefersReducedMotion } from "../../lib/motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    let t = 0;
    if (prefersReducedMotion()) {
      closeRef.current?.focus();
    } else {
      t = window.setTimeout(() => closeRef.current?.focus(), 350);
    }
    return () => {
      document.documentElement.style.overflow = prev;
      if (t) window.clearTimeout(t);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // Wait for the overlay to release the scroll lock before scrolling
    window.setTimeout(() => scrollToSection(id), open ? 60 : 0);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-ink-900/8 bg-glass backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <button
            ref={menuBtnRef}
            onClick={() => go("top")}
            className="mono-label text-ink-900 transition-colors hover:text-rust-600"
            aria-label="Back to top"
          >
            KY<span className="text-rust-600">©</span>2026
          </button>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className="link-draw mono-label text-ink-600 transition-colors hover:text-ink-900"
              >
                {item.label}
              </button>
            ))}
            <a
              href={site.resume}
              download
              className="mono-label rounded-full border border-ink-900/25 px-4 py-2 transition-colors hover:border-ink-900 hover:bg-ink-900 hover:text-bone-50"
            >
              Resume ↓
            </a>
          </nav>

          <button
            className="mono-label flex items-center gap-2 rounded-full border border-ink-900/25 px-4 py-2 md:hidden"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            Menu <span aria-hidden="true">＋</span>
          </button>
        </div>
      </header>

      {/* Mobile full-screen index */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className={`fixed inset-0 z-[60] flex flex-col bg-ink-950 text-bone-100 transition-all duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Site index"
        inert={!open ? true : undefined}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <span className="mono-label text-bone-100/60">Index</span>
          <button
            ref={closeRef}
            onClick={() => setOpen(false)}
            className="mono-label rounded-full border border-bone-100/25 px-4 py-2"
            aria-label="Close menu"
          >
            Close ×
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-2 px-6" aria-label="Mobile">
          {nav.map((item, i) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`group flex items-baseline gap-4 py-3 text-left transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
            >
              <span className="mono-label text-rust-400">{item.index}</span>
              <span className="display text-5xl text-bone-50 transition-colors group-hover:text-rust-400 sm:text-6xl">
                {item.label}
              </span>
            </button>
          ))}
        </nav>
        <div className="flex items-center justify-between px-6 pb-8">
          <a href={site.resume} download className="mono-label text-bone-100/70">
            Resume ↓
          </a>
          <span className="mono-label text-bone-100/40">{site.locationShort}</span>
        </div>
      </div>
    </>
  );
}
