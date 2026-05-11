'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Submissions } from "@/features/submissions/types/submissions.types"



export const columns: ColumnDef<Submissions>[] = [
  {
    accessorKey: "assignment.topic",
    header: "Topic",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "assignment.type",
    header: "Type",
  },
  {
    accessorKey: "assignment.student.name",
    header: "Student",
  },
  {
    accessorKey: "opponent.name",
    header: "Opponent",
  },
  {
    accessorKey: "assignment.supervisor.name",
    header: "Supervisor",
  },
]