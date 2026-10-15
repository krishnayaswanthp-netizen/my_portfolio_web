import { site } from "../../data/site";
import Icon from "../common/Icon";

export default function About() {
  return (
    <section
      className="w-full bg-vanilla-cream py-24 px-6 md:px-10 border-b-[2.5px] border-warm-charcoal"
      id="about"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Polaroid Portrait */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-sm bg-card-cream p-4 pb-6 rounded-2xl border-[2.5px] border-warm-charcoal shadow-[8px_8px_0px_#292820] rotate-[-2deg] transition-transform hover:rotate-0 duration-300">
            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-surface-dim border-[1.5px] border-warm-charcoal">
              <img
                alt="Krishna Yaswanth Panchagnula portrait"
                className="w-full h-full object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-500"
                src="/media/portrait.png"
                loading="lazy"
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <h4 className="font-headline font-bold text-sm uppercase">Krishna Yaswanth</h4>
                <p className="font-mono text-xs text-warm-charcoal/70">Software Engineer</p>
              </div>
              <span className="font-mono text-xs bg-bright-lime px-2 py-0.5 rounded border border-warm-charcoal font-semibold">
                2026
              </span>
            </div>
          </div>
        </div>

        {/* Right Personal Ethos */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <div className="inline-block bg-bright-lime text-warm-charcoal font-mono text-xs uppercase px-3 py-1 rounded-full border-[1.5px] border-warm-charcoal font-bold mb-3 shadow-[2px_2px_0px_#292820]">
            Personal Engineering Ethos
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-warm-charcoal uppercase tracking-tight mb-6">
            Engineering with curiosity beneath the surface.
          </h2>
          <p className="font-body text-base text-warm-charcoal/80 leading-relaxed mb-4">
            I'm interested in what happens beneath the interface: how systems connect, how data moves, and how software becomes genuinely useful. My core focus centers on scalable backend services, retrieval-augmented generation (RAG), and reliable data pipelines.
          </p>
          <p className="font-body text-base text-warm-charcoal/80 leading-relaxed mb-6">
            Outside of system design and software development, I enjoy exploring tech culture, listening to music, reading, and watching films.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mb-8 font-mono text-xs">
            <div className="p-3 bg-card-cream rounded-xl border-[1.5px] border-warm-charcoal shadow-[2px_2px_0px_#292820]">
              <span className="block font-bold text-electric-blue">LOCATION</span>
              <span className="text-warm-charcoal/80">{site.location}</span>
            </div>
            <div className="p-3 bg-card-cream rounded-xl border-[1.5px] border-warm-charcoal shadow-[2px_2px_0px_#292820]">
              <span className="block font-bold text-warm-charcoal">FOCUS</span>
              <span className="text-warm-charcoal/80">Backend, AI, RAG</span>
            </div>
            <div className="p-3 bg-card-cream rounded-xl border-[1.5px] border-warm-charcoal shadow-[2px_2px_0px_#292820]">
              <span className="block font-bold text-tangerine">STATUS</span>
              <span className="text-warm-charcoal/80">Open to Opportunities</span>
            </div>
          </div>

          <a
            className="inline-flex items-center gap-2 bg-warm-charcoal text-white font-headline text-sm font-bold uppercase px-6 py-3 rounded-full border-[2px] border-warm-charcoal shadow-[4px_4px_0px_#B9F264] hover:bg-electric-blue transition-colors cursor-pointer"
            href={`mailto:${site.email}`}
          >
            <span>Send Me an Email</span>
            <Icon name="arrow_forward" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
