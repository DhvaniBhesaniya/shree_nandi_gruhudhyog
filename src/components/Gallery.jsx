import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

// Shop exterior images
import shopExterior from '../assets/my_shop_images/shop_image_from_outside.jpeg'
import shopExterior2 from '../assets/my_shop_images/shop_image_from_outside_2.jpeg'
import shopExteriorNight from '../assets/my_shop_images/shop_exterior_night.jpeg'
import shopExteriorDay from '../assets/my_shop_images/shop_exterior_day.jpeg'
import counterLogo from '../assets/my_shop_images/shop_logo_banner.jpeg'

// Product images — existing
import farsanImg from '../assets/my_shop_images/Farsan.jpeg'
import farsan2Img from '../assets/my_shop_images/farsan_2.jpeg'
import khakhraImg from '../assets/my_shop_images/Khakhra.jpeg'
import coinKhakhraImg from '../assets/my_shop_images/coin_khakhra_and_bhakhari.jpeg'
import springNamkeenImg from '../assets/my_shop_images/Spring_namkeen.jpeg'
import pickelsImg from '../assets/my_shop_images/Pickels.jpeg'
import wafersImg from '../assets/my_shop_images/wafers_and_chocolates.jpeg'
import chocolateImg from '../assets/my_shop_images/chocolate_box.jpeg'
import cornitosImg from '../assets/my_shop_images/Cornitos_chips.jpeg'
import maggieImg from '../assets/my_shop_images/Maggie.jpeg'

// Product images — newly added
import chipsSnacksImg from '../assets/my_shop_images/chips_snacks_shelves.jpeg'
import namkeenPacketsImg from '../assets/my_shop_images/namkeen_packets_shelves.jpeg'
import chocolateSnacksImg from '../assets/my_shop_images/chocolate_snack_shelves.jpeg'
import syrupSquashImg from '../assets/my_shop_images/syrup_squash_shelves.jpeg'
import homemadeImg from '../assets/my_shop_images/farsan&khari.jpeg'
import chipsFarsanImg from '../assets/my_shop_images/chips-farsan-realbites.jpeg'
import cakeBiscuitsImg from '../assets/my_shop_images/cake-bisucits&cookies.jpeg'
import jamsPicklesImg from '../assets/my_shop_images/jams-pickles-cholate-peeper-waffers.jpeg'
import pickleOliveOilImg from '../assets/my_shop_images/pickle-oliveoil-chocolates.jpeg'
import khakhraJarsImg from '../assets/my_shop_images/khakhra_jars_shelves.jpeg'
import panoramicImg from '../assets/my_shop_images/pananormic-view.jpeg'

// Beverage images
import sodaDispenserImg from '../assets/my_shop_images/soda_dispenser.jpeg'
import sodaMenuImg from '../assets/my_shop_images/soda_menu_board.jpeg'
import beverageFridgeImg from '../assets/my_shop_images/beverage_refrigerator.jpeg'
import biscuitBoxesImg from '../assets/my_shop_images/biscuit_boxes_shelves.jpeg'
import hoccoMenuImg from '../assets/my_shop_images/hocco_icecream_menu.jpeg'

const filters = ['All', 'Shop', 'Products', 'Beverages']

