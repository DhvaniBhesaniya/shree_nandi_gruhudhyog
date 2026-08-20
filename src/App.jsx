import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { dismissSplash } from './lib/splash'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import StatsBanner from './components/StatsBanner'
import ProductCategories from './components/ProductCategories'
import FeaturedProducts from './components/FeaturedProducts'
import BrandsMarquee from './components/BrandsMarquee'
import BeverageMenu from './components/BeverageMenu'
import WhyChooseUs from './components/WhyChooseUs'
import AboutUs from './components/AboutUs'
import VirtualShopTour from './components/VirtualShopTour'
import Testimonials from './components/Testimonials'
import Gallery from './components/Gallery'
import BulkOrders from './components/BulkOrders'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import FloatingActions from './components/FloatingActions'

export default function App() {
  // Runs after the first commit, so the hero <img> elements the splash waits on
  // are already in the DOM by the time it starts looking for them.
  useEffect(() => {
    dismissSplash()
  }, [])

  return (
    /*
     * reducedMotion="user" makes Framer Motion drop transform and layout
     * animations for anyone with the OS setting enabled, so no component has to
     * check for itself. index.css covers the CSS-driven animations Framer can't
     * see (the brand marquee and floating badges).
     */
    <MotionConfig reducedMotion="user">
      <a
        href="#products"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-200 focus:rounded-full focus:bg-brand focus:px-5 focus:py-2.5 focus:font-body focus:text-sm focus:font-semibold focus:text-on-brand"
      >
        Skip to products
      </a>

      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <StatsBanner />
        <ProductCategories />
        <FeaturedProducts />
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
