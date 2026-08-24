import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, MessageCircle, ArrowRight, Navigation } from 'lucide-react'
import SmartImage from './ui/SmartImage'
import Button from './ui/Button'
import { img } from '../assets/images'
import { site, whatsappLink, waMessage } from '../lib/site'
import { useOpenState } from '../lib/hours'
import { ease, wordReveal } from '../lib/motion'
import { scrollToId } from '../lib/hooks'

const HEADLINE = ['Taste', 'the', 'tradition,', 'love', 'every', 'bite']

const trust = [
  'Homemade daily',
  'No preservatives',
  '500+ products',
  'Pan-India delivery',
]

/**
 * Editorial split hero.
 *
 * Deliberately not the previous "full-bleed photo behind a dark scrim" pattern:
 * that's the most generic hero on the web, it buried the shop's signboard under
 * a 60% black overlay, and the only wide source photo available is 780px across
 * so it looked soft when stretched. A type-led split instead lets the portrait
 * shop photos be used at their native orientation and sharp.
 */
export default function Hero() {
  const ref = useRef(null)
  const { isOpen, detail } = useOpenState()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Layers drift at different rates as the hero scrolls away. Small distances —
  // parallax reads as depth up to a point, then starts reading as a glitch.
  const frontY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const backY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '32%'])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      id="home"
      ref={ref}
      className="grain relative flex min-h-[100svh] items-center overflow-hidden pt-[calc(var(--nav-h)+2rem)] pb-16 md:pb-24"
    >
      {/* Warm ground. Two offset radial washes give the flat canvas some depth
          without introducing another image to download.

          These are gradients, not blurred solid boxes. `filter: blur(100px)` on
          a 70vw element is a genuinely expensive rasterisation on a mid-range
          phone, and a radial gradient gives the identical soft falloff with no
          filter at all. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-canvas">
        <div className="hero-wash-a absolute -left-1/4 top-0 h-[70vh] w-[70vw]" />
        <div className="hero-wash-b absolute -right-[12%] bottom-0 h-[60vh] w-[60vw]" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-10">
        {/* ------------------------------------------------------------ copy */}
        <motion.div style={{ y: copyY, opacity: fade }} className="will-change-transform lg:col-span-6">
          {/* Live open/closed state, computed in the shop's timezone */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: ease.outExpo }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/85 py-1.5 pl-2 pr-4"
          >
            <span
              className={`relative grid h-6 w-6 place-items-center rounded-full ${
                isOpen ? 'bg-leaf-500/15' : 'bg-clay-400/20'
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${isOpen ? 'bg-leaf-500' : 'bg-clay-400'}`}
              />
              {isOpen && (
                <motion.span
                  animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute h-2 w-2 rounded-full bg-leaf-500"
                />
              )}
            </span>
            <span className="font-body text-xs font-semibold text-ink">
              {isOpen ? 'Open now' : 'Closed'}
              <span className="ml-1.5 font-normal text-ink-faint">· {detail}</span>
            </span>
          </motion.div>

          <h1 className="font-display text-display font-semibold text-ink">
            <span className="sr-only">{HEADLINE.join(' ')}</span>
            <motion.span
              aria-hidden="true"
              variants={wordReveal.container(0.06)}
              initial="hidden"
              animate="visible"
            >
              {HEADLINE.map((word, i) => (
                <span key={word + i} className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    variants={wordReveal.word}
                    className={`inline-block ${i >= 3 ? 'text-gradient' : ''}`}
                  >
                    {word}
                  </motion.span>
                  {i < HEADLINE.length - 1 ? <span>&nbsp;</span> : null}
                </span>
              ))}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: ease.outExpo }}
            className="text-lead mt-6 max-w-xl text-ink-soft"
          >
            Authentic Gujarati farsan, namkeen, khakhra, bhakhri and pickles — our own
            homemade specialities alongside the brands you trust, in{' '}
            <span className="font-medium text-ink">Khoraj, Gandhinagar</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.58, ease: ease.outExpo }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button
              href={whatsappLink(waMessage.general)}
              variant="whatsapp"
              size="lg"
            >
              <MessageCircle size={18} />
              Order on WhatsApp
            </Button>
            <Button
              onClick={() => scrollToId('products')}
              variant="outline"
              size="lg"
              shine={false}
            >
              Explore products
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              href={site.mapsLink}
              variant="ghost"
              size="lg"
              shine={false}
              className="hidden sm:inline-flex"
            >
              <Navigation size={16} />
              Directions
            </Button>
          </motion.div>

          {/* Trust row */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2.5 border-t border-line pt-6"
          >
            {trust.map((t) => (
              <li
                key={t}
                className="flex items-center gap-2 font-body text-xs font-medium text-ink-faint"
              >
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand" />
                {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* ----------------------------------------------------------- photos */}
        <div className="relative lg:col-span-6 lg:pl-8">
          <div className="relative mx-auto max-w-lg lg:max-w-none">
            {/* Back layer — the storefront */}
            <motion.div
              style={{ y: backY }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.2, ease: ease.outExpo }}
              className="relative z-10 overflow-hidden rounded-panel shadow-pop will-change-transform"
            >
              <SmartImage
                picture={img.shopExteriorDay}
                alt={`${site.name} storefront in Khoraj, Gandhinagar`}
                sizes="(max-width: 1024px) 88vw, 46vw"
                priority
                aspect={4 / 5}
              />
              {/* Signboard is at the top of this shot, so the caption gradient
                  only covers the lower third. */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-clay-950/80 to-transparent p-5 pt-16">
                <p className="flex items-center gap-2 font-body text-sm font-medium text-white">
                  <MapPin size={15} className="shrink-0 text-gold-400" />
                  PANACHE, Khoraj · Gandhinagar
                </p>
              </div>
            </motion.div>

            {/* Front layer — product close-up, overlapping */}
            <motion.div
              style={{ y: frontY }}
              initial={{ opacity: 0, y: 40, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: -4 }}
              transition={{ duration: 1.1, delay: 0.45, ease: ease.outExpo }}
              whileHover={{ rotate: 0, scale: 1.03 }}
              className="absolute -bottom-8 -left-4 z-20 w-36 overflow-hidden rounded-card border-4 border-canvas shadow-pop sm:-left-8 sm:w-44 lg:-left-12 lg:w-52"
            >
              <SmartImage
                picture={img.farsanKhari}
                alt="Freshly made chakri, khari and cookies — our own homemade range"
                sizes="220px"
                aspect={1}
              />
            </motion.div>

            {/* Floating spec card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: ease.outExpo }}
              whileHover={{ y: -4 }}
              className="absolute -right-3 top-8 z-20 rounded-2xl border border-line bg-surface p-4 shadow-lift sm:-right-6"
            >
              <p className="eyebrow text-brand">Soda bar</p>
              <p className="mt-1.5 font-display text-2xl font-semibold text-ink">15+</p>
              <p className="font-body text-xs text-ink-faint">flavours from ₹10</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollToId('products')}
        aria-label="Scroll to products"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <span className="flex h-11 w-7 items-start justify-center rounded-full border border-line-strong p-1.5">
          <motion.span
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="h-2 w-1 rounded-full bg-brand"
          />
        </span>
      </motion.button>
    </section>
  )
}
