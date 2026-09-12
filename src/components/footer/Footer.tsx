/** Footer — the colophon. Mirrors the sitemap, credits the system. */

import { useEffect, useState } from "react";
import { site, nav } from "../../data/site";
import { scrollToSection } from "../../lib/motion";

export default function Footer() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className="border-t border-bone-100/10 bg-ink-950 text-bone-100" role="contentinfo">
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="mono-label text-bone-100/40">Colophon</p>
            <p className="display mt-4 text-2xl text-bone-50 sm:text-3xl">
              Designed &amp; built by Krishna Yaswanth.
            </p>
            <p className="mono-label mt-4 text-bone-100/40">
              React · TypeScript · Tailwind · GSAP · Lenis
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="Footer">
            <p className="mono-label mb-4 text-bone-100/40">Index</p>
            <ul className="space-y-2.5">
              {nav.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="link-draw text-sm text-bone-100/70 transition-colors hover:text-bone-50"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="mono-label mb-4 text-bone-100/40">Elsewhere</p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw text-sm text-bone-100/70 transition-colors hover:text-bone-50"
                >
                  GitHub ↗
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw text-sm text-bone-100/70 transition-colors hover:text-bone-50"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="link-draw text-sm text-bone-100/70 transition-colors hover:text-bone-50"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href={site.resume}
                  download
                  className="link-draw text-sm text-bone-100/70 transition-colors hover:text-bone-50"
                >
                  Resume ↓
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-bone-100/10 pt-6">
          <span className="mono-label text-bone-100/35">
            © {year} {site.name}
          </span>
          <span className="mono-label text-bone-100/35">{site.locationShort} — {site.status}</span>
        </div>
      </div>
    </footer>
  );
}
