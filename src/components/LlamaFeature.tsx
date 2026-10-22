import { llama } from "@/content/site";
import { Facts } from "./Facts";
import { FlowDiagram } from "./FlowDiagram";
import { Gallery } from "./Gallery";
import { ExternalIcon, GitHubIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { VideoPlayer } from "./VideoPlayer";
import { logoFor } from "@/content/logos";
import { TechLogo } from "./TechLogo";

export function LlamaFeature() {
  return (
    <section id="llama-express" className="feature" aria-labelledby="llama-title">
      <div className="feature__inner">
        <header className="feature__head">
          <p className="feature__kicker">Featured project, {llama.period}</p>
          <h2 id="llama-title" className="feature__title">
            {llama.name}
          </h2>
          <p className="feature__tagline">{llama.tagline}</p>
          <p className="feature__summary">{llama.summary}</p>
          <div className="feature__links">
            <a className="button button--courier" href={llama.links.demo} target="_blank" rel="noreferrer">
              Open live demo
              <ExternalIcon />
            </a>
            <a className="button button--on-dark" href={llama.links.repo} target="_blank" rel="noreferrer">
              <GitHubIcon />
              Source code
            </a>
            <a className="text-link text-link--on-dark" href={llama.links.readme} target="_blank" rel="noreferrer">
              Read the README
            </a>
          </div>
          <p className="feature__note">{llama.demoNote}</p>
        </header>

        <Reveal className="feature__video">
          <VideoPlayer src={llama.video.src} poster={llama.video.poster} caption={llama.video.caption} />
        </Reveal>

        <Facts facts={llama.facts} />

        <div className="feature__block">
          <h3 className="feature__h3">How a request moves through it</h3>
          <p className="feature__lead">Pick a scenario. The highlighted path is what actually runs in production.</p>
          <FlowDiagram />
        </div>

        <div className="feature__block">
          <h3 className="feature__h3">Problems I had to solve</h3>
          <div className="decisions">
            {llama.decisions.map((d) => (
              <details key={d.problem} className="decision">
                <summary>{d.problem}</summary>
                <p>{d.decision}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="feature__block">
          <h3 className="feature__h3">Screens</h3>
          <Gallery shots={llama.gallery} />
        </div>

        <div className="feature__block feature__block--stack">
          <h3 className="feature__h3">Built with</h3>
          <ul className="stack-grid">
            {llama.stack.map((t) => (
              <li key={t} className="stack-tile">
                {logoFor(t) ? (
                  <TechLogo name={t} size={30} />
                ) : (
                  <span className="stack-tile__mono" aria-hidden>
                    {t.slice(0, 1)}
                  </span>
                )}
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
