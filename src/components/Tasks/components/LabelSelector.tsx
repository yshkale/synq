/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircle2, TagIcon, TagsIcon } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

export const LabelSelector = (props: any) => {
  const userLabels = useSelector((state: any) => state.tasks?.allTasks?.labels);
  const [labels, setLabels] = useState([...userLabels]);
  const [newLabel, setNewLabel] = useState("");

  const handleLabelSelection = (checked: boolean, label: string) => {
    if (checked) {
      return props.handleAddTaskData("labels", [...props.value, label]);
    } else {
      const newLabels = props.value?.filter((item: any) => item !== label);
      props.handleAddTaskData("labels", newLabels);
    }
  };

  const handleAddLabel = (newLabel: string) => {
    if (newLabel.trim() && !labels.includes(newLabel)) {
      setLabels((prev) => [...prev, newLabel]);
      handleLabelSelection(true, newLabel);
      setNewLabel("");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-24 lg:w-fit pl-3 flex items-center gap-1 text-xs text-neutral-600 border border-neutral-200 bg-neutral-100 rounded-md px-2 py-1">
        <TagsIcon size={14} /> Label{" "}
        {props.value?.length > 0 && `(${props.value?.length})`}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-4 lg:ml-0">
        <DropdownMenuLabel className="flex justify-between items-center">
          <input
            placeholder="create new label..."
            className="placeholder:font-normal outline-none font-normal"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
          />
          <CheckCircle2
            size={18}
            className="text-neutral-500 cursor-pointer"
            onClick={() => handleAddLabel(newLabel)}
          />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {labels?.length > 0 ? (
          labels?.map((label, index) => {
            return (
              <DropdownMenuCheckboxItem
                key={index}
                className="font-semibold text-neutral-600 text-xs"
                checked={props.value?.includes(label)}
                onCheckedChange={(checked) =>
                  handleLabelSelection(checked, label)
                }
              >
                <div className="flex items-center gap-1.5 ml-0.5">
                  <TagIcon className="text-lime-600" size={14} /> {label}
                </div>
              </DropdownMenuCheckboxItem>
            );
          })
        ) : (
          <span className="text-center text-xs flex justify-center py-1 text-neutral-600">
            no active labels
          </span>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
