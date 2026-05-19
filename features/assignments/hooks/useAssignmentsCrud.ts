import { useCallback } from 'react'
import { useAssignmentsStore } from '../store/assignments.store'
import { useCreateAssignment, useUpdateAssignment } from './useAssignments'
import { useConfirmStore } from '@/components/confirm-dialog/confirm.store'

export function useAssignmentsCrud() {
  const { editing, reset } = useAssignmentsStore()
  const { mutate: create } = useCreateAssignment()
  const { mutate: update } = useUpdateAssignment()
  const { ask } = useConfirmStore()

  const handleSubmit = useCallback((data: any) => {
    if (editing) {
      ask({
        title: 'Save Changes',
        description: `Save changes to "${editing.topic}"?`,
        confirmLabel: 'Save',
        onConfirm: () => update({ id: editing.id, ...data }, { onSuccess: reset }),
      })
    } else {
      ask({
        title: 'Create Assignment',
        description: 'Create a new assignment?',
        confirmLabel: 'Create',
        onConfirm: () => create(data, { onSuccess: reset }),
      })
    }
  }, [editing, create, update, reset, ask])

  return { handleSubmit }
}
