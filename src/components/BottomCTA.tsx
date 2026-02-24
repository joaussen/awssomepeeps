import { ExternalLink, Heart } from 'lucide-react'

interface BottomCTAProps {
  onOpenForm: () => void
}

export function BottomCTA({ onOpenForm }: BottomCTAProps) {
  return (
    <div className="mt-20 bg-[var(--color-blue-bg)]">
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
          Join the Awssome family
        </h2>
        <p className="text-white text-base leading-relaxed mb-10 max-w-lg mx-auto">
          A free initiative connecting AWS alumni with ISV companies scaling on AWS Marketplace. List your profile and let partners find you.
        </p>

        <div className="bg-[var(--color-blue)]/50 border border-gray-700/50 rounded-xl p-6 text-left max-w-md mx-auto mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">For AWS Alumni</h3>
          <p className="text-white text-sm leading-relaxed mb-5">
            Tell us about your superpower, ideal role, and recent wins. Takes 3 minutes.
          </p>

          <button
            onClick={onOpenForm}
            className="w-full inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors cursor-pointer"
          >
            Complete Intake Form
            <ExternalLink size={15} />
          </button>

          <div className="mt-4 space-y-1 text-xs text-white">
            <p>&#10003; GDPR compliant - hide your profile anytime</p>
            <p>&#10003; Direct intro requests from ISV partners</p>
            <p>&#10003; Remove your profile via support@awssome.io</p>
          </div>
        </div>

        <p className="text-white text-xs leading-relaxed max-w-lg mx-auto">
          <span className="font-medium text-white">Disclaimer:</span> Awssome facilitates introductions between talent and ISV partners. We are not a recruitment agency. All employment decisions are made independently by partner companies.
        </p>
      </div>

      <div className="border-t border-gray-800 py-6 text-center">
        <p className="text-white text-sm flex items-center justify-center gap-1.5">
          Built with <Heart size={13} className="text-brand fill-brand" /> by the Awssome family
        </p>
      </div>
    </div>
  )
}
