import { api } from '@/lib/api'

export type SubmissionFile = {
  id: string
  key: string
  filename: string
  contentType: string
  size: number | null
  folder: 'REVIEWS' | 'TEXT' | 'FILES'
  submissionId: string
  reviewId: string | null
  uploadedById: string
  createdAt: string
  updatedAt: string
}

export async function listSubmissionFiles(submissionId: string): Promise<SubmissionFile[]> {
  const { data } = await api.get(`/submissions/${submissionId}/files`)
  return data
}

export async function getSubmissionUploadUrl(
  submissionId: string,
  folder: string,
  filename: string,
  contentType: string,
): Promise<{ uploadUrl: string; key: string }> {
  const { data } = await api.post(`/submissions/${submissionId}/files/upload-url`, { folder, filename, contentType })
  return data
}

export async function confirmSubmissionUpload(
  submissionId: string,
  payload: { key: string; filename: string; contentType: string; folder: string; size?: number },
): Promise<SubmissionFile> {
  const { data } = await api.post(`/submissions/${submissionId}/files/confirm`, payload)
  return data
}

export async function deleteSubmissionFile(submissionId: string, fileId: string): Promise<void> {
  await api.delete(`/submissions/${submissionId}/files/${fileId}`)
}

export async function getFileDownloadUrl(fileId: string): Promise<string> {
  const { data } = await api.get(`/files/${fileId}/download-url`)
  return data.url
}

export async function uploadSubmissionFile(submissionId: string, file: File): Promise<SubmissionFile> {
  const { uploadUrl, key } = await getSubmissionUploadUrl(submissionId, 'TEXT', file.name, file.type)
  await fetch(uploadUrl, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } })
  return confirmSubmissionUpload(submissionId, {
    key,
    filename: file.name,
    contentType: file.type,
    folder: 'TEXT',
    size: file.size,
  })
}
