import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Reading-progress bar pinned to the top of the viewport.
 *
 * The raw scroll value is passed through a spring so the bar glides instead of
 * tracking the wheel one-to-one, which is what makes it read as considered
 * rather than as a raw scrollbar substitute.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const width = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: width }}
      className="fixed inset-x-0 top-0 z-200 h-0.5 origin-left bg-gradient-to-r from-saffron-500 via-gold-400 to-saffron-600"
    />
  )
}