const images = [
  // Shop
  { src: shopExteriorNight, alt: 'Shree Nandi Gruhudhyog — storefront at night with glowing signboard', tag: 'Shop' },
  { src: shopExteriorDay, alt: 'Shree Nandi Gruhudhyog — shop front close-up view', tag: 'Shop' },
  { src: shopExterior, alt: 'Shree Nandi Gruhudhyog — our shop from outside', tag: 'Shop' },
  { src: shopExterior2, alt: 'Shree Nandi Gruhudhyog — evening view', tag: 'Shop' },
  { src: counterLogo, alt: 'Shree Nandi — શ્રી નંદી branded counter with Gujarati logo', tag: 'Shop' },
  { src: panoramicImg, alt: 'Shree Nandi Gruhudhyog — 360° panoramic interior view', tag: 'Shop' },

  // Products
  { src: namkeenPacketsImg, alt: 'Namkeen, mamra, pringles, cookies & biscuits shelves', tag: 'Products' },
  { src: chipsSnacksImg, alt: 'Balaji, Cornitos chips & snack packs wall display', tag: 'Products' },
  { src: farsanImg, alt: 'Fresh Gujarati farsan & namkeen collection', tag: 'Products' },
  { src: homemadeImg, alt: 'Our own brand — Shree Nandi wheat chakri, khari & cookies', tag: 'Products' },
  { src: khakhraImg, alt: 'Khakhra — Cheese, Masala, Jeera, Methi flavours', tag: 'Products' },
  { src: springNamkeenImg, alt: 'Spring namkeen — Schezwan, Beetroot, Samosa Puri', tag: 'Products' },
  { src: pickelsImg, alt: 'Pickles & achaar — Mango, Lime, Mixed', tag: 'Products' },
  { src: coinKhakhraImg, alt: 'Coin khakhra & farali bhakhri', tag: 'Products' },
  { src: farsan2Img, alt: 'Gathiya, chevdo, sev & dal namkeen', tag: 'Products' },
  { src: wafersImg, alt: 'Wafers, chips & snack packs', tag: 'Products' },
  { src: chocolateImg, alt: 'Chocolate & strawberry wafer rolls', tag: 'Products' },
  { src: cornitosImg, alt: 'Cornitos nacho crisps & munchies', tag: 'Products' },
  { src: maggieImg, alt: 'Chocolate rolls & Maggi noodles', tag: 'Products' },
  { src: chocolateSnacksImg, alt: 'Snacks, sauces, ketchup, nuts & tea shelves', tag: 'Products' },
  { src: syrupSquashImg, alt: 'Guruji squash, Kinder eggs, Chocos & Maggi', tag: 'Products' },
  { src: chipsFarsanImg, alt: 'Real Bites namkeen, Cristos chips & potato wafers', tag: 'Products' },
  { src: cakeBiscuitsImg, alt: 'Australian Choco Chip Cookies, Cake Rusk & atta cookies', tag: 'Products' },
  { src: jamsPicklesImg, alt: 'Kissan ketchup, Nescafe, Nutella & Mother\'s Recipe pickles', tag: 'Products' },
  { src: pickleOliveOilImg, alt: 'Cold pressed oils, pickles, Bournvita & chocolates', tag: 'Products' },
  { src: biscuitBoxesImg, alt: 'Cadbury Cookies, Good Day Chunkies, Pure Magic & Hide n Seek', tag: 'Products' },
  { src: khakhraJarsImg, alt: 'Khakhra jars, Pringles, wafer rolls, biscuits & homemade snacks', tag: 'Products' },

  // Beverages
  { src: sodaDispenserImg, alt: 'Chaas soda — cold drinks dispenser with 8+ flavours', tag: 'Beverages' },
  { src: sodaMenuImg, alt: 'Soda menu board — Regular & Special flavours from ₹10', tag: 'Beverages' },
  { src: beverageFridgeImg, alt: 'Coca-Cola fridge — Thumsup, Sprite, Fanta & Maaza', tag: 'Beverages' },
  { src: hoccoMenuImg, alt: 'Hocco Ice Cream menu — cones, bars, kulfis & sundaes', tag: 'Beverages' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState(null)
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredImages = activeFilter === 'All'
    ? images
    : images.filter((img) => img.tag === activeFilter)

  return (
    <section id="shop-images" className="bg-cream py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl sm:text-4xl text-brown text-center font-bold mb-4"
        >
          Our Shop & Products 📸
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-brown-light font-body mb-8 max-w-2xl mx-auto"
        >
          A glimpse into Shree Nandi Gruhudhyog — where tradition meets taste
        </motion.p>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-2 sm:gap-3 mb-10 flex-wrap"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full font-body font-semibold text-sm transition-all duration-300 cursor-pointer ${
                activeFilter === filter
                  ? 'bg-saffron text-white shadow-md scale-105'
                  : 'bg-white text-brown hover:bg-saffron/10 hover:text-saffron shadow-sm'
              }`}
            >
              {filter}
              <span className="ml-1.5 text-xs opacity-70">
                ({filter === 'All' ? images.length : images.filter(i => i.tag === filter).length})
              </span>
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
          >
            {filteredImages.map((img, i) => (
              <motion.div
                key={img.alt}
                variants={itemVariants}
                onClick={() => setSelectedImg(img)}
                className="rounded-2xl overflow-hidden group relative cursor-pointer break-inside-avoid shadow-sm hover:shadow-xl transition-all"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-90 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end p-3">
                  <span className="text-white font-body text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg">
                    {img.alt}
                  </span>
                </div>
                {/* Category Tag */}
                <span className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-brown text-xs font-body font-semibold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.tag}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute -top-12 right-0 sm:-right-8 text-white hover:text-saffron transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={32} />
              </button>
              <img
                src={selectedImg.src}
                alt={selectedImg.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              <p className="text-white mt-4 font-body text-lg text-center bg-black/50 px-6 py-2 rounded-full">
                {selectedImg.alt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
