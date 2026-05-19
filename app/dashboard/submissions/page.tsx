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
import { useSubmissionFiles, useUploadSubmissionFile, useDeleteSubmissionFile } from '@/features/submissions/hooks/useSubmissionFiles'
import { useReviewFiles, useUploadReviewFile, useDeleteReviewFile } from '@/features/reviews/hooks/useReviewFiles'
import { createSubmissionFormConfig, editSubmissionFormConfig } from '@/features/submissions/form.config'
import { createReviewFormConfig, editReviewFormConfig } from '@/features/reviews/form.config'
import { assignmentToForm, submissionToForm } from '@/features/submissions/mappers/submission-form.mapper'
import { ApproveSubmissionDialog } from '@/features/submissions/components/ApproveSubmissionDialog'
import { FileUploadSection } from '@/components/file-upload/FileUploadSection'
import { FormModal } from '@/features/form/FormModal'
import PageHeader from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
import { useMe } from '@/features/auth/hooks/useMe'
import type { Assignments } from '@/features/assignments/types/assignments.types'

function EditSubmissionFileUpload({ submissionId }: { submissionId: string }) {
  const { data: files } = useSubmissionFiles(submissionId)
  const { mutate: upload, isPending: isUploading } = useUploadSubmissionFile(submissionId)
  const { mutate: remove, isPending: isDeleting } = useDeleteSubmissionFile(submissionId)
  const mainFile = files?.find((f) => f.folder === 'TEXT')

  return (
    <FileUploadSection
      label="Main File"
      currentFile={mainFile}
      onUpload={upload}
      onDelete={() => mainFile && remove(mainFile.id)}
      isUploading={isUploading}
      isDeleting={isDeleting}
    />
  )
}

function EditReviewFileUpload({ reviewId }: { reviewId: string }) {
  const { data: files } = useReviewFiles(reviewId)
  const { mutate: upload, isPending: isUploading } = useUploadReviewFile(reviewId)
  const { mutate: remove, isPending: isDeleting } = useDeleteReviewFile(reviewId)
  const reviewFile = files?.[0]

  return (
    <FileUploadSection
      label="Review Document"
      currentFile={reviewFile}
      onUpload={upload}
      onDelete={() => reviewFile && remove(reviewFile.id)}
      isUploading={isUploading}
      isDeleting={isDeleting}
    />
  )
}

export default function SubmissionsPage() {
  const { open: subOpen, editing: subEditing, openCreate: subOpenCreate, reset: subReset } = useSubmissionsStore()
  const { open: revOpen, editing: revEditing, submissionId, topic, reset: revReset } = useReviewsStore()

  const { data: user } = useMe()
  const { data: submissions, isLoading, error } = useSubmissions()
  const { data: allAssignments } = useAssignments()

  const { handleSubmit: handleSubmissionSubmit, setPendingFile: setSubPendingFile } = useSubmissionsCrud()
  const { handleSubmit: handleReviewSubmit, setPendingFile: setRevPendingFile } = useReviewsCrud()
  const actions = useSubmissionsTableActions()
  const columns = useMemo(() => buildSubmissionsColumns(actions), [actions])

  const [selectedAssignment, setSelectedAssignment] = useState<Assignments | null>(null)
  const [pendingSubFile, setPendingSubFile] = useState<File | null>(null)
  const [pendingRevFile, setPendingRevFile] = useState<File | null>(null)

  function handleSubFileSelect(file: File | null) {
    setPendingSubFile(file)
    setSubPendingFile(file)
  }

  function handleRevFileSelect(file: File | null) {
    setPendingRevFile(file)
    setRevPendingFile(file)
  }

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

  function handleSubFormClose() {
    subReset()
    setSelectedAssignment(null)
    handleSubFileSelect(null)
  }

  function handleRevFormClose() {
    revReset()
    handleRevFileSelect(null)
  }

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
          onOpenChange={(v) => { if (!v) handleSubFormClose() }}
          config={subEditing ? editSubmissionFormConfig : createSubConfig}
          values={subEditing ? editSubValues : createSubValues}
          onSubmit={handleSubmissionSubmit}
          submitLabel={subEditing ? 'Save changes' : 'Create Submission'}
        >
          {subEditing
            ? <EditSubmissionFileUpload submissionId={subEditing.id} />
            : <FileUploadSection
                label="Main File"
                currentFile={pendingSubFile ? { id: 'queued', filename: pendingSubFile.name } : undefined}
                onUpload={handleSubFileSelect}
                onDelete={() => handleSubFileSelect(null)}
              />
          }
        </FormModal>
      )}

      {user?.role === 'TEACHER' && (
        <>
          <FormModal
            open={revOpen}
            onOpenChange={(v) => { if (!v) handleRevFormClose() }}
            config={revEditing ? editReviewFormConfig : createRevConfig}
            values={revEditing ? editRevValues : undefined}
            onSubmit={handleReviewSubmit}
            submitLabel={revEditing ? 'Save changes' : 'Create Review'}
          >
            {revEditing
              ? <EditReviewFileUpload reviewId={revEditing.id} />
              : <FileUploadSection
                  label="Review Document"
                  currentFile={pendingRevFile ? { id: 'queued', filename: pendingRevFile.name } : undefined}
                  onUpload={handleRevFileSelect}
                  onDelete={() => handleRevFileSelect(null)}
                />
            }
          </FormModal>
          <ApproveSubmissionDialog />
        </>
      )}
    </div>
  )
}
