import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import Section, { SectionHeader } from './ui/Section'
import SmartImage from './ui/SmartImage'
import Video from './ui/Video'
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal'
import { img } from '../assets/images'
import { whatsappLink, waMessage } from '../lib/site'
import { spring } from '../lib/motion'

/*
 * The range made under the shop's own label. Weights and prices are the ones
 * printed on the packets in the photographs; where a packet showed none, the
 * card says to ask.
 */
const products = [
  { name: 'Butter bhakarwadi', gu: 'બટર ભાકરવડી', note: '₹70 · 250 g', picture: img.butterBhakarwadi, tag: 'House special' },
  { name: 'Masala khakhra', gu: 'મસાલા ખાખરા', note: 'Also jeera, methi, sada', picture: img.masalaKhakhraCloseup, tag: 'Bestseller' },
  { name: 'Wheat chakri', gu: 'ચકરી', note: 'Fried in small batches', picture: img.homemadeChakriPackets },
  { name: 'Sev & gathiya', gu: 'સેવ · ગાંઠિયા', note: 'Aloo sev, nylon sev, tikha gathiya', picture: img.homemadeSevPackets },
  { name: 'Farali chevdo', gu: 'ફરાળી ચેવડો', note: 'For fasting days', picture: img.faraliChevdoTub },
  { name: 'Methi khakhra', gu: 'મેથી ખાખરા', note: 'Rolled thin, roasted dry', picture: img.methiKhakhraCloseup },
]

/**
 * "From our own kitchen."
 *
 * A portrait loop of the homemade tubs on the counter, shot in the shop,
 * beside a grid of what's in them. Each card opens WhatsApp with the product
 * named, so a tap is already an enquiry.
 */
export default function HomemadeRange() {
  return (
    <Section id="homemade" tone="surface" size="lg">
      <SectionHeader
        eyebrow="Made here"
        title="From our own kitchen, *packed the same morning.*"
        lead="No colours, no preservatives, nothing that needs to sit on a shelf for months. This is the range the shop was started for."
      />

      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Portrait loop in a phone-proportion frame */}
        <Reveal className="lg:col-span-4">
          <div className="relative overflow-hidden rounded-panel bg-inverse shadow-lift">
            <Video name="homemade-tubs" aspect={9 / 14} className="w-full" />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-indigo-950/85 to-transparent p-6 pt-20"
            >
              <p className="eyebrow text-marigold-400">On the counter today</p>
              <p className="mt-2 font-display text-2xl text-paper-50">
                Chevdo, gathiya, chakri, <em className="text-marigold-400">ladoo</em>
              </p>
            </div>
          </div>
        </Reveal>

        <RevealGroup each={0.06} className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-8 lg:grid-cols-3">
          {products.map((p) => (
            <RevealItem key={p.name}>
              <ProductCard {...p} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  )
}

function ProductCard({ name, gu, note, picture, tag }) {
  return (
    <motion.a
      href={whatsappLink(waMessage.product(name))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Enquire about ${name} on WhatsApp`}
      whileHover={{ y: -4 }}
      transition={spring.soft}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-canvas transition-shadow duration-500 hover:shadow-lift"
    >
      <div className="relative">
        <SmartImage
          picture={picture}
          alt={name}
          sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 20vw"
          aspect={1}
          imgClassName="transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        {tag && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 font-body text-[0.64rem] font-bold uppercase tracking-wider ${
              tag === 'House special' ? 'bg-marigold-400 text-indigo-950' : 'bg-chilli-500 text-white'
            }`}
          >
            {tag}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p lang="gu" className="font-display text-xs text-brand">
          {gu}
        </p>
        <h3 className="mt-1 font-display text-xl leading-tight text-ink">{name}</h3>
        <p className="mt-1 font-body text-sm text-ink-soft">{note}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 font-body text-xs font-bold text-leaf-600 transition-colors group-hover:text-leaf-500">
          <MessageCircle size={13} />
          Enquire
        </span>
      </div>
    </motion.a>
  )
}
