import { useState, useRef, useEffect, useId } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, ExternalLink } from 'lucide-react'
import Section, { SectionHeader } from './ui/Section'
import { Reveal } from './ui/Reveal'
import { site, addressOneLine, telHref, mailHref, whatsappLink, waMessage } from '../lib/site'
import { useOpenState } from '../lib/hours'
import { ease, slideFrom } from '../lib/motion'

const productOptions = [
  'Namkeen & Farsan',
  'Khakhra & Bhakhri',
  'Pickles & Achaar',
  'Bakery & Cookies',
  'Wafers, Chips & Chocolates',
  'Soda & Cold Drinks',
  'Ice Cream',
  'Bulk / Wholesale order',
  'Something else',
]

/**
 * Contact + enquiry.
 *
 * The form previously called setSubmitted(true), showed "Sent Successfully!" and
 * cleared the fields without sending anything anywhere — every enquiry a
 * customer typed was silently discarded. It now validates, then hands off to
 * WhatsApp with the enquiry pre-written, which needs no backend and lands where
 * the shop already answers messages.
 */
export default function ContactSection() {
  return (
    <Section id="contact" tone="canvas" size="lg">
      <SectionHeader
        eyebrow="Get in touch"
        title="Come by, call, or message us"
        lead="We answer WhatsApp fastest. For bulk orders, mention roughly how much you need and we will send rates."
      />

      <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal variants={slideFrom(-1, 40)}>
          <ContactDetails />
        </Reveal>

        <Reveal variants={slideFrom(1, 40)}>
          <EnquiryForm />
        </Reveal>
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */

function ContactDetails() {
  const { isOpen, detail } = useOpenState()

  const rows = [
    { icon: MapPin, label: 'Address', value: addressOneLine, href: site.mapsLink, external: true },
    { icon: Phone, label: 'Phone', value: site.phoneDisplay, href: telHref },
    { icon: Mail, label: 'Email', value: site.email, href: mailHref },
    {
      icon: Clock,
      label: 'Hours',
      value: site.hours.label,
      note: isOpen ? `Open now · ${detail}` : `Closed · ${detail}`,
      noteTone: isOpen ? 'text-leaf-600' : 'text-ink-faint',
    },
  ]

  return (
    <div>
      <ul className="divide-y divide-line overflow-hidden rounded-panel border border-line bg-surface">
        {rows.map(({ icon: Icon, label, value, href, external, note, noteTone }) => {
          const inner = (
            <>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
                <Icon size={17} strokeWidth={1.8} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="eyebrow block text-ink-faint">{label}</span>
                <span className="mt-1.5 block font-body text-sm leading-relaxed text-ink">
                  {value}
                </span>
                {note && (
                  <span className={`mt-1 block font-body text-xs font-medium ${noteTone}`}>
                    {note}
                  </span>
                )}
              </span>
              {href && (
                <ExternalLink
                  size={14}
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-ink-faint opacity-0 transition-opacity group-hover:opacity-100"
                />
              )}
            </>
          )

          return (
            <li key={label}>
              {href ? (
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : null)}
                  className="group flex items-start gap-4 p-5 transition-colors hover:bg-canvas"
                >
                  {inner}
                </a>
              ) : (
                <div className="flex items-start gap-4 p-5">{inner}</div>
              )}
            </li>
          )
        })}
      </ul>

      <motion.a
        href={whatsappLink(waMessage.general)}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        className="mt-4 flex items-center justify-center gap-2.5 rounded-panel bg-leaf-500 px-6 py-4 font-body font-semibold text-white shadow-lift transition-colors hover:bg-leaf-600"
      >
        <MessageCircle size={19} />
        Chat on WhatsApp
      </motion.a>

      <DeferredMap />
    </div>
  )
}

/**
 * Google Maps embed, mounted only once it scrolls close to the viewport.
 *
 * The iframe pulls several hundred kilobytes of third-party script and was
 * previously loaded on every page view even though it sits far below the fold.
 */
