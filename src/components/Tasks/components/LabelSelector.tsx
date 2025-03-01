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
import { useEffect, useState } from "react";

export const LabelSelector = (props: any) => {
  const [labels, setLabels] = useState(["concept", "planning", "important"]);
  const [newLabel, setNewLabel] = useState("");
  const [selectedLabels, setSelectedLabels] = useState([]);

  const handleLabelSelection = (checked: boolean, label: string) => {
    setSelectedLabels((prev: any) => {
      if (checked) {
        return [...prev, label];
      } else {
        return prev.filter((item: any) => item !== label);
      }
    });
  };

  const handleAddLabel = (newLabel: string) => {
    if (newLabel.trim() && !labels.includes(newLabel)) {
      setLabels((prev) => [...prev, newLabel]);
      handleLabelSelection(true, newLabel);
      setNewLabel("");
    }
  };

  useEffect(() => {
    props.handleAddTaskData("labels", selectedLabels);
  }, [selectedLabels]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 text-xs text-neutral-600 border border-neutral-200 bg-neutral-100 rounded-md px-2 py-1">
        <TagsIcon size={14} /> Label{" "}
        {selectedLabels?.length > 0 && `(${selectedLabels.length})`}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
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

        {labels?.map((label, index) => {
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
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
