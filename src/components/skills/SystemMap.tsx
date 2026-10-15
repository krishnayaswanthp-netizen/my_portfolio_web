import { useMemo, useState } from "react";
import { domains, findNode, projectTitle, type TechNode } from "../../data/tech";

export default function SystemMap() {
  const [selected, setSelected] = useState<{ name: string; domainId: string } | null>({
    name: "LangChain",
    domainId: "ai",
  });

  const detail = useMemo(
    () => (selected ? findNode(selected.name) : undefined),
    [selected],
  );

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
    <div className="grid gap-10 lg:grid-cols-12 items-start">
      {/* Domains list */}
      <div className="space-y-8 lg:col-span-8">
        {domains.map((domain) => (
          <div
            key={domain.id}
            className="p-6 bg-card-cream rounded-2xl border-[2px] border-warm-charcoal shadow-[4px_4px_0px_#292820]"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
              <h3 className="font-headline font-bold text-xl uppercase text-warm-charcoal flex items-center gap-2">
                <span className="font-mono text-xs font-bold bg-bright-lime text-warm-charcoal px-2.5 py-0.5 rounded border border-warm-charcoal">
                  {domain.index}
                </span>
                <span>{domain.label}</span>
              </h3>
              <p className="font-body text-xs text-warm-charcoal/75 max-w-sm">
                {domain.focus}
              </p>
            </div>

            <ul role="list" className="flex flex-wrap gap-2">
              {domain.nodes.map((node) => {
                const dim = isDimmed(node.name);
                const isSel = selected?.name === node.name;
                const isRelated = detail && relatedNames.has(node.name);

                return (
                  <li key={node.name}>
                    <button
                      type="button"
                      onClick={() => select(domain.id, node)}
                      aria-pressed={isSel}
                      className={`font-mono text-xs font-semibold px-3 py-1.5 rounded-full border-[1.5px] transition-all cursor-pointer ${
                        isSel
                          ? "bg-electric-blue text-white border-warm-charcoal shadow-[2px_2px_0px_#292820] -translate-y-0.5"
                          : isRelated
                            ? "bg-bright-lime text-warm-charcoal border-warm-charcoal shadow-[2px_2px_0px_#292820]"
                            : dim
                              ? "bg-surface-dim/40 text-warm-charcoal/35 border-warm-charcoal/20"
                              : "bg-surface-dim text-warm-charcoal border-warm-charcoal hover:bg-bright-lime"
                      }`}
                      aria-label={`${node.name}: view details`}
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
        className="lg:col-span-4 lg:sticky lg:top-28 p-6 bg-card-cream rounded-2xl border-[2.5px] border-warm-charcoal shadow-[6px_6px_0px_#292820]"
      >
        {detail && selected ? (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[11px] font-bold bg-tangerine text-warm-charcoal px-2.5 py-0.5 rounded border border-warm-charcoal uppercase">
                {detail.domain.label}
              </span>
              <span className="font-mono text-xs text-warm-charcoal/60">SYSTEM NODE</span>
            </div>

            <h4 className="font-headline font-extrabold text-2xl uppercase text-warm-charcoal mt-2 mb-3">
              {detail.node.name}
            </h4>

            <div className="mb-5">
              <span className="font-mono text-xs font-bold text-warm-charcoal/60 uppercase block mb-1">
                Engineering Application
              </span>
              <p className="font-body text-sm text-warm-charcoal/85 leading-relaxed bg-vanilla-cream p-3 rounded-xl border border-warm-charcoal/25">
                {detail.node.usedFor}
              </p>
            </div>

            {/* Projects where it appears */}
            {detail.node.projects && detail.node.projects.length > 0 && (
              <div className="mb-5">
                <span className="font-mono text-xs font-bold text-warm-charcoal/60 uppercase block mb-1.5">
                  Appears in Production Works
                </span>
                <div className="flex flex-col gap-1.5">
                  {detail.node.projects.map((projId) => (
                    <a
                      key={projId}
                      href="#work"
                      className="font-mono text-xs font-bold text-electric-blue hover:text-warm-charcoal flex items-center justify-between bg-surface-dim px-3 py-1.5 rounded border border-warm-charcoal/20 transition-colors"
                    >
                      <span>{projectTitle(projId)}</span>
                      <span>↓</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Related connected technologies */}
            {detail.node.related && detail.node.related.length > 0 && (
              <div>
                <span className="font-mono text-xs font-bold text-warm-charcoal/60 uppercase block mb-1.5">
                  Connected Architecture Nodes
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {detail.node.related.map((rel) => (
                    <button
                      key={rel}
                      type="button"
                      onClick={() => {
                        const target = findNode(rel);
                        if (target) setSelected({ name: rel, domainId: target.domain.id });
                      }}
                      className="font-mono text-[11px] bg-bright-lime/70 text-warm-charcoal px-2 py-0.5 rounded border border-warm-charcoal hover:bg-bright-lime transition-colors cursor-pointer"
                    >
                      {rel} ↗
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-10 font-mono text-xs text-warm-charcoal/60">
            Click any technology node to inspect its architectural connections.
          </div>
        )}
      </aside>
    </div>
  );
}
