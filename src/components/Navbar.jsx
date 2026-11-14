import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, Sun, Moon, MessageCircle } from 'lucide-react'
import { img } from '../assets/images'
import { site, whatsappLink, waMessage } from '../lib/site'
import { useActiveSection, useScrollLock, useEscapeKey, useTheme, scrollToId } from '../lib/hooks'
import { ease, spring } from '../lib/motion'

const links = [
  { label: 'Products', id: 'products' },
  { label: 'Our kitchen', id: 'homemade' },
  { label: 'Soda bar', id: 'beverages' },
  { label: 'Our story', id: 'about' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Bulk orders', id: 'bulk' },
  { label: 'Contact', id: 'contact' },
]

/**
 * Fixed header.
 *
 * Sits transparent over the dark hero with light type, then condenses onto a
 * canvas-coloured bar once the visitor scrolls. Only colour and shadow
 * transition — the blur radius never animates, which is the expensive case.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const { isDark, toggle } = useTheme()

  const ids = useMemo(() => links.map((l) => l.id), [])
  const active = useActiveSection(ids)

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40))

  useScrollLock(open)
  useEscapeKey(open, () => setOpen(false))

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = (e) => e.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const go = (id) => {
    setOpen(false)
    scrollToId(id)
  }

  // Over the hero the bar is transparent on indigo, so the type is light.
  const onDark = !scrolled && !open
  const textMain = onDark ? 'text-paper-50' : 'text-ink'
  const textSoft = onDark ? 'text-paper-50/70 hover:text-paper-50' : 'text-ink-soft hover:text-ink'

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: ease.outExpo, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-100"
    >
      <div
        className={`transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled || open
            ? 'border-b border-line bg-canvas/92 shadow-soft backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-[var(--nav-h)] w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10"
        >
          {/* Brand */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              setOpen(false)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="group flex items-center gap-3"
          >
            <motion.img
              src={img.logo?.img.src}
              srcSet={img.logo?.sources?.webp}
              sizes="44px"
              width={44}
              height={44}
              alt=""
              whileHover={{ rotate: -8 }}
              transition={spring.bouncy}
              className="h-10 w-10 rounded-full object-cover ring-1 ring-white/20"
            />
            <span className="flex flex-col leading-none">
              <span className={`font-display text-xl tracking-tight transition-colors ${textMain}`}>
                Shree Nandi
              </span>
              <span
                className={`eyebrow mt-1 text-[0.58rem] transition-colors ${
                  onDark ? 'text-marigold-400' : 'text-brand'
                }`}
              >
                Gruhudhyog
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {links.map((link) => {
              const isActive = active === link.id
              return (
                <li key={link.id} className="relative">
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      go(link.id)
                    }}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative block px-3 py-2 font-body text-[0.84rem] font-semibold transition-colors duration-300 ${
                      isActive ? textMain : textSoft
                    }`}
                  >
                    {link.label}
                    {/* One shared underline slides between links */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        transition={spring.soft}
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-accent"
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <ThemeToggle isDark={isDark} onToggle={toggle} onDark={onDark} />

            <motion.a
              href={whatsappLink(waMessage.general)}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={spring.snappy}
              className="hidden items-center gap-2 rounded-full bg-leaf-500 px-4 py-2.5 font-body text-sm font-semibold text-white shadow-soft transition-colors hover:bg-leaf-600 sm:inline-flex"
            >
              <MessageCircle size={16} />
              Order
            </motion.a>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={`rounded-full p-2.5 transition-colors lg:hidden ${textMain} ${
                onDark ? 'hover:bg-white/10' : 'hover:bg-surface-alt'
              }`}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 -z-10 bg-indigo-950/50 lg:hidden"
            />
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: ease.outExpo }}
              className="mx-3 overflow-hidden rounded-panel border border-line bg-canvas shadow-pop lg:hidden"
            >
              <ul className="flex flex-col p-3">
                {links.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.04, ease: ease.outExpo }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        go(link.id)
                      }}
                      className={`flex items-center justify-between rounded-card px-4 py-3.5 font-display text-2xl transition-colors ${
                        active === link.id ? 'bg-brand-tint text-brand' : 'text-ink hover:bg-surface-alt'
                      }`}
                    >
                      {link.label}
                      <span aria-hidden="true" className="font-body text-sm text-ink-faint">
                        →
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="border-t border-line p-3">
                <a
                  href={whatsappLink(waMessage.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-leaf-500 px-5 py-3.5 font-body font-semibold text-white"
                >
                  <MessageCircle size={18} />
                  Order on WhatsApp
                </a>
                <a
                  href={`tel:${site.phone}`}
                  className="mt-2 flex items-center justify-center rounded-full px-5 py-3 font-body text-sm font-semibold text-ink-soft"
                >
                  {site.phoneDisplay}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function ThemeToggle({ isDark, onToggle, onDark }) {
  return (
    <button
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className={`relative grid h-10 w-10 place-items-center overflow-hidden rounded-full transition-colors ${
        onDark ? 'text-paper-50/80 hover:bg-white/10 hover:text-paper-50' : 'text-ink-soft hover:bg-surface-alt hover:text-ink'
      }`}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ y: 14, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.25, ease: ease.outExpo }}
          className="absolute grid place-items-center"
        >
          {isDark ? <Moon size={18} /> : <Sun size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
