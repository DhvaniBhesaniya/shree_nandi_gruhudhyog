import { motion } from 'framer-motion'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import Section, { SectionHeader } from './ui/Section'
import SmartImage from './ui/SmartImage'
import Button from './ui/Button'
import { RevealGroup, RevealItem } from './ui/Reveal'
import { img } from '../assets/images'
import { whatsappLink, waMessage } from '../lib/site'
import { scrollToId } from '../lib/hooks'
import { ease, scaleIn } from '../lib/motion'

const categories = [
  {
    name: 'Namkeen & Farsan',
    blurb: 'Gathiya, chevdo, sev and the crunchy Gujarati farsan we make fresh.',
    picture: img.farsan,
    feature: true,
  },
  { name: 'Khakhra & Bhakhri', blurb: 'Methi, jeera, masala — thin and crisp.', picture: img.khakhra },
  { name: 'Pickles & Achaar', blurb: 'Mango, lime and mixed, tangy as it should be.', picture: img.pickles },
  { name: 'Chocolates & Sweets', blurb: 'Wafer rolls and premium confectionery.', picture: img.chocolateBox },
  { name: 'Chips & Snacks', blurb: 'Cornitos, dry samosa, peanuts and munchies.', picture: img.cornitosChips },
  { name: 'Wafers & Biscuits', blurb: 'Potato wafers, banana chips, khari and biscuits.', picture: img.wafersAndChocolates },
  { name: 'Soda & Cold Drinks', blurb: '15+ soda flavours plus chilled bottles.', picture: img.sodaDispenser },
  { name: 'Bakery & Cookies', blurb: 'Cookies, cake rusk and everyday bakery.', picture: img.biscuitBoxesShelves },
]

/**
 * Category grid.
 *
 * Overlay cards rather than the previous image-above-a-white-box pattern: the
 * photography carries the section, and letting type sit on the image is what
 * separates a considered grid from a stock template. The first card spans two
 * columns to break the otherwise uniform 4-up rhythm.
 */
export default function ProductCategories() {
  return (
    <Section id="products" tone="canvas" size="lg">
      <SectionHeader
        eyebrow="What we stock"
        title="Everything under one roof"
        lead="From farsan we fry ourselves to the brands you already trust — over 500 items across the shop."
      />

      <RevealGroup
        each={0.07}
        className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {categories.map((cat) => (
          <RevealItem
            key={cat.name}
            variants={scaleIn}
            className={cat.feature ? 'sm:col-span-2' : ''}
          >
            <CategoryCard {...cat} />
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Section-level fallback for anything not pictured */}
      <div className="mt-14 flex flex-col items-center gap-4 rounded-panel border border-line bg-surface p-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-display text-h3 font-semibold text-ink">
            Looking for something specific?
          </p>
          <p className="mt-1.5 font-body text-sm text-ink-soft">
            Message us and we'll tell you straight away if it's in stock.
          </p>
        </div>
        <Button href={whatsappLink(waMessage.general)} variant="whatsapp" size="lg">
          <MessageCircle size={18} />
          Ask on WhatsApp
        </Button>
      </div>
    </Section>
  )
}

function CategoryCard({ name, blurb, picture, feature }) {
  return (
    <motion.button
      onClick={() => scrollToId('gallery')}
      whileHover="hover"
      whileFocus="hover"
      initial="rest"
      animate="rest"
      className="group relative block h-full w-full overflow-hidden rounded-card text-left shadow-soft transition-shadow duration-500 hover:shadow-pop"
    >
      <SmartImage
        picture={picture}
        alt={name}
        sizes={feature ? '(max-width: 640px) 92vw, (max-width: 1024px) 92vw, 46vw' : '(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 23vw'}
        aspect={feature ? 16 / 11 : 4 / 5}
        imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
      />

      {/* Scrim only where the type sits, so the photo stays bright above it */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-clay-950/88 via-clay-950/25 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <div className="min-w-0">
          <h3 className="font-display text-h3 font-semibold text-white">{name}</h3>
          {/*
            Always visible, for two reasons. Animating `height: 0 -> auto` is a
            layout animation — it reflows the card contents on every frame of the
            hover, which is not something the compositor can take over. And it
            was gated behind hover, so on a phone the description was simply
            never readable at all.
          */}
          <p className="mt-1.5 font-body text-sm text-white/75">{blurb}</p>
        </div>

        <motion.span
          variants={{ rest: { scale: 0.85, opacity: 0.7 }, hover: { scale: 1, opacity: 1 } }}
          transition={{ duration: 0.35, ease: ease.outExpo }}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm"
        >
          <ArrowUpRight size={17} />
        </motion.span>
      </div>
    </motion.button>
  )
}
