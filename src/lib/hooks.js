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
 * Uses IntersectionObserver rather than a scroll handler. The previous version
 * called getBoundingClientRect() on every section plus read body.scrollHeight on
 * every scroll event, which forces a synchronous layout each time — the single
 * worst scroll-jank source on the page. The observer does the same job off the
 * main thread and fires only when a section actually crosses the band.
 *
 * The band is the strip between the navbar and 55% down the viewport, so the
 * "current" section is whatever occupies the top of the screen, and tall and
 * short sections behave the same way.
 *
 * Returns null when nothing is in the band — at the very top of the page that's
 * correct, since the hero isn't one of the nav destinations.
 */
export function useActiveSection(ids, offset = 96) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return

    const inBand = new Set()

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id)
          else inBand.delete(entry.target.id)
        }
        // Document order, last match wins — that's the one furthest down the
        // page, i.e. the one the visitor has most recently scrolled into.
        const current = ids.filter((id) => inBand.has(id)).pop()
        if (current) setActive(current)
        else setActive(null)
      },
      { rootMargin: `-${offset}px 0px -55% 0px`, threshold: 0 },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
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
