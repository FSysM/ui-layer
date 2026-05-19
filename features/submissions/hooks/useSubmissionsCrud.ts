import { useCallback, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useSubmissionsStore } from '../store/submissions.store'
import { useCreateSubmission, useUpdateSubmission } from './useSubmissions'
import { useConfirmStore } from '@/components/confirm-dialog/confirm.store'
import { uploadSubmissionFile } from '../services/submission-files.service'

export function useSubmissionsCrud() {
  const { editing, reset } = useSubmissionsStore()
  const { mutate: create } = useCreateSubmission()
  const { mutate: update } = useUpdateSubmission()
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
          },
          {
            onSuccess: async (newSub: any) => {
              const file = pendingFileRef.current
              if (file && newSub?.id) {
                await uploadSubmissionFile(newSub.id, file)
                queryClient.invalidateQueries({ queryKey: ['submission-files', newSub.id] })
              }
              pendingFileRef.current = null
              reset()
            },
          }
        ),
      })
    }
  }, [editing, create, update, reset, ask, queryClient])

  return { handleSubmit, setPendingFile }
}
