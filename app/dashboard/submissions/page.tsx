'use client'

import { useMemo, useState } from 'react'
import { DataTable } from '@/components/table/data-table'
import { buildSubmissionsColumns, renderExpandedSubmission } from '@/features/submissions/columns.config'
import { useSubmissions } from '@/features/submissions/hooks/useSubmissions'
import { useSubmissionsStore } from '@/features/submissions/store/submissions.store'
import { useReviewsStore } from '@/features/reviews/store/reviews.store'
import { useAssignments } from '@/features/assignments/hooks/useAssignments'
import { useSubmissionsCrud } from '@/features/submissions/hooks/useSubmissionsCrud'
import { useReviewsCrud } from '@/features/reviews/hooks/useReviewsCrud'
import { useSubmissionsTableActions } from '@/features/submissions/hooks/useSubmissionsTableActions'
import { createSubmissionFormConfig, editSubmissionFormConfig } from '@/features/submissions/form.config'
import { createReviewFormConfig, editReviewFormConfig } from '@/features/reviews/form.config'
import { assignmentToForm, submissionToForm } from '@/features/submissions/mappers/submission-form.mapper'
import { ApproveSubmissionDialog } from '@/features/submissions/components/ApproveSubmissionDialog'
import { FormModal } from '@/features/form/FormModal'
import PageHeader from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
import { useMe } from '@/features/auth/hooks/useMe'
import type { Assignments } from '@/features/assignments/types/assignments.types'

export default function SubmissionsPage() {
  const { open: subOpen, editing: subEditing, openCreate: subOpenCreate, reset: subReset } = useSubmissionsStore()
  const { open: revOpen, editing: revEditing, submissionId, topic, reset: revReset } = useReviewsStore()

  const { data: user } = useMe()
  const { data: submissions, isLoading, error } = useSubmissions()
  const { data: allAssignments } = useAssignments()

  const { handleSubmit: handleSubmissionSubmit } = useSubmissionsCrud()
  const { handleSubmit: handleReviewSubmit } = useReviewsCrud()
  const actions = useSubmissionsTableActions()
  const columns = useMemo(() => buildSubmissionsColumns(actions), [actions])

  const [selectedAssignment, setSelectedAssignment] = useState<Assignments | null>(null)

  // Students only see their own picked assignment in the create dropdown
  const studentAssignments = useMemo(() => {
    if (user?.role !== 'STUDENT') return allAssignments ?? []
    return (allAssignments ?? []).filter(
      (a) => a.taken && a.student?.id === user.id
    )
  }, [allAssignments, user])

  const createSubConfig = useMemo(() => createSubmissionFormConfig(
    studentAssignments,
    (id) => setSelectedAssignment(studentAssignments.find((a) => a.id === id) ?? null),
  ), [studentAssignments])

  const createSubValues = useMemo(() =>
    selectedAssignment ? assignmentToForm(selectedAssignment) : undefined,
    [selectedAssignment]
  )

  const editSubValues = useMemo(() =>
    subEditing ? submissionToForm(subEditing) : undefined,
    [subEditing]
  )

  const createRevConfig = useMemo(
    () => createReviewFormConfig(submissionId ?? '', topic ?? ''),
    [submissionId, topic],
  )

  const editRevValues = useMemo(() => {
    if (!revEditing) return undefined
    return { grade: revEditing.grade, comment: revEditing.comment ?? '' }
  }, [revEditing])

  return (
    <div>
      <PageHeader
        title="Submissions"
        actions={user?.role === 'STUDENT' && (
          <Button onClick={subOpenCreate}>Create Submission</Button>
        )}
      />

      <DataTable
        columns={columns}
        data={submissions ?? []}
        renderExpanded={renderExpandedSubmission}
        isLoading={isLoading}
        error={error}
      />

      {user?.role === 'STUDENT' && (
        <FormModal
          open={subOpen}
          onOpenChange={(v) => { if (!v) { subReset(); setSelectedAssignment(null) } }}
          config={subEditing ? editSubmissionFormConfig : createSubConfig}
          values={subEditing ? editSubValues : createSubValues}
          onSubmit={handleSubmissionSubmit}
          submitLabel={subEditing ? 'Save changes' : 'Create Submission'}
        />
      )}

      {user?.role === 'TEACHER' && (
        <>
          <FormModal
            open={revOpen}
            onOpenChange={(v) => !v && revReset()}
            config={revEditing ? editReviewFormConfig : createRevConfig}
            values={revEditing ? editRevValues : undefined}
            onSubmit={handleReviewSubmit}
            submitLabel={revEditing ? 'Save changes' : 'Create Review'}
          />
          <ApproveSubmissionDialog />
        </>
      )}
    </div>
  )
}
