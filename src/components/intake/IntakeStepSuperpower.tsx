import { FormField } from './FormField'
import type { ValidationErrors } from '../../lib/validation'
import { superpowers, experienceLevels } from '../../data/candidates'

interface StepSuperpowerProps {
  data: {
    superpower: string
    customSuperpower: string
    experience: string
    bio: string
    recentWins: string[]
  }
  errors: ValidationErrors
  onChange: (field: string, value: string) => void
  onWinChange: (index: number, value: string) => void
}

export function IntakeStepSuperpower({ data, errors, onChange, onWinChange }: StepSuperpowerProps) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-6 italic">
        Time to brag -- what's your AWS superpower?
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FormField label="Superpower" error={errors.superpower} required>
          <select
            value={data.superpower}
            onChange={(e) => onChange('superpower', e.target.value)}
            className="w-full px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-brand/40 focus:shadow-[0_0_0_3px_rgba(255,183,0,0.1)] cursor-pointer transition-all appearance-none"
          >
            <option value="">Select your superpower</option>
            {superpowers.map((sp) => (
              <option key={sp} value={sp}>{sp}</option>
            ))}
            <option value="Other">Other (specify)</option>
          </select>
        </FormField>

        <FormField label="Years of Experience" error={errors.experience} required>
          <select
            value={data.experience}
            onChange={(e) => onChange('experience', e.target.value)}
            className="w-full px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-brand/40 focus:shadow-[0_0_0_3px_rgba(255,183,0,0.1)] cursor-pointer transition-all appearance-none"
          >
            <option value="">Select experience</option>
            {experienceLevels.map((exp) => (
              <option key={exp} value={exp}>{exp} years</option>
            ))}
          </select>
        </FormField>
      </div>

      {data.superpower === 'Other' && (
        <FormField label="Describe Your Superpower" error={errors.customSuperpower} required>
          <input
            type="text"
            value={data.customSuperpower}
            onChange={(e) => onChange('customSuperpower', e.target.value)}
            placeholder="e.g., DevOps, Security, Data Engineering..."
            className="w-full px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-brand/40 focus:shadow-[0_0_0_3px_rgba(255,183,0,0.1)] transition-all"
          />
        </FormField>
      )}

      <FormField
        label="Bio"
        error={errors.bio}
        required
        hint={`${data.bio.length}/500 characters`}
      >
        <textarea
          value={data.bio}
          onChange={(e) => onChange('bio', e.target.value)}
          placeholder="Tell ISV partners about your AWS journey, expertise, and what makes you awesome..."
          rows={4}
          maxLength={500}
          className="w-full px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-brand/40 focus:shadow-[0_0_0_3px_rgba(255,183,0,0.1)] transition-all resize-none"
        />
      </FormField>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Recent Wins <span className="text-red-400 ml-0.5">*</span>
          <span className="text-gray-400 font-normal ml-1">(at least 1)</span>
        </label>
        {[0, 1, 2].map((i) => (
          <div key={i} className="mb-2">
            <input
              type="text"
              value={data.recentWins[i] || ''}
              onChange={(e) => onWinChange(i, e.target.value)}
              placeholder={
                i === 0
                  ? 'e.g., Grew ISV Marketplace revenue 340% YoY'
                  : i === 1
                  ? 'e.g., Onboarded 85 new ISV partners in FY24'
                  : 'e.g., Built co-sell playbook adopted across 4 regions'
              }
              className="w-full px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-brand/40 focus:shadow-[0_0_0_3px_rgba(255,183,0,0.1)] transition-all"
            />
          </div>
        ))}
        {errors.recentWins0 && (
          <p className="text-xs text-red-500 mt-1">{errors.recentWins0}</p>
        )}
      </div>
    </div>
  )
}
