import { useMemo } from 'react'
import { useMe } from '@/features/auth/hooks/useMe'
import { useAssignmentsStore } from '../store/assignments.store'
import { useDeleteAssignment, usePickAssignment, useUnpickAssignment } from './useAssignments'
import type { ActionConfig } from '@/components/table/types'
import type { Assignments } from '../types/assignments.types'

export function useAssignmentsTableActions(): ActionConfig<Assignments>[] {
  const { data: user } = useMe()
  const { openEdit } = useAssignmentsStore()
  const { mutate: remove } = useDeleteAssignment()
  const { mutate: pick } = usePickAssignment()
  const { mutate: unpick } = useUnpickAssignment()

  return useMemo(() => {
    if (user?.role === 'TEACHER') return [
      { label: 'Edit', onClick: (row) => openEdit(row) },
      { label: 'Delete', onClick: (row) => remove(row.id) },
    ]
    if (user?.role === 'STUDENT') return [
      { label: 'Pick', onClick: (row) => pick(row.id) },
      { label: 'Unpick', onClick: (row) => unpick(row.id) },
    ]
    return []
  }, [user?.role, openEdit, remove, pick, unpick])
}
