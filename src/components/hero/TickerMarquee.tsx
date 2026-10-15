/** Archive ticker — a quiet, repeating band under the cover.

 *  Kept because it can establish rhythm and a first read of the archive's
 *  voice. The content is real and restrained — archive entries, not a tech
 *  keyword carousel.
 */

export default function TickerMarquee() {
  const items = [
    "Krishna Yaswanth: Portfolio Archive",
    "Backend systems",
    "AI & RAG engines",
    "Full-stack applications",
    "Evidence, not promises",
    "Works · Approach · Capabilities",
    "About · Writing · Milestones",
    "Contact: Open for engineering opportunities",
  ];

  return (
    <div
      className="relative w-full overflow-hidden bg-warm-charcoal border-y-[2.5px] border-warm-charcoal py-3 select-none"
      aria-hidden="true"
    >
      <div className="flex animate-[marquee_36s_linear_infinite] items-center whitespace-nowrap gap-10">
        {items.map((item, index) => (
          <span key={index} className="font-mono text-xs uppercase font-bold tracking-wider text-bright-lime flex items-center gap-4">
            <span>{item}</span>
            <span className="text-white/40">★</span>
          </span>
        ))}
        {items.map((item, index) => (
          <span key={`b-${index}`} className="font-mono text-xs uppercase font-bold tracking-wider text-bright-lime flex items-center gap-4">
            <span>{item}</span>
            <span className="text-white/40">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}
