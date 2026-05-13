'use client'

import { useState } from "react"
import { columns } from "@/components/table/assignments.columns"
import { DataTable } from "@/components/table/data-table"
import { useAssignments, createAssignmentMutation } from '@/features/assignments/hooks/useAssignments'
import { AssignmentsForm } from "@/components/form/assignments/assignemts.form"
import { AssignmentFormData } from '@/features/assignments/schemas/assignments.schema'
import PageHeader from "@/components/layout/PageHeader"

export default function Assignments() { 
  const [open, setOpen] = useState(false)
  const assignmentsQuery = useAssignments()
  const createAssignment = createAssignmentMutation()

  function handleCreateAssignment(data: AssignmentFormData) {
    console.log('Creating assignment with data:', data)
    createAssignment.mutate(data, {
      onSuccess: () => {
        assignmentsQuery.refetch()
        setOpen(false)
      },
    })
  }

  const data = assignmentsQuery.data ?? []
  return (
    <div>
      <PageHeader
        title="Assignments"
        actions={
          <AssignmentsForm
            open={open}
            onOpenChange={setOpen}
            onSubmit={handleCreateAssignment}
          />
        }
      />
        <DataTable columns={columns} data={data} />
    </div>
  );
};
