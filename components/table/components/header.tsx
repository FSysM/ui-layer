"use client"


import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { flexRender } from "@tanstack/react-table"

interface PaginationProps<TData> {
  table: any
}

export function Header<TData>({ table }: PaginationProps<TData>) {     
    return(
    <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
        </TableHeader>
    )
}