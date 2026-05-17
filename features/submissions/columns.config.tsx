"use client"

import { buildColumns } from "@/components/table/build-columns"
import type { ActionConfig } from "@/components/table/types"
import { Submissions } from "./types/submissions.types"
import { SubmissionExpandRow } from "./components/SubmissionExpandRow"

export const renderExpandedSubmission = (row: Submissions) => (
  <SubmissionExpandRow row={row} />
)

export function buildSubmissionsColumns(actions: ActionConfig<Submissions>[]) {
  return buildColumns<Submissions>(
    [
      { accessorKey: "assignment.topic", header: "Topic" },
      { accessorKey: "assignment.type", header: "Type" },
      { accessorKey: "assignment.student.name", header: "Student" },
      { accessorKey: "assignment.supervisor.name", header: "Supervisor" },
      { accessorKey: "status", header: "Status" },
    ],
    actions
  )
}
