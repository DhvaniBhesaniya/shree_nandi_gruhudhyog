import { Home, Leaf, Truck, BadgeIndianRupee } from 'lucide-react'
import Section, { SectionHeader } from './ui/Section'
import { RevealGroup, RevealItem } from './ui/Reveal'

const features = [
  {
    icon: Home,
    title: 'Made in our own kitchen',
    body: 'The chakri, khari, cookies and farsan under our own label are made here, in small batches, to recipes the family has used for years.',
  },
  {
    icon: Leaf,
    title: 'Nothing artificial',
    body: 'No added colours, no artificial flavours, no preservatives in anything we make ourselves — which is also why it does not sit on the shelf for months.',
  },
  {
    icon: Truck,
    title: 'Delivery across India',
    body: 'Packed to travel and shipped anywhere in the country. Tell us where you are on WhatsApp and we will confirm the courier cost.',
  },
  {
    icon: BadgeIndianRupee,
    title: 'Honest shop prices',
    body: 'The same rates you would pay standing at the counter, with bulk and wholesale pricing for larger orders.',
  },
]

/**
 * Why-us section.
 *
 * Presented as a divided editorial grid rather than four floating white cards.
 * Dropping the card chrome and leaning on hairlines and a large index numeral
 * makes it read as considered copy instead of a feature-comparison table.
 */
export default function WhyChooseUs() {
  return (
    <Section tone="canvas" size="lg">
      <SectionHeader
        eyebrow="Why families keep coming back"
        title="Small shop standards, kept properly"
        lead="We are a gruhudhyog — a home industry. That is the whole promise, and it sets what we will and won't put on the shelf."
      />

      <RevealGroup
        each={0.1}
        className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-2"
      >
        {features.map(({ icon: Icon, title, body }, i) => (
          <RevealItem
            key={title}
            className="group relative bg-canvas p-8 transition-colors duration-500 hover:bg-surface md:p-10"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-tint text-brand transition-transform duration-500 group-hover:scale-110">
                <Icon size={20} strokeWidth={1.7} />
              </span>
              <span
                aria-hidden="true"
                className="font-display text-2xl font-semibold text-line-strong transition-colors duration-500 group-hover:text-brand/40"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            <h3 className="mt-6 font-display text-h3 font-semibold text-ink">{title}</h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">{body}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
