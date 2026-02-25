export type ValidationErrors = Record<string, string>

const LINKEDIN_REGEX = /^https?:\/\/(www\.)?linkedin\.com\/in\/.+/i
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const URL_REGEX = /^https?:\/\/.+/i

export function validateStep1(data: {
  name: string
  title: string
  linkedIn: string
  email: string
  location: string
  workStyle: string
}): ValidationErrors {
  const errors: ValidationErrors = {}

  if (!data.name.trim()) errors.name = 'Name is required'
  else if (data.name.trim().length < 2) errors.name = 'Name must be at least 2 characters'

  if (!data.title.trim()) errors.title = 'Professional title is required'
  else if (data.title.trim().length < 3) errors.title = 'Title must be at least 3 characters'

  if (!data.linkedIn.trim()) errors.linkedIn = 'LinkedIn URL is required'
  else if (!LINKEDIN_REGEX.test(data.linkedIn.trim())) errors.linkedIn = 'Enter a valid LinkedIn profile URL (e.g. https://linkedin.com/in/yourname)'

  if (!data.email.trim()) errors.email = 'Email is required'
  else if (!EMAIL_REGEX.test(data.email.trim())) errors.email = 'Enter a valid email address'

  if (!data.location.trim()) errors.location = 'Location is required'

  if (!data.workStyle) errors.workStyle = 'Select a work style preference'

  return errors
}

export function validateStep2(data: {
  superpower: string
  customSuperpower: string
  experience: string
  bio: string
  recentWins: string[]
}): ValidationErrors {
  const errors: ValidationErrors = {}

  if (!data.superpower) errors.superpower = 'Select your superpower'
  if (data.superpower === 'Other' && !data.customSuperpower.trim()) {
    errors.customSuperpower = 'Describe your superpower'
  }

  if (!data.experience) errors.experience = 'Select your experience level'

  if (!data.bio.trim()) errors.bio = 'Bio is required'
  else if (data.bio.trim().length < 100) errors.bio = `Bio must be at least 100 characters (${data.bio.trim().length}/100)`
  else if (data.bio.trim().length > 500) errors.bio = `Bio must be under 500 characters (${data.bio.trim().length}/500)`

  if (!data.recentWins[0]?.trim()) errors.recentWins0 = 'At least one recent win is required'

  return errors
}

export function validateStep3(data: {
  photoFile: File | null
  website: string
  github: string
}): ValidationErrors {
  const errors: ValidationErrors = {}

  if (data.photoFile) {
    const maxSize = 2 * 1024 * 1024 // 2MB
    if (data.photoFile.size > maxSize) {
      errors.photoFile = 'Photo must be under 2MB'
    }
    if (!data.photoFile.type.startsWith('image/')) {
      errors.photoFile = 'File must be an image'
    }
  }

  if (data.website && !URL_REGEX.test(data.website.trim())) {
    errors.website = 'Enter a valid URL (e.g. https://yoursite.com)'
  }

  if (data.github && !URL_REGEX.test(data.github.trim())) {
    errors.github = 'Enter a valid URL (e.g. https://github.com/username)'
  }

  return errors
}
