import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowLeft, ArrowRight } from 'lucide-react'
import { IntakeFormStepper } from './IntakeFormStepper'
import { IntakeStepIdentity } from './IntakeStepIdentity'
import { IntakeStepSuperpower } from './IntakeStepSuperpower'
import { IntakeStepUpload } from './IntakeStepUpload'
import { IntakeStepReview } from './IntakeStepReview'
import { IntakeSuccess } from './IntakeSuccess'
import { validateStep1, validateStep2, validateStep3 } from '../../lib/validation'
import { submitCandidate, type IntakeFormData } from '../../lib/api'
import type { ValidationErrors } from '../../lib/validation'

interface IntakeFormModalProps {
  onClose: () => void
}

const STEP_LABELS = ['Identity', 'Superpower', 'Upload', 'Review']

const initialFormData: IntakeFormData = {
  name: '',
  title: '',
  linkedIn: '',
  email: '',
  location: '',
  workStyle: 'Remote',
  superpower: '',
  customSuperpower: '',
  experience: '' as IntakeFormData['experience'],
  bio: '',
  recentWins: ['', '', ''],
  photoFile: null,
  website: '',
  github: '',
  extraNotes: '',
}

export function IntakeFormModal({ onClose }: IntakeFormModalProps) {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [formData, setFormData] = useState<IntakeFormData>(initialFormData)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const updateField = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }, [])

  const updateWin = useCallback((index: number, value: string) => {
    setFormData((prev) => {
      const wins = [...prev.recentWins]
      wins[index] = value
      return { ...prev, recentWins: wins }
    })
    setErrors((prev) => {
      const next = { ...prev }
      delete next[`recentWins${index}`]
      return next
    })
  }, [])

  const updateFile = useCallback((field: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }, [])

  const validateCurrentStep = (): boolean => {
    let stepErrors: ValidationErrors = {}

    if (step === 0) {
      stepErrors = validateStep1(formData)
    } else if (step === 1) {
      stepErrors = validateStep2(formData)
    } else if (step === 2) {
      stepErrors = validateStep3(formData)
    }

    setErrors(stepErrors)
    return Object.keys(stepErrors).length === 0
  }

  const goNext = () => {
    if (validateCurrentStep()) {
      setDirection(1)
      setStep((s) => Math.min(s + 1, 3))
    }
  }

  const goBack = () => {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 0))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    const result = await submitCandidate(formData, 'demo-token')

    if (result.success) {
      setIsSuccess(true)
    } else {
      setSubmitError(result.error || 'Something went wrong')
    }

    setIsSubmitting(false)
  }

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-2">
          <div className="flex items-center gap-2">
            <img
              src="/brand-logo.svg"
              alt=""
              className="h-6 w-6 object-contain"
            />
            <h3 className="font-bold text-lg text-gray-900">Join AwssomePeeps</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pb-6">
          {isSuccess ? (
            <IntakeSuccess onClose={onClose} />
          ) : (
            <>
              <IntakeFormStepper
                currentStep={step}
                totalSteps={4}
                labels={STEP_LABELS}
              />

              <div className="relative overflow-hidden min-h-[300px]">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    {step === 0 && (
                      <IntakeStepIdentity
                        data={formData}
                        errors={errors}
                        onChange={updateField}
                      />
                    )}
                    {step === 1 && (
                      <IntakeStepSuperpower
                        data={formData}
                        errors={errors}
                        onChange={updateField}
                        onWinChange={updateWin}
                      />
                    )}
                    {step === 2 && (
                      <IntakeStepUpload
                        data={formData}
                        errors={errors}
                        onChange={updateField}
                        onFileChange={updateFile}
                      />
                    )}
                    {step === 3 && (
                      <IntakeStepReview
                        data={formData}
                        turnstileToken={null}
                        onTurnstileReady={() => {}}
                        isSubmitting={isSubmitting}
                        submitError={submitError}
                        onSubmit={handleSubmit}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              {step < 3 && (
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                  <button
                    onClick={goBack}
                    disabled={step === 0}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      step === 0
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button
                    onClick={goNext}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg text-sm font-semibold bg-brand hover:bg-brand-dark text-gray-900 transition-colors cursor-pointer"
                  >
                    Next <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
