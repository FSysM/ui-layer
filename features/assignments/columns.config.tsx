"use client"

import { buildColumns } from "@/components/table/build-columns"
import type { ActionConfig } from "@/components/table/types"
import { buildExpandRenderer, type ExpandConfig } from "@/components/table/components/expand"
import { Assignments } from "./types/assignments.types"
import { CheckCircle, XCircle } from "lucide-react"

const expandConfig: ExpandConfig = [
  {
    type: 'fields',
    fields: [
      { label: 'Annotation', accessor: 'annotation' },
      { label: 'Faculty', accessor: 'faculty' },
      { label: 'Department', accessor: 'department' },
    ],
  },
]

export const renderExpandedAssignment = buildExpandRenderer<Assignments>(expandConfig)

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
