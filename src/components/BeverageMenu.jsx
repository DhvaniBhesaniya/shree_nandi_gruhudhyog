import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CupSoda, IceCreamCone, Croissant, MessageCircle } from 'lucide-react'
import Section, { SectionHeader } from './ui/Section'
import SmartImage from './ui/SmartImage'
import Video from './ui/Video'
import Button from './ui/Button'
import { img } from '../assets/images'
import { whatsappLink, waMessage } from '../lib/site'
import { ease, spring } from '../lib/motion'

/*
 * Read off the new soda board at the counter (November 2026). Regular sodas
 * first, then the "special flavour & mix" section, in the board's own order.
 */
const sodas = [
  { name: 'Sadi Soda', gu: 'સાદી સોડા', price: 10, kind: 'Regular' },
  { name: 'Limbu Soda', gu: 'લીંબુ સોડા', price: 20, kind: 'Regular' },
  { name: 'Limbu Sharbat', gu: 'લીંબુ શરબત', price: 25, kind: 'Regular' },
  { name: 'Cola Soda', gu: 'કોલા સોડા', price: 20, kind: 'Regular' },
  { name: 'Orange Soda', gu: 'ઓરેન્જ સોડા', price: 20, kind: 'Regular' },
  { name: 'Mango Soda', gu: 'મેંગો સોડા', price: 20, kind: 'Regular' },
  { name: 'Sprite Soda', gu: 'સ્પ્રાઇટ સોડા', price: 20, kind: 'Regular' },
  { name: 'Vimto Soda', gu: 'વિમ્ટો સોડા', price: 20, kind: 'Regular' },
  { name: 'Litchi Soda', gu: 'લીચી સોડા', price: 20, kind: 'Regular' },
  { name: 'Red Jamfal Soda', gu: 'રેડ જામફળ સોડા', price: 20, kind: 'Regular' },
  { name: 'Pineapple Soda', gu: 'પાઇનએપલ સોડા', price: 20, kind: 'Regular' },
  { name: 'Kala Khatta', gu: 'કાલા ખટ્ટા', price: 20, kind: 'Regular' },
  { name: 'Fruit Beer', gu: 'ફ્રૂટ બિયર', price: 20, kind: 'Special' },
  { name: 'Jeera Masala Soda', gu: 'જીરા મસાલા સોડા', price: 20, kind: 'Special' },
  { name: 'Sing Soda', gu: 'સિંગ સોડા', price: 30, kind: 'Special' },
  { name: 'Phuljar Green Soda', gu: 'ફૂલઝર ગ્રીન સોડા', price: 30, kind: 'Special' },
  { name: 'Green Chilly Soda', gu: 'ગ્રીન ચીલી સોડા', price: 30, kind: 'Special' },
  { name: 'Chaas Soda', gu: 'છાશ સોડા', price: 25, kind: 'Special' },
  { name: 'Fudina Soda', gu: 'ફુદીના સોડા', price: 25, kind: 'Special' },
  { name: 'Fudina Aadu Limbu Soda', gu: 'ફુદીના આદુ લીંબુ સોડા', price: 30, kind: 'Special' },
]

/* The puff board beside it. Baked in the shop, served hot. */
const puffs = [
  { name: 'Regular puff', price: 25 },
  { name: 'Chinese puff', price: 30 },
  { name: 'Sev puff', price: 40 },
  { name: 'Cheese puff', price: 45 },
  { name: 'Cheese Maggi puff', price: 50 },
  { name: 'Cheese Schezwan puff', price: 50 },
  { name: 'Cheese sing puff', price: 55 },
]

const iceCream = [
  { label: 'Chillo cones', from: 20 },
  { label: 'Boss bars', from: 30 },
  { label: 'Kulfis', from: 10 },
  { label: 'Sundae cups', from: 20 },
]

const tabs = [
  { id: 'soda', label: 'Soda bar', icon: CupSoda },
  { id: 'puffs', label: 'Puffs', icon: Croissant },
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
          title="Twenty sodas, *mixed while you wait.*"
          lead="From ₹10. Hot puffs from the oven and Hocco ice cream in the freezer beside the machine."
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
          {tab === 'soda' ? <SodaPanel /> : tab === 'puffs' ? <PuffPanel /> : <IceCreamPanel />}
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
        <figure className="overflow-hidden rounded-panel border border-line">
          <SmartImage
            picture={img.sodaAndPuffMenu}
            alt="The soda and puff menu boards outside the shop, listing every flavour and price"
            sizes="(max-width: 1024px) 46vw, 38vw"
            aspect={4 / 5}
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

function PuffPanel() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
      <figure className="overflow-hidden rounded-panel border border-line lg:col-span-5">
        <SmartImage
          picture={img.sodaAndPuffMenu}
          alt="The puff menu board outside the shop"
          sizes="(max-width: 1024px) 92vw, 38vw"
          aspect={4 / 5}
          imgClassName="object-bottom"
        />
      </figure>

      <div className="lg:col-span-7">
        <ul className="overflow-hidden rounded-panel border border-line bg-canvas">
          {puffs.map((p) => (
            <li
              key={p.name}
              className="flex items-baseline gap-3 border-b border-line px-5 py-3.5 last:border-b-0 hover:bg-surface"
            >
              <span className="font-display text-lg text-ink">{p.name}</span>
              <span
                aria-hidden="true"
                className="mx-1 min-w-4 flex-1 translate-y-[-0.25em] border-b border-dotted border-line-strong"
              />
              <span className="font-body text-sm font-bold tabular-nums text-ink">₹{p.price}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 rounded-panel border border-line bg-canvas p-6 sm:p-8">
          <p className="eyebrow text-brand">Crispy outside, fluffy inside</p>
          <p className="mt-2 text-h3 text-ink">
            Baked here, <em>served hot.</em>
          </p>
          <p className="mt-2 max-w-md font-body text-sm text-ink-soft">
            Vegetable, Chinese, sev and cheese puffs from our own oven. Ask what is fresh
            out when you come by, or message to reserve a batch.
          </p>
          <Button
            href={whatsappLink(waMessage.category('puffs'))}
            variant="whatsapp"
            size="sm"
            className="mt-5"
          >
            <MessageCircle size={15} />
            Ask about puffs
          </Button>
        </div>
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
