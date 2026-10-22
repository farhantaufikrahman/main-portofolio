import Image from "next/image";
import { certifications, skills } from "@/content/site";
import { logoFor } from "@/content/logos";
import { ExternalIcon } from "./Icons";
import { TechChip, TechLogo } from "./TechLogo";

export function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="section__inner skills-layout">
        <div>
          <h2 id="skills-title" className="section__title">
            Skills
          </h2>
          <p className="section__lead">Tools I have used in shipped projects.</p>
          <dl className="skills">
            {skills.map((g) => (
              <div key={g.group} className="skills__row">
                <dt>{g.group}</dt>
                <dd>
                  <ul className="tags">
                    {g.items.map((s) => (
                      <TechChip key={s} name={s} />
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="section__title section__title--small">Certifications</h2>
          <ul className="certs">
            {certifications.map((c) => {
              const body = (
                <>
                  {c.badge ? (
                    <Image src={c.badge} alt="" width={44} height={44} className="certs__badge" />
                  ) : logoFor(c.issuer) ? (
                    <span className="certs__badge certs__badge--logo">
                      <TechLogo name={c.issuer} size={28} />
                    </span>
                  ) : (
                    <span className="certs__badge certs__badge--empty" aria-hidden>
                      {c.issuer.slice(0, 1)}
                    </span>
                  )}
                  <span className="certs__text">
                    <span className="certs__name">{c.name}</span>
                    <span className="certs__meta">
                      {c.issuer}, {c.date}
                    </span>
                  </span>
                  {c.credential && <ExternalIcon size={15} className="certs__ext" />}
                </>
              );
              return (
                <li key={c.name}>
                  {c.credential ? (
                    <a className="certs__item" href={c.credential} target="_blank" rel="noreferrer" aria-label={`${c.name} by ${c.issuer}, verify credential`}>
                      {body}
                    </a>
                  ) : (
                    <div className="certs__item">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
