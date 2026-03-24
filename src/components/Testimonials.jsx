import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Priya Patel',
    location: 'Ahmedabad, Gujarat',
    initials: 'PP',
    color: 'bg-saffron',
    quote: 'The best namkeen I have ever tasted! It reminds me of my grandmother\'s kitchen. Shree Nandi has truly captured the authentic Gujarati flavour that\'s so hard to find these days.',
  },
  {
    name: 'Rajesh Sharma',
    location: 'Mumbai, Maharashtra',
    initials: 'RS',
    color: 'bg-green',
    quote: 'I order khakhra and pickles every month. The quality is consistently amazing and the delivery is always on time. My entire family is hooked on their products!',
  },
  {
    name: 'Meena Desai',
    location: 'Surat, Gujarat',
    initials: 'MD',
    color: 'bg-brown',
    quote: 'Finding preservative-free snacks was a challenge until we discovered Shree Nandi. Now our kids enjoy healthy, homemade-style treats. The butter cookies are to die for!',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="bg-saffron py-16 md:py-20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl sm:text-4xl text-white text-center font-bold mb-12"
        >
          What Our Customers Say 💬
        </motion.h2>

        <div className="relative min-h-[280px] sm:min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`rounded-full w-14 h-14 flex items-center justify-center ${testimonials[current].color} text-white font-bold text-xl font-body shrink-0`}>
                  {testimonials[current].initials}
                </div>
                <div>
                  <h4 className="font-heading text-brown font-bold text-lg">{testimonials[current].name}</h4>
                  <p className="font-body text-gray-500 text-sm">{testimonials[current].location}</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={18} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="text-gray-700 font-body italic leading-relaxed">
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === current ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
