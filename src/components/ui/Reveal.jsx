import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport, wordReveal } from '../../lib/motion'
import { splitWords, plainText } from '../../lib/text'

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
 * Words are wrapped in inline-blocks so lines still wrap naturally at any
 * width. `emClassName` colours the italic words (marigold on dark grounds).
 */
export function RevealWords({
  text,
  as = 'h2',
  className = '',
  emClassName = '',
  each = 0.045,
  ...rest
}) {
  const M = motion[as] ?? motion.h2
  const words = splitWords(text)

  return (
    <M
      variants={wordReveal.container(each)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={className}
      {...rest}
    >
      <span className="sr-only">{plainText(text)}</span>
      <span aria-hidden="true">
        {words.map(({ word, italic }, i) => (
          // The space is a sibling text node rather than sitting inside the
          // inline-block: a trailing space within an inline-block is trimmed.
          <Fragment key={`${word}-${i}`}>
            <span className="inline-block overflow-hidden align-bottom pb-[0.06em]">
              <motion.span variants={wordReveal.word} className="inline-block">
                {italic ? <em className={emClassName}>{word}</em> : word}
              </motion.span>
            </span>
            {i < words.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </span>
    </M>
  )
}
