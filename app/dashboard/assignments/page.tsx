'use client'

import { useMemo, useState } from 'react'
import { DataTable } from '@/components/table/data-table'
import { buildAssignmentColumns, renderExpandedAssignment } from '@/features/assignments/columns.config'
import { useAssignments } from '@/features/assignments/hooks/useAssignments'
import { useAssignmentsStore } from '@/features/assignments/store/assignments.store'
import { assignmentFormConfig } from '@/features/assignments/form.config'
import { useAssignmentsCrud } from '@/features/assignments/hooks/useAssignmentsCrud'
import { useAssignmentsTableActions } from '@/features/assignments/hooks/useAssignmentsTableActions'
import { FormModal } from '@/features/form/FormModal'
import PageHeader from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
import { useMe } from '@/features/auth/hooks/useMe'

export default function AssignmentsPage() {
  const { open, editing, openCreate, reset } = useAssignmentsStore()
  const { data: user } = useMe()
  const [filter, setFilter] = useState<'all' | 'my'>('all')

  const isFiltered = user?.role === 'STUDENT' || user?.role === 'TEACHER'
  const { data: assignments, isLoading, error } = useAssignments(isFiltered ? filter : undefined)

  const { handleSubmit } = useAssignmentsCrud()
  const actions = useAssignmentsTableActions()
  const columns = useMemo(() => buildAssignmentColumns(actions), [actions])

  return (
    <div>
      <PageHeader
        title="Assignments"
        actions={
          <div className="flex items-center gap-2">
            {isFiltered && (
              <div className="flex gap-1">
                <Button variant={filter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('all')}>All</Button>
                <Button variant={filter === 'my' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('my')}>My</Button>
              </div>
            )}
            {user?.role === 'TEACHER' && (
              <Button onClick={openCreate}>Create Assignment</Button>
            )}
          </div>
        }
      />

      <DataTable
        columns={columns}
        data={assignments ?? []}
        renderExpanded={renderExpandedAssignment}
        isLoading={isLoading}
        error={error}
      />

      {user?.role === 'TEACHER' && (
        <FormModal
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
