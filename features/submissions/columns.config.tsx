"use client"

import * as React from "react"
import { buildColumns } from "@/components/table/build-columns"
import { Field } from "@/components/table/components/expand"
import { FileRow } from "@/components/file-upload/FileRow"
import { useSubmissionFiles, useUploadSubmissionFile, useDeleteSubmissionFile } from "./hooks/useSubmissionFiles"
import { useReviewFiles, useUploadReviewFile, useDeleteReviewFile } from "@/features/reviews/hooks/useReviewFiles"
import type { ActionConfig } from "@/components/table/types"
import type { Submissions } from "./types/submissions.types"
import type { SubmissionReview } from "@/features/reviews/types/reviews.types"

function MainFilesSection({ submissionId }: { submissionId: string }) {
  const { data: files } = useSubmissionFiles(submissionId)
  const { mutate: upload, isPending: isUploading } = useUploadSubmissionFile(submissionId)
  const { mutate: remove, isPending: isDeleting } = useDeleteSubmissionFile(submissionId)

  const mainFiles = files?.filter((f) => f.folder === 'TEXT') ?? []

  return (
    <div className="border-t pt-3 space-y-1.5">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Main Files</p>
      {mainFiles.length > 0 ? mainFiles.map((file) => (
        <FileRow
          key={file.id}
          fileId={file.id}
          filename={file.filename}
          size={file.size}
          onReplace={(newFile) => upload(newFile)}
          onDelete={() => remove(file.id)}
          isUploading={isUploading}
          isDeleting={isDeleting}
        />
      )) : (
        <p className="text-xs text-muted-foreground">No files uploaded</p>
      )}
    </div>
  )
}

function ReviewSection({ review }: { review: SubmissionReview }) {
  const { data: files } = useReviewFiles(review.id)
  const { mutate: upload, isPending: isUploading } = useUploadReviewFile(review.id)
  const { mutate: remove, isPending: isDeleting } = useDeleteReviewFile(review.id)

  return (
    <div className="space-y-1.5">
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-3">
        <Field label="Type" value={review.type} />
        <Field label="Grade" value={review.grade} />
        <Field label="Comment" value={review.comment} />
      </div>
      <div className="space-y-1">
        {files && files.length > 0 ? files.map((file) => (
          <FileRow
            key={file.id}
            filename={file.filename}
            size={file.size}
            onReplace={(newFile) => upload(newFile)}
            onDelete={() => remove(file.id)}
            isUploading={isUploading}
            isDeleting={isDeleting}
          />
        )) : (
          <p className="text-xs text-muted-foreground">No review document</p>
        )}
      </div>
    </div>
  )
}

function SubmissionExpandPanel({ row }: { row: Submissions }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-3">
        <Field label="Faculty" value={row.faculty} />
        <Field label="Department" value={row.department} />
        <Field label="Annotation" value={row.annotation} />
        <Field label="Literature" value={row.literature} />
        <Field label="Opponent" value={row.opponent?.name} />
      </div>

      {row.reviews.length > 0 && (
        <div className="border-t pt-3 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Reviews</p>
          {row.reviews.map((review) => (
            <ReviewSection key={review.id} review={review} />
          ))}
        </div>
      )}

      <MainFilesSection submissionId={row.id} />
    </div>
  )
}

export function renderExpandedSubmission(row: Submissions): React.ReactNode {
  return <SubmissionExpandPanel row={row} />
}

export function buildSubmissionsColumns(actions: ActionConfig<Submissions>[]) {
  return buildColumns<Submissions>(
    [
      { accessorKey: "topic", header: "Topic" },
      { accessorKey: "type", header: "Type" },
      { accessorKey: "assignment.student.name", header: "Student" },
      { accessorKey: "assignment.supervisor.name", header: "Supervisor" },
      { accessorKey: "status", header: "Status" },
    ],
    actions
  )
}
