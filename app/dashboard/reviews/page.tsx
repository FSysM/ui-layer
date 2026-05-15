'use client';

import { columns } from "@/components/table/config/reviews.columns"
import { DataTable } from "@/components/table/data-table"
import { useReviews } from "@/features/reviews/hooks/useReviews";
import PageHeader from "@/components/layout/PageHeader"


export default function ReviewsPage() { 
  const submissionsQuery = useReviews()
    
    const data = submissionsQuery.data ?? []
  return (
    <div >
      <PageHeader title="Reviews" />
      <DataTable columns={columns} data={data} />
    </div>
  );
};
