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
import PageHeader from "@/components/layout/PageHeader"
import { useMe } from "@/features/auth/hooks/useMe"
import { Assignments } from "@/features/assignments/types/assignments.types"
import { AssignmentFormData } from "@/features/assignments/schemas/assignments.schema"

export default function AssignmentsPage() {
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Assignments | null>(null)

  const { data: user } = useMe()

  const assignmentsQuery = useAssignments()

  const { create, update, remove, pick, unpick } = useAssignments()

  const actions = useMemo(() => {
    if (!user?.role) return []

    return createAssignmentActions(
      user.role,
      setEditing,
      setOpen,
      remove.mutate,
      pick.mutate,
      unpick.mutate
    )
  }, [user?.role, remove.mutate, pick.mutate, unpick.mutate])

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