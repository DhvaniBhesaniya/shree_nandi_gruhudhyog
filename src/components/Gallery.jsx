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
  { key: 'storefront-evening', picture: img.storefrontEvening, tag: 'Shop', alt: 'The storefront at dusk with the signboard lit' },
  { key: 'storefront-night-wide', picture: img.storefrontNightWide, tag: 'Shop', alt: 'The shop front at night, seen from the street' },
  { key: 'street-hocco', picture: img.streetHoccoBoard, tag: 'Shop', alt: 'The Hocco board outside, looking down the street' },
  { key: 'ext-night', picture: img.shopExteriorNight, tag: 'Shop', alt: 'The storefront lit up at night' },
  { key: 'ext-day', picture: img.shopExteriorDay, tag: 'Shop', alt: 'The shop front by day' },
  { key: 'counter', picture: img.shopLogoBanner, tag: 'Shop', alt: 'The counter with the Shree Nandi roundel' },
  { key: 'panorama', picture: img.panoramicView, tag: 'Shop', alt: 'Panoramic view of the whole shop interior' },

  // --- Homemade
  { key: 'bhakarwadi', picture: img.butterBhakarwadi, tag: 'Homemade', alt: 'Butter bhakarwadi and aloo sev, packed and labelled' },
  { key: 'masala-khakhra', picture: img.masalaKhakhraCloseup, tag: 'Homemade', alt: 'Masala khakhra, close up' },
  { key: 'methi-khakhra', picture: img.methiKhakhraCloseup, tag: 'Homemade', alt: 'Methi khakhra, close up' },
  { key: 'jeera-khakhra', picture: img.jeeraKhakhraStack, tag: 'Homemade', alt: 'A stack of jeera khakhra' },
  { key: 'sada-khakhra', picture: img.sadaKhakhraCloseup, tag: 'Homemade', alt: 'Sada khakhra, rolled thin' },
  { key: 'farsan-packets', picture: img.homemadeFarsanPackets, tag: 'Homemade', alt: 'Homemade farsan packets on the shelf' },
  { key: 'sev-packets', picture: img.homemadeSevPackets, tag: 'Homemade', alt: 'Homemade sev and gathiya packets' },
  { key: 'chakri-packets', picture: img.homemadeChakriPackets, tag: 'Homemade', alt: 'Homemade wheat chakri packets' },
  { key: 'mix-tubs', picture: img.homemadeMixTubs, tag: 'Homemade', alt: 'Tubs of homemade chevdo, mix and sev on the counter' },
  { key: 'tubs-shelf', picture: img.homemadeTubsShelf, tag: 'Homemade', alt: 'Homemade tubs lined up on the shelf' },
  { key: 'mixes-shelf', picture: img.homemadeMixesShelf, tag: 'Homemade', alt: 'Shelf of homemade mixes and sev' },
  { key: 'farali-chevdo', picture: img.faraliChevdoTub, tag: 'Homemade', alt: 'Farali chevdo tub and mixed biscuits' },
  { key: 'chaska-maska', picture: img.chaskaMaskaPackets, tag: 'Homemade', alt: 'Chaska maska and masala sticks' },
  { key: 'homemade', picture: img.farsanKhari, tag: 'Homemade', alt: 'Our own wheat chakri, khari and cookies' },

  // --- Products
  { key: 'festive-box', picture: img.festiveCookieBox, tag: 'Products', alt: 'Festive cookie selection box' },
  { key: 'utsav-box', picture: img.utsavLadooBox, tag: 'Products', alt: 'Utsav ladoo and cookie box' },
  { key: 'stick-cookies', picture: img.cravityStickCookies, tag: 'Products', alt: 'Cravity stick cookies in jars' },
  { key: 'atta-cookies', picture: img.attaCookiesTubs, tag: 'Products', alt: 'Assorted atta cookie tubs' },
  { key: 'biscuit-wall', picture: img.biscuitWall, tag: 'Products', alt: 'The biscuit wall — Good Day, Hide & Seek, Bourbon' },
  { key: 'noodle-wall', picture: img.noodleWall, tag: 'Products', alt: 'Noodles, Maggi and Korean instant packs' },
  { key: 'mamra', picture: img.vijayMamraShelf, tag: 'Products', alt: 'Vijay mamra and murmura on the shelf' },
  { key: 'patra', picture: img.jalaramPatra, tag: 'Products', alt: 'Jalaram patra packets' },
  { key: 'banana-wafers', picture: img.bananaWafers, tag: 'Products', alt: 'Banana wafers and Beyond Snack chips' },
  { key: 'chilli-chips', picture: img.mexicanChilliChips, tag: 'Products', alt: 'Mexican chilli chips and potato wafers' },
  { key: 'paper-dosa', picture: img.paperDosaSchezwan, tag: 'Products', alt: 'Paper dosa schezwan packs' },
  { key: 'namkeen-shelves', picture: img.namkeenPacketsShelves, tag: 'Products', alt: 'Namkeen, mamra, cookies and biscuit shelves' },
  { key: 'chips-wall', picture: img.chipsSnacksShelves, tag: 'Products', alt: 'Balaji and Cornitos chips wall' },
  { key: 'pickles', picture: img.pickles, tag: 'Products', alt: 'Pickles and achaar — mango, lime, mixed' },
  { key: 'spring', picture: img.springNamkeen, tag: 'Products', alt: 'Spring namkeen — schezwan, beetroot, samosa puri' },
  { key: 'chocolate', picture: img.chocolateBox, tag: 'Products', alt: 'Chocolate and strawberry wafer rolls' },
  { key: 'jams', picture: img.jamsPicklesChocolateWafers, tag: 'Products', alt: "Ketchup, Nescafé, Nutella and Mother's Recipe pickles" },
  { key: 'khakhra-jars', picture: img.khakhraJarsShelves, tag: 'Products', alt: 'Khakhra jars, wafer rolls and homemade snacks' },

  // --- Beverages
  { key: 'freezer', picture: img.hoccoFreezer, tag: 'Beverages', alt: 'The Hocco freezer' },
  { key: 'soda-dispenser', picture: img.sodaDispenser, tag: 'Beverages', alt: 'The soda dispenser with its flavour taps' },
  { key: 'soda-board', picture: img.sodaMenuBoard, tag: 'Beverages', alt: 'Soda menu board — regular and special flavours from ₹10' },
  { key: 'fridge', picture: img.beverageRefrigerator, tag: 'Beverages', alt: 'Chilled drinks fridge' },
  { key: 'hocco', picture: img.hoccoIcecreamMenu, tag: 'Beverages', alt: 'Hocco ice cream menu — cones, bars, kulfis and sundaes' },
]

