'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Submissions } from "@/features/submissions/types/submissions.types"



export const columns: ColumnDef<Submissions>[] = [
  {
    accessorKey: "topic",
    header: "Topic",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "student",
    header: "Student",
  },
  {
    accessorKey: "opponent",
    header: "Opponent",
  },
  {
    accessorKey: "supervisor",
    header: "Supervisor",
  },
]