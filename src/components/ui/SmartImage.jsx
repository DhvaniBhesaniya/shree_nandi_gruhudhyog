import { useRef, useState, useEffect } from 'react'

/**
 * Responsive, blur-up image.
 *
 * Takes a `Picture` entry from src/assets/images.js and renders a real
 * <picture> with AVIF and WebP srcsets, so the browser downloads the smallest
 * format and width it actually needs — typically 12–25 KB instead of the
 * 400–600 KB originals these photos started as.
 *
 * The 24px blurred placeholder is inlined in the CSS bundle as a data URI, so
 * it paints immediately with no extra request and cross-fades to the real photo.
 *
 * @param {object}  props
 * @param {import('../../assets/images.js').Picture} props.picture
 * @param {string}  props.alt          Empty string for purely decorative images.
 * @param {string}  props.sizes        CSS `sizes` — needed for the browser to
 *                                     pick sensibly; defaults to full-width.
 * @param {boolean} props.priority     Eager-load + high fetch priority. Use for
 *                                     above-the-fold images only.
 * @param {number}  props.aspect       Override the intrinsic ratio (w/h).
 * @param {boolean} props.fill         Absolutely fill the parent instead of
 *                                     reserving space from the aspect ratio.
 */
export default function SmartImage({
  picture,
  alt = '',
  sizes = '100vw',
  className = '',
  imgClassName = '',
  priority = false,
  aspect,
  fill = false,
  ...rest
}) {
  const imgRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  // An image served from cache can finish decoding before React attaches
  // onLoad, which would leave the blur layer stuck on top forever.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [])

  if (!picture) return null

  const ratio = aspect ?? picture.aspect

  return (
    <div
      className={`relative overflow-hidden ${fill ? 'absolute inset-0' : ''} ${className}`}
      // Reserving the ratio is what keeps these images from shifting the layout
      // as they arrive — the single biggest CLS win on an image-heavy page.
      style={fill || !ratio ? undefined : { aspectRatio: ratio }}
    >
      {/* Blur placeholder. Scaled up slightly so the blur's soft edge doesn't
          leave a visible border against the container. */}
      {picture.lqip && !loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 scale-110 bg-cover bg-center blur-xl"
          style={{ backgroundImage: `url("${picture.lqip}")` }}
        />
      )}

      <picture>
        {Object.entries(picture.sources).map(([format, srcSet]) => (
          <source key={format} type={`image/${format}`} srcSet={srcSet} sizes={sizes} />
        ))}
        <img
          ref={imgRef}
          src={picture.img.src}
          width={picture.img.w}
          height={picture.img.h}
          alt={alt}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          // Explicit hook for src/lib/splash.js, which holds the preloader until
          // the above-the-fold images have decoded. A data- attribute rather
          // than reusing fetchpriority: React emits that one camelCased, and
          // relying on HTML's case-insensitive attribute matching to find it
          // again is a subtlety the loader shouldn't hinge on.
          data-splash-wait={priority ? 'true' : undefined}
          decoding={priority ? 'sync' : 'async'}
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
          {...rest}
        />
      </picture>
    </div>
  )
}
