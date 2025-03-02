/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export const TaskStatus = ({ className, status, handleAddTaskData }: any) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Checkbox
        className="rounded-full data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600 data-[state=checked]:outline-none"
        checked={status}
        onCheckedChange={(checked) => handleAddTaskData("completed", checked)}
      />
      <span className="text-sm">Done</span>
    </div>
  );
};
