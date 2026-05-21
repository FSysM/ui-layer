import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  listSubmissionFiles,
  getSubmissionUploadUrl,
  confirmSubmissionUpload,
  deleteSubmissionFile,
} from '../services/submission-files.service'

const queryKey = (submissionId: string) => ['submission-files', submissionId]

export function useSubmissionFiles(submissionId: string) {
  return useQuery({
    queryKey: queryKey(submissionId),
    queryFn: () => listSubmissionFiles(submissionId),
    enabled: !!submissionId,
  })
}

export function useUploadSubmissionFile(submissionId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (file: File) => {
      const { uploadUrl, key } = await getSubmissionUploadUrl(submissionId, 'TEXT', file.name, file.type)
      await fetch(uploadUrl, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } })
      return confirmSubmissionUpload(submissionId, {
        key,
        filename: file.name,
        contentType: file.type,
        folder: 'TEXT',
        size: file.size,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey(submissionId) })
      toast.success('File uploaded')
    },
    onError: () => toast.error('Failed to upload file'),
  })
}

export function useDeleteSubmissionFile(submissionId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (fileId: string) => deleteSubmissionFile(submissionId, fileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey(submissionId) })
      toast.success('File deleted')
    },
    onError: () => toast.error('Failed to delete file'),
  })
}
