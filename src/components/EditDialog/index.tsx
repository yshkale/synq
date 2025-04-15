/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  copyActiveTaskToLocal,
  deleteTask,
  getAllTasks,
  getTask,
  resetDeleteTask,
  resetGetTask,
  resetUpdateTask,
  triggerShowEditDialog,
  updateTask,
  updateTaskUserData,
} from "../Tasks/tasks.slice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Loader2, Trash2Icon } from "lucide-react";
import { TaskStatus } from "./components/TaskStatus";
import { PrioritySelector } from "../Tasks/components/PrioritySelector";
import { ProjectSelector } from "../Tasks/components/ProjectSelector";
import { LabelSelector } from "../Tasks/components/LabelSelector";
import { DueDateSelector } from "../Tasks/components/DueDateSelector";
import { useEffect } from "react";
import { formatISO } from "date-fns";
import { AsyncState } from "@/helper/constants";
import { isSameDay } from "@/helper/isSameDay";

export const EditDialog = () => {
  const dispatch = useDispatch();

  const getTaskId = useSelector((state: any) => state.tasks.getTaskId);
  const userTaskData = useSelector(
    (state: any) => state.tasks.updateTaskUserData
  );

  const getTaskStatus = useSelector(
    (state: any) => state.tasks.getTaskApiStatus
  );

  const activeTask = useSelector((state: any) => state.tasks.getTaskResponse);

  const updateTaskStatus = useSelector(
    (state: any) => state.tasks.updateTaskApiStatus
  );
  const deleteTaskStatus = useSelector(
    (state: any) => state.tasks.deleteTaskApiStatus
  );

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      dispatch(resetUpdateTask());
      dispatch(resetGetTask());
      dispatch(triggerShowEditDialog(false));
    }
  };

  const handleAddTaskData = (type: string, value: any) => {
    if (type === "dueDate") {
      const date = new Date(value);
      const isoDate = formatISO(date);
      return dispatch(
        updateTaskUserData({
          type,
          value: isoDate,
        })
      );
    }
    dispatch(
      updateTaskUserData({
        type,
        value,
      })
    );
  };

  useEffect(() => {
    if (activeTask) {
      dispatch(copyActiveTaskToLocal(activeTask));
    }
  }, [activeTask]);

  useEffect(() => {
    if (getTaskId) {
      dispatch(getTask({ id: getTaskId }));
    }
  }, [getTaskId]);

  const getModifiedFields = (original: any, modified: any) => {
    return Object.keys(modified).reduce((acc, key) => {
      if (key === "dueDate" && isSameDay(original[key], modified[key])) {
        // Skip dueDate if it's the same day
        return acc;
      }

      if (original[key] !== modified[key]) {
        acc[key] = modified[key];
      }
      return acc;
    }, {} as any);
  };

  const hasUpdatesMade = () => {
    if (activeTask && userTaskData) {
      const updatedData = getModifiedFields(activeTask, userTaskData);
      return updatedData && Object.keys(updatedData)?.length > 0;
    }
  };

  const handleDeleteTask = () => {
    dispatch(
      deleteTask({
        id: getTaskId,
      })
    );
  };

  const handleSaveChanges = () => {
    const updatedData = getModifiedFields(activeTask, userTaskData);
    if (hasUpdatesMade()) {
      dispatch(
        updateTask({
          id: activeTask?._id,
          data: updatedData,
        })
      );
    }
  };

  useEffect(() => {
    if (
      updateTaskStatus === AsyncState.FULFILLED ||
      deleteTaskStatus === AsyncState.FULFILLED
    ) {
      dispatch(getAllTasks({}));
      dispatch(triggerShowEditDialog(false));
      dispatch(resetUpdateTask());
      dispatch(resetDeleteTask());
    }
  }, [updateTaskStatus, deleteTaskStatus]);

  return (
    <Dialog defaultOpen={true} onOpenChange={handleOpenChange}>
      <DialogContent className="p-0 lg:w-5/6 max-w-2xl">
        {getTaskStatus === AsyncState.PENDING ? (
          <>
            <DialogHeader>
              <DialogTitle className="sr-only">Loading</DialogTitle>
              <DialogDescription className="sr-only">
                Loading task
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center items-center p-20">
              <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            </div>
          </>
        ) : (
          <>
            <DialogHeader className="p-6 border-b border-neutral-100 flex lg:flex-row justify-between">
              <div className="mt-4 w-full -space-y-2">
                <DialogTitle className="min-h-fit w-full">
                  <textarea
                    className="mb-3 break-words resize-none w-full focus-visible:outline-none placeholder:text-lg font-semibold overflow-hidden leading-tight p-0 text-neutral-800"
                    placeholder="Title"
                    value={userTaskData?.title}
                    onChange={(e) => handleAddTaskData("title", e.target.value)}
                    onInput={(e) => {
                      e.currentTarget.style.height = "auto"; // Reset height first
                      e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`; // Expand to fit content
                    }}
                    maxLength={150} // Restrict max length
                    rows={1} // Start with 1 line
                    required
                  />
                </DialogTitle>

                <DialogDescription>
                  <textarea
                    className="w-full focus-visible:outline-none placeholder:text-sm text-sm text-neutral-600 break-words resize-none overflow-hidden"
                    placeholder="Add description..."
                    value={userTaskData?.description}
                    onChange={(e) =>
                      handleAddTaskData("description", e.target.value)
                    }
                    onInput={(e) => {
                      e.currentTarget.style.height = "auto"; // Reset height first
                      e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`; // Set new height
                    }}
                    maxLength={400}
                    rows={2}
                  />
                </DialogDescription>
              </div>

              <div className="flex flex-col justify-center lg:gap-4 pt-4 lg:border-l border-neutral-200 lg:pl-6">
                <TaskStatus
                  className="mb-3"
                  status={userTaskData?.completed}
                  handleAddTaskData={handleAddTaskData}
                />
                <div className="flex lg:flex-col space-x-2 lg:space-x-0 mt-4 lg:mt-0 lg:gap-3">
                  <PrioritySelector
                    value={userTaskData?.priority}
                    handleAddTaskData={handleAddTaskData}
                  />
                  <ProjectSelector
                    value={userTaskData?.project}
                    handleAddTaskData={handleAddTaskData}
                  />
                  <LabelSelector
                    value={userTaskData?.labels}
                    handleAddTaskData={handleAddTaskData}
                  />
                </div>
                <DueDateSelector
                  value={userTaskData?.dueDate}
                  className="mt-3"
                  handleAddTaskData={handleAddTaskData}
                />
              </div>
            </DialogHeader>
            <DialogFooter className="flex flex-row-reverse items-center justify-between lg:justify-between px-6 pb-4">
              <Button
                variant="secondary"
                className="text-red-600 border border-neutral-100"
                onClick={handleDeleteTask}
              >
                <Trash2Icon /> Delete
              </Button>
              <Button
                className="bg-orange-600 hover:bg-orange-700 w-32"
                onClick={handleSaveChanges}
                disabled={!hasUpdatesMade()}
              >
                {updateTaskStatus === AsyncState.PENDING ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Save changes"
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
