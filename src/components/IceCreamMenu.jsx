import { motion } from 'framer-motion'
import hoccoMenuImg from '../assets/my_shop_images/hocco_icecream_menu.jpeg'

const highlights = [
  { emoji: '🍦', label: 'Chillo Cones', detail: 'from ₹20' },
  { emoji: '🍫', label: 'Boss Bars', detail: 'from ₹30' },
  { emoji: '🍨', label: 'Kulfis', detail: 'from ₹10' },
  { emoji: '🧁', label: 'Sundae Cups', detail: 'from ₹20' },
]

export default function IceCreamMenu() {
  return (
    <section className="bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-pink-100 text-pink-700 font-body font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            🍦 Ice Cream Corner
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-brown font-bold mb-3">
            Hocco Ice Cream — Goodness of Milk
          </h2>
          <p className="text-brown-light font-body max-w-xl mx-auto">
            Choose from 50+ flavours — cones, bars, kulfis, sundaes & scooperstar cups!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Highlight Cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 grid grid-cols-2 gap-4"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="bg-white rounded-2xl p-5 shadow-md text-center border border-pink-100 hover:shadow-xl transition-all cursor-default"
              >
                <span className="text-4xl block mb-2">{item.emoji}</span>
                <h3 className="font-heading font-bold text-brown text-base">{item.label}</h3>
                <p className="font-body text-pink-600 text-sm font-semibold mt-1">{item.detail}</p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="col-span-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-5 text-center text-white"
            >
              <p className="font-heading font-bold text-lg">Summer Special ☀️</p>
              <p className="font-body text-sm text-pink-100 mt-1">
                Mango Dolly, Kesar Falooda & Strawberry Cheesecake — try today!
              </p>
            </motion.div>
          </motion.div>

          {/* Hocco Menu Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3 rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={hoccoMenuImg}
              alt="Hocco Ice Cream full menu with prices — cones, bars, kulfis, sundaes"
              loading="lazy"
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
