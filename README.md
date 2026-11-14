# Shree Nandi Gruhudhyog

Marketing site for **Shree Nandi Gruhudhyog** (શ્રી નંદી ગૃહ ઉદ્યોગ) — a family
gruhudhyog in Khoraj, Gandhinagar selling homemade Gujarati farsan, khakhra,
bhakhri and bakery alongside a soda bar, ice cream and 500+ stocked brands.

React 19 · Vite 8 · Tailwind CSS 4 · Framer Motion 12 · deployed to GitHub Pages.

Everything a fresh clone needs is in this repo: the design language
(`DESIGN.md`), working notes for Claude Code (`CLAUDE.md`), the installed
design skills (`.claude/skills/`), the processed photos and video loops, and
the scripts that regenerate them.

---

## Getting started

```bash
npm install
npm run dev          # dev server on http://localhost:5173/shree_nandi_gruhudhyog/
```

| Script            | What it does                                                              |
| ----------------- | ------------------------------------------------------------------------- |
| `npm run dev`     | Vite dev server with HMR                                                  |
| `npm run build`   | Production build into `dist/`                                             |
| `npm run preview` | Serve the built output locally                                            |
| `npm run lint`    | ESLint over the project (installed skills are ignored)                    |
| `npm run smoke`   | Render the app once via SSR to catch crashes and invalid props            |
| `npm run assets`  | Regenerate favicons, the social share card, and blur-up placeholders      |
| `npm run clips`   | Cut the muted web video loops from the raw footage (see Media below)      |
| `npm run deploy`  | Build and publish `dist/` to the `gh-pages` branch                        |

Before pushing: `npm run lint && npm run smoke && npm run build`.

---

## Read these first

