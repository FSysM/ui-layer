"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search as SearchIcon, X } from "lucide-react"

interface SearchProps<TData> {
  table: any
}

export function Search<TData>({ table }: SearchProps<TData>) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex items-center">
      
      {/* ICON BUTTON */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="h-4 w-4" /> : <SearchIcon className="h-4 w-4" />}
      </Button>

      {/* ANIMATED INPUT */}
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${open ? "w-64 opacity-100 ml-2" : "w-0 opacity-0 ml-0"}
        `}
      >
        <Input
          placeholder="Search..."
          value={table.getState().globalFilter ?? ""}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          className="w-64"
        />
      </div>
    </div>
  )
}