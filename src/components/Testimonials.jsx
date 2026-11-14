import { Star, ArrowUpRight } from 'lucide-react'
import Section, { SectionHeader } from './ui/Section'
import { RevealGroup, RevealItem } from './ui/Reveal'
import { site } from '../lib/site'

const testimonials = [
  {
    name: 'Priya Patel',
    location: 'Ahmedabad',
    quote:
      'The best namkeen I have tasted — it reminds me of my grandmother\'s kitchen. Shree Nandi has the authentic Gujarati flavour that is so hard to find now.',
  },
  {
    name: 'Rajesh Sharma',
    location: 'Mumbai',
    quote:
      'I order khakhra and pickles every month. The quality is consistent and delivery is always on time. My whole family is hooked.',
  },
  {
    name: 'Meena Desai',
    location: 'Surat',
    quote:
      'Finding preservative-free snacks was a challenge until we found Shree Nandi. The kids get homemade-style treats, and the butter cookies are something else.',
  },
]

/**
 * Customer quotes, set in the serif as pull quotes on a hairline grid.
 * Static, so each can be read at the visitor's own pace.
 */
export default function Testimonials() {
  return (
    <Section tone="surface" size="lg">
      <SectionHeader
        eyebrow="In their words"
        title="What customers *say about us.*"
        lead="Been in the shop or ordered from us? A review on Google helps other families find us."
      />

      <RevealGroup each={0.1} className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-panel border border-line bg-line lg:grid-cols-3">
        {testimonials.map((t) => (
          <RevealItem key={t.name} as="figure" className="flex h-full flex-col bg-surface p-7 md:p-9">
            <div className="flex items-center gap-0.5" role="img" aria-label="Rated 5 out of 5">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={13} className="fill-marigold-500 text-marigold-500" />
              ))}
            </div>

            <blockquote className="mt-6 flex-1 font-display text-2xl leading-snug text-ink">
              “{t.quote}”
            </blockquote>

            <figcaption className="mt-7 flex items-baseline gap-2 border-t border-line pt-5 font-body text-sm">
              <span className="font-bold text-ink">{t.name}</span>
              <span className="text-ink-faint">{t.location}</span>
            </figcaption>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-8">
        <a
          href={site.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 font-body text-sm font-bold text-brand transition-colors hover:text-brand-hover"
        >
          Read and write reviews on Google
          <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </Section>
  )
}
