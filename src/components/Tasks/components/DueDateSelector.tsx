/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import { CalendarPlus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";

export const DueDateSelector = ({
  value,
  handleAddTaskData,
  className,
}: any) => {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    if (date) {
      handleAddTaskData("dueDate", date);
    }
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-44 justify-start text-left font-normal text-xs",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarPlus className="text-neutral-600" />
          {date ? format(date, "PPP") : <span>Set due date...</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          fromDate={new Date()}
        />
      </PopoverContent>
    </Popover>
  );
};