| File | What it holds |
| --- | --- |
| [`DESIGN.md`](DESIGN.md) | The visual language — where the palette comes from (the shop's own indigo roundel, marigold signboard, cream paper), the type pairing (Instrument Serif + Manrope + Noto Serif Gujarati), the one-italic-phrase heading rule, motion and layout rules, and the "don't" list. |
| [`CLAUDE.md`](CLAUDE.md) | Working notes for Claude Code: hard rules, which skill to reach for, what to run before finishing. |
| [`src/lib/site.js`](src/lib/site.js) | Single source of truth for business details (phone, address, hours, WhatsApp openers). |

---

## Design skills (`.claude/skills/`)

Installed into the repo so every laptop that pulls it gets the same tooling.
Claude Code picks them up automatically; other agents can read the `SKILL.md`
files directly.

| Skill | From | Use for |
| --- | --- | --- |
| `ui-ux-pro-max` | nextlevelbuilder/ui-ux-pro-max-skill | Design-system reasoning: 80 styles, 192 palettes, 74 font pairings, 120 UX rules. `python .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain <domain>` (needs Python 3) |
| `design`, `design-system`, `ui-styling`, `brand`, `banner-design` | same | Tokens, Tailwind patterns, brand assets, social banners |
| `design-taste-frontend` | leonxlnx/taste-skill | Anti-slop checklist for company sites and a browser-based gate (needs Node 22+ and Edge/Chrome) |
| `design-motion-principles` | kylezantos/design-motion-principles | Build or audit motion through the Emil Kowalski / Jakub Krehel / Jhey Tompkins lenses |
| `frontend-patterns`, `video-editing`, `brand-discovery` | affaan-m/ecc | React patterns, FFmpeg-first video workflow, structured brand interviews |

Each folder carries its upstream licence.

---

## Media

### Photos

Drop a photo into `src/assets/shop/` (JPEG, ≤ 1600px on the long edge), run
`npm run assets` to regenerate its blur placeholder, then reference it as
`img.yourFileName` (kebab-case filename → camelCase). `<SmartImage>` handles
responsive AVIF/WebP variants and blur-up; never import from `assets/shop/`
directly.

The shop was photographed on site in November 2026. The 4096px originals and
the 4K phone footage live in `videos-and-pics/`, which is **git-ignored**
(~1.4 GB). Keep a copy somewhere safe; the processed versions in the repo are
what the site uses.

### Video loops

`public/video/` holds short, muted H.264 loops (≤ 12 s, 720p portrait or
1280px landscape) with a JPEG poster each, cut by
[`scripts/clips.mjs`](scripts/clips.mjs) from the raw footage. Audio is dropped
at encode time. `<Video>` (`src/components/ui/Video.jsx`) plays a loop only
while it is on screen, swaps to a portrait cut on phones, and shows just the
poster under `prefers-reduced-motion` or Data Saver.

To re-cut: put the raw `VID*.mp4` files in `videos-and-pics/`, delete the
outputs you want redone, and run `npm run clips`. FFmpeg comes from the
`ffmpeg-static` dev dependency; set `FFMPEG=/path/to/ffmpeg` to use another.

| Clip | Used in |
| --- | --- |
| `aisle-pan` / `shelves-tall` | Hero (desktop / phone) |
| `aisle-pan-2` | "Walk the aisles" band |
| `homemade-tubs` | "From our own kitchen" |
| `brand-mark` | "Our story" |
| `soda-bar`, `freezer` | Soda bar and ice cream |

---

## Where things live

```text
src/
├─ assets/
│  ├─ shop/            # processed photos — the only place images belong
│  ├─ images.js        # image registry: responsive AVIF/WebP + blur placeholders
│  └─ lqip.js          # GENERATED base64 placeholders (npm run assets)
├─ components/
│  ├─ ui/              # SmartImage, Video, Reveal, Section, Button, Lightbox
│  └─ *.jsx            # one file per page section (see App.jsx for order)
├─ lib/
│  ├─ site.js          # single source of truth for business details
│  ├─ text.js          # *italic* heading markup helpers
│  ├─ motion.js        # shared easing curves and reveal variants
│  ├─ hooks.js         # scroll lock, active section, theme, smooth scroll
│  └─ hours.js         # open/closed state, evaluated in Asia/Kolkata
├─ index.css           # design tokens (colour ramps, fluid type, dark mode)
└─ App.jsx
public/video/          # muted video loops + posters (npm run clips)
scripts/
├─ seo-plugin.js       # injects meta + JSON-LD, emits robots/sitemap/manifest
├─ generate-assets.mjs # favicons, OG card, LQIP placeholders
├─ clips.mjs           # raw footage → web loops
├─ smoke-render.mjs    # SSR smoke test (loads scripts/smoke-entry.jsx through Vite)
└─ smoke-entry.jsx
.claude/skills/        # design skills (see above)
DESIGN.md              # the visual language
CLAUDE.md              # working notes for Claude Code
```

---

## Things worth knowing before you edit

**Business details live in one file.** Phone, address, hours, email and maps
links are all in `src/lib/site.js`. The footer, contact form, navbar, every
WhatsApp link *and* the structured data in `<head>` read from it.

**Headings take `*italic*` markup.** `SectionHeader` and `RevealWords` accept
`"Plain words, *the italic phrase.*"` and render the asterisked part as `<em>`.
One italic phrase per heading is the site's typographic signature; keep it.

**Colours come from semantic tokens, not the raw ramp.** Use `bg-canvas`,
`text-ink`, `border-line`, `text-brand` (text-safe accent), `bg-accent`
(marigold fill) and friends. They flip automatically in dark mode, which is why
there are almost no `dark:` variants in the components. The ramps (`indigo-*`,
`marigold-*`, `paper-*`) are for colours that must not change between themes —
type over a photo or video, for instance.

**Enquiries go to WhatsApp.** There is no backend. The contact form validates
and then opens `wa.me` with the enquiry pre-written; see `waMessage` in
`src/lib/site.js`.

**The preloader lives in `index.html`, not in React.** It paints on the first
frame, runs for 5 s (`--sp-intro`, kept in step with `INTRO_MS` in
`src/lib/splash.js`) and self-destructs after 10 s if the bundle never loads.
Its colours are hard-coded there — update them alongside `index.css`.

**Animations must stick to `transform` and `opacity`.** Those are the only two
properties the compositor can animate. Don't animate `height`, `filter`,
`backdrop-filter` or `stroke-dashoffset`; don't drive styles from a
`requestAnimationFrame` loop; don't use `mix-blend-mode`; prefer
`layout="position"` on list items; use `IntersectionObserver` rather than
scroll handlers.

**Motion is centralised.** Easing curves and reveal variants are in
`src/lib/motion.js`. `<MotionConfig reducedMotion="user">` in `App.jsx` covers
Framer; a media query at the bottom of `index.css` covers CSS animations; and
`<Video>` shows posters only.

**`import.meta.glob` options must be inline literals.** Vite parses them
statically; hoisting the imagetools query in `images.js` into a constant makes
it silently ignored.

---

## Known gaps

- **`geo` coordinates are missing from the structured data.** Add the real
  lat/lng from the Google Business listing as `site.geo = { lat, lng }`.
- **Testimonials are placeholder copy.** Replace with real Google reviews.
- **Instagram and Facebook URLs are empty** in `site.js`; the footer hides
  blank entries.
- **Prices shown are the ones printed on packets and boards in the photos**
  (butter bhakarwadi, sodas, ice cream). Everything else says "enquire".

---

## Licence

MIT — see [LICENSE](LICENSE).
