import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function LanguageSelector() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="p-2 rounded-lg hover:bg-accent transition-colors"
                  aria-label="Change language"
                >
                  <Globe className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <span
                    className="mr-2 font-bold"
                  >
                    🇨🇿
                  </span>
                  <span>Czech</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span
                    className="mr-2 font-bold"
                  >
                    🇬🇧
                  </span>
                  <span>English</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Language</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}