/** ArtifactMedia — poster-first video with a visible, keyboard-operable toggle.
 *  Desktop + motion allowed: plays when 35% visible, pauses off-screen.
 *  Touch / reduced motion: poster frame + explicit control only.
 */

import { useRef } from "react";
import { useArtifactVideo } from "../../lib/hooks";

interface Props {
  video: string;
  label: string;
  poster?: string;
  figures: { src: string; caption: string }[];
}

export default function ArtifactMedia({ video, label, poster, figures }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { videoRef, playing } = useArtifactVideo();

  return (
    <div ref={wrapperRef}>
      <figure className="group relative">
        <div className="reveal-clip relative overflow-hidden rounded-[14px] border border-bone-100/10 bg-ink-950">
          <video
            ref={videoRef}
            className="aspect-video w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            muted
            loop
            playsInline
            preload="none"
            poster={poster}
            width={1280}
            height={720}
            aria-label={label}
          >
            <source src={video} type="video/webm" />
          </video>

          {/* Play/stop control — always available */}
          <button
            data-video-toggle
            aria-pressed={playing}
            className="mono-label absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-bone-100/25 bg-ink-950/70 px-4 py-2 text-bone-50 backdrop-blur-md transition-colors hover:border-rust-400 hover:text-rust-400"
          >
            <span
              aria-hidden="true"
              className={`inline-block h-2 w-2 rounded-full ${playing ? "bg-rust-400" : "bg-moss-400"}`}
            />
            {playing ? "Stop film" : "Play film"}
          </button>
        </div>
        <figcaption className="mono-label mt-3 flex justify-between text-bone-100/40">
          <span>Interface loop</span>
          <span aria-hidden="true">◐</span>
        </figcaption>
      </figure>

      {figures.length > 0 && (
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {figures.map((fig) => (
            <figure key={fig.src} className="reveal-clip overflow-hidden rounded-[14px] border border-bone-100/10">
              <img
                src={fig.src}
                alt={fig.caption}
                loading="lazy"
                decoding="async"
                width={1280}
                height={720}
                className="aspect-video w-full object-cover"
              />
              <figcaption className="mono-label border-t border-bone-100/10 bg-ink-950/60 px-4 py-3 text-bone-100/40">
                {fig.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
