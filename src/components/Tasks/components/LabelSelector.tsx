import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircle2, TagIcon, TagsIcon } from "lucide-react";

export const LabelSelector = () => {
  const labels = ["concept", "planning", "important"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 text-xs text-neutral-600 border border-neutral-200 bg-neutral-100 rounded-md px-2 py-1">
        <TagsIcon size={14} /> Label
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex justify-between items-center">
          <input
            placeholder="create new label..."
            className="placeholder:font-normal outline-none font-normal"
          />
          <CheckCircle2 size={18} className="text-neutral-500 cursor-pointer" />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {labels?.map((label, index) => {
          return (
            <DropdownMenuItem
              key={index}
              className="font-semibold text-neutral-600 text-xs"
            >
              <TagIcon className="text-lime-600" /> {label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
