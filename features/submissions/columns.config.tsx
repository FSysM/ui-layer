"use client"

import { buildColumns } from "@/components/table/build-columns"
import type { ActionConfig } from "@/components/table/types"
import { buildExpandRenderer, type ExpandConfig } from "@/components/table/components/expand"
import { Submissions } from "./types/submissions.types"

const expandConfig: ExpandConfig = [
  {
    type: 'fields',
    fields: [
      { label: 'Faculty', accessor: 'faculty' },
      { label: 'Department', accessor: 'department' },
      { label: 'Annotation', accessor: 'annotation' },
      { label: 'Literature', accessor: 'literature' },
      { label: 'File URL', accessor: 'fileUrl' },
      { label: 'Opponent', accessor: 'opponent.name' },
    ],
  },
  {
    type: 'list',
    title: 'Reviews',
    emptyText: 'No reviews yet',
    accessor: 'reviews',
    fields: [
      { label: 'Type', accessor: 'type' },
      { label: 'Grade', accessor: 'grade' },
      { label: 'Comment', accessor: 'comment' },
    ],
  },
]

export const renderExpandedSubmission = buildExpandRenderer<Submissions>(expandConfig)

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
