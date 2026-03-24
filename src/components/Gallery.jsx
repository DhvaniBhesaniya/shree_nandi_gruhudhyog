import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import shopExterior from '../assets/my_shop_images/shop_image_from_outside.jpeg'
import shopExterior2 from '../assets/my_shop_images/shop_image_from_outside_2.jpeg'
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
import optionalImg from '../assets/my_shop_images/Optional.jpeg'
import logoImg from '../assets/my_shop_images/shree_nandi_gruhudhyog_logo.jpeg'

const images = [
  { src: shopExterior, alt: 'Shree Nandi Gruhudhyog — Our Shop' },
  { src: farsanImg, alt: 'Fresh Gujarati farsan & namkeen collection' },
  { src: khakhraImg, alt: 'Khakhra — Cheese, Masala, Jeera, Methi flavours' },
  { src: springNamkeenImg, alt: 'Spring namkeen — Schezwan, Beetroot, Samosa Puri' },
  { src: pickelsImg, alt: 'Pickles & achaar — Mango, Lime, Mixed' },
  { src: coinKhakhraImg, alt: 'Coin khakhra & farali bhakhri' },
  { src: shopExterior2, alt: 'Shree Nandi Gruhudhyog — Night View' },
  { src: farsan2Img, alt: 'Gathiya, chevdo, sev & dal namkeen' },
  { src: wafersImg, alt: 'Wafers, chips & snack packs' },
  { src: chocolateImg, alt: 'Chocolate & strawberry wafer rolls' },
  { src: cornitosImg, alt: 'Cornitos nacho crisps & munchies' },
  { src: maggieImg, alt: 'Chocolate rolls & Maggi noodles' },
  { src: optionalImg, alt: 'Inside our shop — counter view' },
  { src: logoImg, alt: 'Shree Nandi — श्री नंदी logo' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Gallery() {
  return (
    <section className="bg-cream py-16 md:py-20">
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
          className="text-center text-brown-light font-body mb-12 max-w-2xl mx-auto"
        >
          A glimpse into Shree Nandi Gruhudhyog — where tradition meets taste
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="columns-2 md:columns-3 gap-4 space-y-4"
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="rounded-2xl overflow-hidden group relative cursor-pointer break-inside-avoid"
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
