import { useCallback } from 'react'
import { useSubmissionsStore } from '../store/submissions.store'
import { useCreateSubmission, useUpdateSubmission } from './useSubmissions'

export function useSubmissionsCrud() {
  const { editing, reset } = useSubmissionsStore()
  const { mutate: create } = useCreateSubmission()
  const { mutate: update } = useUpdateSubmission()

  const handleSubmit = useCallback((data: any) => {
    if (editing) {
      update(
        {
          id: editing.id,
          topic: data.topic,
          type: data.type,
          faculty: data.faculty,
          department: data.department,
          annotation: data.annotation,
          literature: data.literature,
          fileUrl: data.fileUrl,
        },
        { onSuccess: reset }
      )
    } else {
      create(
        {
          assignmentId: data.assignmentId,
          topic: data.topic,
          type: data.type,
          faculty: data.faculty,
          department: data.department,
          annotation: data.annotation,
          literature: data.literature,
          fileUrl: data.fileUrl,
        },
        { onSuccess: reset }
      )
    }
  }, [editing, create, update, reset])

  return { handleSubmit }
}
