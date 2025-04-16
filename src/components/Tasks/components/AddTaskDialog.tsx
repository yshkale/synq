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
  resetCreateTaskStates,
  triggerAddTaskDialog,
} from "../tasks.slice";
import { Button } from "@/components/ui/button";
import { PrioritySelector } from "./PrioritySelector";
import { ProjectSelector } from "./ProjectSelector";
import { LabelSelector } from "./LabelSelector";
import { DueDateSelector } from "./DueDateSelector";
import { formatISO } from "date-fns";
import { useEffect } from "react";
import { AsyncState } from "@/helper/constants";
import { Loader2 } from "lucide-react";

export const AddTaskDialog = () => {
  const dispatch = useDispatch();

  const createTaskUserData = useSelector(
    (state: any) => state.tasks.createTaskUserData
  );
  const createTaskApiStatus = useSelector(
    (state: any) => state.tasks.createTaskApiStatus
  );

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      dispatch(triggerAddTaskDialog(false));
    }
  };

  const handleAddTaskData = (type: string, value: string) => {
    if (type === "dueDate") {
      const date = new Date(value);
      const isoDate = formatISO(date);
      return dispatch(
        addTaskUserData({
          type,
          value: isoDate,
        })
      );
    }
    dispatch(
      addTaskUserData({
        type,
        value,
      })
    );
  };

  const handleCreateTask = () => {
    dispatch(createTask(createTaskUserData));
  };

  useEffect(() => {
    if (createTaskApiStatus === AsyncState.FULFILLED) {
      dispatch(getAllTasks({}));
      dispatch(triggerAddTaskDialog(false));
      dispatch(resetCreateTaskStates());
    }
  }, [createTaskApiStatus]);

  return (
    <Dialog defaultOpen={true} onOpenChange={handleOpenChange}>
      <DialogContent className="p-0">
        <div className="flex flex-col space-y-3 px-6 pt-6 pb-5">
          <DialogTitle>
            <input
              className="w-full focus-visible:outline-none placeholder:text-lg font-semibold text-neutral-800"
              placeholder="Title"
              value={createTaskUserData?.title || ""}
              onChange={(e) => handleAddTaskData("title", e.target.value)}
              required
            />
          </DialogTitle>
          <DialogDescription>
            <input
              className="w-full focus-visible:outline-none placeholder:text-sm text-sm text-neutral-600"
              placeholder="Add description..."
              value={createTaskUserData?.description || ""}
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
              className="bg-orange-600 hover:bg-orange-700 w-32"
              onClick={handleCreateTask}
            >
              {createTaskApiStatus === AsyncState.PENDING ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create task"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
