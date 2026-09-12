/** SecondaryIndex — "Also built": a scannable ledger of range.
 *  Fine pointers get a floating media preview that follows the cursor.
 *  Rows are real links when a repo exists; honest static rows otherwise.
 */

import { useRef, useState } from "react";
import { secondaryWorks, type SecondaryWork } from "../../data/secondary";
import { isFinePointer } from "../../lib/motion";

function Row({
  work,
  onEnter,
}: {
  work: SecondaryWork;
  onEnter: (e: React.MouseEvent) => void;
}) {
  const inner = (
    <>
      <span className="mono-label w-10 shrink-0 text-bone-100/40">{work.index}</span>
      <span className="display flex-1 text-xl text-bone-100 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-bone-50 sm:text-2xl">
        {work.name}
      </span>
      <span className="mono-label hidden shrink-0 text-bone-100/40 md:block">{work.type}</span>
      <span className="mono-label hidden w-44 shrink-0 text-right text-bone-100/40 lg:block">
        {work.meta}
      </span>
      {work.github ? (
        <span
          aria-hidden="true"
          className="w-6 shrink-0 text-right text-bone-100/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-rust-400"
        >
          ↗
        </span>
      ) : (
        <span className="mono-label w-16 shrink-0 text-right text-bone-100/25">—</span>
      )}
    </>
  );

  const className =
    "group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t border-bone-100/10 py-5 transition-colors duration-300 last:border-b hover:bg-bone-100/[0.025] md:grid-cols-[auto_1fr_auto_auto_auto] sm:py-6";

  return (
    <li className="relative">
      {work.github ? (
        <a
          href={work.github}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          onMouseEnter={onEnter}
          aria-label={`${work.name} — ${work.type} — on GitHub`}
        >
          {inner}
        </a>
      ) : (
        <div className={className} aria-label={`${work.name} — ${work.type}`}>
          {inner}
        </div>
      )}
    </li>
  );
}

export default function SecondaryIndex() {
  const [preview, setPreview] = useState<{ src: string; x: number; y: number } | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const fine = isFinePointer();

  const onEnter = (work: SecondaryWork) => (e: React.MouseEvent) => {
    if (!fine || !work.media) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPreview({
      src: work.media,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const onMove = (e: React.MouseEvent) => {
    if (!fine) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPreview((prev) =>
      prev ? { ...prev, x: e.clientX - rect.left, y: e.clientY - rect.top } : prev,
    );
  };

  const onLeave = () => setPreview(null);

  return (
    <div ref={sectionRef} className="relative mt-20 sm:mt-28" onMouseMove={onMove}>
      <div className="mb-8 flex items-end justify-between">
        <h3 className="display text-3xl text-bone-50 sm:text-4xl">Also built</h3>
        <p className="mono-label text-bone-100/40">08 works — sources where public</p>
      </div>

      <ul onMouseLeave={onLeave}>
        {secondaryWorks.map((work) => (
          <Row key={work.index} work={work} onEnter={onEnter(work)} />
        ))}
      </ul>

      {/* Floating media preview — fine pointers only, clamped to the section */}
      {fine && preview?.src && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute z-10 hidden h-44 w-72 overflow-hidden rounded-xl border border-bone-100/20 shadow-2xl shadow-ink-950/60 md:block"
          style={{
            left: Math.max(8, Math.min(preview.x + 24, (sectionRef.current?.clientWidth ?? 0) - 288 - 8)),
            top: Math.max(8, preview.y - 88),
          }}
        >
          <img
            src={preview.src}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
