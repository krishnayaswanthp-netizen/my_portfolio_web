import { useState } from "react";
import { site } from "../../data/site";
import Icon from "../common/Icon";

const HERO_TILTS = [-4, -2, -1, 0, 1.5, 3, 5];

export default function Hero() {
  const [polaroidTransform, setPolaroidTransform] = useState("rotate(-1deg) scale(1)");
  const [badge1Style, setBadge1Style] = useState({ transform: "rotate(-7deg)" });
  const [badge2Style, setBadge2Style] = useState({ transform: "rotate(8deg)" });
  const [badge3Style, setBadge3Style] = useState({ transform: "rotate(4deg)" });

  const handleShuffle = () => {
    const randTilt = HERO_TILTS[Math.floor(Math.random() * HERO_TILTS.length)];
    setPolaroidTransform(`rotate(${randTilt}deg) scale(0.98)`);
    setTimeout(() => {
      setPolaroidTransform(`rotate(${randTilt}deg) scale(1)`);
    }, 150);

    const calcTransform = () => {
      const tilt = (Math.random() * 16 - 8).toFixed(1);
      const xOff = (Math.random() * 12 - 6).toFixed(1);
      const yOff = (Math.random() * 12 - 6).toFixed(1);
      return `translate(${xOff}px, ${yOff}px) rotate(${tilt}deg)`;
    };

    setBadge1Style({ transform: calcTransform() });
    setBadge2Style({ transform: calcTransform() });
    setBadge3Style({ transform: calcTransform() });
  };

  return (
    <section className="relative w-full pt-12 pb-20 md:py-24 bg-vanilla-cream overflow-hidden">
      {/* Playful Tactile Curved Graphic Bands (Tangerine, Lime, Electric Blue, Coral Pink) */}
      <div className="absolute -left-16 md:-left-8 top-6 pointer-events-none z-0 opacity-80 rotate-[-12deg] flex flex-col space-y-2">
        <div className="w-40 md:w-64 h-5 bg-tangerine rounded-full shadow-[2px_2px_0px_#292820]"></div>
        <div className="w-48 md:w-72 h-5 bg-bright-lime rounded-full shadow-[2px_2px_0px_#292820]"></div>
        <div className="w-44 md:w-68 h-5 bg-coral-pink rounded-full shadow-[2px_2px_0px_#292820]"></div>
        <div className="w-36 md:w-60 h-5 bg-electric-blue rounded-full shadow-[2px_2px_0px_#292820]"></div>
      </div>
      <div className="absolute -right-16 md:-right-8 top-12 pointer-events-none z-0 opacity-80 rotate-[14deg] flex flex-col space-y-2 items-end">
        <div className="w-44 md:w-72 h-5 bg-coral-pink rounded-full shadow-[2px_2px_0px_#292820]"></div>
        <div className="w-40 md:w-64 h-5 bg-bright-lime rounded-full shadow-[2px_2px_0px_#292820]"></div>
        <div className="w-48 md:w-80 h-5 bg-tangerine rounded-full shadow-[2px_2px_0px_#292820]"></div>
        <div className="w-32 md:w-56 h-5 bg-electric-blue rounded-full shadow-[2px_2px_0px_#292820]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 flex flex-col items-center text-center">
        {/* Role & Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card-cream border-[2px] border-warm-charcoal shadow-[3px_3px_0px_#292820] mb-8 transform -rotate-1 hover:rotate-0 transition-transform">
          <span className="w-2.5 h-2.5 rounded-full bg-bright-lime animate-pulse border border-warm-charcoal"></span>
          <span className="font-mono text-xs text-warm-charcoal uppercase tracking-wider font-semibold">
            Software Engineer // Systems • AI • Full-Stack
          </span>
        </div>

        {/* Main Expressive Headline */}
        <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-extrabold max-w-4xl tracking-tight leading-[1.15] text-warm-charcoal mb-6">
          I'm Krishna Yaswanth. I build backend systems, AI engines, and complete web applications.
        </h1>
        <p className="font-body text-base md:text-lg text-warm-charcoal/80 max-w-2xl mb-8 leading-relaxed">
          {site.bio}
        </p>

        {/* Interactive Actions Pill Group */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <a
            className="inline-flex items-center gap-2 bg-electric-blue hover:bg-warm-charcoal text-white font-headline text-sm md:text-base font-bold uppercase px-8 py-3.5 rounded-full border-[2.5px] border-warm-charcoal shadow-[5px_5px_0px_#292820] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            href="#work"
          >
            <span>Explore My Work</span>
            <Icon name="arrow_downward" size={18} />
          </a>
          <a
            className="inline-flex items-center gap-2 bg-bright-lime hover:bg-card-cream text-warm-charcoal font-headline text-sm md:text-base font-bold uppercase px-8 py-3.5 rounded-full border-[2.5px] border-warm-charcoal shadow-[5px_5px_0px_#292820] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            href="#contact"
          >
            <span>Get in Touch</span>
            <Icon name="mail" size={18} />
          </a>
        </div>

        {/* Tactile Sticker Presentation with Interactive Floating Badges */}
        <div className="relative w-full max-w-sm mx-auto mt-2 mb-4">
          {/* Floating Badge 1 */}
          <div
            id="hero-badge-1"
            style={badge1Style}
            className="absolute -top-4 -left-6 md:-left-12 z-20 bg-bright-lime text-warm-charcoal font-mono text-xs font-bold px-3.5 py-1.5 rounded-full border-[2px] border-warm-charcoal shadow-[3px_3px_0px_#292820] transition-all duration-300 pointer-events-none select-none"
          >
            ⚡ BACKEND &amp; AI
          </div>

          {/* Floating Badge 2 */}
          <div
            id="hero-badge-2"
            style={badge2Style}
            className="absolute top-1/3 -right-6 md:-right-10 z-20 bg-tangerine text-warm-charcoal font-mono text-xs font-bold px-3.5 py-1.5 rounded-full border-[2px] border-warm-charcoal shadow-[3px_3px_0px_#292820] transition-all duration-300 pointer-events-none select-none"
          >
            🛠️ FULL-STACK DEV
          </div>

          {/* Floating Badge 3 */}
          <div
            id="hero-badge-3"
            style={badge3Style}
            className="absolute -bottom-2 -left-4 md:-left-8 z-20 bg-card-cream text-warm-charcoal font-mono text-xs font-bold px-3.5 py-1.5 rounded-full border-[2px] border-warm-charcoal shadow-[3px_3px_0px_#292820] transition-all duration-300 pointer-events-none select-none"
          >
            📍 HYDERABAD / GLOBAL
          </div>

          {/* Floating Die-Cut Sticker Container */}
          <div className="sticker-float relative z-10">
            <div
              id="hero-sticker-frame"
              style={{ transform: polaroidTransform }}
              className="relative transition-transform duration-300 flex flex-col items-center group cursor-pointer"
              onClick={handleShuffle}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleShuffle();
                }
              }}
              aria-label="Click to tilt sticker and randomize badges"
            >
              <div className="relative transform group-hover:scale-105 group-hover:-translate-y-1 transition-transform duration-300">
                <img
                  alt="Krishna Yaswanth Panchagnula portrait sticker"
                  className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] h-auto object-contain sticker-shadow-lg select-none pointer-events-none"
                  src="/images/krishna-hero-sticker.png"
                  loading="eager"
                  width={340}
                  height={453}
                />
                <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-warm-charcoal text-white px-3 py-1 rounded-full text-xs font-mono border-[1.5px] border-warm-charcoal shadow-[2px_2px_0px_#292820]">
                  <span className="w-2 h-2 rounded-full bg-bright-lime animate-ping"></span>
                  <span>ONLINE // BUILDING</span>
                </div>
              </div>
            </div>
          </div>

          {/* Authentic Tactile Shuffle Trigger Button */}
          <div className="mt-8 flex justify-center">
            <button
              id="hero-shuffle-btn"
              type="button"
              onClick={handleShuffle}
              className="group inline-flex items-center gap-2 bg-card-cream hover:bg-bright-lime text-warm-charcoal font-headline text-xs font-bold uppercase px-6 py-2.5 rounded-full border-[2px] border-warm-charcoal shadow-[4px_4px_0px_#292820] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#292820] transition-all cursor-pointer"
            >
              <Icon
                name="sync"
                size={18}
                className="group-hover:rotate-180 transition-transform duration-500"
              />
              <span>Tilt Sticker &amp; Badges</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
