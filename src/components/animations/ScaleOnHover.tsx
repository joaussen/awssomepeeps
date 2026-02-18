import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

interface ScaleOnHoverProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  scale?: number
}

export function ScaleOnHover({
  children,
  scale = 1.02,
  className,
  ...props
}: ScaleOnHoverProps) {
  return (
    <motion.div
      whileHover={{ scale, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
