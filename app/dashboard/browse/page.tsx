'use client'

import { columns } from "@/components/table/config/submissions.columns"
import { DataTable } from "@/components/table/data-table"
import { useAllSubmissions } from '@/features/submissions/hooks/useSubmissions'
import PageHeader from "@/components/layout/PageHeader"




export default function BrowsePage() { 
  const submissionsQuery = useAllSubmissions()
  
  const data = submissionsQuery.data ?? []
  return (
    <div >
      <PageHeader title="Browse Submissions" />
      <DataTable columns={columns} data={data} />
    </div>
  );
};
