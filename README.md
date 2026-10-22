# Farhan Taufik Rahman — Portfolio

Personal portfolio built with **Next.js (App Router) + React 19 + TypeScript**, plain CSS, and no UI or animation libraries. Theme: a pixel night sky (Jersey 10 pixel font for headings and numbers, Sora for text), with a dawn-sky light mode. The page is centred on **Llama Express** (video tour, live request-flow diagram, engineering decisions, gallery); the other projects get a screenshot, a live link and a repo link.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build && npm start
```

Requires Node.js 20.9 or newer.

## Where the content lives

All text, links and image paths live in **`src/content/site.ts`**. The components only read from it, so you normally never touch `src/components`.

Everything marked `// TODO` is a template:

| What | Where | Notes |
| --- | --- | --- |
| Your photo | `profile.photo` → `public/me.webp` | Already set: your portrait with the background removed. To replace it, use a PNG/WebP with a transparent background and update `width`/`height`. |
| Site URL | `profile.siteUrl` | Your final domain, used for Open Graph / SEO. |
| LinkedIn / GitHub | `profile.links` | Check both URLs. |
| CV | `public/cv/Farhan_Taufik_Rahman_CV.pdf` | Overwrite the file to update it. |
| Other projects | `projects[]` | For each: `image` (1600×1000 PNG/WebP in `public/projects/`), `demo`, `repo`. |
| Certificates | `certifications[]` | `credential` = verification link; `badge` = optional image in `public/badges/` (e.g. your Credly badge). Without it, the issuer logo is used (AWS, HackerRank, Cisco), otherwise the first letter. |
| Tech logos | `src/content/logos.ts` + `public/logos/` | Chips look up logos by label. Add an SVG and an alias to support a new tool. Mostly-black logos have a `-dark.svg` variant for the night theme. |
| Llama Express | `llama` | Demo, repo, README links, facts, decisions and gallery captions. |

Placeholders you can delete once replaced: `public/projects/*-placeholder.svg`.

## Media

- `public/projects/llama/llama-express.mp4` — 30-second tour (1280×720, H.264, ~4.9 MB) with poster `llama-express-poster.webp`.
- `public/projects/llama/*.webp` — gallery screenshots. Phone numbers are blurred; keep doing that for any new screenshot (no real emails, phone numbers, tokens or addresses).

## Features

- Night sky on a canvas: square pixel stars in three parallax layers, twinkling, the occasional pixel meteor (`StarField.tsx`)
- Hero portrait in front of a pixel-art planet, with a satellite orbiting around you (a nod to SATRIA-1)
- Pixel corners on panels and buttons, pixel-art planet/moon/satellite in `public/space/`
- Night theme by default, dawn-sky light theme via the toggle (remembered, no flash on load)
- Brand logos on skills, the Llama Express stack, the architecture diagram and certifications
- Scroll-progress bar drawn as a delivery route, active-section nav, mobile menu
- Interactive architecture diagram: pick a scenario (order, tracking, payment, deploy) and packets travel the real path
- Count-up facts, accordion of engineering decisions, gallery lightbox (keyboard + swipe), tilt on project images, copy-email toast
- Respects `prefers-reduced-motion`; skip link and visible keyboard focus
- Images served as AVIF/WebP through `next/image`

## Structure

```
src/
  app/          layout.tsx (fonts, metadata, theme script), page.tsx, globals.css, icon.svg
  components/   Header, StarField, Hero, LlamaFeature, VideoPlayer, Facts, FlowDiagram,
                Gallery, Projects, TiltFrame, Journey, Skills, Contact, TechLogo, Reveal, Icons
  content/      site.ts  ← edit this;  logos.ts (logo lookup)
  lib/          hooks.ts (in-view, scroll progress, active section, reduced motion)
public/         photo, logos/, space/ (pixel art), projects/, cv/
```

## Deploy (Vercel)

1. Push this folder to a new GitHub repo.
2. Vercel → **Add New Project** → import the repo. The framework is detected as Next.js; no environment variables are needed.
3. Add your domain under **Settings → Domains**, then set `profile.siteUrl` to it.

## Credits

- Tech logos: [Devicon](https://github.com/devicons/devicon) (MIT) and [Simple Icons](https://github.com/simple-icons/simple-icons) (CC0). Logos are trademarks of their owners and only indicate tools used.
- Fonts: Jersey 10 and Sora (SIL Open Font License), loaded through `next/font`.
- Pixel planet, moon and satellite: generated for this site.
