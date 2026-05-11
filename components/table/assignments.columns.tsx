"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Assignments } from "@/features/assignments/types/assignments.types"



export const columns: ColumnDef<Assignments>[] = [
  {
    accessorKey: "topic",
    header: "Topic",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "student.name",
    header: "Student",
  },
  {
    accessorKey: "supervisor.name",
    header: "Supervisor",
  },
  {
    accessorKey: "taken",
    header: "Taken",
  },
]