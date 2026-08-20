import { useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import SmartImage from './SmartImage'
import { useScrollLock, useEscapeKey } from '../../lib/hooks'
import { ease } from '../../lib/motion'

/**
 * Accessible image lightbox.
 *
 * The previous gallery overlay could only be dismissed with the mouse — no
 * Escape, no arrow keys, no focus handling and no scroll lock, so keyboard and
 * screen-reader users were stuck once it opened. This version handles all four,
 * and restores focus to whatever opened it on close.
 */
export default function Lightbox({ items, index, onClose, onNavigate }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const restoreRef = useRef(null)

  const item = items[index]
  const hasPrev = index > 0
  const hasNext = index < items.length - 1

  useScrollLock(true)
  useEscapeKey(true, onClose)

  const go = useCallback(
    (delta) => {
      const next = index + delta
      if (next >= 0 && next < items.length) onNavigate(next)
    },
    [index, items.length, onNavigate],
  )

  // Remember what had focus, move focus into the dialog, restore on unmount.
  useEffect(() => {
    restoreRef.current = document.activeElement
    closeRef.current?.focus()
    return () => {
      if (restoreRef.current instanceof HTMLElement) restoreRef.current.focus()
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(-1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(1)
      } else if (e.key === 'Tab') {
        // Minimal focus trap — keeps Tab cycling within the dialog.
        const focusables = panelRef.current?.querySelectorAll('button')
        if (!focusables?.length) return
        const list = Array.from(focusables)
        const first = list[0]
        const last = list[list.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  if (!item) return null

  return (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.alt || 'Image viewer'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      onClick={onClose}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-clay-950/92 p-4 backdrop-blur-md sm:p-8"
    >
      {/* Controls sit above the image and stop propagation so a click on them
          doesn't also fire the backdrop's close handler. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="pointer-events-auto rounded-full bg-white/10 px-3.5 py-1.5 font-body text-xs font-semibold text-white/80 tabular-nums backdrop-blur-sm">
          {index + 1} / {items.length}
        </span>
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close image viewer"
          className="pointer-events-auto rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
        >
          <X size={20} />
        </button>
      </div>

      {hasPrev && (
        <NavButton side="left" onClick={(e) => { e.stopPropagation(); go(-1) }} />
      )}
      {hasNext && (
        <NavButton side="right" onClick={(e) => { e.stopPropagation(); go(1) }} />
      )}

      <motion.figure
        key={item.key ?? index}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: ease.outExpo }}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-full w-full max-w-5xl flex-col items-center gap-4"
      >
        <SmartImage
          picture={item.picture}
          alt={item.alt}
          sizes="(max-width: 1024px) 92vw, 1024px"
          priority
          className="max-h-[74vh] w-auto rounded-xl shadow-pop"
          imgClassName="object-contain"
        />
        {item.alt && (
          <figcaption className="max-w-2xl text-center font-body text-sm text-white/75">
            {item.alt}
          </figcaption>
        )}
      </motion.figure>
    </motion.div>
  )
}

function NavButton({ side, onClick }) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight
  return (
    <button
      onClick={onClick}
      aria-label={side === 'left' ? 'Previous image' : 'Next image'}
      className={`absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/25 ${
        side === 'left' ? 'left-2 sm:left-6' : 'right-2 sm:right-6'
      }`}
    >
      <Icon size={24} />
    </button>
  )
}
