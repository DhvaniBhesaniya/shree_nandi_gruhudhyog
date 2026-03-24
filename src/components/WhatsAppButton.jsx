import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/91XXXXXXXXXX"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.4, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white rounded-full px-5 py-3 shadow-2xl flex items-center gap-2 font-body font-semibold text-sm hover:bg-green-600 transition-colors duration-300"
    >
      <motion.span
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <MessageCircle size={20} />
      </motion.span>
      <span className="hidden sm:inline">Chat with us</span>
      <span className="sm:hidden">💬</span>
    </motion.a>
  )
}
