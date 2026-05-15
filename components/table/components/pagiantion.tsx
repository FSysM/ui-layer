'use client'

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface PaginationProps<TData> {
  table: any
}

export function Pagination<TData>({
  table,
}: PaginationProps<TData>) {
  if (table.getPageCount() <= 1) {
    return null
  }

  return (
    <div className="flex items-center justify-end gap-2 py-4">

      <Select
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={(value) => {
          table.setPageSize(Number(value))
          table.setPageIndex(0)
        }}
      >
        <SelectTrigger className="w-30">
          <SelectValue placeholder="Rows" />
        </SelectTrigger>

        <SelectContent>
          {[5, 10, 15, 20, 50].map((size) => (
            <SelectItem key={size} value={`${size}`}>
              {size} / page
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div>
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button>

    </div>
  )
}