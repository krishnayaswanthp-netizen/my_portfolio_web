/** SystemMap — capabilities as an interactive system, not a resume list.
 *  Click (or keyboard-select) a technology to see: what it was used for,
 *  which projects it appears in, and which technologies it connects to.
 *  Hovering highlights related nodes across domains.
 */

import { useMemo, useState } from "react";
import { domains, findNode, projectTitle, type TechNode } from "../../data/tech";
import { scrollToSection } from "../../lib/motion";

export default function SystemMap() {
  const [selected, setSelected] = useState<{ name: string; domainId: string } | null>(null);

  const detail = useMemo(() => (selected ? findNode(selected.name) : undefined), [selected]);

  const relatedNames = useMemo(() => {
    if (!detail) return new Set<string>();
    return new Set(detail.node.related);
  }, [detail]);

  const select = (domainId: string, node: TechNode) => {
    setSelected((prev) =>
      prev?.name === node.name ? null : { name: node.name, domainId },
    );
  };

  const isDimmed = (name: string) =>
    detail ? name !== detail.node.name && !relatedNames.has(name) : false;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      {/* Domain columns with tech nodes */}
      <div className="space-y-12 lg:col-span-8">
        {domains.map((domain) => (
          <div key={domain.id} className="border-t border-ink-900/15 pt-6">
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="display text-2xl text-ink-950 sm:text-3xl">
                <span className="mono-label mr-3 align-top text-rust-600">{domain.index}</span>
                {domain.label}
              </h3>
              <p className="max-w-sm text-pretty text-sm leading-relaxed text-ink-500">
                {domain.focus}
              </p>
            </div>

            <ul className="flex flex-wrap gap-2.5">
              {domain.nodes.map((node) => {
                const dim = isDimmed(node.name);
                const isSel = selected?.name === node.name;
                return (
                  <li key={node.name}>
                    <button
                      onClick={() => select(domain.id, node)}
                      aria-pressed={isSel}
                      className={`mono-label rounded-full border px-4 py-2.5 transition-all duration-300 ${
                        isSel
                          ? "border-rust-600 bg-rust-600 text-bone-50"
                          : dim
                            ? "border-ink-900/10 text-ink-400/50"
                            : "border-ink-900/25 text-ink-700 hover:border-ink-900 hover:bg-ink-900 hover:text-bone-50"
                      }`}
                      aria-label={`${node.name} — show where it was used`}
                    >
                      {node.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Detail panel — sticky on desktop */}
      <aside
        aria-live="polite"
        className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start"
      >
        <div className="rounded-[20px] border border-ink-900/15 bg-bone-50 p-6 shadow-[0_24px_60px_-32px_rgba(28,26,24,0.35)] sm:p-8">
          {detail && selected ? (
            <div key={detail.node.name}>
              <p className="mono-label mb-3 text-rust-600">{detail.domain.label}</p>
              <h3 className="display text-3xl text-ink-950">{detail.node.name}</h3>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-ink-600 sm:text-base">
                {detail.node.usedFor}
              </p>

              <div className="mt-6">
                <p className="mono-label mb-3 text-ink-400">In the archive</p>
                <ul className="flex flex-wrap gap-2">
                  {detail.node.projects.map((p) => (
                    <li key={p}>
                      <button
                        onClick={() => scrollToSection("work")}
                        className="mono-label rounded-full border border-ink-900/15 bg-bone-100 px-3 py-1.5 text-ink-600 transition-colors hover:border-rust-600 hover:text-rust-600"
                      >
                        {projectTitle(p)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {detail.node.related.length > 0 && (
                <div className="mt-6">
                  <p className="mono-label mb-3 text-ink-400">Connects to</p>
                  <ul className="flex flex-wrap gap-2">
                    {detail.node.related.map((r) => (
                      <li
                        key={r}
                        className="mono-label rounded-full bg-ink-900/[0.06] px-3 py-1.5 text-ink-500"
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div>
              <p className="mono-label mb-3 text-rust-600">The map</p>
              <h3 className="display text-3xl text-ink-950">
                Select a technology<span className="text-rust-600">.</span>
              </h3>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-ink-600 sm:text-base">
                Every technology here was used in a real system in the archive — no
                percentages, no ratings. Select any node to see where it was used, the
                projects it appears in, and what it connects to.
              </p>
              <p className="mono-label mt-6 text-ink-400">
                {domains.reduce((n, d) => n + d.nodes.length, 0)} technologies · 5 domains
              </p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
