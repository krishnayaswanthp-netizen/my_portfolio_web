/** Contact — the natural conclusion. Email first, channels second, form third. */

import { useRef } from "react";
import { site } from "../../data/site";
import { useReveal } from "../../lib/hooks";
import ContactForm from "./ContactForm";

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);

  const channels = [
    { label: "GitHub", meta: site.githubHandle, href: site.github, external: true },
    { label: "LinkedIn", meta: site.linkedinLabel, href: site.linkedin, external: true },
    { label: "Resume", meta: "my_resume.pdf — PDF", href: site.resume, external: false },
  ];

  return (
    <section
      ref={rootRef}
      id="contact"
      className="relative bg-ink-950 text-bone-100"
      aria-labelledby="contact-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_100%,rgba(198,107,76,0.08),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <p className="reveal-fade mono-label mb-6 flex items-center gap-3 text-rust-400">
          05 — Contact
          <span className="inline-block h-px w-16 bg-rust-400/40" aria-hidden="true" />
        </p>

        <h2 id="contact-title" className="display max-w-5xl text-5xl text-bone-50 sm:text-7xl">
          <span className="reveal-line">
            <span>Building something,</span>
          </span>
          <span className="reveal-line pl-[6vw]">
            <span>fixing something,</span>
          </span>
          <span className="reveal-line">
            <span>
              or just looking<span className="text-rust-600">?</span>
            </span>
          </span>
        </h2>

        <p className="reveal-fade mt-8 max-w-xl text-pretty text-lg leading-relaxed text-bone-100/60">
          If the work sounds useful, write directly. Email is the primary channel —
          replies land there.
        </p>

        {/* The email — the hero of this section */}
        <div className="reveal-fade mt-12 border-y border-bone-100/12 py-10 sm:mt-16 sm:py-14">
          <p className="mono-label mb-4 text-bone-100/40">Email</p>
          <a
            href={`mailto:${site.email}`}
            className="link-draw break-all font-serif text-3xl text-bone-50 transition-colors hover:text-rust-400 sm:text-5xl lg:text-6xl"
          >
            {site.email}
          </a>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Channels */}
          <div className="reveal-fade lg:col-span-7">
            <ul className="space-y-1">
              {channels.map((ch, i) => (
                <li key={ch.label}>
                  <a
                    href={ch.href}
                    target={ch.external ? "_blank" : undefined}
                    rel={ch.external ? "noopener noreferrer" : undefined}
                    {...(ch.external ? {} : { download: true })}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t border-bone-100/10 py-5 transition-colors last:border-b hover:bg-bone-100/[0.03]"
                    aria-label={`${ch.label} — ${ch.meta}${ch.external ? "" : " (download)"}`}
                  >
                    <span className="mono-label w-10 text-bone-100/35">
                      {String(i + 1).padStart(3, "0")}
                    </span>
                    <span>
                      <span className="display block text-xl text-bone-50 transition-transform duration-300 group-hover:translate-x-1.5 sm:text-2xl">
                        {ch.label}
                      </span>
                      <span className="mono-label mt-1 block text-bone-100/40">{ch.meta}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-bone-100/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-rust-400"
                    >
                      {ch.external ? "↗" : "↓"}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="reveal-fade lg:col-span-5">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
