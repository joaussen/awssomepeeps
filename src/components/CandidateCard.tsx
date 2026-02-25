import { Linkedin, MapPin, Briefcase, UserPlus } from 'lucide-react'
import type { Candidate } from '../data/candidates'

interface CandidateCardProps {
  candidate: Candidate
  onRequestIntro?: () => void
}

export function CandidateCard({ candidate, onRequestIntro }: CandidateCardProps) {
  const initials = candidate.name
    .split(' ')
    .map((n) => n[0])
    .join('')

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 flex flex-col">
      {/* Header */}
      <div className="p-5 pb-0">
        <div className="flex items-start gap-3">
          {candidate.photoUrl ? (
            <img
              src={candidate.photoUrl}
              alt={candidate.name}
              className="w-11 h-11 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-brand-dark">{initials}</span>
            </div>
          )}
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 leading-snug">{candidate.name}</h3>
            <p className="text-brand-dark text-sm mt-0.5 leading-snug">{candidate.title}</p>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="px-5 mt-3 flex items-center gap-3 text-xs text-gray-400">
        <span className="inline-flex items-center gap-1">
          <MapPin size={11} />
          {candidate.location}
        </span>
        <span className="text-gray-200">|</span>
        <span>{candidate.workStyle}</span>
        <span className="text-gray-200">|</span>
        <span className="inline-flex items-center gap-1">
          <Briefcase size={11} />
          {candidate.experience}y
        </span>
      </div>

      {/* Superpower tag */}
      <div className="px-5 mt-3">
        <span className="inline-block px-2.5 py-1 bg-brand/8 text-brand-dark text-xs font-medium rounded-md">
          {candidate.superpower}
        </span>
      </div>

      {/* Bio */}
      <div className="px-5 mt-3 flex-1">
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{candidate.bio}</p>
      </div>

      {/* Recent wins */}
      <div className="px-5 mt-3">
        <ul className="space-y-1">
          {candidate.recentWins.slice(0, 2).map((win, i) => (
            <li key={i} className="text-xs text-gray-400 flex items-start gap-1.5 leading-snug">
              <span className="text-brand mt-0.5 shrink-0">-</span>
              <span className="line-clamp-1">{win}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="px-5 pb-5 pt-4 flex items-center gap-2 mt-auto">
        <a
          href={candidate.linkedIn || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-full bg-[#0a66c2] text-white text-sm font-medium hover:bg-[#004182] transition-colors"
        >
          <Linkedin size={14} />
          LinkedIn
        </a>
        {onRequestIntro && (
          <button
            onClick={onRequestIntro}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-full bg-brand text-white text-sm font-medium hover:bg-brand-dark transition-colors cursor-pointer"
          >
            <UserPlus size={14} />
            Request Intro
          </button>
        )}
      </div>
    </div>
  )
}
