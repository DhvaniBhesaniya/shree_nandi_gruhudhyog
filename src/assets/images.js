/**
 * Central image registry.
 *
 * Every shop photo is imported once here through vite-imagetools, which emits
 * responsive AVIF + WebP variants at build time. Each entry is paired with an
 * inlined base64 blur-up placeholder from the generated `lqip.js`.
 *
 * Components never import from `./shop/*` directly — they pull named entries
 * from `img` below and hand them to <SmartImage>, so responsive sizing and
 * blur-up behaviour stay consistent and the source files live in one place.
 */

// Blur-up placeholders come from a generated module of base64 data URIs rather
// than from imagetools. imagetools writes through emitFile, which bypasses
// Vite's assetsInlineLimit — routing placeholders through the bundler produced
// 32 separate ~100-byte requests that landed about as late as the real images,
// defeating the point. Regenerate with `npm run assets`.
import { lqip } from './lqip.js'

/*
 * Three widths cover phone → desktop → 2x retina. `withoutEnlargement` (a
 * default directive in vite.config.js) stops small originals from being
 * upscaled into wasted bytes; their srcset simply tops out early.
 *
 * AVIF is primary with WebP as fallback — between them that's ~99% of browsers,
 * so a third JPEG ladder would only add build weight. `as=picture` puts the
 * LAST listed format in `img.src`, so WebP is what any browser landing on the
 * bare <img> gets.
 *
 * NOTE: the query string MUST stay an inline literal. Vite statically analyses
 * `import.meta.glob` options at transform time, so hoisting the query into a
 * const makes it silently unparseable — the images still resolve, but as
 * untransformed full-size originals.
 */
const pictures = import.meta.glob('./shop/*.{jpeg,png}', {
  query: '?w=480;800;1280&format=avif;webp&as=picture',
  import: 'default',
  eager: true,
})

/** `./shop/shop-exterior-night.jpeg` -> `shopExteriorNight` */
const toKey = (path) =>
  path
    .replace(/^\.\/shop\//, '')
    .replace(/\.(jpeg|jpg|png)$/, '')
    .replace(/-(\w)/g, (_, c) => c.toUpperCase())

/**
 * @typedef {object} Picture
 * @property {Record<string, string>} sources  format -> srcset
 * @property {{ src: string, w: number, h: number }} img  fallback + intrinsic size
 * @property {string} lqip   inlined blurred placeholder (data URI)
 * @property {number} aspect intrinsic aspect ratio (w/h)
 */

/** @type {Record<string, Picture>} */
export const img = Object.fromEntries(
  Object.entries(pictures).map(([path, picture]) => {
    const key = toKey(path)
    return [
      key,
      {
        ...picture,
        lqip: lqip[key],
        aspect: picture.img.w / picture.img.h,
      },
    ]
  }),
)

if (import.meta.env.DEV) {
  const broken = Object.entries(img).filter(
    ([, v]) => !v.lqip || !v.sources?.avif || !v.img?.w,
  )
  if (broken.length) {
    console.warn(
      '[images] incomplete entries — if lqip is missing run `npm run assets`; ' +
        'if sources/img are missing the imagetools query is not applying:',
      broken.map(([k]) => k),
    )
  }
}
