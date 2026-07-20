# Portfolio Site Handoff — navaneet.me

## Project Location
`/Users/nav/Active/Portfolio`

## What's Built (ALL DONE)
Full personal website for Navaneet Ramabadran. Vite + React 19 + TypeScript, Tailwind CSS v4, Three.js (react-three-fiber + drei), GSAP ScrollTrigger. Fully static — compiles to static assets, no server needed. Deploys to GitHub Pages.

## Remaining Task
**Create `.github/workflows/deploy.yml`** for GitHub Pages auto-deploy on push to main. The build command is `npm run build`, output is in `dist/`. Vite base path is already configured. Just need the GitHub Actions workflow file.

## Architecture

### Tech Stack
- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin, `@import "tailwindcss"` + `@theme` block syntax)
- **Three.js** via `@react-three/fiber` + `@react-three/drei`
- **GSAP** + **ScrollTrigger** (dynamically imported, non-mobile only)
- **Google Fonts**: JetBrains Mono (mono), Space Grotesk (sans)

### Color Palette
- Background: `#08080c` (primary), `#12121a` (alternating sections)
- Accent 1: `#00ffd2` (electric cyan)
- Accent 2: `#ffd700` (warm gold)
- Text: `#e8e8ee` (off-white), `#6b6b7b` (muted), `#b0b0c0` (body)

### File Structure
```
src/
  main.tsx          — React 19 entry point
  App.tsx           — Main shell: header nav, lazy Hero, 5 sections, GSAP ScrollTrigger
  index.css         — Tailwind import + @theme custom tokens
  components/
    Hero.tsx        — Hero wrapper with useDeviceTier() hook (mobile/low/high)
    HeroScene.tsx   — Three.js Canvas: LetterBlocks (NR), FloatingOrb, 30 particles
    About.tsx       — Static about section
    Experience.tsx  — Timeline (5 roles: DocuSign, CircleCI, Ancestry, QuSwami, IEL)
    Projects.tsx    — Card grid (4 repos: signal-serve, aud.io, FlexJobs, Clone-ify)
    Skills.tsx      — 6-category skill grid
    Contact.tsx     — LinkedIn/GitHub/Email CTAs + publications + footer
```

## Key Design Decisions

### Mobile Detection (Hero.tsx)
`useDeviceTier()` classifies device as `mobile`, `low`, or `high` based on viewport width (<768px) and `navigator.hardwareConcurrency` (<=4 = low).

- **Mobile**: Pure CSS `LightScene` — animated gradient orbs + grid pattern, no Three.js at all
- **Low**: Same CSS fallback
- **High**: Dynamic import of `HeroScene.tsx` (Three.js Canvas) with fallback to LightScene during load

### GSAP Scroll Animations (App.tsx)
All GSAP code is in App.tsx, loaded via dynamic `import('gsap')` only on non-mobile. Four animation types:

1. **Hero canvas dispersion**: `[data-hero-canvas]` fades to opacity 0 + scale 0.92, scrub-linked to scroll
2. **Section reveals**: `[data-reveal]` elements animate from opacity 0 y:40 → visible, staggered by index
3. **Timeline card stagger**: `[data-timeline-card]` elements animate from x:-20 → 0, staggered
4. **Project card stagger**: `[data-project-card]` elements animate from y:20 → 0, staggered

### SEO (index.html)
Full SEO setup: title, description, keywords, Open Graph, Twitter cards, JSON-LD Person schema with sameAs links to LinkedIn/GitHub.

## Content Data (in component files)

### Experience (Experience.tsx `experience` array)
1. **DocuSign** — Software Engineer (Health & Life Sciences), 2023–Present
2. **CircleCI** — Sr Software Engineer (Growth/Extensibility), 2021–2023
3. **Ancestry.com** — Software Engineer (ToFu Marketing), 2019–2021
4. **QuSwami** — Data Engineer, 2017–2019
5. **Innovation Economy Laboratory** — Electrochemical Engineer, 2015–2017

### Projects (Projects.tsx `projects` array)
1. **signal-serve** — Rust (Tokio, Axum, SQLite) — Signal Messenger API + Hermes AI agent
2. **aud.io** — Node.js (HTTP, crypto, stream, zlib) — MP3 normalizer for Alexa with S3 caching
3. **FlexJobs** — MongoDB, Express, React, Node, D3.js — Job matching with Dice Coefficient
4. **Clone-ify** — PostgreSQL, Rails, React, Redux, AWS S3 — Spotify clone

### Publications (Contact.tsx, inline)
- "Machine Learning for Non-linear Equivalent-Circuit Cell Model for Li-Ion Battery State of Charge Estimation"
- "Microwave Exfoliated Graphene Oxide/TiO₂ Nanowire Hybrid for High Performance Lithium Ion Battery"

## Build Output
```
dist/
  index.html                          2.74 kB
  assets/index-C2hILfGm.css          16.82 kB (4.22 gzip)
  assets/Hero-BRrIqf9-.js             2.68 kB (1.12 gzip)  — lazy-loaded
  assets/HeroScene-Cb1XDVBk.js      886.40 kB (236 gzip)  — lazy-loaded, desktop only
  assets/index-CDMiTs8P.js          211.76 kB (66.77 gzip)
  assets/gsap-D1O2useh.js            69.94 kB (27.41 gzip) — lazy-loaded, desktop only
  assets/ScrollTrigger-D7MWR7hw.js   42.75 kB (17.55 gzip) — lazy-loaded, desktop only
```

## Context for Next Session
The **only remaining task** is creating `.github/workflows/deploy.yml`. The user's GitHub repo is `nramabad/portfolio`. The domain `navaneet.me` is on Namecheap pointing to GitHub. The GitHub Actions workflow should:
1. Trigger on push to `main`
2. Install Node deps
3. Run `npm run build`
4. Deploy `dist/` to GitHub Pages

Also useful: the original old site was an HTML5 UP "Stellar" template with jQuery. It's been completely replaced by this Vite+React build. The old repo had `assets/`, `images/`, `elements.html`, `resume.html` — all superseded.
