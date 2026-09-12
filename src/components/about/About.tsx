/** About — the human section. Portrait, statement, warmth. All facts real. */

import { useRef } from "react";
import { site } from "../../data/site";
import { scrollToSection } from "../../lib/motion";
import { useReveal } from "../../lib/hooks";

export default function About() {
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);

  return (
    <section
      ref={rootRef}
      id="about"
      className="relative bg-bone-100"
      aria-labelledby="about-title"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <header className="mb-14 sm:mb-20">
          <p className="reveal-fade mono-label mb-6 flex items-center gap-3 text-rust-600">
            03 — About
            <span className="inline-block h-px w-16 bg-rust-600/40" aria-hidden="true" />
          </p>
          <h2 id="about-title" className="display max-w-4xl text-5xl text-ink-950 sm:text-7xl">
            <span className="reveal-line">
              <span>The person behind</span>
            </span>
            <span className="reveal-line pl-[6vw]">
              <span>
                the systems<span className="text-rust-600">.</span>
              </span>
            </span>
          </h2>
        </header>

        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Portrait — an editorial plate, not a headshot box */}
          <figure className="lg:col-span-5">
            <div className="reveal-clip relative overflow-hidden rounded-[20px]">
              <img
                src="/media/portrait.png"
                alt="Portrait of Panchagnula Krishna Yaswanth"
                width={720}
                height={960}
                loading="lazy"
                decoding="async"
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
            <figcaption className="mono-label mt-4 flex justify-between text-ink-400">
              <span>Krishna Yaswanth</span>
              <span>Hyderabad, 2026</span>
            </figcaption>
          </figure>

          {/* Statement + bio */}
          <div className="lg:col-span-7">
            <p className="display text-balance text-3xl leading-snug text-ink-950 sm:text-4xl">
              I'm Krishna Yaswanth Panchagnula — a Computer Science undergraduate who
              builds{" "}
              <em className="italic text-rust-600">real-world applications</em>: from a
              Java bank management system to Python fraud-detection systems, agentic AI
              products, and the interface engineering you're reading now.
            </p>

            <div className="reveal-fade mt-8 max-w-xl space-y-5 text-pretty text-base leading-relaxed text-ink-600 sm:text-lg">
              <p>
                The work runs full-stack, but the through-line is backend and system
                thinking: services that stay testable, data that stays clean, and
                interfaces that document what the system actually does. AI and
                data-oriented projects — retrieval pipelines, extraction engines, agentic
                workflows — sit at the center.
              </p>
              <p>
                Everything here was built to work, not to demo. The four flagship systems
                in{" "}
                <button
                  onClick={() => scrollToSection("work")}
                  className="link-draw font-medium text-ink-950"
                >
                  01 / Work
                </button>{" "}
                carry their own records: what was built, how, and the evidence that it
                exists.
              </p>
            </div>

            {/* Meta band */}
            <dl className="reveal-fade mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink-900/15 pt-8 sm:grid-cols-4">
              {[
                ["Location", "Hyderabad, Telangana, IN"],
                ["Education", "CS undergraduate"],
                ["Experience", "2+ years building"],
                ["Status", site.status],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="mono-label mb-1.5 text-ink-400">{label}</dt>
                  <dd className="text-sm font-medium text-ink-800">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
