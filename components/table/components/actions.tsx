"use client"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import type { ActionConfig } from "../types"

interface ActionsProps<T> {
  row: T
  actions: ActionConfig<T>[]
}

export function Actions<T>({ row, actions }: ActionsProps<T>) {
  const visible = actions.filter((a) => !a.visible || a.visible(row))
  if (!visible.length) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <span className="px-1 py-1.5 text-sm font-medium">Actions</span>
        <DropdownMenuSeparator />
        {visible.map((action) => (
          <DropdownMenuItem key={action.label} onClick={() => action.onClick(row)}>
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
