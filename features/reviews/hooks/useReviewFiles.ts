import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  listReviewFiles,
  getReviewUploadUrl,
  confirmReviewUpload,
  deleteReviewFile,
} from '../services/review-files.service'

const queryKey = (reviewId: string) => ['review-files', reviewId]

export function useReviewFiles(reviewId: string) {
  return useQuery({
    queryKey: queryKey(reviewId),
    queryFn: () => listReviewFiles(reviewId),
    enabled: !!reviewId,
  })
}

export function useUploadReviewFile(reviewId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (file: File) => {
      const { uploadUrl, key } = await getReviewUploadUrl(reviewId, file.name, file.type)
      await fetch(uploadUrl, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } })
      return confirmReviewUpload(reviewId, {
        key,
        filename: file.name,
        contentType: file.type,
        size: file.size,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey(reviewId) })
      toast.success('File uploaded')
    },
    onError: () => toast.error('Failed to upload file'),
  })
}

export function useDeleteReviewFile(reviewId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (fileId: string) => deleteReviewFile(reviewId, fileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey(reviewId) })
      toast.success('File deleted')
    },
    onError: () => toast.error('Failed to delete file'),
  })
}
