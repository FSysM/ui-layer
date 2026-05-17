"use client"

import { buildColumns } from "@/components/table/build-columns"
import type { ActionConfig } from "@/components/table/types"
import { Assignments } from "./types/assignments.types"
import { Expand } from "@/components/table/components/expand"
import { CheckCircle, XCircle } from "lucide-react"

const expandFields = [
  { label: "Annotation", accessor: "annotation" },
  { label: "Faculty", accessor: "faculty" },
  { label: "Department", accessor: "department" },
]

export const renderExpandedAssignment = (row: Assignments) => (
  <Expand row={row} config={expandFields} />
)

export function buildAssignmentColumns(actions: ActionConfig<Assignments>[]) {
  return buildColumns<Assignments>(
    [
      { accessorKey: "topic", header: "Topic" },
      { accessorKey: "type", header: "Type" },
      { accessorKey: "student.name", header: "Student" },
      { accessorKey: "supervisor.name", header: "Supervisor" },
      {
        accessorKey: "taken",
        header: "Free",
        cell: ({ row }: any) =>
          row.original.taken ? (
            <XCircle className="h-4 w-4 text-destructive" />
          ) : (
            <CheckCircle className="h-4 w-4 text-emerald-600" />
          ),
      },
    ],
    actions
  )
}
