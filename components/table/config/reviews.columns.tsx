'use client'

import { Reviews } from "@/features/reviews/types/reviews.types"
import { buildColumns } from "@/components/table/build-columns"
import { Actions } from "@/components/table/components/actions"

const reviewActions = [
  { label: "Edit", onClick: (row: Reviews) => console.log("Edit review", row) },
  { label: "Delete", onClick: (row: Reviews) => console.log("Delete review", row) },
]

export const columns = buildColumns<Reviews>(
  [
    { accessorKey: "submission.assignment.topic", header: "Topic" },
    { accessorKey: "submission.assignment.type", header: "Type" },
    { accessorKey: "submission.opponent.name", header: "Opponent" },
    { accessorKey: "submission.assignment.student.name", header: "Student" },
    { accessorKey: "submission.assignment.supervisor.name", header: "Supervisor" },
  ],
  {
    actions: {
      id: "actions",
      enableSorting: false,
      cell: ({ row }) => <Actions row={row.original} actions={reviewActions} />,
    },
  }
)
