'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Reviews } from "@/features/reviews/types/reviews.types"



export const columns: ColumnDef<Reviews>[] = [
  {
    accessorKey: "submission.assignment.topic",
    header: "Topic",
  },
  {
    accessorKey: "grade",
    header: "Grade",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "submission.assignment.student.name",
    header: "Student",
  },
]