"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/site";
import { CopyIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

export function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact__inner">
        <h2 id="contact-title" className="contact__title">
          Let&apos;s talk about your team&apos;s next delivery.
        </h2>
        <p className="contact__lead">
          I&apos;m looking for a junior software engineer role where I can work on backend or full-stack systems. The fastest way to reach me is email.
        </p>

        <div className="contact__email">
          <a href={`mailto:${profile.email}`} className="contact__address">
            <MailIcon size={22} />
            {profile.email}
          </a>
          <button type="button" className="button button--courier" onClick={copy}>
            <CopyIcon size={16} />
            {copied ? "Copied" : "Copy email"}
          </button>
        </div>

        <ul className="contact__links">
          <li>
            <a className="button button--on-dark" href={profile.links.linkedin} target="_blank" rel="noreferrer">
              <LinkedInIcon /> LinkedIn
            </a>
          </li>
          <li>
            <a className="button button--on-dark" href={profile.links.github} target="_blank" rel="noreferrer">
              <GitHubIcon /> GitHub
            </a>
          </li>
          <li>
            <a className="button button--on-dark" href={profile.cv} download>
              <DownloadIcon size={16} /> Download CV
            </a>
          </li>
        </ul>
      </div>

      <p className="toast" role="status" aria-live="polite" data-show={copied}>
        {copied ? "Email copied to clipboard" : ""}
      </p>

      <footer className="footer">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>Built with Next.js under a pixel night sky.</span>
      </footer>
    </section>
  );
}
