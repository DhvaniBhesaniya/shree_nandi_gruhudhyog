# Shree Nandi Gruhudhyog — working notes for Claude

Marketing site for a family gruhudhyog (home industry) in Khoraj, Gandhinagar:
homemade Gujarati farsan, khakhra, bhakhri, bakery, a soda bar, ice cream and
500+ stocked brands. React 19 + Vite 8 + Tailwind 4 + Framer Motion 12,
deployed to GitHub Pages.

## Read first

- `DESIGN.md` — the visual language: palette, type, motion, layout rules and
  the reasons behind them. Every UI change must stay on-system with it.
- `README.md` — scripts and where things live.
- `src/lib/site.js` — single source of truth for business details.

## Design skills installed in `.claude/skills/`

| Skill | Use it for |
| --- | --- |
| `ui-ux-pro-max` | Design-system reasoning, palettes, type pairings, UX rules. Search: `python .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain <domain>` (needs Python 3). |
| `design`, `design-system`, `ui-styling`, `brand`, `banner-design` | Tokens, Tailwind/shadcn patterns, brand assets, social banners. |
| `design-taste-frontend` | Anti-slop checklist for landing pages: one system, real photographs, equal edges, hover layer, no AI gradients. |
| `design-motion-principles` | Motion create/audit (Emil Kowalski / Jakub Krehel / Jhey Tompkins lenses). Marketing page weighting: Jakub primary, Jhey secondary, Emil for nav/forms. |
| `frontend-patterns` | React composition, state and render-performance patterns. |
| `video-editing` | FFmpeg-first workflow for cutting the shop footage into web loops. |
| `brand-discovery` | Structured brand interview, if the owners ever want a full brandbook. |

Sources: nextlevelbuilder/ui-ux-pro-max-skill, leonxlnx/taste-skill,
kylezantos/design-motion-principles, affaan-m/ecc. Licences are in each folder.

## Hard rules

- Colours come from `DESIGN.md` through the semantic tokens in `src/index.css`.
  Never a raw hex in a component, never violet/pink gradients, no glow blobs.
- Photos go in `src/assets/shop/` and are registered automatically by
  `src/assets/images.js`; run `npm run assets` after adding any.
- Video loops live in `public/video/` (muted, ≤ 12 s, H.264 + VP9 + poster).
  Regenerate with `npm run clips` from the raw files in `videos-and-pics/`
  (raw files are git-ignored).
- Every animation respects reduced motion. Transform/opacity only on the
  compositor; nothing animates `height`, `filter` or `backdrop-filter`.
- Before finishing: `npm run lint && npm run smoke && npm run build`.
