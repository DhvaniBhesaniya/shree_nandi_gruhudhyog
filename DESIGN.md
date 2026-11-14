# DESIGN.md — Shree Nandi Gruhudhyog

The visual language of the site, with the reasons attached, so any agent or
designer can make the next decision without asking. Tokens live in
`src/index.css`; this file explains them.

## Brand

- **Business:** family gruhudhyog (home industry) and neighbourhood shop in
  Khoraj, Gandhinagar. Homemade Gujarati farsan, khakhra, bhakhri, bakery, a
  soda bar, ice cream, 500+ stocked brands.
- **Audience:** families in Gandhinagar and Ahmedabad, NRIs ordering by post,
  retailers and offices buying in bulk.
- **Feel:** a well-run provision store with a kitchen behind it. Confident,
  warm, unhurried. Think an old Ahmedabad trading house, not a startup.
- **Main action:** order or ask on WhatsApp. Second: get directions.

## Where the colours come from

Nothing here is invented. The shop's own identity, photographed on site:

| Source | What it gives us |
| --- | --- |
| The roundel logo and counter banner — cream script on deep indigo | `indigo` — the dark ground and the ink |
| The neon signboard — marigold letters on a dark fascia | `marigold` — the single accent |
| Hand-written labels on clear packets, kraft boxes, khakhra | `paper` — a warm cream canvas, never white |
| Chilli-red "bestseller" shelf tags | `chilli` — badges only |
| WhatsApp | `leaf` — WhatsApp actions only |

## Palette (semantic tokens)

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `canvas` | paper-50 `oklch(0.975 0.012 85)` | indigo-950 | page ground |
| `surface` | `#fff` | indigo-900 | cards, panels |
| `surface-alt` | paper-100 | indigo-800 | alternating bands |
| `inverse` | indigo-950 `oklch(0.21 0.045 290)` | `oklch(0.13 0.03 290)` | dark sections |
| `ink` | indigo-950 | paper-50 | headings, body |
| `ink-soft` | indigo-600 | paper-300 | secondary copy |
| `brand` | marigold-500 `oklch(0.78 0.16 72)` | marigold-400 | eyebrows, rules, primary CTA |
| `brand-tint` | marigold-50 | indigo-800 | pill backgrounds |

Rules:

- Marigold is an **accent**, used at roughly 5% of any screen: eyebrows,
  the hairline above a heading, one button, a price. Never a full-width
  marigold band.
- Indigo does the heavy lifting: the hero scrim, the "Our story" and footer
  grounds, the ink. It reads as near-black, which is what keeps the site
  from looking purple.
- No gradients on text. No blurred colour blobs. No glass panels on light
  grounds. Shadows are warm (indigo-tinted at low alpha), never neutral black.
- Dark mode is the same palette inverted: indigo grounds, paper ink,
  marigold lifted one step for contrast.

## Type

| Role | Face | Why |
| --- | --- | --- |
| Display / headings | **Instrument Serif** (400, italic) | High-contrast editorial serif. The italic carries one word per heading, which is the site's typographic signature. |
| Body / UI | **Manrope** (400–700) | Geometric but warm; wide enough to sit next to Gujarati without looking thin. |
| Gujarati | **Noto Serif Gujarati** | Matches the serif display; set at 1.06em because the script sits small. |

Scale is fluid (`--text-display` through `--text-eyebrow` in `index.css`).
Headlines are large and tight (`letter-spacing −0.02em`, `line-height 0.95`).
Body is 16px minimum. Eyebrows are 0.72rem uppercase with 0.16em tracking.

**Signature:** every H1/H2 contains exactly one italic phrase
(`<em>`), set in marigold on dark grounds and in ink on light grounds.

## Layout

- Container `max-w-7xl`, gutters 20 / 32 / 40px. Equal left and right edges
  on every section.
- One idea per section, one section per screen where the content allows.
- Alternate grounds: canvas → surface → inverse. Never two dark bands
  touching.
- Square-cornered photographs with a 4px radius; panels use `--radius-panel`
  (1.5rem). One radius scale, no pills on cards.
- Hairlines (`border-line`) do the dividing; cards only where there is a
  real card (a product, a quote).

## Motion

- One easing (`--ease-out-expo`) for reveals, springs for hover/tap.
- Reveal once on scroll, never re-trigger. Headings reveal word by word.
- Hover: linked cards lift 4px, photos zoom 1.03 inside their frame, buttons
  press on tap. No tilt, no parallax on text.
- Video loops are muted, ≤ 12 s, autoplay inline, and each has a poster.
  They pause when off-screen and under `prefers-reduced-motion` show only
  the poster.
- Everything animates `transform` or `opacity` only.

## Photography and video

- The shop's own photographs only. Portrait shelf shots stay portrait.
- Hero: a muted landscape loop of the aisles under an indigo-to-transparent
  scrim, type on the left.
- Portrait loops (soda bar, freezer, homemade tubs, brand mark) sit in
  phone-proportion frames inside sections.
- No captions under pictures. Alt text describes what is on the shelf.

## Copy

- Plain. Name the thing: "Masala khakhra, ₹70 for 250 g", not "artisanal
  crispbread".
- Headings name a noun. Buttons are a verb and an object ("Order on
  WhatsApp", "Get directions").
- Gujarati appears where the shop uses it: the name, the product list, the
  soda menu. Always marked `lang="gu"`.

## Don't

- AI-default looks: purple/pink gradients, glow blobs, glassmorphism,
  Fraunces + Inter, emoji icons, floating 3D blobs.
- Stock photography.
- Carousels that auto-advance text.
- Captions that explain a photograph.
