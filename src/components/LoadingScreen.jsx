import { motion } from 'framer-motion'
import logo from '../assets/my_shop_images/shree_nandi_gruhudhyog_logo.png'

const foodEmojis = ['🥨', '🫓', '🫙', '🍞', '🍫', '🌶️']

export default function LoadingScreen({ onComplete }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Subtle background pattern — radial glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-saffron/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gold/10 blur-2xl" />
      </div>

      {/* Orbiting food emojis */}
      <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
        {foodEmojis.map((emoji, i) => {
          const angle = (360 / foodEmojis.length) * i
          return (
            <motion.div
              key={i}
              className="absolute text-2xl sm:text-3xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 1, 0.8],
                scale: [0, 1, 1.1, 1, 1],
                rotate: [angle, angle + 360],
              }}
              transition={{
                opacity: { delay: 0.3 + i * 0.1, duration: 0.5 },
                scale: { delay: 0.3 + i * 0.1, duration: 0.5 },
                rotate: {
                  delay: 0.8,
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                },
              }}
              style={{
                transformOrigin: 'center center',
              }}
            >
              <motion.span
                style={{
                  display: 'inline-block',
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${angle}deg) translateY(-80px) rotate(-${angle}deg)`,
                }}
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  y: {
                    delay: 1 + i * 0.15,
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
              >
                {emoji}
              </motion.span>
            </motion.div>
          )
        })}

        {/* Logo — center */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: 0.1,
          }}
          className="relative z-10"
        >
          <motion.div
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(255,107,0,0)',
                '0 0 30px 10px rgba(255,107,0,0.15)',
                '0 0 0 0 rgba(255,107,0,0)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="rounded-full"
          >
            <img
              src={logo}
              alt="Shree Nandi Gruhudhyog Logo"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-saffron/30 shadow-xl"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Shop name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-brown mt-6 text-center px-4"
      >
        Shree Nandi Gruhudhyog
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="font-body text-sm sm:text-base text-brown-light mt-2 tracking-wide"
      >
        Taste the Tradition ✨
      </motion.p>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-10 w-48 sm:w-56 h-1.5 bg-saffron/15 rounded-full overflow-hidden"
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-saffron via-gold to-saffron"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ delay: 1, duration: 1.5, ease: 'easeInOut' }}
          onAnimationComplete={onComplete}
        />
      </motion.div>

      {/* Loading text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0.6, 0] }}
        transition={{ delay: 1, duration: 2.5, times: [0, 0.1, 0.8, 1] }}
        className="font-body text-xs text-brown-light/60 mt-3 tracking-widest uppercase"
      >
        Loading deliciousness…
      </motion.p>
    </motion.div>
  )
}
