import Navbar from "./components/navigation/Navbar";
import Hero from "./components/hero/Hero";
import TickerMarquee from "./components/hero/TickerMarquee";
import Projects from "./components/projects/Projects";
import Capabilities from "./components/skills/Capabilities";
import Approach from "./components/approach/Approach";
import About from "./components/about/About";
import Writing from "./components/writing/Writing";
import Achievements from "./components/achievements/Achievements";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-warm-charcoal focus:px-5 focus:py-3 focus:text-vanilla-cream focus:border-2 focus:border-bright-lime"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main" tabIndex={-1} className="w-full pt-20 bg-vanilla-cream">
        <div className="flex flex-col w-full overflow-x-hidden text-warm-charcoal">
          <Hero />
          <TickerMarquee />
          <Projects />
          <Capabilities />
          <Approach />
          <About />
          <Writing />
          <Achievements />
          <Contact />
        </div>
      </main>

      <Footer />
    </>
  );
}
