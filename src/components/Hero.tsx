import Image from "next/image";
import { profile } from "@/content/site";
import { DownloadIcon, GitHubIcon, LinkedInIcon } from "./Icons";

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__inner">
        <div className="hero__text">
          <p className="status-pill">
            <span className="status-dot" aria-hidden />
            {profile.availability}
          </p>

          <h1 id="hero-title" className="hero__name">
            {profile.name}
          </h1>
          <p className="hero__role">
            {profile.role}, {profile.location}
          </p>
          <p className="hero__headline">{profile.headline}</p>
          <p className="hero__intro">{profile.intro}</p>

          <div className="hero__actions">
            <a className="button button--route" href="#llama-express">
              See Llama Express
            </a>
            <a className="button button--ghost" href={profile.cv} download>
              <DownloadIcon size={16} />
              Download CV
            </a>
            <a className="icon-button icon-button--outlined" href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
              <GitHubIcon />
            </a>
            <a className="icon-button icon-button--outlined" href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
              <LinkedInIcon />
            </a>
          </div>
        </div>

        {/* Portrait in front of a pixel planet; the orbiting satellite is a nod to SATRIA-1. */}
        <div className="stage">
          <div className="stage__glow" aria-hidden />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="stage__planet" src="/space/planet.svg" alt="" aria-hidden />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="stage__moon" src="/space/moon.svg" alt="" aria-hidden />
          <div className="stage__orbit" aria-hidden>
            <div className="stage__sat">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/space/satellite.svg" alt="" />
            </div>
          </div>
          <Image
            className="stage__photo"
            src={profile.photo.src}
            alt={profile.photo.alt}
            width={profile.photo.width}
            height={profile.photo.height}
            sizes="(max-width: 1020px) 80vw, 460px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
