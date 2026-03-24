import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'

const contactInfo = [
  { icon: MapPin, label: 'Address', value: 'Shree Nandi Gruhudhyog,Block No: A ,  Ground Floor Shop No: A-12, PANACHE, Khoraj, Gandhinagar – 382421 , Gujarat , India' },
  { icon: Phone, label: 'Phone', value: '+91 9998714455' },
  { icon: Mail, label: 'Email', value: 'shreenandigruhudhyog@gmail.com' },
  { icon: Clock, label: 'Business Hours', value: 'Mon–Sun: 9 AM – 9 PM' },
]

const productOptions = [
  'Namkeen & Snacks',
  'Pickles & Achaar',
  'Khakhra',
  'Bakery Products',
  'Cold Drinks & Beverages',
  'Wafers & Biscuits',
  'Other',
]

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    product: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: '', phone: '', email: '', product: '', message: '' })
  }

  const inputClasses = 'w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-saffron font-body text-brown bg-white transition-all duration-300'

  return (
    <section id="contact" className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl sm:text-4xl text-brown text-center font-bold mb-4"
        >
          Get In Touch 📞
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-brown-light font-body mb-12 max-w-2xl mx-auto"
        >
          Have questions or want to place a bulk order? We'd love to hear from you!
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {contactInfo.map((info) => {
              const Icon = info.icon
              return (
                <div key={info.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-saffron/10 flex items-center justify-center shrink-0">
                    <Icon size={22} className="text-saffron" />
                  </div>
                  <div>
                    <h4 className="font-heading text-brown font-bold text-base">{info.label}</h4>
                    <p className="font-body text-gray-600 text-sm">{info.value}</p>
                  </div>
                </div>
              )
            })}

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 inline-flex items-center gap-3 bg-green text-white rounded-xl px-6 py-3 font-body font-semibold hover:bg-green-600 transition-colors duration-300"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </motion.a>
          </motion.div>

          {/* Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={inputClasses}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={inputClasses}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={inputClasses}
            />
            <select
              value={formData.product}
              onChange={(e) => handleChange('product', e.target.value)}
              className={inputClasses}
            >
              <option value="">Select Product Interest</option>
              {productOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <textarea
              placeholder="Your Message"
              rows={4}
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              className={`${inputClasses} resize-none`}
            />
            <motion.button
              onClick={handleSubmit}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-saffron text-white rounded-xl py-3 font-body font-semibold hover:bg-orange-600 transition-colors duration-300"
            >
              {submitted ? '✅ Sent Successfully!' : 'Send Enquiry'}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
