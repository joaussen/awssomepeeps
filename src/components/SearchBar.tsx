import { Search } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onClear?: () => void
}

export function SearchBar({ value, onChange, onClear }: SearchBarProps) {
  return (
    <div className="flex items-center gap-3 max-w-6xl mx-auto px-6">
      <div className="flex-1 relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, role, or skills..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 transition-all text-sm"
        />
      </div>
      {onClear && (
        <button
          onClick={onClear}
          className="px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-100 transition-colors cursor-pointer text-sm"
        >
          Clear
        </button>
      )}
    </div>
  )
}
