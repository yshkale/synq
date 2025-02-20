import { TaskOverview } from "../TaskOverview";

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
              <TaskOverview
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                dueDate={task.dueDate}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
};
