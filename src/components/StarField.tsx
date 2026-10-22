"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; s: number; layer: number; phase: number; speed: number; tint: number };
type Meteor = { x: number; y: number; vx: number; vy: number; life: number };

const LAYER_PARALLAX = [0.03, 0.08, 0.16];

/**
 * Fixed full-screen canvas of square "pixel" stars.
 * Three parallax layers drift with scroll, stars twinkle, and a pixel meteor crosses now and then.
 * Colours come from CSS variables, so the day/night themes only change CSS.
 * With reduced motion it draws one still frame.
 */
export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let stars: Star[] = [];
    let meteor: Meteor | null = null;
    let nextMeteor = performance.now() + 3000;
    let raf = 0;
    let palette = readPalette();

    function readPalette() {
      const cs = getComputedStyle(document.documentElement);
      return {
        tints: [cs.getPropertyValue("--star-1"), cs.getPropertyValue("--star-2"), cs.getPropertyValue("--star-3")].map((v) => v.trim() || "#ffffff"),
        alpha: parseFloat(cs.getPropertyValue("--star-alpha")) || 1,
        density: parseFloat(cs.getPropertyValue("--star-density")) || 1,
      };
    }

    function build() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.imageSmoothingEnabled = false;

      const count = Math.round(((w * h) / 2600) * palette.density);
      stars = Array.from({ length: count }, () => {
        const r = Math.random();
        const layer = r < 0.62 ? 0 : r < 0.9 ? 1 : 2;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          s: layer === 2 ? (Math.random() < 0.4 ? 3 : 2) : layer === 1 ? 2 : 1,
          layer,
          phase: Math.random() * Math.PI * 2,
          speed: 0.6 + Math.random() * 1.8,
          tint: Math.random() < 0.75 ? 0 : Math.random() < 0.6 ? 1 : 2,
        };
      });
    }

    function draw(now: number) {
      const t = now / 1000;
      const scroll = window.scrollY;
      ctx!.clearRect(0, 0, w, h);

      for (const st of stars) {
        const y = (((st.y - scroll * LAYER_PARALLAX[st.layer]) % h) + h) % h;
        const tw = reduced ? 0.85 : 0.55 + 0.45 * Math.sin(t * st.speed + st.phase);
        ctx!.globalAlpha = palette.alpha * (st.layer === 0 ? 0.55 : 0.9) * tw;
        ctx!.fillStyle = palette.tints[st.tint];
        const x = Math.round(st.x);
        const yy = Math.round(y);
        ctx!.fillRect(x, yy, st.s, st.s);
        // the biggest stars get a pixel "sparkle" cross
        if (st.s === 3 && tw > 0.8) {
          ctx!.globalAlpha *= 0.5;
          ctx!.fillRect(x - 2, yy + 1, 2, 1);
          ctx!.fillRect(x + 3, yy + 1, 2, 1);
          ctx!.fillRect(x + 1, yy - 2, 1, 2);
          ctx!.fillRect(x + 1, yy + 3, 1, 2);
        }
      }

      if (!reduced) {
        if (!meteor && now > nextMeteor) {
          meteor = { x: Math.random() * w * 0.7 + w * 0.2, y: Math.random() * h * 0.4, vx: -7, vy: 3.5, life: 1 };
        }
        if (meteor) {
          for (let i = 0; i < 14; i++) {
            ctx!.globalAlpha = palette.alpha * meteor.life * (1 - i / 14);
            ctx!.fillStyle = i < 2 ? palette.tints[0] : palette.tints[2];
            ctx!.fillRect(Math.round(meteor.x - meteor.vx * i * 0.6), Math.round(meteor.y - meteor.vy * i * 0.6), i < 2 ? 3 : 2, i < 2 ? 3 : 2);
          }
          meteor.x += meteor.vx;
          meteor.y += meteor.vy;
          meteor.life -= 0.012;
          if (meteor.life <= 0 || meteor.x < -40 || meteor.y > h + 40) {
            meteor = null;
            nextMeteor = now + 5000 + Math.random() * 7000;
          }
        }
      }
      ctx!.globalAlpha = 1;
    }

    function loop(now: number) {
      draw(now);
      raf = requestAnimationFrame(loop);
    }

    build();
    if (reduced) draw(0);
    else raf = requestAnimationFrame(loop);

    const onResize = () => {
      // Mobile browsers resize while the URL bar hides; don't reshuffle the sky for that.
      if (window.innerWidth === w && Math.abs(window.innerHeight - h) < 160) return;
      build();
      if (reduced) draw(0);
    };
    const onScroll = () => reduced && draw(0);
    const onVisibility = () => {
      if (reduced) return;
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(loop);
    };
    // Theme switch only changes CSS variables: re-read them.
    const themeObserver = new MutationObserver(() => {
      palette = readPalette();
      build();
      if (reduced) draw(0);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield" aria-hidden />;
}
