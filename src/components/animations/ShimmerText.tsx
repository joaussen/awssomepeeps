import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ShimmerTextProps {
  children: ReactNode
  className?: string
  gradient?: string
}

export function ShimmerText({
  children,
  className = '',
  gradient = 'linear-gradient(90deg, #FFB700 0%, #ff8c00 40%, #FFB700 60%, #ffe082 80%, #FFB700 100%)',
}: ShimmerTextProps) {
  return (
    <motion.span
      className={`bg-clip-text text-transparent inline-block ${className}`}
      style={{
        backgroundImage: gradient,
        backgroundSize: '200% 100%',
      }}
      animate={{
        backgroundPosition: ['200% center', '-200% center'],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.span>
  )
}
