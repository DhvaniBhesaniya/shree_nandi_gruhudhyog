import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Boxes, Users, CalendarDays, Wheat } from 'lucide-react'
import { RevealGroup, RevealItem } from './ui/Reveal'
import { ease } from '../lib/motion'

const stats = [
  { icon: Boxes, value: 500, suffix: '+', label: 'Products in store' },
  { icon: Users, value: 10000, suffix: '+', label: 'Happy customers' },
  { icon: CalendarDays, value: 15, suffix: '+', label: 'Years of taste' },
  { icon: Wheat, value: 100, suffix: '%', label: 'Homemade recipes' },
]

/**
 * Animated counter.
 *
 * Driven by requestAnimationFrame with an eased curve rather than the previous
 * 16ms setInterval, which stepped linearly and drifted on slower devices — the
 * ease-out also makes the number feel like it's settling rather than stopping.
 */
function CountUp({ target, suffix, run }) {
  const [value, setValue] = useState(0)
  const frame = useRef(0)

  useEffect(() => {
    if (!run) return

    const DURATION = 1800
    let start

    const tick = (now) => {
      start ??= now
      const t = Math.min((now - start) / DURATION, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(target * eased))
      if (t < 1) frame.current = requestAnimationFrame(tick)
    }

    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [run, target])

  return (
    <span className="tabular-nums">
      {value.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}

export default function StatsBanner() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <section ref={ref} className="relative overflow-hidden bg-inverse py-16 md:py-20">
      {/* Single warm wash so the dark band doesn't read as a flat black slab */}
      <div
        aria-hidden="true"
        className="absolute -top-1/2 left-1/2 h-[130%] w-[80%] -translate-x-1/2 rounded-full bg-saffron-800/25 blur-[110px]"
      />

      <RevealGroup
        each={0.09}
        className="relative mx-auto grid max-w-7xl grid-cols-2 gap-y-12 px-5 sm:px-8 lg:grid-cols-4 lg:px-10"
      >
        {stats.map(({ icon: Icon, value, suffix, label }, i) => (
          <RevealItem
            key={label}
            className={`flex flex-col items-center text-center ${
              // Hairline dividers instead of a plain grid — cheap way to make a
              // stat row look composed rather than dropped in.
              i > 0 ? 'lg:border-l lg:border-white/10' : ''
            }`}
          >
            <Icon size={22} className="mb-4 text-gold-400" strokeWidth={1.6} />
            <p className="font-display text-h1 font-semibold leading-none text-white">
              <CountUp target={value} suffix={suffix} run={inView} />
            </p>
            <p className="mt-3 font-body text-sm text-white/55">{label}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: ease.outExpo }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-transparent via-gold-500/40 to-transparent"
      />
    </section>
  )
}
