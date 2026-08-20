/**
 * Generates the static branding assets that live in public/ :
 *
 *   og-image.jpg        1200x630 social share card (WhatsApp / Facebook / X)
 *   favicon-32.png      browser tab
 *   favicon-16.png      browser tab, small
 *   apple-touch-icon.png 180x180 iOS home screen
 *   icon-512.png        PWA / Android
 *
 * These have to be real files with stable names rather than build-hashed
 * assets, because index.html references them before the bundler runs.
 *
 * Run with:  npm run assets
 */
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const shop = join(root, 'src/assets/shop')
const out = join(root, 'public')

await mkdir(out, { recursive: true })

/* ------------------------------------------------------------------ favicons */
// The logo is a 397x397 PNG; the old favicon shipped it at full 200 KB weight.
const logo = join(shop, 'logo.png')

for (const [name, size] of [
  ['favicon-16.png', 16],
  ['favicon-32.png', 32],
  ['apple-touch-icon.png', 180],
  ['icon-512.png', 512],
]) {
  await sharp(logo)
    .resize(size, size, { fit: 'cover' })
    .png({ compressionLevel: 9, palette: true })
    .toFile(join(out, name))
  console.log('✓', name)
}

/* ------------------------------------------------------------------ OG card */
const OG_W = 1200
const OG_H = 630

// Storefront at night — the lit signboard is the most recognisable shot, and a
// dark base means the overlaid type stays legible without a heavy scrim.
const base = await sharp(join(shop, 'shop-exterior-night.jpeg'))
  .resize(OG_W, OG_H, { fit: 'cover', position: 'centre' })
  .modulate({ brightness: 0.62, saturation: 1.12 })
  .blur(2)
  .toBuffer()

const logoBadge = await sharp(logo)
  .resize(128, 128, { fit: 'cover' })
  .composite([
    {
      // Circular mask, so the square logo reads as a badge.
      input: Buffer.from(
        `<svg width="128" height="128"><circle cx="64" cy="64" r="64" fill="#fff"/></svg>`,
      ),
      blend: 'dest-in',
    },
  ])
  .png()
  .toBuffer()

// Latin-only text: sharp renders SVG through librsvg using system fonts, and a
// Gujarati string would silently fall back to tofu on most build machines.
const overlay = Buffer.from(`
<svg width="${OG_W}" height="${OG_H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="scrim" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%"   stop-color="#1a0f05" stop-opacity="0.94"/>
      <stop offset="55%"  stop-color="#1a0f05" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#1a0f05" stop-opacity="0.30"/>
    </linearGradient>
  </defs>
  <rect width="${OG_W}" height="${OG_H}" fill="url(#scrim)"/>
  <rect x="0" y="${OG_H - 10}" width="${OG_W}" height="10" fill="#e8760c"/>

  <text x="86" y="392" font-family="Georgia, 'Times New Roman', serif"
        font-size="74" font-weight="700" fill="#ffffff">Shree Nandi Gruhudhyog</text>

  <text x="86" y="452" font-family="Georgia, serif" font-size="33"
        font-style="italic" fill="#f5c842">Taste the tradition, love every bite</text>

  <text x="86" y="524" font-family="Helvetica, Arial, sans-serif" font-size="26"
        font-weight="600" fill="#ffffff" opacity="0.82"
        letter-spacing="1.6">FARSAN &#183; NAMKEEN &#183; KHAKHRA &#183; PICKLES &#183; SODA BAR</text>

  <text x="86" y="566" font-family="Helvetica, Arial, sans-serif" font-size="24"
        fill="#ffffff" opacity="0.62">Khoraj, Gandhinagar &#183; Open daily 9 AM &#8211; 9 PM</text>
</svg>`)

await sharp(base)
  .composite([
    { input: overlay, top: 0, left: 0 },
    { input: logoBadge, top: 76, left: 86 },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(join(out, 'og-image.jpg'))

console.log('✓ og-image.jpg')

/* ------------------------------------------------------------------- LQIP */
/*
 * Blur-up placeholders, emitted as base64 data URIs in a generated module.
 *
 * vite-imagetools writes its output through emitFile, which bypasses Vite's
 * assetsInlineLimit — so generating these through the bundler produced 32
 * separate ~100-byte files. Each then cost a round trip and landed at roughly
 * the same moment as the real 15 KB AVIF, which defeats the whole point of
 * having a placeholder. Inlining them costs ~6 KB of JS and zero requests.
 */
const { readdirSync } = await import('node:fs')
const { writeFile } = await import('node:fs/promises')

const toKey = (f) =>
  f.replace(/\.(jpeg|jpg|png)$/, '').replace(/-(\w)/g, (_, c) => c.toUpperCase())

const entries = []
for (const file of readdirSync(shop).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort()) {
  const buf = await sharp(join(shop, file))
    .resize(24, 24, { fit: 'inside' })
    .blur(1.5)
    .webp({ quality: 42 })
    .toBuffer()
  entries.push([toKey(file), `data:image/webp;base64,${buf.toString('base64')}`])
}

await writeFile(
  join(root, 'src/assets/lqip.js'),
  '// GENERATED by scripts/generate-assets.mjs — do not edit by hand.\n' +
    '// Regenerate with `npm run assets` after adding or replacing shop photos.\n' +
    'export const lqip = {\n' +
    entries.map(([k, v]) => `  ${k}: '${v}',`).join('\n') +
    '\n}\n',
)

const bytes = entries.reduce((n, [, v]) => n + v.length, 0)
console.log(`✓ lqip.js (${entries.length} placeholders, ${(bytes / 1024).toFixed(1)} KB inline)`)
