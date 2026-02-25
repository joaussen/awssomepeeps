import { ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const taglines = [
  'Because Amazonians are kind of a big deal',
  'Ex-AWS? More like next-AWS',
  'Where Day 1 mindset meets Day Next opportunity',
  'Ctrl+F your next star hire',
]

interface HeroBannerProps {
  onListProfile: () => void
}

export function HeroBanner({ onListProfile }: HeroBannerProps) {
  const [taglineIndex, setTaglineIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((i) => (i + 1) % taglines.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center pt-20 pb-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src="/brand-logo.svg" alt="" className="max-w-[120px] w-full mx-auto mb-8" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl md:text-5xl font-extrabold text-white mb-5 max-w-2xl mx-auto leading-[1.15] tracking-tight"
      >
        Find your next hire among talented{' '}
        <span className="text-[var(--color-brand)]">AWS alumni</span>
      </motion.h1>

      <div className="h-7 mb-8 relative">
        <AnimatePresence mode="wait">
          <motion.p
            key={taglineIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-white text-lg absolute inset-x-0"
          >
            {taglines[taglineIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <button
          onClick={onListProfile}
          className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-7 py-3.5 rounded-full text-base transition-colors cursor-pointer shadow-sm"
        >
          List your profile
          <ExternalLink size={16} />
        </button>
      </motion.div>
    </div>
  )
}
