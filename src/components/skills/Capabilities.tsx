import SystemMap from "./SystemMap";

export default function Capabilities() {
  return (
    <section
      className="w-full bg-surface-dim py-24 px-6 md:px-10 border-b-[2.5px] border-warm-charcoal"
      id="capabilities"
    >
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Header with Floating Developer Sticker */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-bright-lime text-warm-charcoal font-mono text-xs font-bold uppercase border-[1.5px] border-warm-charcoal shadow-[2px_2px_0px_#292820] mb-4 rotate-[-1deg]">
              ★ 02 // TECHNICAL ECOSYSTEM
            </div>
            <h2 className="font-headline text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-warm-charcoal">
              Capabilities &amp; System Map
            </h2>
            <p className="font-body text-base md:text-lg text-warm-charcoal/80 mt-3 leading-relaxed">
              An interactive technical ecosystem: select any technology to see its verified production role, which projects it powers, and how it connects across domains.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-warm-charcoal/70 bg-card-cream px-3 py-1.5 rounded-xl border border-warm-charcoal shadow-[2px_2px_0px_#292820]">
              <span className="w-2 h-2 rounded-full bg-electric-blue"></span>
              <span>⚡ INTERACTIVE NODE INSPECTOR ACTIVE</span>
            </div>
          </div>

          {/* Floating Laptop Sticker Vignette */}
          <div className="flex flex-col items-center lg:items-end shrink-0">
            <div className="sticker-float-alt relative">
              <div className="group relative transition-transform duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer select-none">
                <img
                  src="/images/krishna-laptop-sticker.png"
                  alt="Krishna coding on laptop sticker"
                  className="w-48 sm:w-56 md:w-64 lg:w-72 h-auto object-contain sticker-shadow select-none pointer-events-none"
                  loading="lazy"
                  width={288}
                  height={243}
                />
                {/* Playful Floating Mini Badge */}
                <div className="absolute -bottom-2 -left-2 sm:-left-4 bg-bright-lime text-warm-charcoal font-mono text-[11px] font-bold px-3 py-1 rounded-full border-[1.5px] border-warm-charcoal shadow-[2px_2px_0px_#292820] rotate-[-3deg] group-hover:rotate-0 transition-transform">
                  💻 SHIPPING CODE
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Capability Map */}
        <SystemMap />
      </div>
    </section>
  );
}
