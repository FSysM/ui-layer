'use client'

import { useMemo, useState } from "react"
import {
  buildSubmissionsColumns,
  renderExpanded
} from "@/components/table/config/submissions.columns"
import { DataTable } from "@/components/table/data-table"
import { useSubmissions } from '@/features/submissions/hooks/useSubmissions'
import PageHeader from "@/components/layout/PageHeader"
import { SubmissionsForm } from "@/components/form/submissions/submissions.form"
import { SubmissionsFormData } from '@/features/submissions/schemas/submissions.schema'
import { useMe } from "@/features/auth/hooks/useMe"
import { Submissions } from "@/features/submissions/types/submissions.types"
import { createSubmissionsActions } from "@/features/submissions/hooks/useSubmissionsActions"



export default function SubmissionsPage() { 
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Submissions | null>(null)
  const submissionsQuery = useSubmissions()
  const { data: user } = useMe()
  const { create, update, remove } = useSubmissions()
  const actions = useMemo(() => {
      if (!user?.role) return []
  
      return createSubmissionsActions(
        user.role,
        setEditing,
        setOpen,
        remove.mutate,
      )
  }, [user?.role, remove.mutate])
  
  const columns = useMemo(
    () => buildSubmissionsColumns(actions),
    [actions]
  )

  function handleSubmit(data: SubmissionsFormData) {
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
    <div >
      <PageHeader
        title="Submissions"
        actions={
          user?.role === 'STUDENT' && (
          <SubmissionsForm
            open={open}
              onOpenChange={(v) => {
                setOpen(v)
                if (!v) setEditing(null)
              }}
              onSubmit={handleSubmit}
              mode={editing ? 'edit' : 'create'}
              defaultValues={editing ?? undefined}
            />
        )}
      />
      <DataTable
          columns={columns}
          data={submissionsQuery.data ?? []}
          renderExpanded={renderExpanded}
        />
    </div>
  );
};
