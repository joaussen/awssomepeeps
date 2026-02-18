import { useRef, useState } from 'react'
import { Upload, File, X } from 'lucide-react'
import { motion } from 'framer-motion'

interface FileUploadProps {
  accept: string
  maxSizeMB: number
  label: string
  file: File | null
  onChange: (file: File | null) => void
  error?: string
}

export function FileUpload({ accept, maxSizeMB, label, file, onChange, error }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) onChange(dropped)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  if (file) {
    return (
      <div className="flex items-center gap-3 p-3 bg-brand-bg/50 border border-brand/20 rounded-lg">
        <File size={20} className="text-brand shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
          <p className="text-xs text-gray-400">{formatSize(file.size)}</p>
        </div>
        <button
          onClick={() => onChange(null)}
          className="p-1 hover:bg-white rounded transition-colors cursor-pointer"
        >
          <X size={16} className="text-gray-400" />
        </button>
      </div>
    )
  }

  return (
    <div>
      <motion.div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        animate={isDragging ? { scale: 1.02, borderColor: '#FFB700' } : {}}
        className={`flex flex-col items-center gap-2 p-6 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
          isDragging
            ? 'border-brand bg-brand-bg/30'
            : 'border-gray-200 hover:border-brand/30 hover:bg-gray-50'
        }`}
      >
        <Upload size={24} className={isDragging ? 'text-brand' : 'text-gray-400'} />
        <p className="text-sm text-gray-600 text-center">
          <span className="font-medium text-brand">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-400">{label} (max {maxSizeMB}MB)</p>
      </motion.div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) onChange(f)
        }}
        className="hidden"
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xs text-red-500 mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}
