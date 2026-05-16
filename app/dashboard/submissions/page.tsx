'use client'

import { useMemo, useState } from 'react'
import PageHeader from '@/components/layout/PageHeader'
import {
  buildSubmissionsColumns,
  renderExpanded,
} from '@/components/table/config/submissions.columns'
import { DataTable } from '@/components/table/data-table'
import { createSubmissionsActions } from '@/features/submissions/hooks/useSubmissionsActions'
import { useSubmissions } from '@/features/submissions/hooks/useSubmissions'
import { useAssignments } from '@/features/assignments/hooks/useAssignments'
import { SubmissionsForm } from '@/components/form/submissions/submissions.form'
import { useMe } from '@/features/auth/hooks/useMe'
import { assignmentToForm, submissionToForm } from '@/features/submissions/mappers/submission-form.mapper'
import type { Submissions } from '@/features/submissions/types/submissions.types'
import type { SubmissionFormModel } from '@/features/submissions/types/submissions.types'

export default function SubmissionsPage() {
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Submissions | null>(null)

  const { data: user } = useMe()
  const submissionsQuery = useSubmissions()
  const assignmentsQuery = useAssignments()
  const { create, update, remove } = useSubmissions()

  // Table actions
  const actions = useMemo(() => {
    if (!user?.role) return []
    return createSubmissionsActions(user.role, setEditing, setOpen, remove.mutate)
  }, [user?.role, remove.mutate])

  // Table columns
  const columns = useMemo(() => buildSubmissionsColumns(actions), [actions])

  // Get active assignment for create form
  const activeAssignment = assignmentsQuery.data?.find(
    (assignment) => assignment.taken
  )

  // Determine form values
  const formValues: SubmissionFormModel | undefined = editing
    ? submissionToForm(editing)
    : activeAssignment
      ? assignmentToForm(activeAssignment)
      : undefined

  // Handle form submission
  const handleSubmit = (data: SubmissionFormModel) => {
    if (editing) {
      update.mutate(
        {
          id: editing.id,
          assignmentId: data.assignmentId,
          literature: data.literature,
          fileUrl: data.fileUrl,
        },
        {
          onSuccess: () => {
            setEditing(null)
            setOpen(false)
          },
        }
      )
      return
    }

    create.mutate(
      {
        assignmentId: data.assignmentId,
        literature: data.literature,
        fileUrl: data.fileUrl,
      },
      {
        onSuccess: () => {
          setOpen(false)
        },
      }
    )
  }

  // Only show submit button for students
  const isStudent = user?.role === 'STUDENT'

  return (
    <div>
      <PageHeader
        title="Submissions"
        actions={
          isStudent && (
            <SubmissionsForm
              open={open}
              onOpenChange={setOpen}
              mode={editing ? 'edit' : 'create'}
              values={formValues}
              onSubmit={handleSubmit}
            />
          )
        }
      />

      <DataTable
        columns={columns}
        data={submissionsQuery.data ?? []}
        renderExpanded={renderExpanded}
      />
    </div>
  )
}