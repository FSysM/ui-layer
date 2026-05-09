import { Moon, Sun } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ThemeToggle() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="p-2 rounded-lg hover:bg-accent transition-colors"
          >
            <Sun className="h-5 w-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Theme</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}