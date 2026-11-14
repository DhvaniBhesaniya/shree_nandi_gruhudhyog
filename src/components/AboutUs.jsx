import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SmartImage from './ui/SmartImage'
import Video from './ui/Video'
import Button from './ui/Button'
import { Reveal, RevealWords } from './ui/Reveal'
import { img } from '../assets/images'
import { site } from '../lib/site'
import { ease } from '../lib/motion'
import { scrollToId } from '../lib/hooks'

/**
 * Our story, on the indigo ground the brand uses on its own boxes.
 *
 * The portrait loop shows the shop's roundel on a puff box, the photograph
 * the storefront at dusk. Gujarati passages are marked `lang="gu"` so they
 * render in the Gujarati serif and screen readers switch voice.
 */
export default function AboutUs() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])

  return (
    <section
      id="about"
      ref={ref}
      className="grain relative overflow-hidden bg-inverse py-24 text-paper-50 md:py-36"
    >
      {/* Huge, faint Gujarati name as the section's texture */}
      <p
        lang="gu"
        aria-hidden="true"
        className="pointer-events-none absolute -left-6 bottom-6 select-none font-display text-[22vw] leading-none text-paper-50/[0.04]"
      >
        ગૃહ ઉદ્યોગ
      </p>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-10">
        {/* ---------------------------------------------------------- visuals */}
        <div className="relative lg:col-span-5">
          <Reveal className="overflow-hidden rounded-panel shadow-pop">
            <Video name="brand-mark" aspect={4 / 5} />
          </Reveal>

          <motion.div
            style={{ y: photoY }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, delay: 0.2, ease: ease.outExpo }}
            className="relative z-10 -mt-16 ml-auto w-2/3 overflow-hidden rounded-card border-[6px] border-inverse shadow-pop"
          >
            <SmartImage
              picture={img.storefrontEvening}
              alt={`${site.name} storefront at dusk, the signboard lit`}
              sizes="(max-width: 1024px) 60vw, 26vw"
              aspect={3 / 4}
            />
          </motion.div>
        </div>

        {/* ------------------------------------------------------------ copy */}
        <div className="lg:col-span-7 lg:pl-6">
          <Reveal as="p" className="eyebrow mb-5 flex items-center gap-3 text-marigold-400">
            <span aria-hidden="true" className="rule-accent" />
            Our story
          </Reveal>

          <RevealWords
            text="A family kitchen that became *the neighbourhood shop.*"
            as="h2"
            className="text-h2 text-paper-50"
            emClassName="text-marigold-400"
          />

          <p lang="gu" className="mt-5 font-display text-2xl text-paper-50/80" aria-label="Shree Nandi Gruhudhyog in Gujarati">
            {site.nameGuj}
          </p>

          <div className="mt-8 space-y-5 font-body text-[1.02rem] leading-relaxed text-paper-50/75">
            <Reveal as="p" delay={0.05}>
              Shree Nandi Gruhudhyog began the way most gruhudhyogs do — one kitchen, a
              handful of recipes, and food made for neighbours before it was ever made for
              customers. The chakri, the khari, the farsan: all of it started at home.
            </Reveal>
            <Reveal as="p" delay={0.1}>
              Today the shop in Khoraj carries over five hundred items. Our own homemade
              range sits on the same shelves as Jalaram patra, Mother's Recipe pickles,
              Cornitos and Jabsons — because a good shop should be where you finish your
              list, not where you start another one.
            </Reveal>
            <Reveal as="p" delay={0.15}>
              There is a soda bar at the counter, Hocco ice cream in the freezer, and
              bakery in every morning.{' '}
              <span lang="gu" className="text-paper-50">ખાખરા, નમકીન, અથાણા, બેકરી પ્રોડક્ટ</span>{' '}
              — all under one roof.
            </Reveal>
          </div>

          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
            <Button href={site.mapsLink} variant="light" size="lg">
              Visit the shop
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </Button>
            <Button onClick={() => scrollToId('tour')} variant="outlineLight" size="lg">
              Walk the aisles
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
