'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          >
            <Moon className="h-5 w-5 dark:hidden" />
            <Sun className="hidden h-5 w-5 dark:block" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{resolvedTheme === 'dark' ? 'Light' : 'Dark'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
