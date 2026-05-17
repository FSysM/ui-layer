'use client'

import { useMemo, useCallback } from 'react'

import { buildAssignmentColumns, renderExpanded } from '@/components/table/config/assignments.columns'
import { DataTable } from '@/components/table/data-table'
import { createAssignmentActions } from '@/features/assignments/hooks/useAssignmentsActions'

import { useAssignments, useCreateAssignment, useUpdateAssignment, useDeleteAssignment, usePickAssignment, useUnpickAssignment } from '@/features/assignments/hooks/useAssignments'
import { useAssignmentsStore } from '@/features/assignments/store/assignments.store'
import { assignmentFormConfig } from '@/features/form/config/assignment.config'
import { FormFactory } from '@/features/form/FormFactory'
import PageHeader from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
import { useMe } from '@/features/auth/hooks/useMe'

export default function AssignmentsPage() {
  const { open, editing, openCreate, openEdit, reset } = useAssignmentsStore()
  const { data: user } = useMe()

  const assignmentsQuery = useAssignments()
  const create = useCreateAssignment()
  const update = useUpdateAssignment()
  const deleteAssignment = useDeleteAssignment()
  const pickAssignment = usePickAssignment()
  const unpickAssignment = useUnpickAssignment()

  const handleSubmit = useCallback((data: any) => {
    if (editing) {
      update.mutate({ id: editing.id, ...data }, { onSuccess: reset })
    } else {
      create.mutate(data, { onSuccess: reset })
    }
  }, [editing])

  const actions = useMemo(() => {
    if (!user?.role) return []
    return createAssignmentActions(
      user.role,
      openEdit,
      deleteAssignment.mutate,
      pickAssignment.mutate,
      unpickAssignment.mutate,
    )
  }, [user?.role, openEdit, deleteAssignment.mutate, pickAssignment.mutate, unpickAssignment.mutate])

  const columns = useMemo(() => buildAssignmentColumns(actions), [actions])

  return (
    <div>
      <PageHeader
        title="Assignments"
        actions={user?.role === 'TEACHER' && (
          <Button onClick={openCreate}>Create Assignment</Button>
        )}
      />

      {assignmentsQuery.data && (
        <DataTable
          columns={columns}
          data={assignmentsQuery.data ?? []}
          renderExpanded={renderExpanded}
        />
      )}

      {user?.role === 'TEACHER' && (
        <FormFactory
          open={open}
          onOpenChange={(v) => !v && reset()}
          config={assignmentFormConfig}
          values={editing ?? undefined}
          onSubmit={handleSubmit}
          submitLabel={editing ? 'Save changes' : 'Create Assignment'}
        />
      )}
    </div>
  )
}