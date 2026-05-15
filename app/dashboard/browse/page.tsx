'use client'

import { useMemo } from "react"
import {
  buildSubmissionsColumns,
  renderExpanded
} from "@/components/table/config/submissions.columns"
import { DataTable } from "@/components/table/data-table"
import { useSubmissions } from '@/features/submissions/hooks/useSubmissions'
import PageHeader from "@/components/layout/PageHeader"




export default function BrowsePage() { 
  const columns = useMemo(
    () => buildSubmissionsColumns(actions),
    [actions]
  )
  const submissionsQuery = useSubmissions(true)
  
  const data = submissionsQuery.data ?? []
  return (
    <div >
      <PageHeader title="Browse Submissions" />
      <DataTable columns={columns} data={data} />
    </div>
  );
};
