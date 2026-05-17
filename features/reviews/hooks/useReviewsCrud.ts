import { useCallback } from 'react'
import { useReviewsStore } from '../store/reviews.store'
import { useCreateReview, useUpdateReview } from './useReviews'

export function useReviewsCrud() {
  const { editing, submissionId, reviewType, reset } = useReviewsStore()
  const { mutate: create } = useCreateReview()
  const { mutate: update } = useUpdateReview()

  const handleSubmit = useCallback((data: any) => {
    if (editing) {
      update(
        { id: editing.id, grade: data.grade, comment: data.comment },
        { onSuccess: reset }
      )
    } else {
      create(
        { submissionId, grade: data.grade, comment: data.comment, type: reviewType },
        { onSuccess: reset }
      )
    }
  }, [editing, submissionId, reviewType, create, update, reset])

  return { handleSubmit }
}
