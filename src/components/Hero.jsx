import { motion } from 'framer-motion'
import shopExterior from '../assets/my_shop_images/shop_image_from_outside.jpeg'

const floatingBadges = [
  { label: '🥨 Namkeen', className: 'top-[20%] left-[5%]', delay: 0 },
  { label: '🫙 Pickles', className: 'top-[30%] right-[8%]', delay: 0.2 },
  { label: '🫓 Khakhra', className: 'bottom-[30%] left-[8%]', delay: 0.4 },
  { label: '🍞 Bakery', className: 'bottom-[25%] right-[5%]', delay: 0.6 },
]

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image — Actual shop exterior */}
      <img
        src={shopExterior}
        alt="Shree Nandi Gruhudhyog shop"
        loading="eager"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Floating Product Badges */}
      {floatingBadges.map((badge) => (
        <motion.div
          key={badge.label}
          className={`absolute hidden lg:flex bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white font-body text-sm font-medium ${badge.className}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { delay: 1 + badge.delay, duration: 0.5 },
            scale: { delay: 1 + badge.delay, duration: 0.5 },
            y: { delay: 1.5 + badge.delay, duration: 3, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          {badge.label}
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold leading-tight"
        >
          Taste the Tradition, Love Every Bite
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-cream/90 mt-4 md:mt-6 max-w-3xl font-body"
        >
          Authentic Gujarati farsan, namkeen, khakhra, pickles & more — crafted with love in Gujarat
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-8 md:mt-10"
        >
          <motion.a
            href="#products"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-saffron hover:bg-orange-600 text-white rounded-full px-8 py-3 font-body font-semibold text-base transition-colors duration-300"
          >
            Explore Products
          </motion.a>
          <motion.a
            href="#about"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="border-2 border-white text-white hover:bg-white hover:text-brown rounded-full px-8 py-3 font-body font-semibold text-base transition-colors duration-300"
          >
            Our Story
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
