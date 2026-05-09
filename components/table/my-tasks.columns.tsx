"use client"

import { ColumnDef } from "@tanstack/react-table"


export type MyTasks = {
      faculty: "PRF",
      department: "Informatics",
      annotation: "AI research",
      literature: "papers",
      assignmentDate: string
      topic: string
      status: "pending" | "processing" | "success" | "failed"
      type: "bachelor" | "master"
      opponent: string
      supervisor: string
}

export const columns: ColumnDef<MyTasks>[] = [
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
    accessorKey: "opponent",
    header: "Opponent",
  },
  {
    accessorKey: "supervisor",
    header: "Supervisor",
  },
]