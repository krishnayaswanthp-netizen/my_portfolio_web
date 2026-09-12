/** Work — the dark cinematic sheet where the flagship systems live.
 *  The bone site dims into an ink environment; projects become the centerpiece.
 */

import { useRef } from "react";
import { flagships } from "../../data/projects";
import { useReveal } from "../../lib/hooks";
import ProjectFeature from "./ProjectFeature";
import SecondaryIndex from "./SecondaryIndex";

export default function Projects() {
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);

  return (
    <section
      ref={rootRef}
      id="work"
      className="relative bg-ink-950 text-bone-100"
      aria-labelledby="work-title"
    >
      {/* Deep-space vignette for depth without decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(198,107,76,0.07),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        {/* Section intro */}
        <header className="projects-intro mb-16 sm:mb-24">
          <p className="reveal-fade mono-label mb-6 flex items-center gap-3 text-rust-400">
            01 — Selected Systems
            <span className="inline-block h-px w-16 bg-rust-400/40" aria-hidden="true" />
          </p>
          <h2 id="work-title" className="display max-w-4xl text-5xl text-bone-50 sm:text-7xl">
            <span className="reveal-line">
              <span>Systems built</span>
            </span>
            <span className="reveal-line pl-[6vw]">
              <span>
                end to end<span className="text-rust-600">.</span>
              </span>
            </span>
          </h2>
          <p className="reveal-fade mt-8 max-w-xl text-pretty text-lg leading-relaxed text-bone-100/60">
            Screening engines, data pipelines, retrieval stacks, and the interfaces that
            document them. Four are catalogued in full — the complete index follows.
          </p>
        </header>

        {/* Flagship features */}
        <div className="projects-intro">
          {flagships.map((project, i) => (
            <ProjectFeature key={project.id} project={project} flip={i % 2 === 1} />
          ))}
        </div>

        <SecondaryIndex />
      </div>
    </section>
  );
}
