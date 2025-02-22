import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BoxIcon, CheckCircle2, TerminalIcon } from "lucide-react";

export const ProjectSelector = () => {
  const projects = ["Engineering", "Design", "Marketing"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 text-xs text-neutral-600 border border-neutral-200 bg-neutral-100 rounded-md px-2 py-1">
        <BoxIcon size={14} /> Project
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex justify-between items-center">
          <input
            placeholder="create new project..."
            className="placeholder:font-normal outline-none font-normal"
          />
          <CheckCircle2 size={18} className="text-neutral-500 cursor-pointer" />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {projects?.map((project, index) => {
          return (
            <DropdownMenuItem
              key={index}
              className="font-semibold text-neutral-600 text-xs"
            >
              <TerminalIcon className="text-blue-600" /> {project}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
