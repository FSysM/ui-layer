'use client'

import { useMemo, useCallback, useState } from 'react'

import PageHeader from '@/components/layout/PageHeader'
import { buildSubmissionsColumns, renderExpanded } from '@/components/table/config/submissions.columns'
import { DataTable } from '@/components/table/data-table'
import { createSubmissionsActions } from '@/features/submissions/hooks/useSubmissionsActions'

import { useSubmissions, useCreateSubmission, useUpdateSubmission, useDeleteSubmission } from '@/features/submissions/hooks/useSubmissions'
import { useSubmissionsStore } from '@/features/submissions/store/submissions.store'
import { useAssignments } from '@/features/assignments/hooks/useAssignments'
import { createSubmissionFormConfig, editSubmissionFormConfig } from '@/features/form/config/submission.config'
import { FormFactory } from '@/features/form/FormFactory'
import { useMe } from '@/features/auth/hooks/useMe'
import { Button } from '@/components/ui/button'


export default function SubmissionsPage() {
  const { open, editing, openCreate, openEdit, reset } = useSubmissionsStore()

  const { data: user } = useMe()
  const submissionsQuery = useSubmissions()
  const assignmentsQuery = useAssignments()

  const create = useCreateSubmission()
  const update = useUpdateSubmission()
  const remove = useDeleteSubmission()

  const handleAssignmentSelect = useCallback((id: string, setValue: (name: string, value: any) => void) => {
    const assignment = assignmentsQuery.data?.find((a) => a.id === id)
    if (!assignment) return

    setValue('topic', assignment.topic)
    setValue('type', assignment.type)
    setValue('faculty', assignment.faculty)
    setValue('department', assignment.department)
    setValue('annotation', assignment.annotation)
  }, [assignmentsQuery.data])

  const handleSubmit = useCallback((data: any) => {
    if (editing) {
      update.mutate({ id: editing.id, literature: data.literature, fileUrl: data.fileUrl }, { onSuccess: reset })
    } else {
      create.mutate(
        { assignmentId: data.assignmentId, literature: data.literature, fileUrl: data.fileUrl },
        { onSuccess: reset },
      )
    }
  }, [editing, create, update, reset])
  
    const actions = useMemo(() => {
      if (!user?.role) return []
      return createSubmissionsActions(
        user.role,
        openEdit,
        remove.mutate,
      )
    }, [user?.role, openEdit, remove.mutate])
  
  const columns = useMemo(() => buildSubmissionsColumns(actions), [actions])
  
  const [selectedAssignment, setSelectedAssignment] = useState<Assignments | null>(null)

  const createConfig = useMemo(() => {
    return createSubmissionFormConfig(
      assignmentsQuery.data ?? [],
      (id) => {
        const a = assignmentsQuery.data?.find((a) => a.id === id) ?? null
        setSelectedAssignment(a)
      },
    )
  }, [assignmentsQuery.data])

  const createValues = useMemo(() => {
    if (!selectedAssignment) return undefined
    return {
      assignmentId: selectedAssignment.id,
      topic: selectedAssignment.topic,
      type: selectedAssignment.type,
      faculty: selectedAssignment.faculty,
      department: selectedAssignment.department,
      annotation: selectedAssignment.annotation,
    }
  }, [selectedAssignment])

  const editValues = useMemo(() => {
    if (!editing) return undefined
    return { literature: editing.literature, fileUrl: editing.fileUrl }
  }, [editing])
  

  return (
    <div>
      <PageHeader
        title="Submissions"
        actions={user?.role === 'STUDENT' && (
          <Button onClick={openCreate}>Create Submission</Button>
        )}
      />

      <DataTable
        columns={columns}
        data={submissionsQuery.data ?? []}
        renderExpanded={renderExpanded}
      />

      {user?.role === 'STUDENT' && (
        <FormFactory
          open={open}
          onOpenChange={(v) => { if (!v) { reset(); setSelectedAssignment(null) } }}
          config={editing ? editSubmissionFormConfig : createConfig}
          values={editing ? editValues : createValues}
          onSubmit={handleSubmit}
          submitLabel={editing ? 'Save changes' : 'Create Submission'}
        />
      )}
    </div>
  )
}