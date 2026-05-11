'use client';

import { columns } from "@/components/table/reviews.columns"
import { DataTable } from "@/components/table/data-table"
import { useReviews } from "@/features/reviews/hooks/useReviews";




export default function ReviewsPage() { 
  const submissionsQuery = useReviews()
    
    const data = submissionsQuery.data ?? []
  return (
    <div >
      <h1 className="text-3xl font-bold">Reviewed theses</h1>
      <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
      </div>
  );
};
