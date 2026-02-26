import { motion } from 'framer-motion'
import { X, MapPin, Briefcase, Linkedin, UserPlus } from 'lucide-react'
import type { Candidate } from '../data/candidates'

interface CandidateDetailModalProps {
  candidate: Candidate
  onClose: () => void
  onRequestIntro: () => void
}

export function CandidateDetailModal({
  candidate,
  onClose,
  onRequestIntro,
}: CandidateDetailModalProps) {
  const initials = candidate.name
    .split(' ')
    .map((n) => n[0])
    .join('')

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
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
        >
          <X size={18} className="text-gray-400" />
        </button>

        <div className="overflow-y-auto p-6">
          {/* Profile header */}
          <div className="flex items-start gap-4 pr-8">
            {candidate.photoUrl ? (
              <img
                src={candidate.photoUrl}
                alt={candidate.name}
                className="w-16 h-16 rounded-full object-cover shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                <span className="text-lg font-bold text-brand-dark">{initials}</span>
              </div>
            )}
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-gray-900 leading-snug">
                {candidate.name}
              </h2>
              <p className="text-brand-dark font-medium mt-0.5">{candidate.title}</p>
            </div>
          </div>

          {/* Meta */}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1">
              <MapPin size={14} />
              {candidate.location}
            </span>
            <span className="text-gray-200">|</span>
            <span>{candidate.workStyle}</span>
            <span className="text-gray-200">|</span>
            <span className="inline-flex items-center gap-1">
              <Briefcase size={14} />
              {candidate.experience}y experience
            </span>
          </div>

          {/* Superpower */}
          <div className="mt-4">
            <span className="inline-block px-3 py-1.5 bg-brand/8 text-brand-dark text-sm font-medium rounded-lg">
              {candidate.superpower}
            </span>
          </div>

          {/* Full bio */}
          <div className="mt-5">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">About</h4>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {candidate.bio}
            </p>
          </div>

          {/* All recent wins */}
          {candidate.recentWins.length > 0 && (
            <div className="mt-5">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Recent Wins</h4>
              <ul className="space-y-2">
                {candidate.recentWins.map((win, i) => (
                  <li
                    key={i}
                    className="text-sm text-gray-600 flex items-start gap-2 leading-relaxed"
                  >
                    <span className="text-brand mt-0.5 shrink-0">-</span>
                    <span>{win}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sticky action buttons */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center gap-3 bg-white shrink-0">
          <a
            href={candidate.linkedIn || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#0a66c2] text-white text-sm font-medium hover:bg-[#004182] transition-colors"
          >
            <Linkedin size={15} />
            LinkedIn
          </a>
          <button
            onClick={onRequestIntro}
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-brand text-white text-sm font-medium hover:bg-brand-dark transition-colors cursor-pointer"
          >
            <UserPlus size={15} />
            Request Intro
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
