"use client"

import { Table } from "@tanstack/react-table"
import { TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { flexRender } from "@tanstack/react-table"

interface HeaderProps<TData> {
  table: Table<TData>
}

export function Header<TData>({ table }: HeaderProps<TData>) {
  return (
    <TableHeader className="bg-muted/50">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id} className="truncate overflow-hidden">
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  )
}