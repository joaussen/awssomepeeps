import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface FloatingElementProps {
  children: ReactNode
  className?: string
  amplitude?: number
  duration?: number
}

export function FloatingElement({
  children,
  className,
  amplitude = 6,
  duration = 3,
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{ y: [-amplitude, amplitude, -amplitude] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
