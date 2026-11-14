import { Reveal, RevealWords } from './Reveal'

/**
 * Section shell — owns the vertical rhythm and max width so spacing is
 * consistent instead of each section picking its own padding.
 *
 * `tone` selects a ground from the semantic tokens. Alternating tones is what
 * gives the page its banding without every section restating colour classes.
 */
const tones = {
  canvas: 'bg-canvas text-ink',
  surface: 'bg-surface text-ink',
  alt: 'bg-surface-alt text-ink',
  inverse: 'bg-inverse text-ink-inverse',
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
  const pad =
    size === 'lg' ? 'py-24 md:py-36' : size === 'sm' ? 'py-12 md:py-16' : 'py-20 md:py-28'

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
 * The eyebrow carries a short marigold rule; the title takes `*italic*`
 * markup for its one italic phrase.
 */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = 'left',
  tone = 'light',
  className = '',
}) {
  const alignment =
    align === 'left' ? 'text-left items-start' : 'text-center items-center mx-auto'
  const eyebrowTone = tone === 'dark' ? 'text-marigold-400' : 'text-brand'
  const leadTone = tone === 'dark' ? 'text-paper-300/80' : 'text-ink-soft'
  const emTone = tone === 'dark' ? 'text-marigold-400' : ''

  return (
    <div className={`flex max-w-3xl flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <Reveal as="p" className={`eyebrow mb-5 flex items-center gap-3 ${eyebrowTone}`}>
          <span aria-hidden="true" className="rule-accent" />
          {eyebrow}
        </Reveal>
      )}

      <RevealWords text={title} as="h2" className="text-h2" emClassName={emTone} />

      {lead && (
        <Reveal as="p" delay={0.12} className={`text-lead mt-5 max-w-2xl ${leadTone}`}>
          {lead}
        </Reveal>
      )}
    </div>
  )
}
