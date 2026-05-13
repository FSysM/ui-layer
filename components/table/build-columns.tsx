"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type ColumnConfig<T> = {
  accessorKey: keyof T | string
  header: string
}

export function buildColumns<T>(
  configs: ColumnConfig<T>[],
  actions?: (row: T) => React.ReactNode
): ColumnDef<T>[] {
  const columns: ColumnDef<T>[] = configs.map((config) => ({
    accessorKey: config.accessorKey,

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          {config.header}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  }))

  if (actions) {
    columns.push({
      id: "actions",

      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {actions(row.original)}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    })
  }

  return columns
}
