import { api } from '@/lib/api'
import type { SubmissionFile } from '@/features/submissions/services/submission-files.service'

export async function listReviewFiles(reviewId: string): Promise<SubmissionFile[]> {
  const { data } = await api.get(`/reviews/${reviewId}/files`)
  return data
}

export async function getReviewUploadUrl(
  reviewId: string,
  filename: string,
  contentType: string,
): Promise<{ uploadUrl: string; key: string }> {
  const { data } = await api.post(`/reviews/${reviewId}/files/upload-url`, { filename, contentType })
  return data
}

export async function confirmReviewUpload(
  reviewId: string,
  payload: { key: string; filename: string; contentType: string; size?: number },
): Promise<SubmissionFile> {
  const { data } = await api.post(`/reviews/${reviewId}/files/confirm`, payload)
  return data
}

export async function deleteReviewFile(reviewId: string, fileId: string): Promise<void> {
  await api.delete(`/reviews/${reviewId}/files/${fileId}`)
}

export async function uploadReviewFile(reviewId: string, file: File): Promise<SubmissionFile> {
  const { uploadUrl, key } = await getReviewUploadUrl(reviewId, file.name, file.type)
  await fetch(uploadUrl, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } })
  return confirmReviewUpload(reviewId, {
    key,
    filename: file.name,
    contentType: file.type,
    size: file.size,
  })
}
