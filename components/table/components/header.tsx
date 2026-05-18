"use client"

import { Table, flexRender } from "@tanstack/react-table"
import { TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface HeaderProps<TData> {
  table: Table<TData>
}

export function Header<TData>({ table }: HeaderProps<TData>) {
  return (
    <TableHeader className="bg-muted/50">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              className={cn(
                header.column.id === "expand" && "w-10 p-0",
                header.column.id === "actions" && "w-14 p-0",
              )}
            >
              {header.isPlaceholder ? null : (
                header.column.id !== "expand" && header.column.id !== "actions" ? (
                  <div className="truncate">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </div>
                ) : (
                  flexRender(header.column.columnDef.header, header.getContext())
                )
              )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  )
}
