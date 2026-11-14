import { Home, Leaf, Truck, BadgeIndianRupee } from 'lucide-react'
import Section, { SectionHeader } from './ui/Section'
import { RevealGroup, RevealItem } from './ui/Reveal'

const features = [
  {
    icon: Home,
    title: 'Made in our own kitchen',
    body: 'The chakri, khari, cookies and farsan under our label are made here, in small batches, to recipes the family has used for years.',
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
    title: 'Counter prices, online',
    body: 'The same rates you would pay standing at the counter, with wholesale pricing for larger orders.',
  },
]

/**
 * Why-us. A numbered, hairline-divided list rather than four floating cards —
 * it reads as considered copy instead of a feature-comparison table.
 */
export default function WhyChooseUs() {
  return (
    <Section tone="canvas" size="lg">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow="Why families keep coming back"
            title="A gruhudhyog is a promise, *and we keep it.*"
            lead="Gruhudhyog means home industry. It sets what we will and won't put on the shelf."
          />
        </div>

        <RevealGroup each={0.1} className="divide-y divide-line border-y border-line lg:col-span-7">
          {features.map(({ icon: Icon, title, body }, i) => (
            <RevealItem key={title} className="group grid grid-cols-[auto_1fr] gap-5 py-7 md:grid-cols-[4rem_auto_1fr] md:gap-8">
              <span className="hidden font-display text-3xl text-ink-faint transition-colors duration-500 group-hover:text-brand md:block">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-tint text-brand">
                <Icon size={19} strokeWidth={1.7} />
              </span>
              <span>
                <h3 className="text-h3 text-ink">{title}</h3>
                <p className="mt-2 max-w-lg font-body text-[0.95rem] leading-relaxed text-ink-soft">{body}</p>
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  )
}
