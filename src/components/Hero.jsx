import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MessageCircle, Navigation, ArrowDown } from 'lucide-react'
import Video from './ui/Video'
import Button from './ui/Button'
import { splitWords, plainText } from '../lib/text'
import { site, whatsappLink, waMessage } from '../lib/site'
import { useOpenState } from '../lib/hours'
import { ease, wordReveal } from '../lib/motion'
import { scrollToId } from '../lib/hooks'

const HEADLINE = 'Farsan, khakhra, bakery. *Made fresh in Khoraj.*'

const facts = [
  ['500+', 'products on the shelves'],
  ['16', 'soda flavours at the counter'],
  ['Daily', 'homemade batches'],
  ['Pan-India', 'delivery by courier'],
]

/**
 * Cinematic hero.
 *
 * A muted loop of the aisles, shot in the shop, fills the first screen. The
 * type sits on an indigo scrim that is solid on the left and clears to the
 * right, so the shelves read through beside the headline rather than behind
 * it. On phones a portrait cut of the same footage is used so the pan isn't
 * cropped to a sliver.
 */
export default function Hero() {
  const ref = useRef(null)
  const { isOpen, detail } = useOpenState()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // The copy drifts up and fades as the hero scrolls away; the video stays put.
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '24%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const words = splitWords(HEADLINE)

  return (
    <section
      id="home"
      ref={ref}
      className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-indigo-950 text-paper-50"
    >
      <Video
        name="aisle-pan"
        portraitName="shelves-tall"
        fill
        priority
        className="z-0"
        videoClassName="scale-[1.02]"
      />
      <div aria-hidden="true" className="hero-scrim absolute inset-0 z-[1]" />

      <motion.div
        style={{ y: copyY, opacity: fade }}
        className="relative z-[2] mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-10 pt-[calc(var(--nav-h)+3rem)] will-change-transform sm:px-8 lg:px-10 lg:pb-14"
      >
        {/* Live open/closed state, computed in the shop's timezone */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: ease.outExpo, delay: 0.15 }}
          className="mb-8 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/20 bg-indigo-950/40 py-1.5 pl-2 pr-4 backdrop-blur-sm"
        >
          <span className="relative grid h-5 w-5 place-items-center">
            <span className={`h-2 w-2 rounded-full ${isOpen ? 'bg-leaf-400' : 'bg-paper-400'}`} />
            {isOpen && (
              <motion.span
                animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                className="absolute h-2 w-2 rounded-full bg-leaf-400"
              />
            )}
          </span>
          <span className="font-body text-xs font-semibold text-paper-50">
            {isOpen ? 'Open now' : 'Closed'}
            <span className="ml-1.5 font-medium text-paper-50/60">· {detail}</span>
          </span>
        </motion.div>

        <h1 className="text-display max-w-5xl">
          <span className="sr-only">{plainText(HEADLINE)}</span>
          <motion.span
            aria-hidden="true"
            variants={wordReveal.container(0.055)}
            initial="hidden"
            animate="visible"
          >
            {words.map(({ word, italic }, i) => (
              <span key={word + i} className="inline-block overflow-hidden align-bottom pb-[0.08em]">
                <motion.span variants={wordReveal.word} className="inline-block">
                  {italic ? <em className="text-marigold-400">{word}</em> : word}
                </motion.span>
                {i < words.length - 1 ? <span>&nbsp;</span> : null}
              </span>
            ))}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: ease.outExpo }}
          className="text-lead mt-7 max-w-xl text-paper-50/80"
        >
          A family gruhudhyog in PANACHE, Khoraj. Our own farsan, chakri, khakhra and
          cookies, beside five hundred brands, a soda bar and a Hocco freezer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.68, ease: ease.outExpo }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Button href={whatsappLink(waMessage.general)} variant="whatsapp" size="lg">
            <MessageCircle size={18} />
            Order on WhatsApp
          </Button>
          <Button href={site.mapsLink} variant="outlineLight" size="lg">
            <Navigation size={16} />
            Get directions
          </Button>
        </motion.div>

        {/* Fact row along the bottom edge */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="mt-14 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/15 pt-6 sm:grid-cols-4"
        >
          {facts.map(([n, label]) => (
            <li key={label} className="flex flex-col">
              <span className="font-display text-3xl leading-none text-paper-50 sm:text-4xl">{n}</span>
              <span className="mt-2 font-body text-xs font-medium tracking-wide text-paper-50/55">
                {label}
              </span>
            </li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.button
        onClick={() => scrollToId('products')}
        aria-label="Scroll to products"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ opacity: fade }}
        className="absolute bottom-6 right-6 z-[2] hidden h-11 w-11 place-items-center rounded-full border border-white/25 text-paper-50/80 lg:grid"
      >
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.button>
    </section>
  )
}
