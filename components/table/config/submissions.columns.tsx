"use client"

import { buildColumns } from "@/components/table/build-columns"
import { Assignments } from "@/features/assignments/types/assignments.types"
import { Submissions } from "@/features/submissions/types/submissions.types"
import { Actions } from "@/components/table/components/actions"

const submissionActions = [
  { label: "Edit", onClick: (row: Submissions) => console.log("Edit submission", row) },
  { label: "Delete", onClick: (row: Submissions) => console.log("Delete submission", row) },
]

export const columns = buildColumns<Submissions>(
  [
    { accessorKey: "assignment.topic", header: "Topic" },
    { accessorKey: "assignment.type", header: "Type" },
    { accessorKey: "assignment.student.name", header: "Student" },
    { accessorKey: "assignment.supervisor.name", header: "Supervisor" },
    { accessorKey: "status", header: "Status" },
  ],
  {
    actions: {
      id: "actions",
      enableSorting: false,
      cell: ({ row }) => <Actions row={row.original} actions={submissionActions} />,
    },
  }
)

