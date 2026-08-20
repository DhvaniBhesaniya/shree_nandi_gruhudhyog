import { Reveal, RevealWords } from './Reveal'

/**
 * Section shell — owns the vertical rhythm and max width so spacing is
 * consistent instead of each section picking its own py-16/md:py-20.
 *
 * `tone` selects a ground from the semantic tokens. Alternating tones is what
 * gives the page its banding without every section restating colour classes.
 */
const tones = {
  canvas: 'bg-canvas text-ink',
  surface: 'bg-surface text-ink',
  alt: 'bg-surface-alt text-ink',
  inverse: 'bg-inverse text-ink-inverse',
  brand: 'bg-brand text-on-brand',
}

export default function Section({
  id,
  tone = 'canvas',
  size = 'md',
  className = '',
  containerClassName = '',
  children,
  ...rest
}) {
  const pad = size === 'lg' ? 'py-24 md:py-36' : size === 'sm' ? 'py-12 md:py-16' : 'py-20 md:py-28'

  return (
    <section
      id={id}
      className={`relative ${tones[tone] ?? tones.canvas} ${pad} ${className}`}
      {...rest}
    >
      <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 ${containerClassName}`}>
        {children}
      </div>
    </section>
  )
}

/**
 * Eyebrow + word-revealed title + lead paragraph.
 *
 * Replaces the heading/subheading pair that each section previously hand-rolled,
 * and adds the small caps eyebrow that gives the page a magazine-like structure
 * rather than a run of same-sized headings.
 */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = 'center',
  tone = 'light',
  className = '',
}) {
  const alignment =
    align === 'left' ? 'text-left items-start' : 'text-center items-center mx-auto'
  const eyebrowTone = tone === 'dark' ? 'text-gold-400' : 'text-brand'
  const leadTone = tone === 'dark' ? 'text-white/70' : 'text-ink-soft'

  return (
    <div className={`flex max-w-3xl flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <Reveal
          as="p"
          className={`eyebrow mb-4 flex items-center gap-2.5 ${eyebrowTone}`}
        >
          <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
          {eyebrow}
        </Reveal>
      )}

      <RevealWords
        text={title}
        as="h2"
        className="font-display text-h2 font-semibold"
      />

      {lead && (
        <Reveal as="p" delay={0.12} className={`text-lead mt-5 ${leadTone}`}>
          {lead}
        </Reveal>
      )}
    </div>
  )
}
