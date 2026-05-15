import { ColumnDef } from "@tanstack/react-table"

type ColumnConfig<T> = {
  accessorKey: keyof T | string
  header: string
  sortable?: boolean
}

type ExpandField<T> = {
  label: string
  accessor: keyof T
}

type BuildOptions<T> = {
  actions?: ColumnDef<T>
  expandFields?: ExpandField<T>[]
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
      header: ({ column }) => (
        <button onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }>
          {col.header}
        </button>
      ),
    })
  })

  // 3. ACTIONS
  if (options?.actions) {
    columns.push(options.actions)
  }

  return columns
}
