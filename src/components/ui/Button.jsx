import { motion } from 'framer-motion'
import { spring } from '../../lib/motion'

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold ' +
  'whitespace-nowrap transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50'

/*
 * One button family (DESIGN.md: one system). `primary` is the marigold fill
 * with indigo text in both themes; `whatsapp` is the one green on the site.
 */
const variants = {
  primary: 'bg-accent text-on-accent hover:bg-accent-hover shadow-soft',
  outline: 'border border-line-strong text-ink hover:border-ink hover:bg-surface',
  ghost: 'text-ink-soft hover:bg-surface-alt hover:text-ink',
  whatsapp: 'bg-leaf-500 text-white hover:bg-leaf-600 shadow-soft',
  // On photos, video and indigo grounds
  light: 'bg-paper-50 text-indigo-950 hover:bg-white shadow-soft',
  outlineLight: 'border border-white/35 text-white hover:border-white hover:bg-white/10',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-7 py-3.5 text-[0.95rem]',
}

/**
 * Polymorphic action. Renders an <a> when given `href`, otherwise a <button>.
 * Steps up on hover, presses on tap — transform only, so it composites.
 */
export default function Button({
  as,
  href,
  variant = 'primary',
  size = 'md',
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
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97, y: 0 }}
      transition={spring.snappy}
      className={`${base} ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
