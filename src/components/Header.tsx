"use client";

import { useEffect, useState } from "react";
import { navItems, profile } from "@/content/site";
import { useActiveSection, useScrollProgress } from "@/lib/hooks";
import { CloseIcon, CourierMark, DownloadIcon, MenuIcon, MoonIcon, SunIcon } from "./Icons";

type Theme = "light" | "dark";

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function Header() {
  const progress = useScrollProgress();
  const active = useActiveSection(navItems.map((n) => n.href.slice(1)));
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setTheme(readTheme()), []);
  useEffect(() => setScrolled(progress > 0.005), [progress]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleTheme = () => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage can be unavailable (private mode) — the toggle still works for this visit */
    }
    setTheme(next);
  };

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-header__inner">
        <a href="#top" className="brand" aria-label={`${profile.name}, back to top`}>
          <span className="brand__mark" aria-hidden>
            {profile.shortName.slice(0, 1)}
          </span>
          <span className="brand__name">{profile.name}</span>
        </a>

        <nav className="nav" aria-label="Sections">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav__link ${active === item.href.slice(1) ? "is-active" : ""}`}
              aria-current={active === item.href.slice(1) ? "true" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <button
            type="button"
            className="icon-button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <a className="button button--small button--ink hide-sm" href={profile.cv} download>
            <DownloadIcon size={16} />
            CV
          </a>
          <button
            type="button"
            className="icon-button show-sm"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* Scroll progress drawn as a delivery route with the courier marker riding on it */}
      <div className="route-progress" aria-hidden>
        <div className="route-progress__done" style={{ transform: `scaleX(${progress})` }} />
        <div className="route-progress__courier" style={{ left: `${progress * 100}%` }}>
          <CourierMark size={14} />
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} hidden={!open}>
        <div className="mobile-menu__top">
          <span className="brand__name">{profile.name}</span>
          <button type="button" className="icon-button" onClick={() => setOpen(false)} aria-label="Close menu">
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="Sections" className="mobile-menu__nav">
          {navItems.map((item, i) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} style={{ animationDelay: `${60 + i * 45}ms` }}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="button button--ink" href={profile.cv} download onClick={() => setOpen(false)}>
          <DownloadIcon size={16} />
          Download CV
        </a>
      </div>
    </header>
  );
}
