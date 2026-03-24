import { motion } from 'framer-motion'
import { Home, Leaf, Truck, BadgeDollarSign } from 'lucide-react'

const features = [
  { icon: Home, title: 'Homemade Quality', description: 'Every product is handcrafted in our kitchen using traditional recipes passed down through generations.', emoji: '🏠' },
  { icon: Leaf, title: 'No Preservatives', description: 'Pure, natural ingredients only. No artificial colours, flavours or preservatives — ever.', emoji: '🌿' },
  { icon: Truck, title: 'Pan India Delivery', description: 'We deliver fresh products across India. From Gujarat to your doorstep, anywhere in the country.', emoji: '🚚' },
  { icon: BadgeDollarSign, title: 'Best Prices', description: 'Premium quality at honest prices. Direct from our kitchen to your table, no middlemen involved.', emoji: '💰' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
}

export default function WhyChooseUs() {
  return (
    <section className="bg-gradient-to-br from-cream to-orange-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl sm:text-4xl text-brown text-center font-bold mb-4"
        >
          Why Families Love Shree Nandi
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-brown-light font-body mb-12 max-w-2xl mx-auto"
        >
          Quality, tradition, and trust — that's what sets us apart
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((f) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -4 }}
                className="bg-white rounded-2xl p-8 shadow-md text-center hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-saffron/10 flex items-center justify-center">
                  <Icon size={32} className="text-saffron" />
                </div>
                <h3 className="font-heading text-brown text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-gray-600 font-body text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
