import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import sodaMenuImg from '../assets/my_shop_images/soda_menu_board.jpeg'
import sodaDispenserImg from '../assets/my_shop_images/soda_dispenser.jpeg'
import hoccoMenuImg from '../assets/my_shop_images/hocco_icecream_menu.jpeg'

const tabs = [
  { id: 'soda', label: '🥤 Soda Bar', color: 'from-sky-50 via-cyan-50 to-blue-50' },
  { id: 'icecream', label: '🍦 Ice Cream', color: 'from-pink-50 via-rose-50 to-fuchsia-50' },
]

const sodaCategories = ['All', 'Regular Soda', 'Special Flavours & Mix Soda']

const sodaFlavours = [
  // Regular Soda
  { name: 'Saadi Soda', nameGuj: 'સાદી સોડા', price: '₹10', category: 'Regular Soda' },
  { name: 'Jeera Masala', nameGuj: 'જીરા મસાલા', price: '₹15', category: 'Regular Soda' },
  { name: 'Orange Soda', nameGuj: 'ઓરેન્જ સોડા', price: '₹15', category: 'Regular Soda' },
  { name: 'Pineapple Soda', nameGuj: 'પાઇનએપલ સોડા', price: '₹15', category: 'Regular Soda' },
  { name: 'Mango Soda', nameGuj: 'મેંગો સોડા', price: '₹15', category: 'Regular Soda' },
  { name: 'Cola Soda', nameGuj: 'કોલા સોડા', price: '₹15', category: 'Regular Soda' },
  { name: 'Fruit Beer', nameGuj: 'ફ્રૂટ બિયર', price: '₹15', category: 'Regular Soda' },
  { name: '7up / Sprite', nameGuj: 'સેવન અપ / સ્પ્રાઇટ', price: '₹15', category: 'Regular Soda' },
  // Special Flavours & Mix Soda
  { name: 'Limbu Soda', nameGuj: 'લીંબુ સોડા', price: '₹20', category: 'Special Flavours & Mix Soda' },
  { name: 'Limbu Sharbat', nameGuj: 'લીંબુ શરબત', price: '₹25', category: 'Special Flavours & Mix Soda' },
  { name: 'Chaas Soda', nameGuj: 'છાસ સોડા', price: '₹25', category: 'Special Flavours & Mix Soda' },
  { name: 'Sing Soda', nameGuj: 'સિંગ સોડા', price: '₹25', category: 'Special Flavours & Mix Soda' },
  { name: 'Pudina Soda', nameGuj: 'પુદીના સોડા', price: '₹25', category: 'Special Flavours & Mix Soda' },
  { name: 'Pudina Adrak Limbu Soda', nameGuj: 'પુદીના આદુ લીંબુ સોડા', price: '₹25', category: 'Special Flavours & Mix Soda' },
  { name: 'Phulzar Green Soda', nameGuj: 'ફૂલઝર ગ્રીન સોડા', price: '₹25', category: 'Special Flavours & Mix Soda' },
  { name: 'Spicy Green Chilli Soda', nameGuj: 'સ્પાઈસી ગ્રીન ચીલી સોડા', price: '₹25', category: 'Special Flavours & Mix Soda' },
]

const iceCreamHighlights = [
  { emoji: '🍦', label: 'Chillo Cones', detail: 'from ₹20' },
  { emoji: '🍫', label: 'Boss Bars', detail: 'from ₹30' },
  { emoji: '🍨', label: 'Kulfis', detail: 'from ₹10' },
  { emoji: '🧁', label: 'Sundae Cups', detail: 'from ₹20' },
]

