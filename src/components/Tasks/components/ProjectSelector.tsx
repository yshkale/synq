/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BoxIcon, CheckCircle2, TerminalIcon } from "lucide-react";
import { useState } from "react";

export const ProjectSelector = (props: any) => {
  const [open, setOpen] = useState(false);

  const [newProject, setNewProject] = useState<string | undefined>(undefined);
  const projects = ["Engineering", "Design", "Marketing"];

  const handleAddNewProject = () => {
    props.handleAddTaskData("project", newProject);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className="flex items-center gap-1.5 text-xs text-neutral-600 border border-neutral-200 bg-neutral-100 rounded-md px-2 py-1"
        onClick={() => setOpen(!open)}
      >
        <BoxIcon size={14} /> {props.value || "Project"}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex justify-between items-center">
          <input
            placeholder="create new project..."
            className="placeholder:font-normal outline-none font-normal"
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
          />
          <CheckCircle2
            size={18}
            className="text-neutral-500 cursor-pointer"
            onClick={handleAddNewProject}
          />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {projects?.map((project, index) => {
          return (
            <DropdownMenuItem
              key={index}
              className="font-semibold text-neutral-600 text-xs"
              onClick={() => props.handleAddTaskData("project", project)}
            >
              <TerminalIcon className="text-blue-600" /> {project}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
