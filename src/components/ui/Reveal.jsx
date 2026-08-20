import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport, wordReveal } from '../../lib/motion'

/**
 * Scroll-triggered reveal. Thin wrapper so components don't each restate the
 * same initial/whileInView/viewport triple.
 */
export function Reveal({
  as = 'div',
  variants = fadeUp,
  delay = 0,
  className = '',
  children,
  ...rest
}) {
  const M = motion[as] ?? motion.div
  return (
    <M
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={delay ? { delay } : undefined}
      className={className}
      {...rest}
    >
      {children}
    </M>
  )
}

/**
 * Staggered group. Children should be <RevealItem> (or any motion element with
 * hidden/visible variants) — the parent orchestrates their timing.
 */
export function RevealGroup({
  as = 'div',
  each = 0.07,
  delayChildren = 0.05,
  className = '',
  children,
  ...rest
}) {
  const M = motion[as] ?? motion.div
  return (
    <M
      variants={stagger(each, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={className}
      {...rest}
    >
      {children}
    </M>
  )
}

export function RevealItem({ as = 'div', variants = fadeUp, className = '', children, ...rest }) {
  const M = motion[as] ?? motion.div
  return (
    <M variants={variants} className={className} {...rest}>
      {children}
    </M>
  )
}

/**
 * Heading that reveals word by word, each word sliding up out of a clipped box.
 *
 * Words are split on whitespace and wrapped in inline-blocks so lines still
 * wrap naturally at any width.
 */
export function RevealWords({ text, as = 'h2', className = '', each = 0.045, ...rest }) {
  const M = motion[as] ?? motion.h2
  const words = String(text).split(' ')

  return (
    <M
      variants={wordReveal.container(each)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={className}
      {...rest}
    >
      {/* The unsplit string stays available to screen readers; only the visual
          copy is broken into per-word boxes. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          // The space is a sibling text node rather than sitting inside the
          // inline-block: a trailing space within an inline-block is trimmed,
          // which would run every word together.
          <Fragment key={`${word}-${i}`}>
            <span className="inline-block overflow-hidden align-bottom">
              <motion.span variants={wordReveal.word} className="inline-block">
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </span>
    </M>
  )
}
