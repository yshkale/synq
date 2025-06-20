/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckCheckIcon } from "lucide-react";
import { TaskOverview } from "./TaskOverview";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllTasks } from "../tasks.slice";
import { useParams } from "react-router";

export const ProjectView = () => {
  const dispatch = useDispatch();
  const { name } = useParams();

  const allTasks = useSelector((state: any) => state.tasks.allTasks?.tasks);

  useEffect(() => {
    dispatch(
      getAllTasks({
        project: name,
      })
    );
  }, [name]);

  return (
    <main className="flex justify-center items-center pt-20 lg:mr-20 mx-6 lg:mx-0">
      <section className="w-full max-w-xl">
        <h1 className="text-2xl font-semibold text-neutral-500">{name}</h1>
        <div className="flex items-center space-x-1.5 pt-1">
          <CheckCheckIcon size={16} className="text-neutral-500" />
          <p className="text-xs text-neutral-500">
            {allTasks?.length || 0} Tasks
          </p>
        </div>

        <div className="py-8 flex flex-col space-y-4">
          {allTasks?.map((task: any) => {
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
