import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Expand } from 'lucide-react'
import Section, { SectionHeader } from './ui/Section'
import SmartImage from './ui/SmartImage'
import Lightbox from './ui/Lightbox'
import { img } from '../assets/images'
import { ease } from '../lib/motion'

const photos = [
  // --- Shop
  { key: 'ext-night', picture: img.shopExteriorNight, tag: 'Shop', alt: 'The storefront lit up at night' },
  { key: 'ext-day', picture: img.shopExteriorDay, tag: 'Shop', alt: 'The shop front by day' },
  { key: 'outside', picture: img.shopImageFromOutside, tag: 'Shop', alt: 'Looking in from the street' },
  { key: 'outside-2', picture: img.shopImageFromOutside2, tag: 'Shop', alt: 'The shop in the evening' },
  { key: 'counter', picture: img.shopLogoBanner, tag: 'Shop', alt: 'The Shree Nandi counter with the Gujarati logo' },
  { key: 'panorama', picture: img.panoramicView, tag: 'Shop', alt: 'Panoramic view of the whole shop interior' },

  // --- Products
  { key: 'namkeen-shelves', picture: img.namkeenPacketsShelves, tag: 'Products', alt: 'Namkeen, mamra, cookies and biscuit shelves' },
  { key: 'chips-wall', picture: img.chipsSnacksShelves, tag: 'Products', alt: 'Balaji and Cornitos chips wall display' },
  { key: 'farsan', picture: img.farsan, tag: 'Products', alt: 'Fresh Gujarati farsan and namkeen' },
  { key: 'homemade', picture: img.farsanKhari, tag: 'Products', alt: 'Our own wheat chakri, khari and cookies' },
  { key: 'khakhra', picture: img.khakhra, tag: 'Products', alt: 'Khakhra — cheese, masala, jeera and methi' },
  { key: 'spring', picture: img.springNamkeen, tag: 'Products', alt: 'Spring namkeen — schezwan, beetroot, samosa puri' },
  { key: 'pickles', picture: img.pickles, tag: 'Products', alt: 'Pickles and achaar — mango, lime, mixed' },
  { key: 'coin-khakhra', picture: img.coinKhakhraAndBhakhari, tag: 'Products', alt: 'Coin khakhra and farali bhakhri' },
  { key: 'farsan-2', picture: img.farsan2, tag: 'Products', alt: 'Gathiya, chevdo, sev and dal namkeen' },
  { key: 'wafers', picture: img.wafersAndChocolates, tag: 'Products', alt: 'Wafers, chips and snack packs' },
  { key: 'chocolate', picture: img.chocolateBox, tag: 'Products', alt: 'Chocolate and strawberry wafer rolls' },
  { key: 'cornitos', picture: img.cornitosChips, tag: 'Products', alt: 'Cornitos nacho crisps and munchies' },
  { key: 'maggi', picture: img.maggie, tag: 'Products', alt: 'Chocolate rolls and Maggi noodles' },
  { key: 'sauces', picture: img.chocolateSnackShelves, tag: 'Products', alt: 'Snacks, sauces, ketchup, nuts and tea' },
  { key: 'squash', picture: img.syrupSquashShelves, tag: 'Products', alt: 'Squash bottles, Kinder eggs and cereal' },
  { key: 'realbites', picture: img.chipsFarsanRealbites, tag: 'Products', alt: 'Real Bites namkeen and potato wafers' },
  { key: 'cookies', picture: img.cakeBiscuitsCookies, tag: 'Products', alt: 'Choco chip cookies, cake rusk and atta cookies' },
  { key: 'jams', picture: img.jamsPicklesChocolateWafers, tag: 'Products', alt: "Ketchup, Nescafé, Nutella and Mother's Recipe pickles" },
  { key: 'oils', picture: img.pickleOliveoilChocolates, tag: 'Products', alt: 'Cold-pressed oils, pickles and chocolates' },
  { key: 'biscuit-boxes', picture: img.biscuitBoxesShelves, tag: 'Products', alt: 'Cadbury, Good Day, Pure Magic and Hide & Seek' },
  { key: 'khakhra-jars', picture: img.khakhraJarsShelves, tag: 'Products', alt: 'Khakhra jars, wafer rolls and homemade snacks' },

  // --- Beverages
  { key: 'soda-dispenser', picture: img.sodaDispenser, tag: 'Beverages', alt: 'The soda dispenser with eight-plus flavours' },
  { key: 'soda-board', picture: img.sodaMenuBoard, tag: 'Beverages', alt: 'Soda menu board — regular and special flavours from ₹10' },
  { key: 'fridge', picture: img.beverageRefrigerator, tag: 'Beverages', alt: 'Chilled drinks fridge — Thums Up, Sprite, Fanta, Maaza' },
  { key: 'hocco', picture: img.hoccoIcecreamMenu, tag: 'Beverages', alt: 'Hocco ice cream menu — cones, bars, kulfis and sundaes' },
]

