import { CalendarFoldIcon } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

export const Inbox = () => {
  const tasks = [
    {
      id: 1,
      title: "Design homepage UI",
      description: "Create a clean and minimal homepage layout",
      dueDate: "2025-02-20",
      priority: "high", // can be 'low', 'medium', 'high'
      status: "incomplete", // can be 'incomplete', 'in progress', 'done'
    },
    {
      id: 2,
      title: "Fix login page bug",
      description: "Resolve the authentication issue",
      dueDate: "2025-02-21",
      priority: "medium",
      status: "in progress",
    },
    {
      id: 3,
      title: "Write API documentation",
      description: "Document all backend endpoints",
      dueDate: "2025-02-22",
      priority: "low",
      status: "done",
    },
    {
      id: 4,
      title: "Setup Redux store",
      description: "Implement Redux for state management",
      dueDate: "2025-02-23",
      priority: "high",
      status: "incomplete",
    },
  ];
  return (
    <main className="flex justify-center items-center pt-20 mr-20">
      <section className="w-full max-w-xl">
        <h1 className="text-2xl font-semibold text-neutral-500">Inbox</h1>

        <div className="py-8 flex flex-col space-y-4">
          {tasks.map((task) => {
            return (
              <div
                key={task.id}
                className="flex items-start space-x-3 border-b border-neutral-200 px-2 pb-2"
              >
                <Checkbox className="mt-1 rounded-full data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600" />
                <div className="flex flex-col gap-0">
                  <h3 className="font-semibold text-neutral-800">
                    {task.title}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {task?.description}
                  </p>

                  <p className="flex items-center space-x-1 pt-2 text-red-600">
                    <CalendarFoldIcon size={14} />
                    <span className="text-xs pt-0.5">{task.dueDate}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};
