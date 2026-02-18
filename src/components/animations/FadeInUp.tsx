import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

interface FadeInUpProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
}

export function FadeInUp({
  children,
  delay = 0,
  duration = 0.6,
  y = 30,
  className,
  ...props
}: FadeInUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration, ease: 'easeOut', delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
