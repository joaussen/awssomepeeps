import { Users, Building2, Handshake } from 'lucide-react'

interface StatsBarProps {
  totalCandidates: number
}

export function StatsBar({ totalCandidates }: StatsBarProps) {
  return (
    <div className="max-w-3xl mx-auto px-6 mb-10">
      <div className="flex items-center justify-center gap-10 sm:gap-16 text-center">
        <div className="flex items-center gap-2.5">
          <Building2 size={18} className="text-brand" />
          <div>
            <span className="text-xl font-bold text-gray-900">150+</span>
            <span className="text-sm text-gray-500 ml-1.5">ISV Partners</span>
          </div>
        </div>

        <div className="w-px h-6 bg-gray-200" />

        <div className="flex items-center gap-2.5">
          <Users size={18} className="text-blue" />
          <div>
            <span className="text-xl font-bold text-gray-900">{totalCandidates}</span>
            <span className="text-sm text-gray-500 ml-1.5">Alumni Listed</span>
          </div>
        </div>

        <div className="hidden sm:block w-px h-6 bg-gray-200" />

        <div className="hidden sm:flex items-center gap-2.5">
          <Handshake size={18} className="text-green" />
          <div>
            <span className="text-xl font-bold text-gray-900">100%</span>
            <span className="text-sm text-gray-500 ml-1.5">Free</span>
          </div>
        </div>
      </div>
    </div>
  )
}
