import { useEffect, useRef, useState } from 'react'

const BASE = import.meta.env.BASE_URL

/**
 * Muted, looping video clip from public/video.
 *
 * Every clip is a short (≤ 12 s) H.264 + VP9 loop cut from the shop's own
 * footage by scripts/clips.mjs, with a JPEG poster beside it. Audio was
 * stripped at encode time — there is nothing to unmute.
 *
 * Behaviour:
 *   - plays only while on screen (IntersectionObserver), so eight loops on one
 *     page don't all decode at once
 *   - under prefers-reduced-motion, or when the visitor has Data Saver on,
 *     renders only the poster
 *   - `portraitName` swaps in a portrait cut on narrow screens so a landscape
 *     pan isn't cropped to a sliver on a phone
 *
 * @param {object} props
 * @param {string}  props.name          clip base name, e.g. "aisle-pan"
 * @param {string}  [props.portraitName] clip to use under 768px
 * @param {boolean} [props.priority]    preload fully (hero only)
 * @param {number}  [props.aspect]      reserve space from a ratio (w/h)
 * @param {boolean} [props.fill]        absolutely fill the parent
 */
export default function Video({
  name,
  portraitName,
  priority = false,
  aspect,
  fill = false,
  className = '',
  videoClassName = '',
  ...rest
}) {
  const ref = useRef(null)
  // Poster-only cases are decided once, at first render: reduced motion, or
  // Data Saver switched on.
  const [still] = useState(
    () =>
      typeof window !== 'undefined' &&
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        navigator.connection?.saveData === true),
  )
  const [clip, setClip] = useState(() =>
    portraitName && typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
      ? portraitName
      : name,
  )

  // Swap between the landscape and portrait cuts if the viewport crosses over.
  useEffect(() => {
    if (!portraitName) return
    const mq = window.matchMedia('(max-width: 767px)')
    const onChange = (e) => setClip(e.matches ? portraitName : name)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [name, portraitName])

  // Play only while visible.
  useEffect(() => {
    const el = ref.current
    if (!el || still) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // play() rejects if autoplay is blocked; the poster stays, which is fine.
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { rootMargin: '120px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [still, clip])

  const poster = `${BASE}video/${clip}.jpg`
  const box = `overflow-hidden ${fill ? 'absolute inset-0' : 'relative'} ${className}`
  const media = `h-full w-full object-cover ${fill ? 'absolute inset-0' : ''} ${videoClassName}`

  return (
    <div className={box} style={fill || !aspect ? undefined : { aspectRatio: aspect }} {...rest}>
      {still ? (
        <img src={poster} alt="" className={media} loading={priority ? 'eager' : 'lazy'} />
      ) : (
        <video
          key={clip}
          ref={ref}
          muted
          loop
          playsInline
          autoPlay
          disablePictureInPicture
          preload={priority ? 'auto' : 'metadata'}
          poster={poster}
          aria-hidden="true"
          tabIndex={-1}
          className={media}
        >
          <source src={`${BASE}video/${clip}.webm`} type="video/webm" />
          <source src={`${BASE}video/${clip}.mp4`} type="video/mp4" />
        </video>
      )}
    </div>
  )
}
