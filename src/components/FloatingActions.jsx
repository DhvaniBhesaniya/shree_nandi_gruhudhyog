import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { MessageCircle, ArrowUp } from 'lucide-react'
import { whatsappLink, waMessage } from '../lib/site'
import { ease, spring } from '../lib/motion'

/**
 * Floating WhatsApp button plus a back-to-top that appears once there's
 * something to go back up to.
 *
 * Both sit in one stack so they can never overlap each other, and the stack is
 * offset far enough from the edge to stay clear of iOS Safari's bottom bar.
 */
export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setShowTop(v > 900))

  const toTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <div className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-90 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="top"
            onClick={toTop}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.7, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 8 }}
            transition={{ duration: 0.25, ease: ease.outExpo }}
            whileHover={{ y: -3 }}
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/90 text-ink-soft shadow-lift backdrop-blur-md transition-colors hover:text-ink"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappLink(waMessage.general)}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...spring.bouncy, delay: 1.1 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="group relative flex items-center gap-2.5 rounded-full bg-leaf-500 py-3.5 pl-4 pr-4 text-white shadow-pop transition-colors hover:bg-leaf-600 sm:pr-5"
      >
        {/* Attention pulse, drawn behind the button so it never affects layout */}
        <motion.span
          aria-hidden="true"
          animate={{ scale: [1, 1.35], opacity: [0.45, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
          className="absolute inset-0 -z-10 rounded-full bg-leaf-500"
        />
        <MessageCircle size={21} className="shrink-0" />
        <span className="hidden font-body text-sm font-semibold sm:inline">Chat with us</span>
      </motion.a>
    </div>
  )
}
