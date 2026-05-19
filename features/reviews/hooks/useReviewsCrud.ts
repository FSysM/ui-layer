import { useCallback } from 'react'
import { useReviewsStore } from '../store/reviews.store'
import { useCreateReview, useUpdateReview } from './useReviews'
import { useConfirmStore } from '@/components/confirm-dialog/confirm.store'

export function useReviewsCrud() {
  const { editing, submissionId, reviewType, reset } = useReviewsStore()
  const { mutate: create } = useCreateReview()
  const { mutate: update } = useUpdateReview()
  const { ask } = useConfirmStore()

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
          { onSuccess: reset }
        ),
      })
    }
  }, [editing, submissionId, reviewType, create, update, reset, ask])

  return { handleSubmit }
}
