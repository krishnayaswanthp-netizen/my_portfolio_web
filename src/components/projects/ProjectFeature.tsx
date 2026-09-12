/** ProjectFeature — one flagship project as a mini product experience.
 *  Alternating composition, oversized index numeral, editorial documentation,
 *  honest links (a real GitHub link or "Source — private" — nothing fabricated).
 */

import type { Flagship } from "../../data/projects";
import ArtifactMedia from "./ArtifactMedia";

interface Props {
  project: Flagship;
  flip: boolean;
}

export default function ProjectFeature({ project, flip }: Props) {
  return (
    <article
      id={`project-${project.id}`}
      aria-labelledby={`project-${project.id}-title`}
      className="relative border-t border-bone-100/10 py-16 sm:py-24"
    >
      {/* Oversized index numeral — a quiet, structural watermark, fully inside the article */}
      <span
        aria-hidden="true"
        className={`display pointer-events-none absolute top-0 select-none text-[clamp(4rem,11vw,10rem)] leading-none text-bone-100/[0.045] ${
          flip ? "right-0" : "left-0"
        }`}
      >
        {project.index}
      </span>

      <div className="relative">
        {/* Header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
          <div>
            <p className="mono-label mb-4 flex items-center gap-3 text-rust-400">
              {project.index}
              <span className="inline-block h-px w-10 bg-rust-400/50" aria-hidden="true" />
              {project.domain} — {project.year}
            </p>
            <h3
              id={`project-${project.id}-title`}
              className="display max-w-3xl text-balance text-4xl text-bone-50 sm:text-5xl lg:text-6xl"
            >
              {project.title}
            </h3>
          </div>
          <p className="font-serif text-lg italic text-bone-100/50 sm:text-xl">
            {project.tagline}
          </p>
        </div>

        {/* Body — media + documentation */}
        <div
          className={`grid items-start gap-10 lg:grid-cols-12 lg:gap-14 ${
            flip ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
          }`}
        >
          <div className="lg:col-span-7">
            <ArtifactMedia
              video={project.video}
              label={project.videoLabel}
              poster={project.poster}
              figures={project.figures}
            />
          </div>

          <div className="lg:col-span-5">
            <p className="text-pretty text-base leading-relaxed text-bone-100/70 sm:text-lg">
              {project.description}
            </p>

            <dl className="mt-8 space-y-6">
              {[
                ["Problem", project.problem],
                ["Approach", project.approach],
                ["Evidence", project.evidence],
              ].map(([label, value]) => (
                <div key={label} className="reveal-fade">
                  <dt className="mono-label mb-1.5 text-rust-400/80">{label}</dt>
                  <dd className="text-pretty text-sm leading-relaxed text-bone-100/60 sm:text-base">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            {project.metric && (
              <div className="reveal-fade mt-8 rounded-2xl border border-bone-100/10 bg-bone-100/[0.03] p-5">
                <p className="display text-4xl text-bone-50 sm:text-5xl">
                  {project.metric.value}
                </p>
                <p className="mono-label mt-2 text-bone-100/50">{project.metric.label}</p>
              </div>
            )}

            <div className="reveal-fade mt-8 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="mono-label rounded-full border border-bone-100/15 px-3.5 py-1.5 text-bone-100/60 transition-colors hover:border-rust-400/60 hover:text-rust-400"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="reveal-fade mt-8">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw mono-label inline-flex items-center gap-2 text-bone-100 transition-colors hover:text-rust-400"
                >
                  Source <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <span className="mono-label text-bone-100/35">Source — private</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
