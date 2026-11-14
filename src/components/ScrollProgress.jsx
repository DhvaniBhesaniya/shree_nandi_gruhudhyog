import { motion, useScroll, useSpring } from 'framer-motion'

/** Reading-progress hairline pinned to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const width = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: width }}
      className="fixed inset-x-0 top-0 z-200 h-0.5 origin-left bg-accent"
    />
  )
}
