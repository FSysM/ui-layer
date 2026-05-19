import { useCallback, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useReviewsStore } from '../store/reviews.store'
import { useCreateReview, useUpdateReview } from './useReviews'
import { useConfirmStore } from '@/components/confirm-dialog/confirm.store'
import { uploadReviewFile } from '../services/review-files.service'

export function useReviewsCrud() {
  const { editing, submissionId, reviewType, reset } = useReviewsStore()
  const { mutate: create } = useCreateReview()
  const { mutate: update } = useUpdateReview()
  const { ask } = useConfirmStore()
  const queryClient = useQueryClient()
  const pendingFileRef = useRef<File | null>(null)

  function setPendingFile(file: File | null) {
    pendingFileRef.current = file
  }

  const handleSubmit = useCallback((data: any) => {
    if (editing) {
      ask({
        title: 'Save Changes',
        description: 'Save changes to this review?',
        confirmLabel: 'Save',
        onConfirm: () => update(
          { id: editing.id, grade: data.grade, comment: data.comment },
          { onSuccess: reset }
        ),
      })
    } else {
      ask({
        title: 'Submit Review',
        description: 'Submit this review? You can edit it later.',
        confirmLabel: 'Submit',
        onConfirm: () => create(
          { submissionId, grade: data.grade, comment: data.comment, type: reviewType },
          {
            onSuccess: async (newReview: any) => {
              const file = pendingFileRef.current
              if (file && newReview?.id) {
                await uploadReviewFile(newReview.id, file)
                queryClient.invalidateQueries({ queryKey: ['review-files', newReview.id] })
              }
              pendingFileRef.current = null
              reset()
            },
          }
        ),
      })
    }
  }, [editing, submissionId, reviewType, create, update, reset, ask, queryClient])

  return { handleSubmit, setPendingFile }
}
