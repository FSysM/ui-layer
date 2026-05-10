'use client'

import { columns } from "@/components/table/submissions.columns"
import { DataTable } from "@/components/table/data-table"
import { useSubmissions } from '@/features/submissions/hooks/useSubmissions'



export default function SubmissionsPage() { 
  const submissionsQuery = useSubmissions()
  
  const data = submissionsQuery.data ?? []
  
  return (
    <div >
      <h1 className="text-3xl font-bold">Submissions</h1>
      <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
      </div>
  );
};
