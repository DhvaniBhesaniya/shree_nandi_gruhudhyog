import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CupSoda, IceCreamCone, MessageCircle } from 'lucide-react'
import Section, { SectionHeader } from './ui/Section'
import SmartImage from './ui/SmartImage'
import Video from './ui/Video'
import Button from './ui/Button'
import { img } from '../assets/images'
import { whatsappLink, waMessage } from '../lib/site'
import { ease, spring } from '../lib/motion'

const sodas = [
  { name: 'Saadi Soda', gu: 'સાદી સોડા', price: 10, kind: 'Regular' },
  { name: 'Jeera Masala', gu: 'જીરા મસાલા', price: 15, kind: 'Regular' },
  { name: 'Orange Soda', gu: 'ઓરેન્જ સોડા', price: 15, kind: 'Regular' },
  { name: 'Pineapple Soda', gu: 'પાઇનએપલ સોડા', price: 15, kind: 'Regular' },
  { name: 'Mango Soda', gu: 'મેંગો સોડા', price: 15, kind: 'Regular' },
  { name: 'Cola Soda', gu: 'કોલા સોડા', price: 15, kind: 'Regular' },
  { name: 'Fruit Beer', gu: 'ફ્રૂટ બિયર', price: 15, kind: 'Regular' },
  { name: '7up / Sprite', gu: 'સેવન અપ / સ્પ્રાઇટ', price: 15, kind: 'Regular' },
  { name: 'Limbu Soda', gu: 'લીંબુ સોડા', price: 20, kind: 'Special' },
  { name: 'Limbu Sharbat', gu: 'લીંબુ શરબત', price: 25, kind: 'Special' },
  { name: 'Chaas Soda', gu: 'છાસ સોડા', price: 25, kind: 'Special' },
  { name: 'Sing Soda', gu: 'સિંગ સોડા', price: 25, kind: 'Special' },
  { name: 'Pudina Soda', gu: 'પુદીના સોડા', price: 25, kind: 'Special' },
  { name: 'Pudina Adrak Limbu', gu: 'પુદીના આદુ લીંબુ સોડા', price: 25, kind: 'Special' },
  { name: 'Phulzar Green Soda', gu: 'ફૂલઝર ગ્રીન સોડા', price: 25, kind: 'Special' },
  { name: 'Spicy Green Chilli', gu: 'સ્પાઈસી ગ્રીન ચીલી સોડા', price: 25, kind: 'Special' },
]

const iceCream = [
  { label: 'Chillo cones', from: 20 },
  { label: 'Boss bars', from: 30 },
  { label: 'Kulfis', from: 10 },
  { label: 'Sundae cups', from: 20 },
]

const tabs = [
  { id: 'soda', label: 'Soda bar', icon: CupSoda },
  { id: 'icecream', label: 'Ice cream', icon: IceCreamCone },
]

/**
 * Soda bar + ice cream.
 *
 * Prices come straight off the boards in the shop, and the loops beside the
 * list show the counter and the freezer they are read from.
 */
export default function BeverageMenu() {
  const [tab, setTab] = useState('soda')

  return (
    <Section id="beverages" tone="alt" size="lg">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          eyebrow="At the counter"
          title="Sixteen sodas, *mixed while you wait.*"
          lead="From ₹10. Hocco ice cream in the freezer beside the machine."
        />

        <div
          role="tablist"
          aria-label="Beverage menu"
          className="inline-flex shrink-0 gap-1 self-start rounded-full border border-line bg-canvas p-1"
        >
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              aria-controls={`panel-${id}`}
              onClick={() => setTab(id)}
              className={`relative isolate flex items-center gap-2 rounded-full px-5 py-2.5 font-body text-sm font-semibold transition-colors duration-300 ${
                tab === id ? 'text-on-brand' : 'text-ink-soft hover:text-ink'
              }`}
            >
              {tab === id && (
                <motion.span
                  layoutId="bev-tab"
                  transition={spring.soft}
                  className="absolute inset-0 -z-10 rounded-full bg-brand"
                />
              )}
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          id={`panel-${tab}`}
          role="tabpanel"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: ease.outExpo }}
          className="mt-12"
        >
          {tab === 'soda' ? <SodaPanel /> : <IceCreamPanel />}
        </motion.div>
      </AnimatePresence>
    </Section>
  )
}

