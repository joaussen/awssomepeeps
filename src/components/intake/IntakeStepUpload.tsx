import { FormField } from './FormField'
import { FileUpload } from './FileUpload'
import type { ValidationErrors } from '../../lib/validation'

interface StepUploadProps {
  data: {
    resumeFile: File | null
    photoFile: File | null
    website: string
    github: string
    extraNotes: string
  }
  errors: ValidationErrors
  onChange: (field: string, value: string) => void
  onFileChange: (field: string, file: File | null) => void
}

export function IntakeStepUpload({ data, errors, onChange, onFileChange }: StepUploadProps) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-6 italic">
        Almost there! Drop your resume and let's make it official
      </p>

      <FormField label="Resume" hint="Upload your resume to stand out">
        <FileUpload
          accept=".pdf,.doc,.docx"
          maxSizeMB={5}
          label="PDF or Word document"
          file={data.resumeFile}
          onChange={(f) => onFileChange('resumeFile', f)}
          error={errors.resumeFile}
        />
      </FormField>

      <FormField label="Profile Photo" hint="Optional, helps partners put a face to the name">
        <FileUpload
          accept=".jpg,.jpeg,.png,.webp"
          maxSizeMB={2}
          label="JPG, PNG or WebP image"
          file={data.photoFile}
          onChange={(f) => onFileChange('photoFile', f)}
          error={errors.photoFile}
        />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FormField label="Personal Website" error={errors.website} hint="Optional">
          <input
            type="url"
            value={data.website}
            onChange={(e) => onChange('website', e.target.value)}
            placeholder="https://yoursite.com"
            className="w-full px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-brand/40 focus:shadow-[0_0_0_3px_rgba(255,183,0,0.1)] transition-all"
          />
        </FormField>

        <FormField label="GitHub Profile" error={errors.github} hint="Optional">
          <input
            type="url"
            value={data.github}
            onChange={(e) => onChange('github', e.target.value)}
            placeholder="https://github.com/username"
            className="w-full px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-brand/40 focus:shadow-[0_0_0_3px_rgba(255,183,0,0.1)] transition-all"
          />
        </FormField>
      </div>

      <FormField label="Anything else?" hint="Optional, 300 chars max">
        <textarea
          value={data.extraNotes}
          onChange={(e) => onChange('extraNotes', e.target.value)}
          placeholder="Anything else ISV partners should know about you?"
          rows={3}
          maxLength={300}
          className="w-full px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-brand/40 focus:shadow-[0_0_0_3px_rgba(255,183,0,0.1)] transition-all resize-none"
        />
      </FormField>
    </div>
  )
}
