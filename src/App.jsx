import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { dismissSplash } from './lib/splash'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import ProductCategories from './components/ProductCategories'
import HomemadeRange from './components/HomemadeRange'
import BrandsMarquee from './components/BrandsMarquee'
import WhyChooseUs from './components/WhyChooseUs'
import AboutUs from './components/AboutUs'
import VirtualShopTour from './components/VirtualShopTour'
import BeverageMenu from './components/BeverageMenu'
import Testimonials from './components/Testimonials'
import Gallery from './components/Gallery'
import BulkOrders from './components/BulkOrders'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import FloatingActions from './components/FloatingActions'

export default function App() {
  // Runs after the first commit, so the hero media the splash waits on is
  // already in the DOM by the time it starts looking.
  useEffect(() => {
    dismissSplash()
  }, [])

  return (
    /*
     * reducedMotion="user" makes Framer Motion drop transform and layout
     * animations for anyone with the OS setting enabled. index.css covers the
     * CSS-driven animations Framer can't see; <Video> shows posters instead.
     */
    <MotionConfig reducedMotion="user">
      <a
        href="#products"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-200 focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:font-body focus:text-sm focus:font-bold focus:text-on-accent"
      >
        Skip to products
      </a>

      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <Ticker />
        <ProductCategories />
        <HomemadeRange />
        <BrandsMarquee />
        <WhyChooseUs />
        <AboutUs />
        <VirtualShopTour />
        <BeverageMenu />
        <Testimonials />
        <Gallery />
        <BulkOrders />
        <ContactSection />
      </main>

      <Footer />
      <FloatingActions />
    </MotionConfig>
  )
}
