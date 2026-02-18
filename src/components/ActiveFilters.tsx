import { X } from 'lucide-react'

interface ActiveFiltersProps {
  filters: { label: string; key: string }[]
  onRemove: (key: string) => void
  onClearAll: () => void
}

export function ActiveFilters({ filters, onRemove, onClearAll }: ActiveFiltersProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 mb-4">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-gray-400">Active:</span>
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onRemove(filter.key)}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand/10 text-brand-dark text-xs font-medium rounded-full hover:bg-brand/20 transition-colors cursor-pointer"
          >
            {filter.label}
            <X size={11} />
          </button>
        ))}
        {filters.length > 1 && (
          <button
            onClick={onClearAll}
            className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer transition-colors ml-1"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  )
}
