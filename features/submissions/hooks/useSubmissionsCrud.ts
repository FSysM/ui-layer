import { useCallback } from 'react'
import { useSubmissionsStore } from '../store/submissions.store'
import { useCreateSubmission, useUpdateSubmission } from './useSubmissions'
import { useConfirmStore } from '@/components/confirm-dialog/confirm.store'

export function useSubmissionsCrud() {
  const { editing, reset } = useSubmissionsStore()
  const { mutate: create } = useCreateSubmission()
  const { mutate: update } = useUpdateSubmission()
  const { ask } = useConfirmStore()

  const handleSubmit = useCallback((data: any) => {
    if (editing) {
      ask({
        title: 'Save Changes',
        description: `Save changes to "${editing.topic}"?`,
        confirmLabel: 'Save',
        onConfirm: () => update(
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
        ),
      })
    } else {
      ask({
        title: 'Create Submission',
        description: 'Submit this work for review?',
        confirmLabel: 'Create',
        onConfirm: () => create(
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
        ),
      })
    }
  }, [editing, create, update, reset, ask])

  return { handleSubmit }
}
