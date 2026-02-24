interface FilterBarProps {
  superpower: string
  onSuperpowerChange: (value: string) => void
  experience: string
  onExperienceChange: (value: string) => void
  workStyle: string
  onWorkStyleChange: (value: string) => void
  location: string
  onLocationChange: (value: string) => void
  totalResults: number
  superpowers: string[]
  experienceLevels: string[]
  workStyles: string[]
}

export function FilterBar({
  superpower,
  onSuperpowerChange,
  experience,
  onExperienceChange,
  workStyle,
  onWorkStyleChange,
  location,
  onLocationChange,
  totalResults,
  superpowers,
  experienceLevels,
  workStyles,
}: FilterBarProps) {
  const selectClass =
    'w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 cursor-pointer transition-all appearance-none'

  return (
    <div className="max-w-6xl mx-auto px-6 mt-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-white">Filters</span>
        <span className="text-sm text-white">{totalResults} results</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <input
          type="text"
          placeholder="Location..."
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 transition-all"
        />
        <select value={workStyle} onChange={(e) => onWorkStyleChange(e.target.value)} className={selectClass}>
          <option value="">Work style</option>
          {workStyles.map((ws) => (
            <option key={ws} value={ws}>{ws}</option>
          ))}
        </select>
        <select value={superpower} onChange={(e) => onSuperpowerChange(e.target.value)} className={selectClass}>
          <option value="">Superpower</option>
          {superpowers.map((sp) => (
            <option key={sp} value={sp}>{sp}</option>
          ))}
        </select>
        <select value={experience} onChange={(e) => onExperienceChange(e.target.value)} className={selectClass}>
          <option value="">Experience</option>
          {experienceLevels.map((exp) => (
            <option key={exp} value={exp}>{exp} years</option>
          ))}
        </select>
      </div>
    </div>
  )
}
