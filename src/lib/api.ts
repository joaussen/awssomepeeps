import { supabase, isSupabaseConfigured } from './supabase'

export interface IntakeFormData {
  // Step 1
  name: string
  title: string
  linkedIn: string
  email: string
  location: string
  workStyle: 'Remote' | 'Hybrid' | 'In-Person'
  // Step 2
  superpower: string
  customSuperpower: string
  experience: '5-10' | '10-15' | '15-25' | '25+'
  bio: string
  recentWins: string[]
  // Step 3
  resumeFile: File | null
  photoFile: File | null
  website: string
  github: string
  extraNotes: string
}

export interface IntroRequestData {
  partnerName: string
  companyName: string
  email: string
  message: string
  candidateName: string
  turnstileToken: string
}

async function uploadFile(
  bucket: string,
  file: File,
  prefix: string
): Promise<string | null> {
  if (!supabase) return null
  const ext = file.name.split('.').pop()
  const fileName = `${prefix}-${Date.now()}.${ext}`

  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file)

  if (error) {
    console.error(`Upload error (${bucket}):`, error)
    return null
  }

  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName)

  return urlData.publicUrl
}

export async function submitCandidate(
  formData: IntakeFormData,
  turnstileToken: string
): Promise<{ success: boolean; error?: string }> {
  // If Supabase is not configured, simulate success for demo
  if (!isSupabaseConfigured) {
    console.log('Supabase not configured — simulating submission:', formData)
    await new Promise((r) => setTimeout(r, 1500))
    return { success: true }
  }

  try {
    let resumeUrl: string | null = null
    let photoUrl: string | null = null

    if (formData.resumeFile) {
      resumeUrl = await uploadFile('resumes', formData.resumeFile, 'resume')
    }

    if (formData.photoFile) {
      photoUrl = await uploadFile('photos', formData.photoFile, 'photo')
    }

    const { error } = await supabase!.from('candidates').insert({
      name: formData.name.trim(),
      title: formData.title.trim(),
      email: formData.email.trim(),
      linkedin_url: formData.linkedIn.trim(),
      location: formData.location.trim(),
      work_style: formData.workStyle,
      superpower: formData.superpower === 'Other'
        ? formData.customSuperpower.trim()
        : formData.superpower,
      experience: formData.experience,
      bio: formData.bio.trim(),
      recent_wins: formData.recentWins.filter((w) => w.trim()),
      resume_url: resumeUrl,
      photo_url: photoUrl,
      website: formData.website.trim() || null,
      github: formData.github.trim() || null,
      extra_notes: formData.extraNotes.trim() || null,
      turnstile_token: turnstileToken,
      status: 'pending',
    })

    if (error) {
      console.error('Submission error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error('Unexpected error:', err)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}

export async function requestIntro(
  data: IntroRequestData
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    console.log('Supabase not configured — simulating intro request:', data)
    await new Promise((r) => setTimeout(r, 1000))
    return { success: true }
  }

  try {
    const { error } = await supabase!.from('intro_requests').insert({
      partner_name: data.partnerName.trim(),
      company_name: data.companyName.trim(),
      email: data.email.trim(),
      message: data.message.trim() || null,
      candidate_name: data.candidateName,
      turnstile_token: data.turnstileToken,
    })

    if (error) {
      return { success: false, error: error.message }
    }
    return { success: true }
  } catch (err) {
    console.error('Unexpected error:', err)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}
