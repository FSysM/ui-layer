import { useMemo } from 'react'
import { useMe } from '@/features/auth/hooks/useMe'
import { useSubmissionsStore } from '../store/submissions.store'
import { useApproveStore } from '../store/approve.store'
import { useReviewsStore } from '@/features/reviews/store/reviews.store'
import { useDeleteSubmission, useRejectSubmission } from './useSubmissions'
import { useDeleteReview } from '@/features/reviews/hooks/useReviews'
import { useConfirmStore } from '@/components/confirm-dialog/confirm.store'
import type { ActionConfig } from '@/components/table/types'
import type { Submissions } from '../types/submissions.types'
import type { SubmissionReview } from '@/features/reviews/types/reviews.types'

type ReviewType = 'SUPERVISOR' | 'OPPONENT'

function getUserReviewType(row: Submissions, userId: string): ReviewType | null {
  if (userId === row.assignment.supervisor.id) return 'SUPERVISOR'
  if (row.opponent && userId === row.opponent.id) return 'OPPONENT'
  return null
}

export function useSubmissionsTableActions(): ActionConfig<Submissions>[] {
  const { data: user } = useMe()
  const { openEdit: openEditSubmission } = useSubmissionsStore()
  const { openApprove } = useApproveStore()
  const { openCreate: openCreateReview, openEdit: openEditReview } = useReviewsStore()
  const { mutate: removeSubmission } = useDeleteSubmission()
  const { mutate: reject } = useRejectSubmission()
  const { mutate: removeReview } = useDeleteReview()
  const { ask } = useConfirmStore()

  return useMemo(() => {
    if (!user) return []

    if (user.role === 'STUDENT') return [
      {
        label: 'Edit',
        visible: (row) => row.status !== 'COMPLETED',
        onClick: (row) => openEditSubmission(row),
      },
      {
        label: 'Delete',
        visible: (row) => row.status !== 'COMPLETED',
        onClick: (row) => ask({
          title: 'Delete Submission',
          description: `Are you sure you want to delete "${row.topic}"?`,
          confirmLabel: 'Delete',
          variant: 'destructive',
          onConfirm: () => removeSubmission(row.id),
        }),
      },
    ]

    if (user.role === 'TEACHER') return [
      {
        label: 'Approve',
        visible: (row) => row.status === 'SUBMITTED' && row.assignment.supervisor.id === user.id,
        onClick: (row) => openApprove(row),
      },
      {
        label: 'Reject',
        visible: (row) => row.status === 'SUBMITTED' && row.assignment.supervisor.id === user.id,
        onClick: (row) => ask({
          title: 'Reject Submission',
          description: `Reject "${row.topic}"? This cannot be undone.`,
          confirmLabel: 'Reject',
          variant: 'destructive',
          onConfirm: () => reject(row.id),
        }),
      },
      {
        label: 'Add Review',
        visible: (row) => {
          if (row.status !== 'APPROVED' && row.status !== 'REVIEWING') return false
          const type = getUserReviewType(row, user.id)
          if (!type) return false
          return !row.reviews.some((r) => r.type === type)
        },
        onClick: (row) => {
          const type = getUserReviewType(row, user.id)!
          openCreateReview(row.id, row.topic, type)
        },
      },
      {
        label: 'Edit Review',
        visible: (row) => {
          const type = getUserReviewType(row, user.id)
          return !!type && row.reviews.some((r) => r.type === type)
        },
        onClick: (row) => {
          const type = getUserReviewType(row, user.id)!
          const review = row.reviews.find((r) => r.type === type) as SubmissionReview
          openEditReview(review)
        },
      },
      {
        label: 'Delete Review',
        visible: (row) => {
          const type = getUserReviewType(row, user.id)
          return !!type && row.reviews.some((r) => r.type === type)
        },
        onClick: (row) => {
          const type = getUserReviewType(row, user.id)!
          const review = row.reviews.find((r) => r.type === type)!
          ask({
            title: 'Delete Review',
            description: `Delete your ${type.toLowerCase()} review for "${row.topic}"?`,
            confirmLabel: 'Delete',
            variant: 'destructive',
            onConfirm: () => removeReview(review.id),
          })
        },
      },
    ]

    return []
  }, [user, openEditSubmission, openApprove, openCreateReview, openEditReview, removeSubmission, reject, removeReview, ask])
}
