import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Package, Users, Clock, Heart } from 'lucide-react'

const stats = [
  { icon: Package, value: 500, suffix: '+', label: 'Products' },
  { icon: Users, value: 10000, suffix: '+', label: 'Happy Customers' },
  { icon: Clock, value: 15, suffix: '+', label: 'Years of Taste' },
  { icon: Heart, value: 100, suffix: '%', label: 'Homemade' },
]

function CountUp({ target, suffix, inView }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  const formatNumber = (num) => {
    return num.toLocaleString('en-IN')
  }

  return (
    <span>{formatNumber(count)}{suffix}</span>
  )
}

export default function StatsBanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="bg-saffron text-white py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <Icon size={32} className="mb-3 text-white/80" />
                <span className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold">
                  <CountUp target={stat.value} suffix={stat.suffix} inView={isInView} />
                </span>
                <span className="font-body text-sm sm:text-base text-white/90 mt-1">{stat.label}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
