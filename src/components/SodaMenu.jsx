import { motion } from 'framer-motion'
import sodaMenuImg from '../assets/my_shop_images/soda_menu_board.jpeg'
import sodaDispenserImg from '../assets/my_shop_images/soda_dispenser.jpeg'

const sodaFlavours = [
  { name: 'Jeera Masala', price: '₹15', type: 'Special' },
  { name: 'Kachi Keri', price: '₹15', type: 'Special' },
  { name: 'Limbu Shikanji', price: '₹15', type: 'Special' },
  { name: 'Jamun Kala Khatta', price: '₹15', type: 'Special' },
  { name: 'Lemon', price: '₹10', type: 'Regular' },
  { name: 'Orange', price: '₹10', type: 'Regular' },
  { name: 'Cola', price: '₹10', type: 'Regular' },
  { name: 'Plain Soda', price: '₹10', type: 'Regular' },
]

export default function SodaMenu() {
  return (
    <section className="bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50 py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-cyan-100 text-cyan-700 font-body font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            🥤 Refreshments
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-brown font-bold mb-3">
            Chill with Our Soda Bar
          </h2>
          <p className="text-brown-light font-body max-w-xl mx-auto">
            Beat the heat with 15+ soda flavours — freshly dispensed, ice-cold, starting at just ₹10!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Soda Menu Board Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={sodaMenuImg}
              alt="Soda menu board with prices"
              loading="lazy"
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* Flavours List + Dispenser */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Price Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {sodaFlavours.map((flavour, i) => (
                <motion.div
                  key={flavour.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`flex items-center justify-between p-3 rounded-xl border ${
                    flavour.type === 'Special'
                      ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200'
                      : 'bg-white border-gray-100'
                  }`}
                >
                  <div>
                    <p className="font-body font-semibold text-brown text-sm">{flavour.name}</p>
                    <span className={`text-xs font-body ${
                      flavour.type === 'Special' ? 'text-amber-600' : 'text-gray-400'
                    }`}>
                      {flavour.type}
                    </span>
                  </div>
                  <span className="font-heading font-bold text-saffron text-lg">{flavour.price}</span>
                </motion.div>
              ))}
            </div>

            {/* Soda Dispenser Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src={sodaDispenserImg}
                alt="Chaas Soda dispenser with 8+ flavours"
                loading="lazy"
                className="w-full h-52 object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
