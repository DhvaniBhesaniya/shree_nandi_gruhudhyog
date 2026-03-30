import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBanner from './components/StatsBanner'
import ProductCategories from './components/ProductCategories'
import FeaturedProducts from './components/FeaturedProducts'
import WhyChooseUs from './components/WhyChooseUs'
import AboutUs from './components/AboutUs'
import Testimonials from './components/Testimonials'
import Gallery from './components/Gallery'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen
            key="loading"
            onComplete={() => setIsLoading(false)}
          />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="font-body bg-cream text-brown min-h-screen"
        >
          <Navbar />
          <Hero />
          {/* <StatsBanner /> */}
          <ProductCategories />
          <FeaturedProducts />
          <WhyChooseUs />
          <AboutUs />
          <Testimonials />
          <Gallery />
          <ContactSection />
          <Footer />
          <WhatsAppButton />
        </motion.div>
      )}
    </>
  )
}
