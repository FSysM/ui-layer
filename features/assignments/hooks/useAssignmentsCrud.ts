import { useCallback } from 'react'
import { useAssignmentsStore } from '../store/assignments.store'
import { useCreateAssignment, useUpdateAssignment } from './useAssignments'

export function useAssignmentsCrud() {
  const { editing, reset } = useAssignmentsStore()
  const { mutate: create } = useCreateAssignment()
  const { mutate: update } = useUpdateAssignment()

  const handleSubmit = useCallback((data: any) => {
    if (editing) {
      update({ id: editing.id, ...data }, { onSuccess: reset })
    } else {
      create(data, { onSuccess: reset })
    }
  }, [editing, create, update, reset])

  return { handleSubmit }
}
