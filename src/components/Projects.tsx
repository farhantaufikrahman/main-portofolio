import Image from "next/image";
import { projects } from "@/content/site";
import { ExternalIcon, GitHubIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { TechChip } from "./TechLogo";
import { TiltFrame } from "./TiltFrame";

export function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="section__inner">
        <h2 id="projects-title" className="section__title">
          Other projects
        </h2>
        <p className="section__lead">Built during and after the Hacktiv8 bootcamp, solo and in teams.</p>

        <ul className="projects">
          {projects.map((p, i) => (
            <Reveal as="li" key={p.name} className="project" delay={i * 60}>
              <TiltFrame className="project__media">
                <Image src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} sizes="(max-width: 760px) 100vw, 40vw" className="project__img" />
              </TiltFrame>
              <div className="project__body">
                <h3 className="project__name">
                  {p.name} <span className="project__year">{p.year}</span>
                </h3>
                <p className="project__blurb">{p.blurb}</p>
                <ul className="tags" aria-label={`${p.name} technologies`}>
                  {p.tags.map((t) => (
                    <TechChip key={t} name={t} />
                  ))}
                </ul>
                <div className="project__links">
                  {p.demo && (
                    <a className="text-link" href={p.demo} target="_blank" rel="noreferrer">
                      Live site <ExternalIcon size={14} />
                    </a>
                  )}
                  {p.repo && (
                    <a className="text-link" href={p.repo} target="_blank" rel="noreferrer">
                      <GitHubIcon size={15} /> Repository
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
