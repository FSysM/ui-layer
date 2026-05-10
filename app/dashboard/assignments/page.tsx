'use client'

import { columns } from "@/components/table/assignments.columns"
import { DataTable } from "@/components/table/data-table"
import { useAssignments } from '@/features/assignments/hooks/useAssignments'



export default function Assignments() { 
  const assignmentsQuery = useAssignments()
    
    const data = assignmentsQuery.data ?? []
  return (
    <div >
      <h1 className="text-3xl font-bold">Available assignments</h1>
      <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
      </div>
  );
};
