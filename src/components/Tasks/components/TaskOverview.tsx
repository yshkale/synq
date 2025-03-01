import { Checkbox } from "@/components/ui/checkbox";
import { CalendarFoldIcon } from "lucide-react";

import { useDispatch } from "react-redux";
import { triggerShowEditDialog } from "../tasks.slice";
import { format, parseISO } from "date-fns";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const TaskOverview = (props: any) => {
  const dispatch = useDispatch();

  const dueDate =
    props.dueDate && format(parseISO(props.dueDate), "dd-MM-yyyy");

  const handleOnClick = () => {
    dispatch(triggerShowEditDialog(true));
  };
  return (
    <div
      key={props.id}
      className="flex items-start space-x-3 border-b border-neutral-200 px-2 pb-2 cursor-pointer"
    >
      <Checkbox className="mt-1 rounded-full data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600" />
      <div className="flex flex-col gap-0" onClick={handleOnClick}>
        <h3 className="font-semibold text-neutral-800">{props.title}</h3>
        <p className="text-sm text-neutral-600">{props?.description}</p>

        <p className="flex items-center space-x-1 pt-2 text-red-600">
          <CalendarFoldIcon size={14} />
          <span className="text-xs pt-0.5">{dueDate}</span>
        </p>
      </div>
    </div>
  );
};
