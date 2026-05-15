"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { buildColumns } from "@/components/table/build-columns"
import { Assignments } from "@/features/assignments/types/assignments.types"

export const columns = buildColumns<Assignments>(
  [
    { accessorKey: "topic", header: "Topic" },
    { accessorKey: "type", header: "Type" },
    { accessorKey: "student.name", header: "Student" },
    { accessorKey: "supervisor.name", header: "Supervisor" },
    { accessorKey: "taken", header: "Taken" },
  ],

  (assignment) => (
    <>
      <DropdownMenuItem
        onClick={() => console.log("Edit", assignment.id)}
      >
        Edit
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={() => console.log("Delete", assignment.id)}
      >
        Delete
      </DropdownMenuItem>
    </>
  )
)