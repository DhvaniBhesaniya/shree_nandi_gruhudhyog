import { Store, PartyPopper, Building2, Check, MessageCircle } from 'lucide-react'
import SmartImage from './ui/SmartImage'
import Button from './ui/Button'
import { Reveal, RevealGroup, RevealItem, RevealWords } from './ui/Reveal'
import { img } from '../assets/images'
import { whatsappLink, waMessage, site } from '../lib/site'
import { slideFrom } from '../lib/motion'

const audiences = [
  {
    icon: Store,
    title: 'Retailers & kirana',
    body: 'Wholesale rates on our homemade range and on the brands we distribute.',
  },
  {
    icon: Building2,
    title: 'Offices & pantries',
    body: 'Standing monthly orders for namkeen, biscuits, tea and cold drinks.',
  },
  {
    icon: PartyPopper,
    title: 'Weddings & functions',
    body: 'Bulk farsan, khakhra and sweets boxes, packed and ready to collect.',
  },
]

const included = [
  'Wholesale rate list on request',
  'Custom hamper and gift boxes',
  'Packed to travel anywhere in India',
  'GST invoice provided',
]

/**
 * Bulk / wholesale section.
 *
 * New — the previous site had no route for trade enquiries at all, despite
 * wholesale being one of the shop's actual lines of business. Everything funnels
 * to a WhatsApp message pre-written for a rate-list request.
 */
export default function BulkOrders() {
  return (
    <section id="bulk" className="relative overflow-hidden bg-surface-alt py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10">
        {/* ------------------------------------------------------------ copy */}
        <div>
          <Reveal as="p" className="eyebrow mb-5 flex items-center gap-2.5 text-brand">
            <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
            Bulk & wholesale
          </Reveal>

          <RevealWords
            text="Ordering for a shop, an office or a wedding?"
            as="h2"
            className="font-display text-h2 font-semibold text-ink"
          />

          <Reveal as="p" delay={0.1} className="text-lead mt-5 max-w-xl text-ink-soft">
            We supply retailers, offices and functions across Gandhinagar and Ahmedabad —
            and ship larger orders anywhere in India. Tell us roughly what you need and we
            will send a rate list the same day.
          </Reveal>

          <RevealGroup each={0.07} className="mt-8 grid gap-3 sm:grid-cols-2">
            {included.map((item) => (
              <RevealItem key={item} className="flex items-start gap-2.5">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-leaf-500/15 text-leaf-600">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span className="font-body text-sm text-ink-soft">{item}</span>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.15} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href={whatsappLink(waMessage.bulk)} variant="whatsapp" size="lg">
              <MessageCircle size={18} />
              Request a rate list
            </Button>
            <Button href={`tel:${site.phone}`} variant="outline" size="lg" shine={false}>
              {site.phoneDisplay}
            </Button>
          </Reveal>
        </div>

        {/* --------------------------------------------------------- audiences */}
        <div className="space-y-4">
          <Reveal
            variants={slideFrom(1, 40)}
            className="overflow-hidden rounded-panel shadow-lift"
          >
            <SmartImage
              picture={img.biscuitBoxesShelves}
              alt="Boxed biscuits and cookies stacked on the shop shelves"
              sizes="(max-width: 1024px) 92vw, 46vw"
              aspect={16 / 9}
            />
          </Reveal>

          <RevealGroup each={0.08} className="space-y-3">
            {audiences.map(({ icon: Icon, title, body }) => (
              <RevealItem
                key={title}
                className="group flex items-start gap-4 rounded-card border border-line bg-canvas p-5 transition-shadow duration-500 hover:shadow-lift"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-tint text-brand transition-transform duration-500 group-hover:scale-110">
                  <Icon size={18} strokeWidth={1.7} />
                </span>
                <span>
                  <span className="block font-body font-semibold text-ink">{title}</span>
                  <span className="mt-0.5 block font-body text-sm text-ink-soft">{body}</span>
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}
