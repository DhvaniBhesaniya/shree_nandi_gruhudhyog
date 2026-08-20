import { Star, Quote, ArrowUpRight } from 'lucide-react'
import Section, { SectionHeader } from './ui/Section'
import { RevealGroup, RevealItem } from './ui/Reveal'
import { site } from '../lib/site'

const testimonials = [
  {
    name: 'Priya Patel',
    location: 'Ahmedabad, Gujarat',
    initials: 'PP',
    quote:
      'The best namkeen I have ever tasted — it reminds me of my grandmother\'s kitchen. Shree Nandi has truly captured the authentic Gujarati flavour that is so hard to find these days.',
  },
  {
    name: 'Rajesh Sharma',
    location: 'Mumbai, Maharashtra',
    initials: 'RS',
    quote:
      'I order khakhra and pickles every month. The quality is consistently amazing and delivery is always on time. My entire family is hooked on their products.',
  },
  {
    name: 'Meena Desai',
    location: 'Surat, Gujarat',
    initials: 'MD',
    quote:
      'Finding preservative-free snacks was a challenge until we discovered Shree Nandi. Now our kids enjoy healthy, homemade-style treats. The butter cookies are to die for.',
  },
]

/**
 * Customer quotes.
 *
 * Shown as a static three-up grid rather than the previous auto-rotating
 * carousel. A carousel that advances every five seconds hides two thirds of the
 * content at any moment, can't be read at the visitor's own pace, and — since it
 * never paused on hover or focus — would swap out from under someone mid-sentence.
 */
export default function Testimonials() {
  return (
    <Section tone="surface" size="lg">
      <SectionHeader
        eyebrow="In their words"
        title="What our customers say"
        lead="Been in the shop or ordered from us? A review on Google helps other families find us."
      />

      <RevealGroup each={0.1} className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {testimonials.map((t) => (
          <RevealItem key={t.name}>
            <figure className="flex h-full flex-col rounded-panel border border-line bg-canvas p-7 shadow-soft transition-shadow duration-500 hover:shadow-lift">
              <Quote
                size={26}
                aria-hidden="true"
                className="mb-5 shrink-0 fill-brand/15 text-brand/40"
              />

              <blockquote className="flex-1 font-body leading-relaxed text-ink-soft">
                {t.quote}
              </blockquote>

              <div
                className="mt-5 flex items-center gap-0.5"
                role="img"
                aria-label="Rated 5 out of 5"
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={14} className="fill-gold-500 text-gold-500" />
                ))}
              </div>

              <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-tint font-body text-sm font-semibold text-brand">
                  {t.initials}
                </span>
                <span className="min-w-0">
                  <span className="block font-body text-sm font-semibold text-ink">
                    {t.name}
                  </span>
                  <span className="block font-body text-xs text-ink-faint">{t.location}</span>
                </span>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-10 text-center">
        <a
          href={site.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 font-body text-sm font-semibold text-brand transition-colors hover:text-brand-hover"
        >
          Read and write reviews on Google
          <ArrowUpRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </Section>
  )
}
