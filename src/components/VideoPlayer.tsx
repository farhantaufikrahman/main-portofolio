"use client";

import { useRef, useState } from "react";
import { PlayIcon } from "./Icons";

/** Poster with a play button; the native controls take over after the first play. */
export function VideoPlayer({ src, poster, caption }: { src: string; poster: string; caption: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const play = () => {
    const v = ref.current;
    if (!v) return;
    setStarted(true);
    void v.play().catch(() => setStarted(false));
  };

  return (
    <figure className="video">
      <div className="video__frame">
        <video
          ref={ref}
          src={src}
          poster={poster}
          preload="metadata"
          playsInline
          controls={started}
          className="video__el"
          onEnded={() => setStarted(false)}
        />
        {!started && (
          <button type="button" className="video__play" onClick={play} aria-label="Play the 30-second Llama Express tour">
            <span className="video__play-ring">
              <PlayIcon />
            </span>
            <span className="video__play-label">Watch the 30-second tour</span>
          </button>
        )}
      </div>
      <figcaption className="video__caption">{caption}</figcaption>
    </figure>
  );
}
