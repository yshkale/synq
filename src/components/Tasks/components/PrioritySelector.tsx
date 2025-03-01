/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { capitalizeFirstLetter } from "@/helper/capitalizeFirstLetter";
import {
  EllipsisIcon,
  SignalHighIcon,
  SignalLowIcon,
  SignalMediumIcon,
} from "lucide-react";

export const PrioritySelector = (props: any) => {
  const priorityDisplay = [
    {
      label: "high",
      icon: <SignalHighIcon size={14} className="mb-0.5 text-black" />,
    },
    {
      label: "medium",
      icon: <SignalMediumIcon size={14} className="mb-0.5 text-black" />,
    },
    {
      label: "low",
      icon: <SignalLowIcon size={14} className="mb-0.5 text-black" />,
    },
  ];

  const noPriority = {
    label: "priority",
    icon: <EllipsisIcon size={14} className="text-black" />,
  };

  const priority = props.value
    ? priorityDisplay.find((priority) => priority.label === props.value)
    : noPriority;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-0.5 text-xs text-neutral-600 border border-neutral-200 bg-neutral-100 rounded-md px-2 py-1">
        {priority?.icon} {priority && capitalizeFirstLetter(priority.label)}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-6">
        <DropdownMenuItem
          className="flex items-center"
          onSelect={() => props.handleAddTaskData("priority", "high")}
        >
          <SignalHighIcon /> High
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center"
          onSelect={() => props.handleAddTaskData("priority", "medium")}
        >
          <SignalMediumIcon /> Medium
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center"
          onSelect={() => props.handleAddTaskData("priority", "low")}
        >
          <SignalLowIcon /> Low
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
