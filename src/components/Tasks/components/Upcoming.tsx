/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAfter, parseISO, startOfDay } from "date-fns";
import { CheckCheckIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { TaskOverview } from "./TaskOverview";

export const Upcoming = () => {
  const tasks = useSelector((state: any) => state.tasks.allTasks?.tasks);

  const tasksUpcoming = tasks?.filter((task: any) => {
    if (!task.dueDate) return false;

    const taskDueDate = parseISO(task.dueDate);
    const today = startOfDay(new Date());

    return isAfter(taskDueDate, today);
  });

  return (
    <main className="flex justify-center items-center pt-20 mr-20">
      <section className="w-full max-w-xl">
        <h1 className="text-2xl font-semibold text-neutral-500">Upcoming</h1>
        <div className="flex items-center space-x-1.5 pt-1">
          <CheckCheckIcon size={16} className="text-neutral-500" />
          <p className="text-xs text-neutral-500">
            {tasksUpcoming?.length || 0} Tasks
          </p>
        </div>

        <div className="py-8 flex flex-col space-y-4">
          {tasksUpcoming?.map((task: any) => {
            return (
              <TaskOverview
                key={task._id}
                id={task._id}
                title={task.title}
                description={task.description}
                dueDate={task.dueDate}
                status={task.completed}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
};
