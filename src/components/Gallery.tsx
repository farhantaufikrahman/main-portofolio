"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronIcon, CloseIcon } from "./Icons";

type Shot = { src: string; alt: string; width: number; height: number; caption: string };

/** Screenshot mosaic; opens a lightbox with keyboard, button and swipe navigation. */
export function Gallery({ shots }: { shots: Shot[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => {
    setIndex(null);
    lastTrigger.current?.focus();
  }, []);
  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + shots.length) % shots.length)),
    [shots.length],
  );

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  const current = index === null ? null : shots[index];

  return (
    <>
      <ul className="gallery">
        {shots.map((s, i) => {
          const portrait = s.height > s.width;
          return (
            <li key={s.src} className={`gallery__item ${portrait ? "gallery__item--portrait" : ""}`}>
              <button
                type="button"
                className="gallery__button"
                onClick={(e) => {
                  lastTrigger.current = e.currentTarget;
                  setIndex(i);
                }}
                aria-label={`Open screenshot: ${s.caption}`}
              >
                <Image src={s.src} alt={s.alt} width={s.width} height={s.height} sizes="(max-width: 760px) 100vw, 50vw" className="gallery__img" />
              </button>
              <p className="gallery__caption">{s.caption}</p>
            </li>
          );
        })}
      </ul>

      {current && index !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          onClick={(e) => e.target === e.currentTarget && close()}
          onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
          onTouchEnd={(e) => {
            const start = touchX.current;
            const end = e.changedTouches[0]?.clientX;
            if (start !== null && end !== undefined && Math.abs(end - start) > 50) step(end < start ? 1 : -1);
            touchX.current = null;
          }}
        >
          <button ref={closeRef} type="button" className="lightbox__close icon-button" onClick={close} aria-label="Close">
            <CloseIcon />
          </button>
          <button type="button" className="lightbox__nav lightbox__nav--prev icon-button" onClick={() => step(-1)} aria-label="Previous screenshot">
            <ChevronIcon className="flip" />
          </button>
          <figure className="lightbox__figure" key={current.src}>
            <Image src={current.src} alt={current.alt} width={current.width} height={current.height} sizes="92vw" className="lightbox__img" />
            <figcaption>
              {current.caption}
              <span className="lightbox__count">
                {index + 1} of {shots.length}
              </span>
            </figcaption>
          </figure>
          <button type="button" className="lightbox__nav lightbox__nav--next icon-button" onClick={() => step(1)} aria-label="Next screenshot">
            <ChevronIcon />
          </button>
        </div>
      )}
    </>
  );
}
