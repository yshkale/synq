import { Checkbox } from "@/components/ui/checkbox";
import { CalendarFoldIcon } from "lucide-react";

import { useDispatch } from "react-redux";
import {
  setGetTaskId,
  triggerShowEditDialog,
  updateTask,
} from "../tasks.slice";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { dueDateColorExtractor } from "@/helper/dueDateColorExtractor";
import { cn } from "@/lib/utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const TaskOverview = (props: any) => {
  const dispatch = useDispatch();

  const [isCompleted, setIsCompleted] = useState(props.status);
  useEffect(() => {
    setIsCompleted(props.status);
  }, [props.status]);

  const dueDate =
    props.dueDate && format(parseISO(props.dueDate), "dd-MM-yyyy");

  const handleOnClick = (taskId: string) => {
    dispatch(setGetTaskId(taskId));
    dispatch(triggerShowEditDialog(true));
  };

  const handleCheckedChange = (checked: boolean) => {
    setIsCompleted(checked);
    dispatch(
      updateTask({
        id: props.id,
        data: {
          completed: checked,
        },
      })
    );
  };

  const dueDateColor = dueDateColorExtractor(props.dueDate);

  return (
    <div
      key={props.id}
      className="flex items-start space-x-3 border-b border-neutral-200 px-2 pb-3 cursor-pointer"
    >
      <Checkbox
        className="mt-1 rounded-full data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
        checked={isCompleted}
        onCheckedChange={handleCheckedChange}
      />
      <div
        className="flex flex-col gap-0 w-full"
        onClick={() => handleOnClick(props.id)}
      >
        <h3 className="font-semibold text-neutral-800">{props.title}</h3>
        <p className="text-sm text-neutral-600">{props?.description}</p>

        <p className="flex items-center space-x-1 pt-2 text-red-600">
          <CalendarFoldIcon size={14} className={cn(dueDateColor)} />
          <span className={cn("text-xs pt-0.5", dueDateColor)}>{dueDate}</span>
        </p>
      </div>
    </div>
  );
};
