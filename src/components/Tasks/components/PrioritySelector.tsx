import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  EllipsisIcon,
  SignalHighIcon,
  SignalLowIcon,
  SignalMediumIcon,
} from "lucide-react";

export const PrioritySelector = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 text-xs text-neutral-600 border border-neutral-200 bg-neutral-100 rounded-md px-2 py-1">
        <EllipsisIcon size={14} /> Priority
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-6">
        <DropdownMenuItem className="flex items-center">
          <SignalHighIcon /> High
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center">
          <SignalMediumIcon /> Medium
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center">
          <SignalLowIcon /> Low
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
