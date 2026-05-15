import { Input } from "@/components/ui/input"

interface SearchProps<TData> {
  table: any
}

export function Search<TData>({ table }: SearchProps<TData>) {
    return (
        <Input
          placeholder="Search..."
          value={table.getState().globalFilter ?? ""}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
    )
}