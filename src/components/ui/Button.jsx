import { motion } from 'framer-motion'
import { spring } from '../../lib/motion'

const base =
  'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-body font-semibold ' +
  'whitespace-nowrap transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50'

const variants = {
  primary: 'bg-brand text-on-brand hover:bg-brand-hover shadow-lift',
  outline: 'border border-line-strong text-ink hover:border-brand hover:text-brand',
  ghost: 'text-ink-soft hover:bg-surface-alt hover:text-ink',
  whatsapp: 'bg-leaf-500 text-white hover:bg-leaf-600 shadow-lift',
  // For use on photos and dark grounds
  glass:
    'border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:border-white/40',
  solidLight: 'bg-white text-clay-900 hover:bg-clay-100 shadow-lift',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-3.5 text-base',
}

/**
 * Polymorphic action. Renders an <a> when given `href`, otherwise a <button>.
 *
 * The `shine` sweep is a single translating highlight rather than a filter or
 * box-shadow animation, so it stays on the compositor and can't cause jank on
 * the low-end phones most of this site's traffic will arrive on.
 */
export default function Button({
  as,
  href,
  variant = 'primary',
  size = 'md',
  shine = true,
  className = '',
  children,
  ...rest
}) {
  const Tag = as ?? (href ? motion.a : motion.button)
  const isExternal = href?.startsWith('http')

  return (
    <Tag
      href={href}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : null)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={spring.snappy}
      className={`${base} ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md} ${className}`}
      {...rest}
    >
      {shine && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full"
        />
      )}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </Tag>
  )
}
