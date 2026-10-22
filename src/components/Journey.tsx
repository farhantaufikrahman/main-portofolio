import type { CSSProperties } from "react";
import Image from "next/image";
import { journey } from "@/content/site";
import { Reveal } from "./Reveal";

/** Experience and education on one route, newest stop first. */
export function Journey() {
  return (
    <section id="journey" className="section section--tint" aria-labelledby="journey-title">
      <div className="section__inner">
        <h2 id="journey-title" className="section__title">
          Journey
        </h2>
        <p className="section__lead">From radio and satellite networks to building software, newest first.</p>

        <ol className="journey">
          {journey.map((j, i) => (
            <Reveal as="li" key={j.title} className={`journey__stop journey__stop--${j.kind}`} delay={i * 40}>
              <p className="journey__period">{j.period}</p>
              <div className={`journey__card${j.image ? " journey__card--media" : ""}`}>
                {j.image && (
                  <span
                    className={`journey__media${j.image.cover ? " journey__media--cover" : ""}`}
                    style={j.image.zoom ? ({ "--zoom": j.image.zoom } as CSSProperties) : undefined}
                  >
                    <Image src={j.image.src} alt={j.image.alt} fill sizes="88px" />
                  </span>
                )}
                <div className="journey__body">
                  <h3 className="journey__title">{j.title}</h3>
                  <p className="journey__org">
                    {j.org}
                    <span className="journey__kind">{j.kind === "work" ? "Work" : "Study"}</span>
                  </p>
                  <ul className="journey__points">
                    {j.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
