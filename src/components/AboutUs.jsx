import { motion } from 'framer-motion'
import shopExterior2 from '../assets/my_shop_images/shop_image_from_outside_2.jpeg'

export default function AboutUs() {
  return (
    <section id="about" className="bg-brown text-white py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image — Actual shop photo */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={shopExterior2}
                alt="Shree Nandi Gruhudhyog shop at night"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl text-gold font-bold mb-6">
              A Legacy of Flavour Since Decades
            </h2>
            <div className="space-y-4 font-body text-cream/90 leading-relaxed">
              <p>
                Born in the heart of Gujarat, Shree Nandi Gruhudhyog (શ્રી નંદી ગૃહ ઉદ્યોગ) started as a small family kitchen
                with a big dream — to share the authentic taste of homemade Gujarati food with every household in India.
              </p>
              <p>
                Today, our shop is a one-stop destination for premium Gujarati farsan, namkeen, khakhra, bhakhri, pickles,
                bakery products, wafers, chips, chocolates, and everyday grocery essentials. We carry trusted brands like
                Shantaben Khakhra, Mother's Recipe, Cornitos, and Jabsons alongside our own homemade specialities.
              </p>
              <p>
                We believe food is more than nourishment — it's a connection to our roots, our culture,
                and our family. That's why we never compromise on quality, taste, or tradition.
                ખાખરા, નમકીન, અથાણા, બેકરી પ્રોડક્ટ — all under one roof!
              </p>
            </div>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block mt-8 border-2 border-gold text-gold hover:bg-gold hover:text-brown rounded-full px-6 py-2 font-body font-semibold transition-colors duration-300"
            >
              Visit Our Shop
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
