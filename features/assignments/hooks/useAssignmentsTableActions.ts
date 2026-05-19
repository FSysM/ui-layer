import { useMemo } from 'react'
import { useMe } from '@/features/auth/hooks/useMe'
import { useAssignmentsStore } from '../store/assignments.store'
import { useDeleteAssignment, usePickAssignment, useUnpickAssignment } from './useAssignments'
import { useConfirmStore } from '@/components/confirm-dialog/confirm.store'
import type { ActionConfig } from '@/components/table/types'
import type { Assignments } from '../types/assignments.types'

export function useAssignmentsTableActions(): ActionConfig<Assignments>[] {
  const { data: user } = useMe()
  const { openEdit } = useAssignmentsStore()
  const { ask } = useConfirmStore()
  const { mutate: remove } = useDeleteAssignment()
  const { mutate: pick } = usePickAssignment()
  const { mutate: unpick } = useUnpickAssignment()

  return useMemo(() => {
    if (user?.role === 'TEACHER') return [
      { label: 'Edit', onClick: (row) => openEdit(row) },
      {
        label: 'Delete',
        onClick: (row) => ask({
          title: 'Delete Assignment',
          description: `Are you sure you want to delete "${row.topic}"?`,
          confirmLabel: 'Delete',
          variant: 'destructive',
          onConfirm: () => remove(row.id),
        }),
      },
    ]

    if (user?.role === 'STUDENT') return [
      {
        label: 'Pick',
        visible: (row) => !row.taken,
        onClick: (row) => ask({
          title: 'Pick Assignment',
          description: `Pick "${row.topic}" as your assignment?`,
          confirmLabel: 'Pick',
          onConfirm: () => pick(row.id),
        }),
      },
      {
        label: 'Unpick',
        visible: (row) => row.student?.id === user.id,
        onClick: (row) => ask({
          title: 'Unpick Assignment',
          description: `Are you sure you want to unpick "${row.topic}"?`,
          confirmLabel: 'Unpick',
          variant: 'destructive',
          onConfirm: () => unpick(row.id),
        }),
      },
    ]

    return []
  }, [user?.role, user?.id, openEdit, ask, remove, pick, unpick])
}
