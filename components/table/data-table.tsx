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
  getExpandedRowModel,
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
import { cn } from "@/lib/utils"

interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[]
  data: TData[]
  renderExpanded?: (row: TData) => React.ReactNode
  canExpand?: (row: TData) => boolean
}

export function DataTable<TData>({
  columns,
  data,
  renderExpanded,
  canExpand,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 5 })
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [expanded, setExpanded] = React.useState({})

  const expandColumn: ColumnDef<TData, unknown> = {
    id: "expand",
    header: () => null,
    enableSorting: false,
    enableHiding: false,
    size: 40,
    cell: ({ row }) => {
      if (canExpand && !canExpand(row.original)) return null
      return (
        <button onClick={() => row.toggleExpanded()}>
          {row.getIsExpanded() ? "▼" : "▶"}
        </button>
      )
    },
  }

  const allColumns = renderExpanded ? [expandColumn, ...columns] : columns

  const table = useReactTable({
    data,
    columns: allColumns,
    state: { sorting, globalFilter, columnVisibility, pagination, expanded },
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
    <div className="min-w-0">
      <div className="flex items-center py-4">
        <Search table={table} />
        <ColumnFilter table={table} />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table className="table-fixed w-full">
          <Header table={table} />
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        cell.column.id === "expand" && "w-10 p-1 text-center",
                        cell.column.id === "actions" && "w-14 p-1 text-right",
                        cell.column.id !== "expand" && cell.column.id !== "actions" && "truncate",
                      )}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>

                {row.getIsExpanded() && renderExpanded && (
                  <TableRow>
                    <TableCell
                      colSpan={row.getVisibleCells().length}
                      className="p-0 border-0 truncate"
                    >
                      <div className="overflow-hidden bg-muted/40 px-4 transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-top-2">
                        <div className="py-4">
                          {renderExpanded(row.original)}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination table={table} />
    </div>
  )
}
