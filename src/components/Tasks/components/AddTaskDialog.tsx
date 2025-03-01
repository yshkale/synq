/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  addTaskUserData,
  createTask,
  getAllTasks,
  triggerAddTaskDialog,
} from "../tasks.slice";
import { Button } from "@/components/ui/button";
import { PrioritySelector } from "./PrioritySelector";
import { ProjectSelector } from "./ProjectSelector";
import { LabelSelector } from "./LabelSelector";
import { DueDateSelector } from "./DueDateSelector";

export const AddTaskDialog = () => {
  const dispatch = useDispatch();

  const createTaskUserData = useSelector(
    (state: any) => state.tasks.createTaskUserData
  );

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      dispatch(triggerAddTaskDialog(false));
    }
  };

  const handleAddTaskData = (type: string, value: string) => {
    dispatch(addTaskUserData({ type, value }));
  };

  const handleCreateTask = () => {
    dispatch(createTask(createTaskUserData));
    dispatch(getAllTasks());
    dispatch(triggerAddTaskDialog(false));
  };

  return (
    <Dialog defaultOpen={true} onOpenChange={handleOpenChange}>
      <DialogContent className="p-0">
        <div className="flex flex-col space-y-3 px-6 pt-6 pb-5">
          <DialogTitle>
            <input
              className="w-full focus-visible:outline-none placeholder:text-lg font-semibold"
              placeholder="Title"
              value={createTaskUserData?.title}
              onChange={(e) => handleAddTaskData("title", e.target.value)}
              required
            />
          </DialogTitle>
          <DialogDescription>
            <input
              className="w-full focus-visible:outline-none placeholder:text-sm text-sm text-neutral-600"
              placeholder="Add description..."
              value={createTaskUserData?.description}
              onChange={(e) => handleAddTaskData("description", e.target.value)}
            />
          </DialogDescription>
        </div>

        <div className="px-6 flex space-x-2">
          <PrioritySelector
            value={createTaskUserData?.priority}
            handleAddTaskData={handleAddTaskData}
          />
          <ProjectSelector
            value={createTaskUserData?.project}
            handleAddTaskData={handleAddTaskData}
          />
          <LabelSelector
            value={createTaskUserData?.labels}
            handleAddTaskData={handleAddTaskData}
          />
        </div>

        <DialogFooter className="border-t border-neutral-200 px-0">
          <div className="py-3 pr-3 pl-6 flex items-center space-x-3 w-full justify-between">
            <DueDateSelector
              value={createTaskUserData?.dueDate}
              handleAddTaskData={handleAddTaskData}
            />
            <Button
              className="bg-orange-600 hover:bg-orange-700"
              onClick={handleCreateTask}
            >
              Create task
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
