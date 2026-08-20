import { useCallback, useEffect, useState } from 'react'

/**
 * Locks page scroll while an overlay is open.
 *
 * Pads the body by the scrollbar width on the way in, otherwise removing the
 * scrollbar shifts the whole layout sideways as the modal opens.
 */
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return

    const { body, documentElement: html } = document
    const prevOverflow = body.style.overflow
    const prevPadding = body.style.paddingRight
    const scrollbar = window.innerWidth - html.clientWidth

    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`

    return () => {
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPadding
    }
  }, [active])
}

/** Calls `handler` on Escape while `active`. */
export function useEscapeKey(active, handler) {
  useEffect(() => {
    if (!active) return
    const onKey = (e) => {
      if (e.key === 'Escape') handler()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, handler])
}

/**
 * Tracks which section is currently in view, for navbar highlighting.
 *
 * Uses a viewport band just below the fixed navbar rather than element
 * visibility ratios, so tall and short sections behave the same way.
 */
export function useActiveSection(ids, offset = 96) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const pick = () => {
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= offset + 8) current = id
      }
      // Near the very bottom the last section may never cross the band.
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 120
      setActive(atBottom ? ids[ids.length - 1] : current)
    }

    pick()
    window.addEventListener('scroll', pick, { passive: true })
    window.addEventListener('resize', pick)
    return () => {
      window.removeEventListener('scroll', pick)
      window.removeEventListener('resize', pick)
    }
  }, [ids, offset])

  return active
}

const THEME_KEY = 'sng-theme'

/**
 * Dark mode. The initial class is applied by an inline script in index.html so
 * there's no flash of the wrong theme; this hook only reads and updates it.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light',
  )

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      document.documentElement.classList.toggle('dark', next === 'dark')
      try {
        localStorage.setItem(THEME_KEY, next)
      } catch {
        // Private browsing can reject writes; the toggle should still work.
      }
      return next
    })
  }, [])

  // Follow the OS while the visitor hasn't made an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e) => {
      let stored = null
      try {
        stored = localStorage.getItem(THEME_KEY)
      } catch {
        /* ignore */
      }
      if (stored) return
      document.documentElement.classList.toggle('dark', e.matches)
      setTheme(e.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return { theme, toggle, isDark: theme === 'dark' }
}

/**
 * Smoothly scrolls to a section, landing below the fixed navbar.
 *
 * Done in JS rather than CSS `scroll-behavior: smooth` so it can fall back to an
 * instant jump when the visitor has asked for reduced motion.
 */
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 4.5
  const offset = navH * 16 + 12
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
}
