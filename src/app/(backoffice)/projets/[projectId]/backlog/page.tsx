"use client";
import { useEffect, useState } from "react";
import { KanbanBoard } from "@/components/backlog/KanbanBoard";
import { TaskMatrix } from "@/components/taches/TaskMatrix";
import { useTasks } from "@/contexts/TaskContext";
import { useCurrentProject } from "@/contexts/CurrentProjectContext";
import { ApiTask } from "@/types/task";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

import { KanbanHeader } from "@/components/backlog/KanbanHeader";

export default function BacklogPage() {
  const { currentProject } = useCurrentProject();
  const { state, fetchProjectTasks, updateTask } = useTasks();
  const [localTasks, setLocalTasks] = useState<ApiTask[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      if (currentProject?.id) {
        await fetchProjectTasks(currentProject.id);
      }
    };
    loadTasks();
    console.log("currentProject", currentProject);
  }, [currentProject]);

  useEffect(() => {
    if (state.projectTasks) {
      const tasks = Array.isArray(state.projectTasks)
        ? state.projectTasks
        : [state.projectTasks];
      setLocalTasks(
        tasks.map((task) => ({
          task_id: task.id ?? 0,
          task_title: task.title,
          task_description: task.description,
          status: task.status,
          assignedUserId: task.assignedUserId,
          activity_id: task.activiteId,
          importance: task.importance,
          urgency: task.urgency,
          estimatedPomodoros: task.estimatedPomodoros,
          completedPomodoros: task.completedPomodoros,
        }))
      );
    }
  }, [state.projectTasks]);

  const handleUpdateTask = async (id: number, update: { status: string }) => {
    if (currentProject?.id) {
      try {
        await updateTask(id, {
          status: update.status as "done" | "todo" | "in_progress" | "review",
        });
        await fetchProjectTasks(currentProject.id);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  return (
    // <Suspense fallback={<LoadingSpinner />}>
    //   <div className="space-y-8 p-6">
    //     <div className="flex justify-between items-center">
    //       <h1 className="text-3xl font-bold text-gray-900">Tableau Kanban</h1>
    //       <p className="mt-2 text-gray-600">
    //         Suivez l'avancement de vos tâches et gérez votre temps avec le timer
    //         Pomodoro
    //       </p>{" "}
    //       <div className="flex items-center gap-4">
    //         <span className="text-sm text-gray-500">
    //           {localTasks.length} tâches
    //         </span>
    //       </div>
    //     </div>
    //     <KanbanBoard
    //       projectId={currentProject?.id.toString() || ""}
    //       tasks={localTasks}
    //       onUpdateTask={handleUpdateTask}
    //     />
    //     <div className="mt-12">
    //       <h2 className="text-xl font-semibold mb-6">Matrice des Tâches</h2>
    //       <TaskMatrix />
    //     </div>
    //   </div>
    // </Suspense>
    <Suspense fallback={<LoadingSpinner />}>
      <div className="w-full py-2 sm:py-6 lg:py-8">
        <KanbanHeader />
        <div className="space-y-8 ">
          <KanbanBoard
            projectId={currentProject?.id.toString() || ""}
            tasks={localTasks}
            onUpdateTask={handleUpdateTask}
          />
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-6">Matrice des Tâches</h2>
            <TaskMatrix />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
