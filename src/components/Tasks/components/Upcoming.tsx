/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAfter, parseISO, startOfDay } from "date-fns";
import { CheckCheckIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { TaskOverview } from "./TaskOverview";
import { getAllTasks } from "../tasks.slice";
import { useEffect } from "react";
import { DoYoga } from "./DoYoga";
import { AsyncState } from "@/helper/constants";
import { Skeleton } from "@/components/ui/skeleton";

export const Upcoming = () => {
  const dispatch = useDispatch();

  const tasks = useSelector((state: any) => state.tasks.allTasks?.tasks);
  const allTasksApiStatus = useSelector(
    (state: any) => state.tasks?.tasksApiStatus
  );

  const tasksUpcoming = tasks?.filter((task: any) => {
    if (!task.dueDate) return false;

    const taskDueDate = parseISO(task.dueDate);
    const today = startOfDay(new Date());

    return isAfter(taskDueDate, today);
  });

  useEffect(() => {
    dispatch(getAllTasks({}));
  }, []);

  return (
    <main className="flex justify-center items-center pt-20 lg:mr-20 mx-6 lg:mx-0">
      <section className="w-full max-w-xl">
        <h1 className="text-2xl font-semibold text-neutral-500">Upcoming</h1>
        <div className="flex items-center space-x-1.5 pt-1">
          <CheckCheckIcon size={16} className="text-neutral-500" />
          <p className="text-xs text-neutral-500">
            {tasksUpcoming?.length || 0} Tasks
          </p>
        </div>

        {allTasksApiStatus === AsyncState.FULFILLED &&
        tasksUpcoming?.length > 0 ? (
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
        ) : allTasksApiStatus === AsyncState.FULFILLED &&
          tasksUpcoming?.length === 0 ? (
          <DoYoga />
        ) : (
          allTasksApiStatus === AsyncState.PENDING && (
            <Skeleton className="w-full h-48 mt-8" />
          )
        )}
      </section>
    </main>
  );
};
