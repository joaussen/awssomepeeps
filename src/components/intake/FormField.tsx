import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface FormFieldProps {
  label: string
  error?: string
  required?: boolean
  children: ReactNode
  hint?: string
}

export function FormField({ label, error, required, children, hint }: FormFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs text-gray-400 mt-1">{hint}</p>
      )}
      {error && (
        <motion.p
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xs text-red-500 mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}