function DeferredMap() {
  const ref = useRef(null)
  // Resolved at init rather than in the effect: browsers without
  // IntersectionObserver get the map immediately, and setting that state inside
  // the effect would trigger a cascading re-render.
  const [show, setShow] = useState(() => !('IntersectionObserver' in window))

  useEffect(() => {
    const el = ref.current
    if (!el || show) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [show])

  return (
    <div
      ref={ref}
      className="mt-4 aspect-[16/10] overflow-hidden rounded-panel border border-line bg-surface-alt"
    >
      {show ? (
        <iframe
          src={site.mapsEmbed}
          title={`Map showing ${site.name} in ${site.address.city}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
        />
      ) : (
        <div className="grid h-full place-items-center">
          <span className="flex items-center gap-2 font-body text-sm text-ink-faint">
            <MapPin size={15} />
            Loading map…
          </span>
        </div>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */

const initial = { name: '', phone: '', email: '', product: '', message: '' }

function EnquiryForm() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const uid = useId()

  const set = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }))
    // Clear the error as soon as the visitor starts fixing it, rather than
    // making them submit again to find out.
    if (errors[field]) setErrors((e2) => ({ ...e2, [field]: null }))
  }

  const validate = () => {
    const next = {}

    if (!values.name.trim()) next.name = 'Please tell us your name'

    const digits = values.phone.replace(/\D/g, '')
    if (!digits) next.phone = 'We need a number to reply on'
    else if (!/^(91)?[6-9]\d{9}$/.test(digits))
      next.phone = 'Enter a 10-digit Indian mobile number'

    if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = "That email address doesn't look right"

    return next
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validate()
    setErrors(found)

    if (Object.keys(found).length) {
      // Move focus to the first problem so keyboard and screen-reader users
      // aren't left guessing what failed.
      document.getElementById(`${uid}-${Object.keys(found)[0]}`)?.focus()
      return
    }

    window.open(whatsappLink(waMessage.enquiry(values)), '_blank', 'noopener,noreferrer')
    setSent(true)
    setValues(initial)
  }

  const field =
    'w-full rounded-2xl border bg-surface px-4 py-3 font-body text-sm text-ink placeholder:text-ink-faint transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand/40'

  const cls = (name) =>
    `${field} ${errors[name] ? 'border-chilli-500' : 'border-line focus:border-brand'}`

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-panel border border-line bg-surface p-6 sm:p-8">
      <p className="font-display text-h3 font-semibold text-ink">Send an enquiry</p>
      <p className="mt-1.5 font-body text-sm text-ink-soft">
        This opens WhatsApp with your message ready to send.
      </p>

      <div className="mt-7 space-y-5">
        <Field
          id={`${uid}-name`}
          label="Your name"
          required
          error={errors.name}
        >
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={set('name')}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${uid}-name-err` : undefined}
            placeholder="e.g. Ramesh Patel"
            className={cls('name')}
          />
        </Field>

        <Field
          id={`${uid}-phone`}
          label="Phone number"
          required
          error={errors.phone}
        >
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={values.phone}
            onChange={set('phone')}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
            placeholder="10-digit mobile number"
            className={cls('phone')}
          />
        </Field>

        <Field id={`${uid}-email`} label="Email" hint="optional" error={errors.email}>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={set('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${uid}-email-err` : undefined}
            placeholder="you@example.com"
            className={cls('email')}
          />
        </Field>

        <Field id={`${uid}-product`} label="What are you interested in?" hint="optional">
          <select
            id={`${uid}-product`}
            name="product"
            value={values.product}
            onChange={set('product')}
            className={`${cls('product')} appearance-none`}
          >
            <option value="">Choose a category</option>
            {productOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>

        <Field id={`${uid}-message`} label="Message" hint="optional">
          <textarea
            id={`${uid}-message`}
            name="message"
            rows={4}
            value={values.message}
            onChange={set('message')}
            placeholder="Quantities, delivery area, or anything else we should know"
            className={`${cls('message')} resize-none`}
          />
        </Field>
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        className="mt-7 flex w-full items-center justify-center gap-2.5 rounded-full bg-brand px-6 py-3.5 font-body font-semibold text-on-brand shadow-lift transition-colors hover:bg-brand-hover"
      >
        <Send size={17} />
        Send on WhatsApp
      </motion.button>

      {/* aria-live so the confirmation is announced, not just shown */}
      <div aria-live="polite" className="min-h-6">
        {sent && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: ease.outExpo }}
            className="mt-4 text-center font-body text-sm font-medium text-leaf-600"
          >
            WhatsApp opened with your message — press send there to reach us.
          </motion.p>
        )}
      </div>
    </form>
  )
}

/**
 * Labelled field wrapper.
 *
 * Every input previously communicated its purpose through a placeholder alone,
 * which disappears the moment you start typing and gives screen readers nothing
 * to announce. Real <label> elements fix both, and help browser autofill.
 */
function Field({ id, label, hint, required, error, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-baseline gap-2 font-body text-sm font-medium text-ink"
      >
        {label}
        {required && (
          <span className="text-chilli-500" aria-hidden="true">
            *
          </span>
        )}
        {hint && <span className="font-normal text-ink-faint">({hint})</span>}
      </label>

      {children}

      {error && (
        <p
          id={`${id}-err`}
          className="mt-1.5 font-body text-xs font-medium text-chilli-500"
        >
          {error}
        </p>
      )}
    </div>
  )
}
