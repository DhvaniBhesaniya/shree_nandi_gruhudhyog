import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MoveHorizontal } from 'lucide-react'
import Section, { SectionHeader } from './ui/Section'
import SmartImage from './ui/SmartImage'
import { RevealGroup, RevealItem } from './ui/Reveal'
import { img } from '../assets/images'
import { ease, scaleIn } from '../lib/motion'

const aisles = [
  { picture: img.chipsSnacksShelves, label: 'Chips, namkeen & snack wall' },
  { picture: img.namkeenPacketsShelves, label: 'Mamra, cookies & biscuits' },
  { picture: img.khakhraJarsShelves, label: 'Khakhra jars & wafer rolls' },
  { picture: img.chocolateSnackShelves, label: 'Sauces, nuts & tea' },
  { picture: img.syrupSquashShelves, label: 'Squashes, Kinder & cereal' },
  { picture: img.beverageRefrigerator, label: 'Chilled drinks' },
]

/**
 * Inside-the-shop section.
 *
 * The panorama is a real 2616x572 photo, so instead of squashing it into a
 * letterbox it stays at full height inside a drag-to-pan window. Dragging is
 * clamped to the overflow width so it can't be thrown off-screen.
 */
export default function VirtualShopTour() {
  const [dragged, setDragged] = useState(false)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)

  return (
    <Section id="tour" tone="canvas" size="lg">
      <SectionHeader
        eyebrow="Step inside"
        title="Have a look around the shop"
        lead="Drag across the panorama, then scroll the aisles — this is the whole shop, shelf by shelf."
      />

      {/* ------------------------------------------------------------ panorama */}
      <motion.figure
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        className="mt-14 overflow-hidden rounded-panel border border-line bg-surface shadow-lift"
      >
        <div ref={viewportRef} className="relative cursor-grab overflow-hidden active:cursor-grabbing">
          <motion.div
            ref={trackRef}
            drag="x"
            dragElastic={0.06}
            dragMomentum={false}
            // Recomputed on each gesture so it stays correct after a resize or
            // an orientation change.
            dragConstraints={() => {
              const overflow =
                (trackRef.current?.scrollWidth ?? 0) - (viewportRef.current?.clientWidth ?? 0)
              return { left: -Math.max(overflow, 0), right: 0 }
            }}
            onDragStart={() => setDragged(true)}
            className="w-[220%] sm:w-[170%] lg:w-[135%]"
          >
            <SmartImage
              picture={img.panoramicView}
              alt="Panoramic view inside the shop — shelves, counter and soda bar"
              sizes="220vw"
              draggable={false}
            />
          </motion.div>

          {/* Hint fades out for good once the visitor works out the interaction */}
          <motion.div
            animate={{ opacity: dragged ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-clay-950/70 px-4 py-2 font-body text-xs font-medium text-white backdrop-blur-sm"
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

      {/* -------------------------------------------------------------- aisles */}
      <RevealGroup
        each={0.06}
        className="no-scrollbar mask-edges mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
      >
        {aisles.map(({ picture, label }) => (
          <RevealItem
            key={label}
            className="w-[70vw] shrink-0 snap-center sm:w-[42vw] lg:w-[26%]"
          >
            <figure className="group overflow-hidden rounded-card border border-line bg-surface shadow-soft transition-shadow duration-500 hover:shadow-lift">
              <SmartImage
                picture={picture}
                alt={label}
                sizes="(max-width: 640px) 70vw, (max-width: 1024px) 42vw, 26vw"
                aspect={4 / 3}
                imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <figcaption className="px-4 py-3.5 font-body text-sm text-ink-soft">
                {label}
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealGroup>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, ease: ease.outExpo }}
        className="mt-4 text-center font-body text-xs text-ink-faint sm:hidden"
      >
        Swipe to see more aisles
      </motion.p>
    </Section>
  )
}
