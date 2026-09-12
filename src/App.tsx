/** App — the experience: Hero → Work → System → About → Writing → Contact. */

import { useEffect } from "react";
import Navbar from "./components/navigation/Navbar";
import Hero from "./components/hero/Hero";
import Projects from "./components/projects/Projects";
import Skills from "./components/skills/Skills";
import About from "./components/about/About";
import Writing from "./components/writing/Writing";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import { initLenis, prefersReducedMotion, ScrollTrigger } from "./lib/motion";

export default function App() {
  useEffect(() => {
    document.documentElement.classList.replace("no-js", "js");
    if (prefersReducedMotion()) {
      document.documentElement.classList.add("reduced-motion");
    } else {
      initLenis();
    }

    // Re-measure triggers once webfonts settle (layout-affecting)
    if (document.fonts?.ready) {
      let alive = true;
      document.fonts.ready
        .then(() => {
          if (alive) ScrollTrigger.refresh();
        })
        .catch(() => {});
      return () => {
        alive = false;
      };
    }
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink-950 focus:px-5 focus:py-3 focus:text-bone-50"
      >
        Skip to content
      </a>

      <div className="grain" aria-hidden="true" />

      <Navbar />

      <main id="main" tabIndex={-1}>
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Writing />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
