import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"

type ColumnConfig<T> = {
  accessorKey: keyof T | string
  header: string
  sortable?: boolean
  cell?: (props: any) => React.ReactNode
}

type ExpandField = {
  label: string
  accessor: string
}

type BuildOptions<T> = {
  actions?: ColumnDef<T>
  expandFields?: ExpandField[]
}

export function buildColumns<T>(
  configs: ColumnConfig<T>[],
  options?: BuildOptions<T>
): ColumnDef<T>[] {

  const columns: ColumnDef<T>[] = []

  // 1. EXPAND COLUMN (AUTO)
  if (options?.expandFields?.length) {
    columns.push({
      id: "expand",
      header: () => null,
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => (
        <button onClick={() => row.toggleExpanded()}>
          {row.getIsExpanded() ? "▼" : "▶"}
        </button>
      ),
    })
  }

  // 2. NORMAL COLUMNS
  configs.forEach((col) => {
    columns.push({
      id: String(col.accessorKey),
      accessorKey: col.accessorKey as string,
      enableSorting: col.sortable ?? true,
      meta: { header: col.header },
      header: ({ column }) =>
        column.getCanSort() ? (
          <button onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }>
            {col.header}
          </button>
        ) : (
          col.header
        ),
      ...(col.cell ? { cell: col.cell } : {}),
    })
  })

  // 3. ACTIONS
  if (options?.actions) {
    columns.push({
      ...(options.actions as ColumnDef<T>),
      enableHiding: false,
    })
  }

  return columns
}
