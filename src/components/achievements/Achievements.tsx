import Icon from "../common/Icon";

export default function Achievements() {
  return (
    <section
      className="w-full bg-vanilla-cream py-20 px-6 md:px-10 border-b-[2.5px] border-warm-charcoal"
      id="achievements"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="inline-block bg-bright-lime text-warm-charcoal font-headline text-xl md:text-2xl font-extrabold uppercase px-6 py-2 rounded-xl border-[2px] border-warm-charcoal shadow-[3px_3px_0px_#292820] rotate-[-1deg] mb-12">
          Verified Milestones &amp; Placements
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Achievement 1: Sankalp Stegx */}
          <div className="bg-card-cream p-6 rounded-2xl border-[2.5px] border-warm-charcoal shadow-[6px_6px_0px_#292820] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs bg-tangerine text-warm-charcoal px-3 py-1 rounded-full font-bold border border-warm-charcoal">
                  RUNNER-UP PLACEMENT
                </span>
                <Icon name="military_tech" size={24} className="text-electric-blue" />
              </div>
              <h3 className="font-headline text-xl font-bold uppercase mb-2">
                Sankalp Hackathon // Stegx
              </h3>
              <p className="font-body text-sm text-warm-charcoal/80 leading-relaxed">
                Awarded runner-up honors for building <strong>Stegx</strong>, an advanced cybersecurity steganography and defense utility focused on encrypted metadata detection and evasion.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-warm-charcoal/15 font-mono text-xs text-warm-charcoal/70 flex items-center justify-between">
              <span>CATEGORY: CYBERSECURITY &amp; DEFENSE</span>
              <span className="w-2 h-2 rounded-full bg-coral-pink"></span>
            </div>
          </div>

          {/* Achievement 2: WiseIn Hackathon */}
          <div className="bg-card-cream p-6 rounded-2xl border-[2.5px] border-warm-charcoal shadow-[6px_6px_0px_#292820] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs bg-bright-lime text-warm-charcoal px-3 py-1 rounded-full font-bold border border-warm-charcoal">
                  RUNNER-UP PLACEMENT
                </span>
                <Icon name="award_star" size={24} className="text-electric-blue" />
              </div>
              <h3 className="font-headline text-xl font-bold uppercase mb-2">
                WiseIn UI/UX Hackathon
              </h3>
              <p className="font-body text-sm text-warm-charcoal/80 leading-relaxed">
                Secured runner-up standing by designing and prototyping an accessible, high-retention interface focused on frictionless workflow navigation and system feedback.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-warm-charcoal/15 font-mono text-xs text-warm-charcoal/70 flex items-center justify-between">
              <span>CATEGORY: DESIGN SYSTEMS &amp; CRAFT</span>
              <span className="w-2 h-2 rounded-full bg-coral-pink"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
