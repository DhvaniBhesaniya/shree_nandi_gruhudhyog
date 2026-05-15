import { useRef } from 'react'
import { motion } from 'framer-motion'

import panoramicImg from '../assets/my_shop_images/pananormic-view.jpeg'
import chipsSnacksImg from '../assets/my_shop_images/chips_snacks_shelves.jpeg'
import namkeenPacketsImg from '../assets/my_shop_images/namkeen_packets_shelves.jpeg'
import chocolateSnacksImg from '../assets/my_shop_images/chocolate_snack_shelves.jpeg'
import khakhraJarsImg from '../assets/my_shop_images/khakhra_jars_shelves.jpeg'
import syrupSquashImg from '../assets/my_shop_images/syrup_squash_shelves.jpeg'

const interiorImages = [
  { src: chipsSnacksImg, alt: 'Chips, namkeen & snack packs wall display' },
  { src: namkeenPacketsImg, alt: 'Pringles, mamra, cookies & biscuits shelves' },
  { src: khakhraJarsImg, alt: 'Khakhra, Pringles, wafers & biscuit jars' },
  { src: chocolateSnacksImg, alt: 'Ketchup, sauces, snacks & tea shelves' },
  { src: syrupSquashImg, alt: 'Squash bottles, Kinder, Chocos & Maggi' },
]

export default function VirtualShopTour() {
  const sectionRef = useRef(null)

  return (
    <section ref={sectionRef} className="bg-brown py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-gold/20 text-gold font-body font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            🏪 Step Inside
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-cream font-bold mb-3">
            Inside Our Shop
          </h2>
          <p className="text-cream/70 font-body max-w-xl mx-auto">
            Take a virtual walk through Shree Nandi Gruhudhyog — see our shelves packed with products!
          </p>
        </motion.div>

        {/* Panoramic View — with parallax */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl overflow-hidden shadow-2xl mb-10 border-2 border-gold/20"
        >
          <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing">
            <img
              src={panoramicImg}
              alt="360° panoramic view inside Shree Nandi Gruhudhyog — shelves, products & counter"
              loading="lazy"
              className="w-[200%] sm:w-[150%] max-w-none h-[250px] sm:h-[350px] md:h-[450px] object-cover snap-center"
            />
          </div>
          <div className="bg-brown-light/30 backdrop-blur-sm px-4 py-2 text-center">
            <p className="font-body text-cream/80 text-sm">
              📷 360° Panoramic View — Scroll to explore
            </p>
          </div>
        </motion.div>

        {/* Interior Image Carousel */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-brown to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-brown to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {interiorImages.map((img, i) => (
              <motion.div
                key={img.alt}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex-shrink-0 w-[280px] sm:w-[340px] md:w-[400px] snap-center"
              >
                <div className="rounded-xl overflow-hidden shadow-lg group cursor-default">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="bg-white/10 backdrop-blur-sm p-3">
                    <p className="font-body text-cream/90 text-sm">{img.alt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Swipe hint on mobile */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center text-cream/40 font-body text-xs mt-4 sm:hidden"
        >
          ← Swipe to explore →
        </motion.p>
      </div>
    </section>
  )
}
