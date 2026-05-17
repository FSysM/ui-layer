import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Actions } from "./components/actions"
import type { ActionConfig } from "./types"

type ColumnConfig<T> = {
  accessorKey: keyof T | string
  header: string
  sortable?: boolean
  cell?: (props: any) => React.ReactNode
}

export function buildColumns<T>(
  configs: ColumnConfig<T>[],
  actions?: ActionConfig<T>[]
): ColumnDef<T>[] {
  const columns: ColumnDef<T>[] = configs.map((col) => ({
    id: String(col.accessorKey),
    accessorKey: col.accessorKey as string,
    enableSorting: col.sortable ?? true,
    meta: { header: col.header },
    header: ({ column }) =>
      column.getCanSort() ? (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {col.header}
        </button>
      ) : (
        col.header
      ),
    ...(col.cell ? { cell: col.cell } : {}),
  }))

  if (actions?.length) {
    columns.push({
      id: "actions",
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => <Actions row={row.original} actions={actions} />,
    })
  }

  return columns
}
