import { CalendarFoldIcon } from "lucide-react";
import { Checkbox } from "./ui/checkbox";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const TaskOverview = (props: any) => {
  return (
    <div
      key={props.id}
      className="flex items-start space-x-3 border-b border-neutral-200 px-2 pb-2"
    >
      <Checkbox className="mt-1 rounded-full data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600" />
      <div className="flex flex-col gap-0">
        <h3 className="font-semibold text-neutral-800">{props.title}</h3>
        <p className="text-sm text-neutral-600">{props?.description}</p>

        <p className="flex items-center space-x-1 pt-2 text-red-600">
          <CalendarFoldIcon size={14} />
          <span className="text-xs pt-0.5">{props.dueDate}</span>
        </p>
      </div>
    </div>
  );
};
