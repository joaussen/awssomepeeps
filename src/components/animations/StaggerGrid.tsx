import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

interface StaggerGridProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

const containerVariants = {
  hidden: {},
  visible: (staggerDelay: number) => ({
    transition: {
      staggerChildren: staggerDelay,
    },
  }),
}

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
}

export function StaggerGrid({
  children,
  className,
  staggerDelay = 0.08,
}: StaggerGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      custom={staggerDelay}
      className={className}
    >
      {children}
    </motion.div>
  )
}
