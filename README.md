# Shree Nandi Gruhudhyog

Marketing site for **Shree Nandi Gruhudhyog** (શ્રી નંદી ગૃહ ઉદ્યોગ) — a family
gruhudhyog in Khoraj, Gandhinagar selling homemade Gujarati farsan, khakhra,
bhakhri and bakery alongside a soda bar, ice cream and 500+ stocked brands.

React 19 · Vite 8 · Tailwind CSS 4 · Framer Motion 12 · deployed to GitHub Pages.

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
| `npm run lint`    | ESLint over the whole project                                             |
| `npm run smoke`   | Render the app once via SSR to catch crashes and invalid props            |
| `npm run assets`  | Regenerate favicons, the social share card, and blur-up placeholders      |
| `npm run deploy`  | Build and publish `dist/` to the `gh-pages` branch                        |

---

## Where things live

```text
src/
├─ assets/
│  ├─ shop/            # source photos — the only place raw images belong
│  ├─ images.js        # image registry: responsive AVIF/WebP + blur placeholders
│  └─ lqip.js          # GENERATED base64 placeholders (npm run assets)
├─ components/
│  ├─ ui/              # SmartImage, Reveal, Section, Button, Lightbox
│  └─ *.jsx            # one file per page section
├─ lib/
│  ├─ site.js          # single source of truth for business details
│  ├─ motion.js        # shared easing curves and reveal variants
│  ├─ hooks.js         # scroll lock, active section, theme, smooth scroll
│  └─ hours.js         # open/closed state, evaluated in Asia/Kolkata
├─ index.css           # design tokens (colour ramps, fluid type, dark mode)
└─ App.jsx
scripts/
├─ seo-plugin.js       # injects meta + JSON-LD, emits robots/sitemap/manifest
├─ generate-assets.mjs # favicons, OG card, LQIP placeholders
└─ smoke-render.mjs    # SSR smoke test
```

---

## Things worth knowing before you edit

**Business details live in one file.** Phone number, address, hours, email and
maps links are all in [`src/lib/site.js`](src/lib/site.js). The footer, contact
form, navbar, every WhatsApp link *and* the structured data in `<head>` all read
from it. Change it once.

**Images go through the registry.** Drop a photo into `src/assets/shop/`, run
`npm run assets` to regenerate its blur placeholder, then reference it as
`img.yourFileName` (filename kebab-case → camelCase). Never import from
`assets/shop/` directly — `<SmartImage>` handles responsive sizing, AVIF/WebP
negotiation and blur-up, and bypassing it means shipping the full-size original.

**Colours come from semantic tokens, not the raw ramp.** Use `bg-canvas`,
`text-ink`, `border-line`, `bg-brand` and friends. They flip automatically in
dark mode, which is why there are almost no `dark:` variants in the components.
The ramps (`saffron-*`, `clay-*`, `gold-*`) are for cases where a colour must not
change between themes — text on a photo, for instance.

**Enquiries go to WhatsApp.** There is no backend. The contact form validates and
then opens `wa.me` with the enquiry pre-written; see `waMessage` in
`src/lib/site.js`. If you ever add a server, that is the single place to change.

**The preloader lives in `index.html`, not in React.** Markup, inline styles and
the progress ring are all in the HTML so it paints on the first frame — a splash
rendered by React could only appear *after* the JS bundle downloaded, missing the
wait it exists to cover. [`src/lib/splash.js`](src/lib/splash.js) dismisses it
once webfonts have settled and the hero image has decoded, with a 900ms floor so
it can't flash and a 3.2s ceiling so a slow connection can't trap anyone. Repeat
visits in the same session get a much shorter version. There is also a 6s
self-destruct in the inline script, because a splash baked into the HTML would
otherwise cover the page forever if the bundle failed to load. Images that the
loader should wait for are marked by `<SmartImage priority>`, which emits
`data-splash-wait`.

**Motion is centralised.** Easing curves and reveal variants are in
`src/lib/motion.js` and mirrored as CSS custom properties in `index.css`.
`<MotionConfig reducedMotion="user">` in `App.jsx` handles
`prefers-reduced-motion` for everything Framer drives; the CSS animations
(marquee, pulses) are covered by a media query at the bottom of `index.css`.

**`import.meta.glob` options must be inline literals.** Vite parses them
statically. Hoisting the imagetools query in `images.js` into a constant makes it
silently ignored — images still load, but as untransformed full-size originals.

---

## Known gaps

- **`geo` coordinates are missing from the structured data.** Add the real
  lat/lng from the Google Business listing as `site.geo = { lat, lng }` and the
  SEO plugin will include it. It is deliberately absent rather than guessed,
  since a wrong pin is worse than none.
- **Testimonials and product ratings are placeholder copy**, as are the
  "10,000+ customers" and "15+ years" figures in the stats band. Replace them
  with real reviews before relying on them.
- **Instagram and Facebook URLs are empty** in `site.js`. The footer hides blank
  entries rather than rendering dead links — fill them in to show the icons.

---

## Licence

MIT — see [LICENSE](LICENSE).
