import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import farsanImg from '../assets/my_shop_images/Farsan.jpeg'
import springNamkeenImg from '../assets/my_shop_images/Spring_namkeen.jpeg'
import khakhraImg from '../assets/my_shop_images/Khakhra.jpeg'
import coinKhakhraImg from '../assets/my_shop_images/coin_khakhra_and_bhakhari.jpeg'
import farsan2Img from '../assets/my_shop_images/farsan_2.jpeg'
import pickelsImg from '../assets/my_shop_images/Pickels.jpeg'
import wafersImg from '../assets/my_shop_images/wafers_and_chocolates.jpeg'
import chocolateImg from '../assets/my_shop_images/chocolate_box.jpeg'

const products = [
  { name: 'Masala Gathiya', desc: 'Crispy spiced chickpea flour gathiya — our best seller', rating: 4.9, badge: '🔥 Bestseller', image: farsan2Img },
  { name: 'Spring Namkeen', desc: 'Schezwan, beetroot & samosa puri — flavoured crunchy rings', rating: 4.8, badge: '🔥 Bestseller', image: springNamkeenImg },
  { name: 'Methi Khakhra', desc: 'Thin crispy fenugreek-flavoured whole wheat khakhra', rating: 4.7, badge: null, image: khakhraImg },
  { name: 'Farali Bhakhri', desc: 'Coin khakhra & farali bhakhri for fasting days', rating: 4.8, badge: '🔥 Bestseller', image: coinKhakhraImg },
  { name: 'Chevdo Mix', desc: 'Crunchy mixed chevdo, gathiya, sev & dal mix', rating: 4.6, badge: null, image: farsanImg },
  { name: 'Mango Pickle', desc: 'Tangy mango, lime & mixed pickles from trusted brands', rating: 4.9, badge: null, image: pickelsImg },
  { name: 'Potato Wafers', desc: 'Crispy banana chips, potato wafers & biscuit khari', rating: 4.5, badge: null, image: wafersImg },
  { name: 'Chocolate Wafer Rolls', desc: 'Strawberry, chocolate & orange flavour wafer rolls', rating: 4.8, badge: '🔥 Bestseller', image: chocolateImg },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export default function FeaturedProducts() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl sm:text-4xl text-brown text-center font-bold mb-4"
        >
          Customer Favourites ⭐
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-brown-light font-body mb-12 max-w-2xl mx-auto"
        >
          Loved by thousands — these are our most popular picks
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              variants={{
                hidden: { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="rounded-2xl bg-cream shadow-md hover:shadow-xl transition-all group cursor-pointer relative overflow-hidden"
            >
              {p.badge && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs rounded-full px-2 py-1 font-body font-semibold z-10">
                  {p.badge}
                </span>
              )}
              <div className="h-48 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-heading text-brown text-lg font-bold mb-1">{p.name}</h3>
                <p className="text-gray-600 font-body text-sm mb-2">{p.desc}</p>
                <div className="flex items-center gap-1 mb-3">
                  <Star size={16} className="fill-gold text-gold" />
                  <span className="font-body text-sm font-semibold text-brown">{p.rating}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-saffron text-white rounded-xl py-2 font-body font-semibold text-sm hover:bg-orange-600 transition-colors duration-300"
                >
                  Enquire Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
