'use client'

import { useMemo } from 'react'
import { DataTable } from '@/components/table/data-table'
import { buildSubmissionsColumns, renderExpandedSubmission } from '@/features/submissions/columns.config'
import { useAllSubmissions } from '@/features/submissions/hooks/useSubmissions'
import PageHeader from '@/components/layout/PageHeader'

export default function BrowsePage() {
  const { data: submissions, isLoading, error } = useAllSubmissions()
  const columns = useMemo(() => buildSubmissionsColumns([]), [])

  return (
    <div>
      <PageHeader title="Browse Submissions" />
      <DataTable
        columns={columns}
        data={submissions ?? []}
        renderExpanded={renderExpandedSubmission}
        isLoading={isLoading}
        error={error}
      />
    </div>
  )
}
