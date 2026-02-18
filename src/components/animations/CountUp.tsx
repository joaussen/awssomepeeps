import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface CountUpProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  overshoot?: boolean
}

export function CountUp({
  end,
  duration = 2,
  prefix = '',
  suffix = '',
  className,
  overshoot = false,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)
  const [phase, setPhase] = useState<'counting' | 'overshoot' | 'done'>('counting')

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now()
    const durationMs = duration * 1000

    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / durationMs, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * end)
      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(tick)
      } else if (overshoot && phase === 'counting') {
        setPhase('overshoot')
        setCount(end + 1)
        setTimeout(() => {
          setCount(end)
          setPhase('done')
        }, 400)
      } else {
        setPhase('done')
      }
    }

    requestAnimationFrame(tick)
  }, [isInView, end, duration, overshoot, phase])

  return (
    <motion.span
      ref={ref}
      className={className}
      animate={phase === 'overshoot' ? { scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 0.3 }}
    >
      {prefix}{count}{suffix}
    </motion.span>
  )
}
