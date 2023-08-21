import * as React from "react";
import { api } from "@/services/api";

import { columns } from "@/components/tasks/columns";
import { DataTable } from "@/components/tasks/data-table";
import { taskSchema } from "@/components/tasks/data/schema";

export default function TaskPage() {
  const [tasks, setTasks] = React.useState(taskSchema);

  React.useEffect(() => {
    const fetchTasks = async () => {
      await api.getAllTasks().then((res) => setTasks(res.tasks));
    };
    fetchTasks();
  }, []);

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Tâches à réaliser
            </h2>
            <p className="text-muted-foreground">
              Retrouvez ici la liste des tâches mensuelles.
            </p>
          </div>
          <div className="flex items-center space-x-2"></div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
}
