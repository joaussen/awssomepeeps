import { Check } from 'lucide-react'
import { motion } from 'framer-motion'

interface IntakeFormStepperProps {
  currentStep: number
  totalSteps: number
  labels: string[]
}

export function IntakeFormStepper({ currentStep, totalSteps, labels }: IntakeFormStepperProps) {
  return (
    <div className="flex items-center justify-center gap-1 mb-8">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const isCompleted = i < currentStep
        const isCurrent = i === currentStep

        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.div
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor: isCompleted
                    ? '#FFB700'
                    : isCurrent
                    ? '#FFB700'
                    : '#e5e7eb',
                }}
                transition={{ duration: 0.3 }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              >
                {isCompleted ? (
                  <Check size={14} className="text-navy-dark" />
                ) : (
                  <span className={isCurrent ? 'text-navy-dark' : 'text-gray-400'}>
                    {i + 1}
                  </span>
                )}
              </motion.div>
              <span
                className={`text-[10px] mt-1 font-medium whitespace-nowrap ${
                  isCurrent ? 'text-brand-dark' : isCompleted ? 'text-gray-600' : 'text-gray-400'
                }`}
              >
                {labels[i]}
              </span>
            </div>
            {i < totalSteps - 1 && (
              <div
                className={`w-8 h-0.5 mx-1 mb-4 rounded-full transition-colors ${
                  isCompleted ? 'bg-brand' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
