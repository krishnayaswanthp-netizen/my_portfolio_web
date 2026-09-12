/** Shared hooks for reveal choreography and media behavior. */

import { useEffect, useRef, useState } from "react";
import { gsap, MOTION, prefersReducedMotion } from "./motion";

/** Per-element reveal choreography for a section.
 *  Every `.reveal-line > span` and `.reveal-fade` inside the section gets its
 *  own ScrollTrigger, so elements animate as they individually enter the
 *  viewport. `.reveal-clip` elements get an `is-inview` class when they enter;
 *  the CSS transition (declared in index.css) completes the clip reveal.
 */
export function useReveal<T extends HTMLElement>(sectionRef: React.RefObject<T | null>) {
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      Array.from(root.querySelectorAll<HTMLElement>(".reveal-line > span")).forEach((el) => {
        gsap.to(el, {
          y: 0,
          duration: 1.1,
          ease: MOTION.easeOut,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      Array.from(root.querySelectorAll<HTMLElement>(".reveal-fade")).forEach((el) => {
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: MOTION.easeOut,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    }, root);

    // Clip reveals — class-timed via IntersectionObserver (outside GSAP context,
    // so cleanup removes the observers directly).
    const clipEls = Array.from(root.querySelectorAll<HTMLElement>(".reveal-clip"));
    const clipIo = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            clipIo.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    clipEls.forEach((el) => clipIo.observe(el));

    return () => {
      ctx.revert();
      clipIo.disconnect();
    };
  }, [sectionRef]);
}

/** Video play/pause driven by viewport visibility — gesture fallback for touch. */
export function useArtifactVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = prefersReducedMotion();
    const fine = window.matchMedia("(pointer: fine)").matches;

    const setState = (state: boolean) => setPlaying(state);
    const play = () =>
      video.play().then(() => setState(true)).catch(() => setState(false));
    const pause = () => {
      video.pause();
      setState(false);
    };

    const onToggle = () => (video.paused ? play() : pause());
    const toggleEl = video.parentElement?.querySelector("[data-video-toggle]");
    toggleEl?.addEventListener("click", onToggle);

    let io: IntersectionObserver | null = null;
    if (fine && !reduced) {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) play();
            else pause();
          }
        },
        { threshold: 0.35 },
      );
      io.observe(video);
    }

    return () => {
      io?.disconnect();
      toggleEl?.removeEventListener("click", onToggle);
    };
  }, []);

  return { videoRef, playing };
}
