/** Motion infrastructure — GSAP + Lenis, wired once, motion-safe by design. */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** True when the user prefers reduced motion. */
export const prefersReducedMotion = (): boolean =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** True on touch/coarse pointers — gates hover-only effects. */
export const isFinePointer = (): boolean =>
  window.matchMedia("(pointer: fine)").matches;

let lenis: Lenis | null = null;

/** Idempotently initialize Lenis smooth scrolling (skipped for reduced motion). */
export function initLenis(): Lenis | null {
  if (lenis || prefersReducedMotion()) return lenis;
  lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.4,
  });
  lenis.on("scroll", ScrollTrigger.update);
  const raf = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  document.documentElement.classList.add("lenis-active");
  return lenis;
}

export function getLenis(): Lenis | null {
  return lenis;
}

/** Scroll to a section id, respecting reduced motion. */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  if (prefersReducedMotion() || !lenis) {
    el.scrollIntoView({ behavior: "auto" });
    return;
  }
  lenis.scrollTo(el, { offset: -72, duration: 1.4 });
}

/** Shared easing/timing vocabulary for the whole site. */
export const MOTION = {
  easeOut: "power3.out",
  easeInOut: "power2.inOut",
  stagger: 0.07,
  fast: 0.4,
  base: 0.8,
  slow: 1.2,
} as const;
