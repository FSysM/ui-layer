'use client'

import { useMemo } from "react"
import {
  buildSubmissionsColumns,
  renderExpanded
} from "@/components/table/config/submissions.columns"
import { DataTable } from "@/components/table/data-table"
import { useSubmissions } from '@/features/submissions/hooks/useSubmissions'
import PageHeader from "@/components/layout/PageHeader"
import { createSubmissionsActions } from "@/features/submissions/hooks/useSubmissionsActions"




export default function BrowsePage() { 
  const submissionsQuery = useSubmissions(true)
  
  const actions = useMemo(() => { return createSubmissionsActions() }, [])
    
    const columns = useMemo(
      () => buildSubmissionsColumns(actions),
      [actions]
    )
  return (
    <div >
      <PageHeader title="Browse Submissions" />
      <DataTable
          columns={columns}
          data={submissionsQuery.data ?? []}
          renderExpanded={renderExpanded}
        />
    </div>
  );
};
