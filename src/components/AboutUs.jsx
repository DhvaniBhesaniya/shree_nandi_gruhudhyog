import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SmartImage from './ui/SmartImage'
import Button from './ui/Button'
import { Reveal, RevealWords } from './ui/Reveal'
import { img } from '../assets/images'
import { site } from '../lib/site'
import { ease, slideFrom } from '../lib/motion'
import { scrollToId } from '../lib/hooks'

/**
 * Our story.
 *
 * The Gujarati passages are marked `lang="gu"`, which both switches them to
 * Noto Serif Gujarati (they previously rendered in whatever the OS happened to
 * pick, at a visibly smaller optical size than the surrounding Latin) and tells
 * screen readers to change voice.
 */
export default function AboutUs() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const frontY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])
  const backY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section
      id="about"
      ref={ref}
      className="grain relative overflow-hidden bg-inverse py-24 text-white md:py-36"
    >
      <div
        aria-hidden="true"
        className="absolute -right-1/4 top-1/4 h-[60vh] w-[60vw] rounded-full bg-saffron-800/20 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-10">
        {/* ---------------------------------------------------------- photos */}
        <div className="relative lg:col-span-5">
          <motion.div
            style={{ y: backY }}
            variants={slideFrom(-1, 40)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="overflow-hidden rounded-panel shadow-pop"
          >
            <SmartImage
              picture={img.shopExteriorNight}
              alt={`${site.name} storefront lit up at night`}
              sizes="(max-width: 1024px) 90vw, 38vw"
              aspect={4 / 3}
            />
          </motion.div>

          <motion.div
            style={{ y: frontY }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, delay: 0.2, ease: ease.outExpo }}
            className="relative z-10 -mt-10 ml-auto w-3/4 overflow-hidden rounded-panel border-4 border-inverse shadow-pop"
          >
            <SmartImage
              picture={img.shopLogoBanner}
              alt="The Shree Nandi counter, with the shop name in Gujarati"
              sizes="(max-width: 1024px) 68vw, 28vw"
              aspect={4 / 3}
            />
          </motion.div>
        </div>

        {/* ------------------------------------------------------------ copy */}
        <div className="lg:col-span-7 lg:pl-6">
          <Reveal as="p" className="eyebrow mb-5 flex items-center gap-2.5 text-gold-400">
            <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
            Our story
          </Reveal>

          <RevealWords
            text="A family kitchen that became the neighbourhood shop"
            as="h2"
            className="font-display text-h2 font-semibold text-white"
          />

          <p
            lang="gu"
            className="mt-5 font-display text-h3 font-medium text-gold-300"
            aria-label="Shree Nandi Gruhudhyog in Gujarati"
          >
            {site.nameGuj}
          </p>

          <div className="mt-7 space-y-5 font-body leading-relaxed text-white/70">
            <Reveal as="p" delay={0.05}>
              Shree Nandi Gruhudhyog began the way most gruhudhyogs do — one kitchen, a
              handful of recipes, and food made for neighbours before it was ever made for
              customers. The chakri, the khari, the farsan: all of it started at home.
            </Reveal>

            <Reveal as="p" delay={0.1}>
              Today the shop in Khoraj carries over five hundred items. Our own homemade
              range sits on the same shelves as Shantaben khakhra, Mother's Recipe pickles,
              Cornitos and Jabsons — because a good shop should be where you finish your
              list, not where you start another one.
            </Reveal>

            <Reveal as="p" delay={0.15}>
              There is a soda bar at the counter, Hocco ice cream in the freezer, and
              bakery in every morning. <span lang="gu">ખાખરા, નમકીન, અથાણા, બેકરી પ્રોડક્ટ</span>{' '}
              — all under one roof.
            </Reveal>
          </div>

          <Reveal delay={0.2} className="mt-9 flex flex-wrap gap-3">
            <Button href={site.mapsLink} variant="solidLight" size="lg">
              Visit the shop
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              onClick={() => scrollToId('tour')}
              variant="glass"
              size="lg"
              shine={false}
            >
              Look inside
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
