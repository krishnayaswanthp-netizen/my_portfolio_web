import { articles } from "../../data/writing";
import Icon from "../common/Icon";

export default function Writing() {
  const badgeMap: Record<string, { bg: string; text: string; type: string }> = {
    Medium: { bg: "bg-electric-blue", text: "text-white", type: "TECH GUIDE" },
    LinkedIn: { bg: "bg-bright-lime", text: "text-warm-charcoal", type: "ESSAY" },
  };

  return (
    <section
      className="w-full bg-surface-dim py-24 px-6 md:px-10 border-b-[2.5px] border-warm-charcoal"
      id="writing"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-mono text-xs font-bold uppercase bg-card-cream px-3 py-1 rounded-full border border-warm-charcoal mb-3 shadow-[2px_2px_0px_#292820]">
            Published Insights
          </span>
          <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-warm-charcoal uppercase tracking-tight">
            Writing &amp; Technical Notes
          </h2>
          <p className="font-body text-base text-warm-charcoal/80 max-w-xl mt-3 leading-relaxed">
            Notes and breakdowns on retrieval-augmented generation, AI developer tools, and cloud infrastructure failures.
          </p>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {articles.map((article, idx) => {
            const isLast = idx === articles.length - 1;
            const badge = isLast
              ? { bg: "bg-tangerine", text: "text-warm-charcoal", type: "POST-MORTEM" }
              : badgeMap[article.publication] || {
                  bg: "bg-card-cream",
                  text: "text-warm-charcoal",
                  type: "ARTICLE",
                };

            return (
              <a
                key={article.title}
                className="group bg-card-cream p-6 rounded-2xl border-[2.5px] border-warm-charcoal shadow-[5px_5px_0px_#292820] flex flex-col justify-between hover:-translate-y-1 transition-transform cursor-pointer"
                href={article.url}
                rel="noreferrer"
                target="_blank"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 font-mono text-xs">
                    <span
                      className={`${badge.bg} ${badge.text} px-2.5 py-0.5 rounded border border-warm-charcoal font-semibold uppercase`}
                    >
                      {article.publication}
                    </span>
                    <span className="text-warm-charcoal/60 uppercase">{badge.type}</span>
                  </div>
                  <h3 className="font-headline text-lg font-bold text-warm-charcoal group-hover:text-electric-blue transition-colors mb-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="font-body text-xs text-warm-charcoal/75 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-warm-charcoal/15 flex items-center justify-between font-mono text-xs text-warm-charcoal font-bold">
                  <span>Read Full Piece</span>
                  <Icon
                    name="arrow_outward"
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
