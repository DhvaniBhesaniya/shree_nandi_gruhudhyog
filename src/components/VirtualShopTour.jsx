import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MoveHorizontal } from 'lucide-react'
import Section, { SectionHeader } from './ui/Section'
import SmartImage from './ui/SmartImage'
import Video from './ui/Video'
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal'
import { img } from '../assets/images'
import { scaleIn } from '../lib/motion'

const aisles = [
  { picture: img.homemadeMixesShelf, label: 'Homemade mixes and sev' },
  { picture: img.biscuitWall, label: 'The biscuit wall' },
  { picture: img.vijayMamraShelf, label: 'Mamra and murmura' },
  { picture: img.noodleWall, label: 'Noodles and instant' },
  { picture: img.paperDosaSchezwan, label: 'Paper dosa and frozen' },
  { picture: img.jalaramPatra, label: 'Patra and Gujarati brands' },
  { picture: img.hoccoFreezer, label: 'The Hocco freezer' },
  { picture: img.beverageRefrigerator, label: 'Chilled drinks' },
]

/**
 * Walk the aisles.
 *
 * A full-width loop of the shelf pan, then a strip of the aisles and the
 * drag-to-pan panorama. The video band is edge to edge on purpose: it is the
 * one place on the page where the shop is shown at the scale you'd see it.
 */
export default function VirtualShopTour() {
  const [dragged, setDragged] = useState(false)
  const viewportRef = useRef(null)

  return (
    <>
      <Section id="tour" tone="canvas" size="lg" className="pb-0 md:pb-0">
        <SectionHeader
          eyebrow="Step inside"
          title="Walk the aisles *before you visit.*"
          lead="Shot on a Wednesday evening in the shop. This is the whole place, shelf by shelf."
        />
      </Section>

      {/* Full-bleed video band */}
      <Reveal variants={scaleIn} className="relative mt-12 overflow-hidden bg-inverse">
        <Video name="aisle-pan-2" portraitName="shelves-tall" aspect={21 / 9} className="max-h-[78vh] min-h-[380px] w-full" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-indigo-950/70 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto flex max-w-7xl items-end justify-between px-5 pb-6 sm:px-8 lg:px-10 lg:pb-8">
            <p className="font-display text-2xl text-paper-50 sm:text-3xl">
              The long wall, <em className="text-marigold-400">cookies to namkeen</em>
            </p>
            <p className="hidden font-body text-xs font-semibold uppercase tracking-widest text-paper-50/60 sm:block">
              PANACHE · Khoraj
            </p>
          </div>
        </div>
      </Reveal>

      <Section tone="canvas" size="md" className="pt-6 md:pt-8">
        {/* Aisle strip */}
        <RevealGroup
          each={0.05}
          className="no-scrollbar mask-edges -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10"
        >
          {aisles.map(({ picture, label }) => (
            <RevealItem key={label} className="w-[64vw] shrink-0 snap-start sm:w-[38vw] lg:w-[23%]">
              <figure className="group overflow-hidden rounded-card bg-surface">
                <SmartImage
                  picture={picture}
                  alt={label}
                  sizes="(max-width: 640px) 64vw, (max-width: 1024px) 38vw, 23vw"
                  aspect={4 / 5}
                  className="rounded-card"
                  imgClassName="transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
                <figcaption className="px-1 py-3 font-body text-sm text-ink-soft">{label}</figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Panorama — drag to pan */}
        <motion.figure
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="mt-10 overflow-hidden rounded-panel border border-line bg-surface"
        >
          <div ref={viewportRef} className="relative cursor-grab overflow-hidden active:cursor-grabbing">
            <motion.div
              drag="x"
              dragElastic={0.06}
              dragMomentum={false}
              dragConstraints={viewportRef}
              onDragStart={() => setDragged(true)}
              className="w-[220%] will-change-transform sm:w-[170%] lg:w-[135%]"
            >
              <SmartImage
                picture={img.panoramicView}
                alt="Panoramic view inside the shop — shelves, counter and soda bar"
                sizes="220vw"
                draggable={false}
              />
            </motion.div>

            <motion.div
              animate={{ opacity: dragged ? 0 : 1 }}
              transition={{ duration: 0.4 }}
              className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-indigo-950/75 px-4 py-2 font-body text-xs font-semibold text-paper-50"
            >
              <motion.span
                animate={{ x: [-3, 3, -3] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <MoveHorizontal size={14} />
              </motion.span>
              Drag to look around
            </motion.div>
          </div>
        </motion.figure>
      </Section>
    </>
  )
}
