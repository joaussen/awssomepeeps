import { FormField } from './FormField'
import type { ValidationErrors } from '../../lib/validation'

interface StepIdentityProps {
  data: {
    name: string
    title: string
    linkedIn: string
    email: string
    location: string
    workStyle: string
  }
  errors: ValidationErrors
  onChange: (field: string, value: string) => void
}

const workStyleOptions = ['Remote', 'Hybrid', 'In-Person']

export function IntakeStepIdentity({ data, errors, onChange }: StepIdentityProps) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-6 italic">
        Let's start with the basics -- we promise we're not bots
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FormField label="Full Name" error={errors.name} required>
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Jane Doe"
            className="w-full px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-brand/40 focus:shadow-[0_0_0_3px_rgba(255,183,0,0.1)] transition-all"
          />
        </FormField>

        <FormField label="Professional Title" error={errors.title} required>
          <input
            type="text"
            value={data.title}
            onChange={(e) => onChange('title', e.target.value)}
            placeholder="Sr. Solutions Architect"
            className="w-full px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-brand/40 focus:shadow-[0_0_0_3px_rgba(255,183,0,0.1)] transition-all"
          />
        </FormField>
      </div>

      <FormField label="LinkedIn Profile URL" error={errors.linkedIn} required>
        <input
          type="url"
          value={data.linkedIn}
          onChange={(e) => onChange('linkedIn', e.target.value)}
          placeholder="https://linkedin.com/in/janedoe"
          className="w-full px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-brand/40 focus:shadow-[0_0_0_3px_rgba(255,183,0,0.1)] transition-all"
        />
      </FormField>

      <FormField label="Email Address" error={errors.email} required>
        <input
          type="email"
          value={data.email}
          onChange={(e) => onChange('email', e.target.value)}
          placeholder="jane@example.com"
          className="w-full px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-brand/40 focus:shadow-[0_0_0_3px_rgba(255,183,0,0.1)] transition-all"
        />
      </FormField>

      <FormField label="Location" error={errors.location} required>
        <input
          type="text"
          value={data.location}
          onChange={(e) => onChange('location', e.target.value)}
          placeholder="Seattle, United States"
          className="w-full px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-brand/40 focus:shadow-[0_0_0_3px_rgba(255,183,0,0.1)] transition-all"
        />
      </FormField>

      <FormField label="Work Style Preference" error={errors.workStyle} required>
        <div className="flex gap-3">
          {workStyleOptions.map((ws) => (
            <button
              key={ws}
              type="button"
              onClick={() => onChange('workStyle', ws)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all cursor-pointer ${
                data.workStyle === ws
                  ? 'border-brand bg-brand/10 text-brand-dark'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {ws}
            </button>
          ))}
        </div>
      </FormField>
    </div>
  )
}
