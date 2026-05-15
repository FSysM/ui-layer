"use client"

import * as React from "react"

import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  getExpandedRowModel 
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

import { Pagination } from "./components/pagiantion"
import { Header } from "./components/header"
import { Search } from "./components/search"
import { ColumnFilter } from "./components/filter"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  
  renderExpanded?: (row: TData) => React.ReactNode
}

export function DataTable<TData, TValue>({
  columns,
  data,
  renderExpanded
}: DataTableProps<TData, TValue>) {
  
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [pagination, setPagination] = React.useState({
  pageIndex: 0,
  pageSize: 5,
  })
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [expanded, setExpanded] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      columnVisibility,
      pagination,
      expanded,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onExpandedChange: setExpanded,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    globalFilterFn: "includesString",
  })

  return (
    <div>
      {/* Search and filter controls */ }
      <div className="flex items-center py-4">
        {/* Search */}
        <Search table={table} />
        {/* Filter columns */}
        <ColumnFilter table={table} />
      </div>
      {/* Table */}
      <div className="overflow-hidden rounded-md border">
        <Table className="w-full">
          {/* Table header */ }
          <Header table={table} />
          {/* Table body */ }
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                
                {/* MAIN ROW */}
                <TableRow data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>

                {/* EXPANDED ROW */}
                {row.getIsExpanded() && renderExpanded && (
                  <TableRow>
                    <TableCell colSpan={row.getVisibleCells().length}>
                      {renderExpanded(row.original)}
                    </TableCell>
                  </TableRow>
                )}

              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      { /* Pagination controls */ }
      <Pagination table={table} />
  </div>
  )
}