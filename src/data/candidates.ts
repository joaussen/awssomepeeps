export interface Candidate {
  name: string
  title: string
  location: string
  workStyle: 'Remote' | 'Hybrid' | 'In-Person'
  superpower: string
  bio: string
  recentWins: string[]
  experience: '1-5' | '5-10' | '10-15' | '15-25' | '25+'
  linkedIn?: string
  photoUrl?: string
}

export const candidates: Candidate[] = []

export const superpowers = ['AWS Marketplace', 'Cloud & AI', 'ISV Partnerships']
export const experienceLevels = ['1-5', '5-10', '10-15', '15-25', '25+']
export const workStyles = ['Remote', 'Hybrid', 'In-Person']
