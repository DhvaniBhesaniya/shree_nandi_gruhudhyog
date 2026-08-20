import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, Sun, Moon, MessageCircle } from 'lucide-react'
import { img } from '../assets/images'
import { site, whatsappLink, waMessage } from '../lib/site'
import { useActiveSection, useScrollLock, useEscapeKey, useTheme, scrollToId } from '../lib/hooks'
import { ease, spring } from '../lib/motion'

const links = [
  { label: 'Products', id: 'products' },
  { label: 'Beverages', id: 'beverages' },
  { label: 'Our Story', id: 'about' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Bulk Orders', id: 'bulk' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const { isDark, toggle } = useTheme()

  const ids = useMemo(() => links.map((l) => l.id), [])
  const active = useActiveSection(ids)

  // Condense the bar once the visitor leaves the hero.
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  useScrollLock(open)
  useEscapeKey(open, () => setOpen(false))

  // Close the drawer if the viewport grows past the mobile breakpoint while
  // it's open — otherwise it stays mounted and keeps scroll locked.
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

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: ease.outExpo, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-100"
    >
      <div
        className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? 'border-b border-line bg-canvas/85 shadow-soft backdrop-blur-xl'
            : 'border-b border-transparent bg-canvas/40 backdrop-blur-sm'
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
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="group flex items-center gap-3"
          >
            <motion.img
              src={img.logo?.img.src}
              srcSet={img.logo?.sources?.webp}
              sizes="48px"
              width={48}
              height={48}
              alt=""
              whileHover={{ rotate: -6, scale: 1.06 }}
              transition={spring.bouncy}
              className="h-10 w-10 rounded-full object-cover ring-1 ring-line md:h-11 md:w-11"
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-base font-semibold tracking-tight text-ink md:text-lg">
                Shree Nandi
              </span>
              <span className="eyebrow mt-1 text-[0.6rem] text-ink-faint">Gruhudhyog</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
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
                    className={`relative block rounded-full px-3.5 py-2 font-body text-sm font-medium transition-colors duration-300 ${
                      isActive ? 'text-brand' : 'text-ink-soft hover:text-ink'
                    }`}
                  >
                    {/* One shared element slides between links rather than each
                        fading its own background in and out. */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        transition={spring.soft}
                        className="absolute inset-0 -z-10 rounded-full bg-brand-tint"
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle isDark={isDark} onToggle={toggle} />

            <motion.a
              href={whatsappLink(waMessage.general)}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
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
              className="rounded-full p-2.5 text-ink transition-colors hover:bg-surface-alt lg:hidden"
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
              className="fixed inset-0 -z-10 bg-clay-950/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: ease.outExpo }}
              className="mx-3 overflow-hidden rounded-panel border border-line bg-canvas shadow-pop lg:hidden"
            >
              <ul className="flex flex-col p-3">
                {links.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.045, ease: ease.outExpo }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        go(link.id)
                      }}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3.5 font-body text-base font-medium transition-colors ${
                        active === link.id
                          ? 'bg-brand-tint text-brand'
                          : 'text-ink hover:bg-surface-alt'
                      }`}
                    >
                      {link.label}
                      <span aria-hidden="true" className="text-ink-faint">
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
                  className="flex items-center justify-center gap-2 rounded-2xl bg-leaf-500 px-5 py-3.5 font-body font-semibold text-white"
                >
                  <MessageCircle size={18} />
                  Order on WhatsApp
                </a>
                <a
                  href={`tel:${site.phone}`}
                  className="mt-2 flex items-center justify-center rounded-2xl px-5 py-3 font-body text-sm font-medium text-ink-soft"
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

function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full text-ink-soft transition-colors hover:bg-surface-alt hover:text-ink"
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
