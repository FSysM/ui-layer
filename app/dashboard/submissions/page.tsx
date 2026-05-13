'use client'

import { columns } from "@/components/table/submissions.columns"
import { DataTable } from "@/components/table/data-table"
import { useSubmissions, createSubmissionsMutation } from '@/features/submissions/hooks/useSubmissions'
import PageHeader from "@/components/layout/PageHeader"
import { useState } from "react"
import { SubmissionsForm } from "@/components/form/submissions/submissions.form"
import { SubmissionsFormData } from '@/features/submissions/schemas/submissions.schema'



export default function SubmissionsPage() { 
  const [open, setOpen] = useState(false)
  const submissionsQuery = useSubmissions()
  const createSubmissions = createSubmissionsMutation()
  
    function handleCreateSubmissions(data: SubmissionsFormData) {
      console.log('Creating submissions with data:', data)
      createSubmissions.mutate(data, {
        onSuccess: () => {
          submissionsQuery.refetch()
          setOpen(false)
        },
      })
    }
  
  const data = submissionsQuery.data ?? []
  
  return (
    <div >
      <PageHeader
              title="Submissions"
              actions={
                <SubmissionsForm
                  open={open}
                  onOpenChange={setOpen}
                  onSubmit={handleCreateSubmissions}
                />
              }
            />
      <DataTable columns={columns} data={data} />
    </div>
  );
};
