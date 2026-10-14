import SystemMap from "./SystemMap";

export default function Capabilities() {
  return (
    <section
      className="w-full bg-surface-dim py-24 px-6 md:px-10 border-b-[2.5px] border-warm-charcoal"
      id="capabilities"
    >
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-bright-lime text-warm-charcoal font-mono text-xs font-bold uppercase border-[1.5px] border-warm-charcoal shadow-[2px_2px_0px_#292820] mb-4 rotate-[-1deg]">
              ★ 02 // TECHNICAL ECOSYSTEM
            </div>
            <h2 className="font-headline text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-warm-charcoal">
              Capabilities &amp; System Map
            </h2>
            <p className="font-body text-base md:text-lg text-warm-charcoal/80 mt-3 leading-relaxed">
              An interactive technical ecosystem: select any technology to see its verified production role, which projects it powers, and how it connects across domains.
            </p>
          </div>

          <div className="font-mono text-xs text-warm-charcoal/70 bg-card-cream p-3 rounded-xl border border-warm-charcoal self-start md:self-auto shadow-[2px_2px_0px_#292820]">
            ⚡ INTERACTIVE NODE INSPECTOR
          </div>
        </div>

        {/* Interactive Capability Map */}
        <SystemMap />
      </div>
    </section>
  );
}
