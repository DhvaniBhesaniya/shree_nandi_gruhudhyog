import { motion } from 'framer-motion'
import logo from '../assets/my_shop_images/shree_nandi_gruhudhyog_logo.jpeg'

export default function Footer() {
  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Products', href: '#products' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <footer className="bg-brown text-cream py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Logo & Tagline */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img src={logo} alt="Shree Nandi Logo" className="h-10 w-10 rounded-full object-cover ring-2 ring-gold/40" />
              <h3 className="font-heading text-2xl font-bold text-gold">
                Shree Nandi Gruhudhyog
              </h3>
            </div>
            <p className="font-body text-cream/70 text-sm leading-relaxed">
              Authentic homemade Gujarati food products crafted with love, tradition, and the finest ingredients. Bringing the taste of Gujarat to every home.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-5">
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-saffron transition-colors duration-300 text-sm font-body font-semibold"
                aria-label="WhatsApp"
              >
                WhatsApp
              </a>
              <a
                href="#"
                className="text-gold hover:text-saffron transition-colors duration-300 text-sm font-body font-semibold"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-gold hover:text-saffron transition-colors duration-300 text-sm font-body font-semibold"
                aria-label="Facebook"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-bold text-gold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-cream/70 hover:text-saffron transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-bold text-gold mb-4">Contact Info</h4>
            <div className="space-y-3 font-body text-cream/70 text-sm">
              <p>📍 Shree Nandi Gruhudhyog, Block No: A ,  Ground Floor Shop No: A-12, PANACHE, Khoraj, Gandhinagar – 382421 , Gujarat , India</p>
              <p>📱 +91 9998714455</p>
              <p>✉️ shreenandigruhudhyog@gmail.com</p>
              <p>🕐 Mon–Sun: 9 AM – 9 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brown-light mt-8 pt-6 text-center">
          <p className="font-body text-sm text-cream/60">
            © 2026 Shree Nandi Gruhudhyog. Made with ❤️ in Gujarat, India
          </p>
        </div>
      </div>
    </footer>
  )
}
