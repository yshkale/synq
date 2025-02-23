import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { triggerShowEditDialog } from "../Tasks/tasks.slice";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";
import { TaskStatus } from "./components/TaskStatus";
import { PrioritySelector } from "../Tasks/components/PrioritySelector";
import { ProjectSelector } from "../Tasks/components/ProjectSelector";
import { LabelSelector } from "../Tasks/components/LabelSelector";
import { DueDateSelector } from "../Tasks/components/DueDateSelector";

export const EditDialog = () => {
  const dispatch = useDispatch();

  const currentTask = {
    id: 1,
    title: "Design homepage UI",
    description: "Create a clean and minimal homepage layout",
    dueDate: "2025-02-20",
    priority: "high", // can be 'low', 'medium', 'high'
    status: "incomplete", // can be 'incomplete', 'in progress', 'done'
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      dispatch(triggerShowEditDialog(false));
    }
  };
  return (
    <Dialog defaultOpen={true} onOpenChange={handleOpenChange}>
      <DialogContent className="p-0 w-5/6 max-w-2xl">
        <DialogHeader className="p-6 border-b border-neutral-100 flex flex-row justify-between">
          <div className="mt-4 space-y-2">
            <DialogTitle>{currentTask?.title}</DialogTitle>
            <DialogDescription>{currentTask?.description}</DialogDescription>
          </div>

          <div className="flex flex-col justify-center gap-4 pt-4 border-l border-neutral-200 pl-6">
            <TaskStatus className="mb-3" />
            <PrioritySelector />
            <ProjectSelector />
            <LabelSelector />
            <DueDateSelector className="mt-3" />
          </div>
        </DialogHeader>
        <DialogFooter className="flex items-center sm:justify-between px-6 pb-4">
          <Button variant="outline" className="text-red-600">
            <Trash2Icon /> Delete
          </Button>
          <Button className="bg-orange-600 hover:bg-orange-700">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