function SodaPanel() {
  const [kind, setKind] = useState('All')
  const kinds = ['All', 'Regular', 'Special']
  const list = kind === 'All' ? sodas : sodas.filter((s) => s.kind === kind)

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
      {/* The counter, moving */}
      <div className="grid grid-cols-2 gap-3 lg:col-span-5 lg:grid-cols-1 lg:gap-4">
        <div className="overflow-hidden rounded-panel bg-inverse shadow-lift">
          <Video name="soda-bar" aspect={4 / 5} />
        </div>
        <figure className="overflow-hidden rounded-panel bg-inverse shadow-soft lg:hidden">
          <Video name="soda-menu" aspect={4 / 5} />
        </figure>
        <figure className="hidden overflow-hidden rounded-card border border-line lg:block">
          <SmartImage
            picture={img.sodaMenuBoard}
            alt="The soda menu board in the shop, listing every flavour and price"
            sizes="38vw"
          />
        </figure>
      </div>

      {/* Price list */}
      <div className="lg:col-span-7">
        <div className="mb-5 flex flex-wrap gap-2">
          {kinds.map((k) => (
            <button
              key={k}
              onClick={() => setKind(k)}
              className={`rounded-full px-4 py-2 font-body text-xs font-bold transition-colors duration-300 ${
                kind === k ? 'bg-ink text-canvas' : 'border border-line bg-canvas text-ink-soft hover:text-ink'
              }`}
            >
              {k}
              <span className="ml-1.5 opacity-60">
                {k === 'All' ? sodas.length : sodas.filter((s) => s.kind === k).length}
              </span>
            </button>
          ))}
        </div>

        <motion.ul layout className="overflow-hidden rounded-panel border border-line bg-canvas">
          <AnimatePresence initial={false}>
            {list.map((s, i) => (
              <motion.li
                key={s.name}
                layout="position"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, delay: i * 0.015 }}
                className="group flex items-baseline gap-3 border-b border-line px-5 py-3.5 last:border-b-0 hover:bg-surface"
              >
                <span className="font-display text-lg text-ink">{s.name}</span>
                <span lang="gu" className="hidden font-body text-xs text-ink-faint sm:inline">
                  {s.gu}
                </span>
                <span
                  aria-hidden="true"
                  className="mx-1 min-w-4 flex-1 translate-y-[-0.25em] border-b border-dotted border-line-strong"
                />
                {s.kind === 'Special' && (
                  <span className="rounded-full bg-brand-tint px-2 py-0.5 font-body text-[0.6rem] font-bold uppercase tracking-wide text-brand">
                    Special
                  </span>
                )}
                <span className="font-body text-sm font-bold tabular-nums text-ink">₹{s.price}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </div>
  )
}

function IceCreamPanel() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-5">
        <div className="overflow-hidden rounded-panel bg-inverse shadow-lift">
          <Video name="freezer" aspect={4 / 5} />
        </div>
      </div>

      <div className="lg:col-span-7">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {iceCream.map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ y: -4 }}
              transition={spring.soft}
              className="rounded-card border border-line bg-canvas p-5"
            >
              <p className="text-h3 text-ink">{item.label}</p>
              <p className="mt-1 font-body text-sm text-ink-faint">from ₹{item.from}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 rounded-panel border border-line bg-canvas p-6 sm:p-8">
          <p className="eyebrow text-brand">Ask for today's</p>
          <p className="mt-2 text-h3 text-ink">
            Mango Dolly, Kesar Falooda and <em>Strawberry Cheesecake</em>
          </p>
          <p className="mt-2 max-w-md font-body text-sm text-ink-soft">
            Fifty-plus Hocco flavours in the freezer — cones, bars, kulfis, sundaes and
            scooperstar cups.
          </p>
          <Button
            href={whatsappLink(waMessage.category('Hocco ice cream'))}
            variant="whatsapp"
            size="sm"
            className="mt-5"
          >
            <MessageCircle size={15} />
            Check availability
          </Button>
        </div>

        <figure className="mt-4 overflow-hidden rounded-card border border-line">
          <SmartImage
            picture={img.hoccoIcecreamMenu}
            alt="The full Hocco ice cream menu with prices — cones, bars, kulfis and sundaes"
            sizes="(max-width: 1024px) 92vw, 54vw"
          />
        </figure>
      </div>
    </div>
  )
}
