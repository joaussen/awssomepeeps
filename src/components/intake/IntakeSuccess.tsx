import { motion } from 'framer-motion'
import { ConfettiBlast } from '../animations/ConfettiBlast'
import { PartyPopper } from 'lucide-react'

interface IntakeSuccessProps {
  onClose: () => void
}

export function IntakeSuccess({ onClose }: IntakeSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <ConfettiBlast active />

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
      >
        <img
          src="/brand-logo.svg"
          alt=""
          className="w-24 h-24 object-contain mb-6"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2 justify-center mb-2">
          <PartyPopper size={24} className="text-brand" />
          <h3 className="text-2xl font-bold text-gray-900">Welcome to the family!</h3>
          <PartyPopper size={24} className="text-brand" style={{ transform: 'scaleX(-1)' }} />
        </div>
        <p className="text-gray-500 text-base max-w-md mx-auto mb-8">
          Your profile is live on the directory! ISV partners can now find you and request intros.
        </p>

        <button
          onClick={onClose}
          className="px-8 py-3 bg-brand text-navy-dark font-semibold rounded-lg hover:bg-brand-dark transition-colors cursor-pointer"
        >
          Back to Directory
        </button>
      </motion.div>
    </div>
  )
}
