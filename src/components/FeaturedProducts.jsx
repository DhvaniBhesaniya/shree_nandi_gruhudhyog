import { motion } from 'framer-motion'
import { Star, MessageCircle } from 'lucide-react'
import Section, { SectionHeader } from './ui/Section'
import SmartImage from './ui/SmartImage'
import { RevealGroup, RevealItem } from './ui/Reveal'
import { img } from '../assets/images'
import { whatsappLink, waMessage } from '../lib/site'
import { ease, spring } from '../lib/motion'

const products = [
  { name: 'Masala Gathiya', desc: 'Crispy spiced chickpea-flour gathiya — our best seller', rating: 4.9, badge: 'Bestseller', picture: img.farsan2 },
  { name: 'Spring Namkeen', desc: 'Schezwan, beetroot & samosa puri — flavoured crunchy rings', rating: 4.8, badge: 'Bestseller', picture: img.springNamkeen },
  { name: 'Homemade Chakri & Khari', desc: 'Our own brand — freshly made wheat chakri, cookies & khari', rating: 5.0, badge: 'House special', picture: img.farsanKhari },
  { name: 'Khakhra', desc: 'Thin, crisp fenugreek-flavoured whole wheat khakhra', rating: 4.7, badge: null, picture: img.khakhra },
  { name: 'Farali Bhakhri', desc: 'Coin khakhra & farali bhakhri for fasting days', rating: 4.8, badge: 'Bestseller', picture: img.coinKhakhraAndBhakhari },
  { name: 'Chevdo Mix', desc: 'Crunchy mixed chevdo, gathiya, sev & dal mix', rating: 4.6, badge: null, picture: img.farsan },
  { name: 'Pickles & Achaar', desc: 'Tangy mango, lime & mixed pickles from trusted brands', rating: 4.9, badge: null, picture: img.pickles },
  { name: 'Chocolate Wafer Rolls', desc: 'Strawberry, chocolate & orange flavour wafer rolls', rating: 4.8, badge: 'Bestseller', picture: img.chocolateBox },
]

/**
 * Customer favourites.
 *
 * Light surface cards here, deliberately contrasting with the photo-overlay
 * cards in the category grid above — two different card treatments is what stops
 * the page reading as the same component repeated eight times.
 *
 * Each "Enquire" now opens WhatsApp pre-filled with the product name. Before,
 * all eight of these buttons had no onClick at all and did nothing when tapped.
 */
export default function FeaturedProducts() {
  return (
    <Section tone="surface" size="lg">
      <SectionHeader
        eyebrow="Customer favourites"
        title="The ones people come back for"
        lead="Tap any item to ask about today's price and availability on WhatsApp."
      />

      <RevealGroup
        each={0.06}
        className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {products.map((p) => (
          <RevealItem key={p.name}>
            <ProductCard {...p} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

function ProductCard({ name, desc, rating, badge, picture }) {
  return (
    <motion.article
      whileHover="hover"
      initial="rest"
      animate="rest"
      variants={{ rest: { y: 0 }, hover: { y: -6 } }}
      transition={spring.soft}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-canvas shadow-soft transition-shadow duration-500 hover:shadow-lift"
    >
      <div className="relative">
        <SmartImage
          picture={picture}
          alt={name}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 23vw"
          aspect={4 / 3}
          imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
        {badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 font-body text-[0.68rem] font-semibold uppercase tracking-wider backdrop-blur-sm ${
              badge === 'House special'
                ? 'bg-gold-400/95 text-clay-900'
                : 'bg-chilli-500/95 text-white'
            }`}
          >
            {badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-h3 font-semibold text-ink">{name}</h3>
          <span className="mt-0.5 flex shrink-0 items-center gap-1 font-body text-xs font-semibold text-ink-soft">
            <Star size={13} className="fill-gold-500 text-gold-500" />
            {rating.toFixed(1)}
          </span>
        </div>

        <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-ink-soft">{desc}</p>

        <motion.a
          href={whatsappLink(waMessage.product(name))}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Enquire about ${name} on WhatsApp`}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.3, ease: ease.outExpo }}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-line-strong py-2.5 font-body text-sm font-semibold text-ink transition-colors duration-300 hover:border-leaf-500 hover:bg-leaf-500 hover:text-white"
        >
          <MessageCircle size={15} />
          Enquire
        </motion.a>
      </div>
    </motion.article>
  )
}
