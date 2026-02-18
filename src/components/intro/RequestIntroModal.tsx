import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Send, CheckCircle } from 'lucide-react'
import { requestIntro } from '../../lib/api'

interface RequestIntroModalProps {
  candidateName: string
  onClose: () => void
}

export function RequestIntroModal({ candidateName, onClose }: RequestIntroModalProps) {
  const [partnerName, setPartnerName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!partnerName.trim() || !companyName.trim() || !email.trim()) {
      setError('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    setError(null)

    const result = await requestIntro({
      partnerName: partnerName.trim(),
      companyName: companyName.trim(),
      email: email.trim(),
      message: message.trim(),
      candidateName,
      turnstileToken: 'demo-token',
    })

    if (result.success) {
      setIsSuccess(true)
    } else {
      setError(result.error || 'Something went wrong')
    }

    setIsSubmitting(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-gray-900">Request Intro</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <CheckCircle size={48} className="text-green mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 text-lg mb-1">Request Sent!</h4>
            <p className="text-gray-500 text-sm mb-6">
              We'll connect you with {candidateName} shortly.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-brand text-navy-dark font-semibold rounded-lg hover:bg-brand-dark transition-colors cursor-pointer"
            >
              Done
            </button>
          </motion.div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">
              Request an introduction to <span className="font-semibold text-gray-700">{candidateName}</span>
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="Jane Smith"
                  className="w-full px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-brand/40 focus:shadow-[0_0_0_3px_rgba(255,183,0,0.1)] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Acme Corp"
                  className="w-full px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-brand/40 focus:shadow-[0_0_0_3px_rgba(255,183,0,0.1)] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@acme.com"
                  className="w-full px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-brand/40 focus:shadow-[0_0_0_3px_rgba(255,183,0,0.1)] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us why you're interested..."
                  rows={3}
                  className="w-full px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-brand/40 focus:shadow-[0_0_0_3px_rgba(255,183,0,0.1)] transition-all resize-none"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 mt-3">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full mt-4 py-3 rounded-lg font-semibold text-sm transition-all cursor-pointer inline-flex items-center justify-center gap-2 ${
                isSubmitting
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-navy-dark text-white hover:bg-navy'
              }`}
            >
              <Send size={15} />
              {isSubmitting ? 'Sending...' : 'Send Request'}
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