const filters = ['All', 'Shop', 'Products', 'Beverages']

/**
 * Photo gallery.
 *
 * CSS columns give a masonry layout that respects each photo's real aspect
 * ratio — the shop mixes portrait shelf shots with landscape storefronts, and
 * forcing them all into a uniform grid meant cropping the subject out of half
 * of them.
 *
 * Selection is tracked by index rather than by object so the lightbox can page
 * through the filtered set with the arrow keys.
 */
export default function Gallery() {
  const [filter, setFilter] = useState('All')
  const [openAt, setOpenAt] = useState(null)

  const visible = useMemo(
    () => (filter === 'All' ? photos : photos.filter((p) => p.tag === filter)),
    [filter],
  )

  const counts = useMemo(
    () =>
      filters.reduce((acc, f) => {
        acc[f] = f === 'All' ? photos.length : photos.filter((p) => p.tag === f).length
        return acc
      }, {}),
    [],
  )

  return (
    <Section id="gallery" tone="canvas" size="lg">
      <SectionHeader
        eyebrow="Gallery"
        title="The shop, shelf by shelf"
        lead="Thirty-one photos of the storefront, the aisles and what's actually on them."
      />

      {/* Filters */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`relative rounded-full px-5 py-2.5 font-body text-sm font-semibold transition-colors duration-300 ${
              filter === f ? 'text-on-brand' : 'text-ink-soft hover:text-ink'
            }`}
          >
            {filter === f && (
              <motion.span
                layoutId="gallery-filter"
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                className="absolute inset-0 -z-10 rounded-full bg-brand"
              />
            )}
            {f}
            <span className="ml-1.5 opacity-60 tabular-nums">{counts[f]}</span>
          </button>
        ))}
      </div>

      {/*
        Masonry.

        Deliberately no framer `layout` animation here. Layout animations work by
        measuring every child and writing explicit transforms each frame, which
        fights CSS multi-column directly — the columns reflow underneath the
        measurements, so 31 items produced both visual glitches and a lot of
        main-thread work on every filter change. Plain opacity/scale cross-fades
        composite for free and read just as deliberately.
      */}
      <div className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
        <AnimatePresence>
          {visible.map((photo, i) => (
            <motion.button
              key={photo.key}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, delay: Math.min(i * 0.018, 0.28), ease: ease.outExpo }}
              onClick={() => setOpenAt(i)}
              aria-label={`View larger: ${photo.alt}`}
              className="group relative block w-full break-inside-avoid overflow-hidden rounded-card shadow-soft transition-shadow duration-500 hover:shadow-lift"
            >
              <SmartImage
                picture={photo.picture}
                alt={photo.alt}
                sizes="(max-width: 768px) 46vw, (max-width: 1024px) 31vw, 23vw"
                imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />

              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-clay-950/85 via-clay-950/10 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100 group-focus-visible:opacity-100"
              />

              <span
                aria-hidden="true"
                className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-sm transition-opacity duration-400 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <Expand size={14} />
              </span>

              <span className="absolute inset-x-0 bottom-0 p-4 text-left font-body text-xs leading-snug text-white opacity-0 transition-opacity duration-400 group-hover:opacity-100 group-focus-visible:opacity-100">
                {photo.alt}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {openAt !== null && (
          <Lightbox
            items={visible}
            index={openAt}
            onNavigate={setOpenAt}
            onClose={() => setOpenAt(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  )
}
