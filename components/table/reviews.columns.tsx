'use client'

import { Reviews } from "@/features/reviews/types/reviews.types"
import { buildColumns } from "@/components/table/build-columns"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"



export const columns = buildColumns<Reviews>(
  [
    { accessorKey: "assignment.topic", header: "Topic" },
    { accessorKey: "assignment.type", header: "Type" },
    { accessorKey: "student.name", header: "Student" },
    { accessorKey: "supervisor.name", header: "Supervisor" },
    { accessorKey: "taken", header: "Taken" },
  ],

  (submission) => (
    <>
      <DropdownMenuItem
        onClick={() => console.log("Edit", submission.id)}
      >
        Edit
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={() => console.log("Delete", submission.id)}
      >
        Delete
      </DropdownMenuItem>
    </>
  )
)