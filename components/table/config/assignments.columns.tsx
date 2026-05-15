"use client"

import { buildColumns } from "@/components/table/build-columns"
import { Assignments } from "@/features/assignments/types/assignments.types"
import { Actions } from "@/components/table/components/actions"
import { Expand } from "@/components/table/components/expand"
import { CheckCircle, XCircle } from "lucide-react"

export type ActionConfig<T> = {
  label: string
  onClick: (row: T) => void
}

export const assignmentActions: ActionConfig<Assignments>[] = [
  {
    label: "Edit",
    onClick: (row: Assignments) => console.log("Edit", row.id),
  },
  {
    label: "Delete",
    onClick: (row: Assignments) => console.log("Delete", row.id),
  },
]

export type ExpandField<T> = {
  label: string
  accessor: keyof T
}

export const expandFields = [
  { label: "Annotation", accessor: "annotation" },
  { label: "Faculty", accessor: "faculty" },
  { label: "Department", accessor: "department" },
] satisfies ExpandField<Assignments>[]

export const renderExpanded = (row: Assignments) => (
  <Expand row={row} config={expandFields} />
)

export const columns = buildColumns<Assignments>(
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
  {
    actions: {
      id: "actions",
      enableSorting: false,
      cell: ({ row }) => (
        <Actions row={row.original} actions={assignmentActions} />
      ),
    },
    expandFields,
  }
)
