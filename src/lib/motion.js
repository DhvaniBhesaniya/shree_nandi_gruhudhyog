/**
 * Shared motion vocabulary.
 *
 * Every reveal on the site draws from these curves and variants. The point is
 * consistency: the previous version had a different ad-hoc `duration`/`easeOut`
 * pair in each of nineteen components, so nothing felt like one system.
 *
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user"> in
 * App.jsx — Framer Motion then drops transform/opacity animations for users who
 * ask for it, so individual components don't each need to check.
 */

/** Matches the --ease-* custom properties in index.css. */
export const ease = {
  outExpo: [0.16, 1, 0.3, 1],
  outQuint: [0.22, 1, 0.36, 1],
  inOutQuart: [0.76, 0, 0.24, 1],
  back: [0.34, 1.32, 0.64, 1],
}

export const duration = { fast: 0.35, base: 0.6, slow: 0.9, glacial: 1.4 }

/** The transition used by most reveals. */
export const reveal = { duration: duration.base, ease: ease.outExpo }

/** Springs for interactive feedback, where a duration would feel mechanical. */
export const spring = {
  soft: { type: 'spring', stiffness: 220, damping: 28, mass: 0.7 },
  snappy: { type: 'spring', stiffness: 420, damping: 32 },
  bouncy: { type: 'spring', stiffness: 380, damping: 18 },
}

/**
 * Standard viewport config for scroll reveals.
 * `once` so content doesn't re-animate when scrolling back up — re-triggering
 * reads as jitter on a long marketing page.
 */
export const viewport = { once: true, margin: '-12% 0px -12% 0px' }

/* ---------------------------------------------------------------- variants */

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: reveal },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: reveal },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: reveal },
}

/** Slide in from a side — `dir` is -1 for left, 1 for right. */
export const slideFrom = (dir = -1, distance = 48) => ({
  hidden: { opacity: 0, x: dir * distance },
  visible: { opacity: 1, x: 0, transition: reveal },
})

/**
 * Parent variant for staggered children.
 * `delayChildren` lets the container settle before items start.
 */
export const stagger = (each = 0.07, delayChildren = 0.05) => ({
  hidden: {},
  visible: { transition: { staggerChildren: each, delayChildren } },
})

/** Card lift on hover — subtle, and paired with a shadow change in CSS. */
export const lift = {
  rest: { y: 0 },
  hover: { y: -6, transition: spring.soft },
}

/**
 * Word-by-word heading reveal. Splitting on whitespace keeps each word an
 * inline-block so lines still wrap naturally.
 */
export const wordReveal = {
  container: (each = 0.045) => ({
    hidden: {},
    visible: { transition: { staggerChildren: each } },
  }),
  word: {
    hidden: { opacity: 0, y: '0.5em' },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration.slow, ease: ease.outExpo },
    },
  },
}
