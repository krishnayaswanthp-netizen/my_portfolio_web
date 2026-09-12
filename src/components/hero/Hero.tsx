/** Hero — the opening statement.
 *  Oversized editorial name over the SignalField. WHO → WHAT → proof → index.
 *  Entrance choreography: lines rise from masks, meta fades in waves.
 */

import { useLayoutEffect, useRef } from "react";
import SignalField from "../effects/SignalField";
import { site, nav } from "../../data/site";
import { gsap, MOTION, prefersReducedMotion, scrollToSection } from "../../lib/motion";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  // Entrance enhancement: content is visible by default (CSS transform: none);
  // fromTo applies the masked start state pre-paint and animates to rest.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.fromTo(
        ".hero-line > span",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.25,
          ease: MOTION.easeOut,
          stagger: 0.12,
        },
      )
        .fromTo(
          ".hero-fade",
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: MOTION.easeOut,
            stagger: 0.09,
          },
          "-=0.7",
        )
        .fromTo(
          ".hero-rule",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.1, ease: MOTION.easeInOut, transformOrigin: "left" },
          "-=0.6",
        );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const go = (id: string) => scrollToSection(id);

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      aria-label="Introduction"
    >
      <SignalField />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-5 pb-24 pt-28 sm:px-8 lg:px-12">
        {/* Meta row */}
        <div className="hero-fade mb-8 flex items-center justify-between sm:mb-12">
          <p className="mono-label text-ink-500">Portfolio — Vol. II</p>
          <p className="mono-label hidden items-center gap-2 text-ink-500 sm:flex">
            <span className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-moss-600" />
            {site.status}
          </p>
        </div>

        {/* Name — the composition's voice */}
        <h1 className="display text-[clamp(3.4rem,13vw,12.5rem)] text-ink-950">
          <span className="reveal-line hero-line">
            <span>Krishna</span>
          </span>
          <span className="reveal-line hero-line pl-[8vw] sm:pl-[10vw]">
            <span>
              Yaswanth<span className="text-rust-600">.</span>
            </span>
          </span>
        </h1>

        <hr className="hero-rule my-8 border-ink-900/20 sm:my-10" />

        {/* WHAT — the positioning */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="hero-fade max-w-xl text-balance text-xl leading-relaxed text-ink-700 sm:text-2xl">
            Software engineer building systems across{" "}
            <em className="font-serif italic text-rust-600">agentic AI</em>,{" "}
            <em className="font-serif italic text-rust-600">backends</em>, and{" "}
            <em className="font-serif italic text-rust-600">interfaces</em> — designed
            to work, not to demo.
          </p>

          <div className="hero-fade flex flex-col gap-3">
            <p className="mono-label text-ink-500">{site.location}</p>
            <p className="mono-label text-ink-500">04 featured systems · 08 indexed</p>
          </div>
        </div>
      </div>

      {/* Bottom index — the way in */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-8 sm:px-8 lg:px-12">
        <div className="hero-fade flex items-center justify-between border-t border-ink-900/15 pt-5">
          <div className="flex gap-5 sm:gap-8">
            {nav.slice(0, 4).map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className="link-draw mono-label text-ink-500 transition-colors hover:text-ink-950"
              >
                <span className="mr-1.5 text-rust-600">{item.index}</span>
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => go("work")}
            aria-label="Scroll to work"
            className="mono-label text-ink-500 transition-colors hover:text-ink-950"
          >
            ↓
          </button>
        </div>
      </div>
    </section>
  );
}
