
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"


interface SearchProps<TData> {
  table: any
}


export function ColumnFilter<TData>({ table }: SearchProps<TData>) {
    return(
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column: any) => column.getCanHide())
              .map((column: any) => {
                const header =
                  typeof column.columnDef.header === "string"
                    ? column.columnDef.header
                    : column.columnDef.meta?.header ?? column.id

                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {header}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
    </DropdownMenu>
)
}