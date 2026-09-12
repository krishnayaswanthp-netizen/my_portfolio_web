/** Writing — an editorial reading section. Three real pieces, real links. */

import { useRef } from "react";
import { articles } from "../../data/writing";
import { useReveal } from "../../lib/hooks";

export default function Writing() {
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);

  return (
    <section
      ref={rootRef}
      id="writing"
      className="relative bg-bone-200"
      aria-labelledby="writing-title"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <header className="mb-14 sm:mb-20">
          <p className="reveal-fade mono-label mb-6 flex items-center gap-3 text-rust-600">
            04 — Writing
            <span className="inline-block h-px w-16 bg-rust-600/40" aria-hidden="true" />
          </p>
          <h2 id="writing-title" className="display max-w-4xl text-5xl text-ink-950 sm:text-7xl">
            <span className="reveal-line">
              <span>What gets written</span>
            </span>
            <span className="reveal-line pl-[6vw]">
              <span>
                down<span className="text-rust-600">.</span>
              </span>
            </span>
          </h2>
        </header>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Intro column */}
          <div className="reveal-fade lg:col-span-4">
            <p className="text-pretty text-lg leading-relaxed text-ink-600">
              What building systems teaches, written down while it's still fresh — a
              LangChain engineering guide and two pieces on AI tooling and
              infrastructure.
            </p>
            <a
              href="https://www.linkedin.com/in/panchagnula-krishna-yaswanth-9b0413307/recent-activity/all/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw mono-label mt-8 inline-block text-ink-900"
            >
              Full activity feed ↗
            </a>
          </div>

          {/* Article list — asymmetric, editorial */}
          <ol className="lg:col-span-8">
            {articles.map((article, i) => (
              <li key={article.index}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group grid gap-4 border-t border-ink-900/15 py-8 transition-colors last:border-b hover:bg-bone-50/60 sm:py-10 ${
                    i % 2 === 1 ? "sm:pl-12" : ""
                  }`}
                  aria-label={`Read: ${article.title} — on ${article.publication}, ${article.date}`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="mono-label text-rust-600">{article.index}</span>
                    <span className="mono-label text-ink-400">
                      {article.publication} · {article.date}
                    </span>
                  </div>
                  <h3 className="display max-w-2xl text-balance text-2xl text-ink-950 transition-transform duration-300 group-hover:translate-x-1.5 sm:text-4xl">
                    {article.title}
                  </h3>
                  <p className="max-w-xl text-pretty text-sm leading-relaxed text-ink-500 sm:text-base">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="mono-label text-ink-400">{article.topic}</span>
                    <span
                      aria-hidden="true"
                      className="text-ink-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-rust-600"
                    >
                      ↗
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
