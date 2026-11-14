import { motion } from 'framer-motion'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import Section, { SectionHeader } from './ui/Section'
import SmartImage from './ui/SmartImage'
import Button from './ui/Button'
import { RevealGroup, RevealItem } from './ui/Reveal'
import { img } from '../assets/images'
import { whatsappLink, waMessage } from '../lib/site'
import { scrollToId } from '../lib/hooks'
import { ease, scaleIn } from '../lib/motion'

/*
 * Eight shelves of the shop. Photographed on site — every picture here is of
 * the thing it names. The first card is the homemade range and takes the
 * widest slot because it is what the shop is for.
 */
const categories = [
  {
    name: 'Namkeen & farsan',
    gu: 'નમકીન',
    blurb: 'Gathiya, chevdo, sev, chakri and bhakarwadi — packed here, in small batches.',
    picture: img.homemadeFarsanPackets,
    span: 'lg:col-span-6 lg:row-span-2',
    aspect: 4 / 5,
  },
  { name: 'Khakhra & bhakhri', gu: 'ખાખરા', blurb: 'Masala, methi, jeera and sada — thin and crisp.', picture: img.masalaKhakhraCloseup, span: 'lg:col-span-3', aspect: 4 / 5 },
  { name: 'Bakery & cookies', gu: 'બેકરી', blurb: 'Atta cookies, stick cookies, khari and rusk.', picture: img.cravityStickCookies, span: 'lg:col-span-3', aspect: 4 / 5 },
  { name: 'Festive & gift boxes', gu: 'ઉત્સવ', blurb: 'Cookie selections and ladoo boxes for Diwali and weddings.', picture: img.festiveCookieBox, span: 'lg:col-span-3', aspect: 4 / 5 },
  { name: 'Pickles & achaar', gu: 'અથાણા', blurb: 'Mango, lime and mixed, from the brands we trust.', picture: img.pickles, span: 'lg:col-span-3', aspect: 4 / 5 },
  { name: 'Chips & wafers', gu: 'વેફર', blurb: 'Banana wafers, Mexican chilli chips, Cornitos and more.', picture: img.bananaWafers, span: 'lg:col-span-4', aspect: 4 / 3 },
  { name: 'Soda bar & ice cream', gu: 'સોડા', blurb: 'Twenty sodas mixed at the counter, hot puffs, Hocco in the freezer.', picture: img.hoccoFreezer, span: 'lg:col-span-4', aspect: 4 / 3 },
  { name: 'Everyday brands', gu: 'બ્રાન્ડ', blurb: 'Biscuits, noodles, mamra, sauces — five hundred lines.', picture: img.biscuitWall, span: 'lg:col-span-4', aspect: 4 / 3 },
]

export default function ProductCategories() {
  return (
    <Section id="products" tone="canvas" size="lg">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          eyebrow="What we stock"
          title="Everything a Gujarati kitchen reaches for, *under one roof.*"
          lead="Our own homemade range on the same shelves as the brands you already buy — over five hundred items."
        />
        <Button onClick={() => scrollToId('gallery')} variant="outline" size="md" className="shrink-0">
          See every shelf
          <ArrowUpRight size={16} />
        </Button>
      </div>

      <RevealGroup
        each={0.06}
        className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4"
      >
        {categories.map((cat) => (
          <RevealItem key={cat.name} variants={scaleIn} className={cat.span}>
            <CategoryCard {...cat} />
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-12 flex flex-col items-start gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl font-body text-ink-soft">
          Looking for something not pictured? Message the shop and you'll have an answer
          on stock and price in minutes.
        </p>
        <Button href={whatsappLink(waMessage.general)} variant="whatsapp" size="md">
          <MessageCircle size={17} />
          Ask on WhatsApp
        </Button>
      </div>
    </Section>
  )
}

function CategoryCard({ name, gu, blurb, picture, aspect }) {
  return (
    <motion.a
      href={whatsappLink(waMessage.category(name))}
      target="_blank"
      rel="noopener noreferrer"
      whileHover="hover"
      whileFocus="hover"
      initial="rest"
      animate="rest"
      variants={{ rest: { y: 0 }, hover: { y: -4 } }}
      transition={{ duration: 0.4, ease: ease.outExpo }}
      className="group relative block h-full w-full overflow-hidden rounded-card bg-inverse text-left shadow-soft transition-shadow duration-500 hover:shadow-lift"
    >
      <SmartImage
        picture={picture}
        alt={name}
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 33vw"
        aspect={aspect}
        className="h-full"
        imgClassName="transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
      />

      {/* Indigo scrim only where the type sits */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-indigo-950/30 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <div className="min-w-0">
          <p lang="gu" className="font-display text-sm text-marigold-400">
            {gu}
          </p>
          <h3 className="mt-1 text-h3 text-paper-50">{name}</h3>
          <p className="mt-1.5 font-body text-sm leading-snug text-paper-50/70">{blurb}</p>
        </div>
        <motion.span
          variants={{ rest: { opacity: 0.6, x: 0 }, hover: { opacity: 1, x: 2 } }}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/25 text-paper-50"
        >
          <ArrowUpRight size={16} />
        </motion.span>
      </div>
    </motion.a>
  )
}
