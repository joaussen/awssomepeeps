import { MapPin, Star, Briefcase, Linkedin, Globe } from 'lucide-react'
import type { IntakeFormData } from '../../lib/api'

interface StepReviewProps {
  data: IntakeFormData
  turnstileToken: string | null
  onTurnstileReady: (token: string) => void
  isSubmitting: boolean
  submitError: string | null
  onSubmit: () => void
}

export function IntakeStepReview({
  data,
  isSubmitting,
  submitError,
  onSubmit,
}: StepReviewProps) {
  const superpowerDisplay =
    data.superpower === 'Other' ? data.customSuperpower : data.superpower

  return (
    <div>
      <p className="text-sm text-gray-500 mb-6 italic">
        Looking good! Ready to join the Awssome family?
      </p>

      {/* Preview Card */}
      <div className="border border-gray-200 rounded-xl p-5 bg-white mb-6">
        <h4 className="font-semibold text-gray-900 text-lg">{data.name}</h4>
        <p className="text-brand-dark text-sm font-medium mt-0.5">{data.title}</p>
        <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500">
          <MapPin size={12} />
          <span>{data.location}</span>
          <span className="text-gray-300 mx-0.5">·</span>
          <span>{data.workStyle}</span>
        </div>

        <div className="bg-brand-bg/60 border border-brand/10 rounded-lg px-3 py-2 mt-3">
          <div className="flex items-center gap-1.5">
            <Star size={12} className="text-brand" />
            <span className="text-brand text-xs font-medium">Superpower:</span>
            <span className="text-gray-900 text-xs font-semibold">{superpowerDisplay}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-3 leading-relaxed">{data.bio}</p>

        {data.recentWins.filter(Boolean).length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-semibold text-gray-700 mb-1">Recent Wins:</p>
            <ul className="space-y-1">
              {data.recentWins.filter(Boolean).map((win, i) => (
                <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                  <span className="text-brand mt-1 text-[6px]">●</span>
                  <span>{win}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
          <Briefcase size={12} />
          <span>{data.experience} years experience</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-500">
          <a href={data.linkedIn} className="flex items-center gap-1 text-blue hover:underline">
            <Linkedin size={12} /> LinkedIn
          </a>
          {data.website && (
            <span className="flex items-center gap-1">
              <Globe size={12} /> {data.website}
            </span>
          )}
        </div>
      </div>

      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-red-600">{submitError}</p>
        </div>
      )}

      <button
        onClick={onSubmit}
        disabled={isSubmitting}
        className={`w-full py-3.5 rounded-lg font-semibold text-base transition-all cursor-pointer ${
          isSubmitting
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'text-navy-dark animate-pulse-glow hover:opacity-90'
        }`}
        style={
          !isSubmitting
            ? { backgroundImage: 'linear-gradient(to right, #FFB700, #ffc933)' }
            : undefined
        }
      >
        {isSubmitting ? 'Submitting...' : 'Submit My Profile'}
      </button>

      <p className="text-xs text-gray-400 text-center mt-3">
        By submitting, you agree to be listed on AwssomePeeps. You can remove your profile anytime.
      </p>
    </div>
  )
}
