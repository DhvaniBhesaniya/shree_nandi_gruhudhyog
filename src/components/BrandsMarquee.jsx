import { motion } from 'framer-motion'

const brands = [
  'Balaji', 'Cornitos', "Mother's Recipe", 'Hocco', 'Pringles',
  'Cadbury', 'Kissan', 'Nescafe', 'Nutella', 'Jabsons',
  'Haldiram\'s', 'Biscoff', 'Kinder', 'Empire Bake', 'Cravity',
  'Shantaben', 'Gopal', 'Real Bites', 'Lipton', 'Vimal Wellness',
]

// Duplicate for seamless loop
const allBrands = [...brands, ...brands]

export default function BrandsMarquee() {
  return (
    <section className="bg-white py-10 md:py-14 overflow-hidden border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center font-heading text-lg sm:text-xl text-brown-light font-semibold"
        >
          Trusted Brands We Carry 🏪
        </motion.p>
      </div>

      {/* Marquee container */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex items-center gap-6 sm:gap-10 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        >
          {allBrands.map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="flex-shrink-0 bg-gray-50 hover:bg-saffron/10 border border-gray-100 rounded-xl px-6 py-3 transition-colors duration-300"
            >
              <span className="font-heading font-bold text-brown text-sm sm:text-base whitespace-nowrap">
                {brand}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
