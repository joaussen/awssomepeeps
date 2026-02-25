import { useState, useMemo, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Header } from './components/Header'
import { HeroBanner } from './components/HeroBanner'
import { StatsBar } from './components/StatsBar'
import { SearchBar } from './components/SearchBar'
import { FilterBar } from './components/FilterBar'
import { ActiveFilters } from './components/ActiveFilters'
import { CandidateCard } from './components/CandidateCard'
import { BottomCTA } from './components/BottomCTA'
import { IntakeFormModal } from './components/intake/IntakeFormModal'
import { RequestIntroModal } from './components/intro/RequestIntroModal'
import { superpowers, experienceLevels, workStyles } from './data/candidates'
import type { Candidate } from './data/candidates'
import { supabase, isSupabaseConfigured } from './lib/supabase'

function App() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [superpower, setSuperpower] = useState('')
  const [experience, setExperience] = useState('')
  const [workStyle, setWorkStyle] = useState('')
  const [location, setLocation] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [introCandidate, setIntroCandidate] = useState<string | null>(null)

  const fetchCandidates = async () => {
    if (!isSupabaseConfigured || !supabase) {
      console.warn('Supabase not configured — no candidates to display')
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('candidates')
        .select('name, title, location, work_style, superpower, bio, recent_wins, experience, linkedin_url')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching candidates:', error)
        setIsLoading(false)
        return
      }

      const mapped: Candidate[] = (data || []).map((row) => ({
        name: row.name,
        title: row.title,
        location: row.location,
        workStyle: row.work_style as Candidate['workStyle'],
        superpower: row.superpower,
        bio: row.bio,
        recentWins: row.recent_wins || [],
        experience: row.experience as Candidate['experience'],
        linkedIn: row.linkedin_url || undefined,
      }))

      setCandidates(mapped)
    } catch (err) {
      console.error('Unexpected error fetching candidates:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCandidates()
  }, [])

  const filtered = useMemo(() => {
    return candidates.filter((c) => {
      const matchesSearch =
        !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.bio.toLowerCase().includes(search.toLowerCase()) ||
        c.superpower.toLowerCase().includes(search.toLowerCase())
      const matchesSuperpower = !superpower || c.superpower === superpower
      const matchesExperience = !experience || c.experience === experience
      const matchesWorkStyle = !workStyle || c.workStyle === workStyle
      const matchesLocation =
        !location || c.location.toLowerCase().includes(location.toLowerCase())
      return (
        matchesSearch &&
        matchesSuperpower &&
        matchesExperience &&
        matchesWorkStyle &&
        matchesLocation
      )
    })
  }, [candidates, search, superpower, experience, workStyle, location])

  const clearFilters = () => {
    setSearch('')
    setSuperpower('')
    setExperience('')
    setWorkStyle('')
    setLocation('')
  }

  const hasFilters = search || superpower || experience || workStyle || location

  const activeFiltersList = [
    ...(superpower ? [{ label: superpower, key: 'superpower' }] : []),
    ...(experience ? [{ label: `${experience} years`, key: 'experience' }] : []),
    ...(workStyle ? [{ label: workStyle, key: 'workStyle' }] : []),
    ...(location ? [{ label: location, key: 'location' }] : []),
  ]

  const removeFilter = (key: string) => {
    if (key === 'superpower') setSuperpower('')
    if (key === 'experience') setExperience('')
    if (key === 'workStyle') setWorkStyle('')
    if (key === 'location') setLocation('')
  }

  // Re-fetch candidates after form submission
  const handleFormClose = () => {
    setIsFormOpen(false)
    fetchCandidates()
  }

  return (
    <div className="min-h-screen bg-[var(--color-blue)]">
      <Header />
      <HeroBanner onListProfile={() => setIsFormOpen(true)} />
      <StatsBar totalCandidates={candidates.length} />

      <SearchBar
        value={search}
        onChange={setSearch}
        onClear={hasFilters ? clearFilters : undefined}
      />

      <FilterBar
        superpower={superpower}
        onSuperpowerChange={setSuperpower}
        experience={experience}
        onExperienceChange={setExperience}
        workStyle={workStyle}
        onWorkStyleChange={setWorkStyle}
        location={location}
        onLocationChange={setLocation}
        totalResults={filtered.length}
        superpowers={superpowers}
        experienceLevels={experienceLevels}
        workStyles={workStyles}
      />

      {activeFiltersList.length > 0 && (
        <ActiveFilters
          filters={activeFiltersList}
          onRemove={removeFilter}
          onClearAll={clearFilters}
        />
      )}

      <div className="max-w-6xl mx-auto px-6">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/60 text-sm">Loading candidates...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((candidate, i) => (
                <CandidateCard
                  key={`${candidate.name}-${i}`}
                  candidate={candidate}
                  onRequestIntro={() => setIntroCandidate(candidate.name)}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <img
                  src="/smiley.svg"
                  alt=""
                  className="w-16 h-16 mx-auto mb-4 opacity-20"
                />
                <p className="text-white/60 text-lg">
                  {candidates.length === 0
                    ? 'No alumni listed yet — be the first!'
                    : 'No candidates match your filters'}
                </p>
                {candidates.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="mt-3 text-brand hover:text-brand-dark font-medium cursor-pointer transition-colors text-sm"
                  >
                    Clear all filters
                  </button>
                )}
                {candidates.length === 0 && (
                  <button
                    onClick={() => setIsFormOpen(true)}
                    className="mt-4 px-6 py-2.5 bg-brand hover:bg-brand-dark text-white font-semibold rounded-full text-sm transition-colors cursor-pointer"
                  >
                    List your profile
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <BottomCTA onOpenForm={() => setIsFormOpen(true)} />
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <IntakeFormModal onClose={handleFormClose} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {introCandidate && (
          <RequestIntroModal
            candidateName={introCandidate}
            onClose={() => setIntroCandidate(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