function SodaContent() {
  const [activeSodaCat, setActiveSodaCat] = useState('All')

  const filteredSodas = activeSodaCat === 'All'
    ? sodaFlavours
    : sodaFlavours.filter((s) => s.category === activeSodaCat)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Soda Menu Board Image */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="space-y-4"
      >
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={sodaMenuImg}
            alt="Soda menu board with prices"
            loading="lazy"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img
            src={sodaDispenserImg}
            alt="Chaas Soda dispenser with 8+ flavours"
            loading="lazy"
            className="w-full h-48 object-cover"
          />
        </div>
      </motion.div>

      {/* Flavours — with sub-filter tabs */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Soda sub-filter tabs */}
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          {sodaCategories.map((cat) => {
            const count = cat === 'All'
              ? sodaFlavours.length
              : sodaFlavours.filter(s => s.category === cat).length
            return (
              <button
                key={cat}
                onClick={() => setActiveSodaCat(cat)}
                className={`px-4 py-1.5 rounded-full font-body font-semibold text-xs transition-all duration-300 cursor-pointer ${
                  activeSodaCat === cat
                    ? 'bg-cyan-600 text-white shadow-md scale-105'
                    : 'bg-white text-brown hover:bg-cyan-100 hover:text-cyan-700 shadow-sm border border-gray-100'
                }`}
              >
                {cat}
                <span className="ml-1 opacity-60">({count})</span>
              </button>
            )
          })}
        </div>

        {/* Flavour Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSodaCat}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[440px] overflow-y-auto pr-1"
            style={{ scrollbarWidth: 'thin' }}
          >
            {filteredSodas.map((flavour, i) => (
              <motion.div
                key={flavour.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all hover:scale-105 hover:shadow-md ${
                  flavour.category === 'Special Flavours & Mix Soda'
                    ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200'
                    : 'bg-white border-gray-100'
                }`}
              >
                {flavour.category === 'Special Flavours & Mix Soda' && (
                  <span className="text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded-full font-body font-bold mb-1">⭐ SPECIAL</span>
                )}
                <p className="font-body font-semibold text-brown text-sm">{flavour.name}</p>
                <p className="font-body text-brown-light text-xs mt-0.5">{flavour.nameGuj}</p>
                <span className="font-heading font-bold text-saffron text-lg mt-0.5">{flavour.price}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function IceCreamContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
      {/* Highlight Cards */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="lg:col-span-2 grid grid-cols-2 gap-4"
      >
        {iceCreamHighlights.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
            whileHover={{ scale: 1.05, y: -4 }}
            className="bg-white rounded-2xl p-5 shadow-md text-center border border-pink-100 hover:shadow-xl transition-all cursor-default"
          >
            <span className="text-4xl block mb-2">{item.emoji}</span>
            <h3 className="font-heading font-bold text-brown text-base">{item.label}</h3>
            <p className="font-body text-pink-600 text-sm font-semibold mt-1">{item.detail}</p>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="col-span-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-5 text-center text-white"
        >
          <p className="font-heading font-bold text-lg">Summer Special ☀️</p>
          <p className="font-body text-sm text-pink-100 mt-1">
            Mango Dolly, Kesar Falooda & Strawberry Cheesecake — try today!
          </p>
        </motion.div>
      </motion.div>

      {/* Hocco Menu Image */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="lg:col-span-3 rounded-2xl overflow-hidden shadow-2xl"
      >
        <img
          src={hoccoMenuImg}
          alt="Hocco Ice Cream full menu with prices — cones, bars, kulfis, sundaes"
          loading="lazy"
          className="w-full h-auto object-cover"
        />
      </motion.div>
    </div>
  )
}

export default function BeverageMenu() {
  const [activeTab, setActiveTab] = useState('soda')
  const currentTab = tabs.find((t) => t.id === activeTab)

  return (
    <section className={`bg-gradient-to-br ${currentTab.color} py-16 md:py-20 overflow-hidden transition-all duration-500`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="inline-block bg-white/60 backdrop-blur-sm text-brown font-body font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            🧊 Refreshments & Desserts
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-brown font-bold mb-3">
            Our Beverage Menu
          </h2>
          <p className="text-brown-light font-body max-w-xl mx-auto">
            From refreshing ice-cold sodas to rich Hocco ice cream — satisfy every craving!
          </p>
        </motion.div>

        {/* Main Tab Switcher */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-full font-body font-bold text-sm sm:text-base transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-brown text-cream shadow-lg scale-105 ring-2 ring-brown/20'
                  : 'bg-white/70 text-brown hover:bg-white hover:shadow-md shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 'soda' ? <SodaContent /> : <IceCreamContent />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
