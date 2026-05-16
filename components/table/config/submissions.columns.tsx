"use client"

import { buildColumns } from "@/components/table/build-columns"
import { Submissions } from "@/features/submissions/types/submissions.types"
import { Actions } from "@/components/table/components/actions"
import { Expand } from "@/components/table/components/expand"

export type ActionConfig<T> = {
  label: string
  onClick: (row: T) => void
}

export type ExpandField = {
  label: string
  accessor: string
}

export const expandFields = [
  { label: "Annotation", accessor: "assignment.annotation" },
  { label: "Faculty", accessor: "assignment.faculty" },
  { label: "Department", accessor: "assignment.department" },
]

export const renderExpanded = (row: Submissions) => (
  <Expand row={row} config={expandFields} />
)

export function buildSubmissionsColumns(actions: ActionConfig<Submissions>[]) {
  return buildColumns<Submissions>(
    [ { accessorKey: "assignment.topic", header: "Topic" },
      { accessorKey: "assignment.type", header: "Type" },
      { accessorKey: "assignment.student.name", header: "Student" },
      { accessorKey: "assignment.supervisor.name", header: "Supervisor" },
      { accessorKey: "status", header: "Status" },
    ],
    {
      actions: {
        id: "actions",
        enableSorting: false,
        cell: ({ row }) => (
          <Actions row={row.original} actions={actions} />
        ),
      },
      expandFields,
    }
  )
}