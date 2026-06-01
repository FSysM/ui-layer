'use client'

import { useRef, useState, type ChangeEvent } from 'react'
import { Upload, Trash2, Download, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getFileDownloadUrl } from '@/features/submissions/services/submission-files.service'

function formatSize(bytes: number | null) {
  if (!bytes) return null
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

interface FileRowProps {
  fileId: string
  filename: string
  size: number | null
  onReplace: (file: File) => void
  onDelete: () => void
  isUploading?: boolean
  isDeleting?: boolean
  readOnly?: boolean
}

export function FileRow({ fileId, filename, size, onReplace, onDelete, isUploading = false, isDeleting = false, readOnly = false }: FileRowProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) { onReplace(file); e.target.value = '' }
  }

  async function handleDownload() {
    setIsDownloading(true)
    try {
      const url = await getFileDownloadUrl(fileId)
      window.open(url, '_blank')
    } finally {
      setIsDownloading(false)
    }
  }

  const busy = isUploading || isDeleting || isDownloading

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="flex-1 truncate font-medium">{filename}</span>
      {size && <span className="text-xs text-muted-foreground shrink-0">{formatSize(size)}</span>}

      <Button type="button" variant="ghost" size="icon-sm" disabled={busy} onClick={handleDownload} title="Download file">
        {isDownloading ? <Loader2 className="animate-spin" /> : <Download />}
      </Button>

      {!readOnly && (
        <Button type="button" variant="ghost" size="icon-sm" disabled={busy} onClick={() => inputRef.current?.click()} title="Replace file">
          {isUploading ? <Loader2 className="animate-spin" /> : <Upload />}
        </Button>
      )}

      {!readOnly && (
        <Button type="button" variant="ghost" size="icon-sm" disabled={busy} onClick={onDelete} title="Delete file">
          {isDeleting ? <Loader2 className="animate-spin" /> : <Trash2 />}
        </Button>
      )}

      <input ref={inputRef} type="file" className="hidden" onChange={handleChange} />
    </div>
  )
}