const filters = ['All', 'Shop', 'Homemade', 'Products', 'Beverages']

/**
 * Photo gallery. CSS columns give a masonry that respects each photo's real
 * ratio; selection is tracked by index so the lightbox can page with arrows.
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
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          eyebrow="Gallery"
          title="The shop, *shelf by shelf.*"
          lead={`${photos.length} photographs of the storefront, the aisles and what's actually on them.`}
        />

        <div className="flex flex-wrap gap-1.5 md:justify-end">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`relative isolate rounded-full px-4 py-2 font-body text-sm font-semibold transition-colors duration-300 ${
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
      </div>

      <div className="mt-12 columns-2 gap-3 md:columns-3 lg:columns-4 [&>*]:mb-3">
        <AnimatePresence>
          {visible.map((photo, i) => (
            <motion.button
              key={photo.key}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.015, 0.25), ease: ease.outExpo }}
              onClick={() => setOpenAt(i)}
              aria-label={`View larger: ${photo.alt}`}
              className="group relative block w-full break-inside-avoid overflow-hidden rounded-photo bg-surface"
            >
              <SmartImage
                picture={photo.picture}
                alt={photo.alt}
                sizes="(max-width: 768px) 46vw, (max-width: 1024px) 31vw, 23vw"
                imgClassName="transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-indigo-950/0 transition-colors duration-400 group-hover:bg-indigo-950/20 group-focus-visible:bg-indigo-950/20"
              />
              <span
                aria-hidden="true"
                className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-paper-50 text-indigo-950 opacity-0 transition-opacity duration-400 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <Expand size={14} />
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {openAt !== null && (
          <Lightbox items={visible} index={openAt} onNavigate={setOpenAt} onClose={() => setOpenAt(null)} />
        )}
      </AnimatePresence>
    </Section>
  )
}
