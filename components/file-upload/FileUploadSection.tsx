'use client'

import { useRef, type ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface CurrentFile {
  id: string
  filename: string
}

interface FileUploadSectionProps {
  label?: string
  currentFile?: CurrentFile
  onUpload: (file: File) => void
  onDelete: () => void
  isUploading?: boolean
  isDeleting?: boolean
}

export function FileUploadSection({
  label = 'Main File',
  currentFile,
  onUpload,
  onDelete,
  isUploading = false,
  isDeleting = false,
}: FileUploadSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      onUpload(file)
      e.target.value = ''
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {currentFile ? (
        <div className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
          <span className="flex-1 truncate text-foreground">{currentFile.filename}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={isDeleting || isUploading}
            onClick={onDelete}
          >
            {isDeleting ? 'Removing...' : 'Remove'}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isUploading || isDeleting}
            onClick={() => inputRef.current?.click()}
          >
            {isUploading ? 'Uploading...' : 'Replace'}
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          disabled={isUploading}
          onClick={() => inputRef.current?.click()}
        >
          {isUploading ? 'Uploading...' : 'Upload File'}
        </Button>
      )}

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  )
}
