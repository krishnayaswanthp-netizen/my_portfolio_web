/** System — capabilities as an interactive technical ecosystem. */

import { useRef } from "react";
import SystemMap from "./SystemMap";
import { useReveal } from "../../lib/hooks";

export default function Skills() {
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);

  return (
    <section
      ref={rootRef}
      id="system"
      className="relative bg-bone-200"
      aria-labelledby="system-title"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <header className="mb-14 sm:mb-20">
          <p className="reveal-fade mono-label mb-6 flex items-center gap-3 text-rust-600">
            02 — Capabilities
            <span className="inline-block h-px w-16 bg-rust-600/40" aria-hidden="true" />
          </p>
          <h2 id="system-title" className="display max-w-4xl text-5xl text-ink-950 sm:text-7xl">
            <span className="reveal-line">
              <span>How the systems</span>
            </span>
            <span className="reveal-line pl-[6vw]">
              <span>
                get built<span className="text-rust-600">.</span>
              </span>
            </span>
          </h2>
        </header>

        <SystemMap />
      </div>
    </section>
  );
}
