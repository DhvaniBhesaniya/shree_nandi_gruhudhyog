import { motion } from 'framer-motion'
import farsanImg from '../assets/my_shop_images/Farsan.jpeg'
import pickelsImg from '../assets/my_shop_images/Pickels.jpeg'
import khakhraImg from '../assets/my_shop_images/Khakhra.jpeg'
import chocolateImg from '../assets/my_shop_images/chocolate_box.jpeg'
import cornitosImg from '../assets/my_shop_images/Cornitos_chips.jpeg'
import wafersImg from '../assets/my_shop_images/wafers_and_chocolates.jpeg'

const categories = [
  {
    name: 'Namkeen & Farsan',
    description: 'Crunchy gathiya, chevdo, sev, and irresistible traditional Gujarati farsan.',
    image: farsanImg,
  },
  {
    name: 'Pickles & Achaar',
    description: 'Tangy mango, lime, and mixed pickles from trusted brands.',
    image: pickelsImg,
  },
  {
    name: 'Khakhra & Bhakhri',
    description: 'Thin, crispy whole wheat khakhra in a dozen flavours — methi, jeera, masala & more.',
    image: khakhraImg,
  },
  {
    name: 'Chocolates & Sweets',
    description: 'Strawberry, chocolate, orange wafer rolls and premium confectionery.',
    image: chocolateImg,
  },
  {
    name: 'Chips & Snacks',
    description: 'Cornitos nacho crisps, dry samosa, peanuts and crunchy munchies.',
    image: cornitosImg,
  },
  {
    name: 'Wafers & Biscuits',
    description: 'Crispy potato wafers, banana chips, and perfectly baked biscuits & khari.',
    image: wafersImg,
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function ProductCategories() {
  return (
    <section id="products" className="bg-cream py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl sm:text-4xl text-brown text-center font-bold mb-4"
        >
          Our Delicious Range
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-brown-light font-body mb-12 max-w-2xl mx-auto"
        >
          From crispy farsan to tangy pickles, explore the authentic taste of Gujarat
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.name}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -4 }}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer hover:ring-2 hover:ring-saffron"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="bg-white p-5">
                <h3 className="font-heading text-brown text-xl font-bold mb-1">{cat.name}</h3>
                <p className="text-gray-600 font-body text-sm mb-3">{cat.description}</p>
                <a href="#shop-images" className="text-saffron font-body font-semibold text-sm hover:underline block w-max">
                  View All →
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
