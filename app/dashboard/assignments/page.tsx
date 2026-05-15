'use client'

import { useMemo, useState } from "react"
import {
  buildAssignmentColumns,
  renderExpanded
} from "@/components/table/config/assignments.columns"

import { DataTable } from "@/components/table/data-table"
import { useAssignments } from "@/features/assignments/hooks/useAssignments"
import { createAssignmentActions } from "@/features/assignments/hooks/useAssignmentsActions"
import { AssignmentsForm } from "@/components/form/assignments/assignemts.form"
import { AssignmentFormData } from "@/features/assignments/schemas/assignments.schema"
import PageHeader from "@/components/layout/PageHeader"
import { useMe } from "@/features/auth/hooks/useMe"
import { Assignments } from "@/features/assignments/types/assignments.types"

export default function AssignmentsPage() {
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Assignments | null>(null)

  const assignmentsQuery = useAssignments()
  const { create, update, remove } = useAssignments()

  const { data: user } = useMe()

  const actions = useMemo(
    () =>
      createAssignmentActions(
        setEditing,
        setOpen,
        remove.mutate
      ),
    [remove.mutate]
  )

  const columns = useMemo(
    () => buildAssignmentColumns(actions),
    [actions]
  )

  function handleSubmit(data: AssignmentFormData) {
    if (editing) {
      update.mutate(
        { ...data, id: editing.id },
        {
          onSuccess: () => {
            setEditing(null)
            setOpen(false)
          },
        }
      )
    } else {
      create.mutate(data, {
        onSuccess: () => setOpen(false),
      })
    }
  }

  return (
    <div>
      <PageHeader
        title="Assignments"
        actions={
          user?.role === 'TEACHER' && (
            <AssignmentsForm
              open={open}
              onOpenChange={(v) => {
                setOpen(v)
                if (!v) setEditing(null)
              }}
              onSubmit={handleSubmit}
              mode={editing ? 'edit' : 'create'}
              defaultValues={editing ?? undefined}
            />
          )
        }
      />

      <DataTable
        columns={columns}
        data={assignmentsQuery.data ?? []}
        renderExpanded={renderExpanded}
      />
    </div>
  )
}