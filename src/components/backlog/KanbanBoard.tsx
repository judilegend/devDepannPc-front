"use client";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Task, ApiTask } from "@/types/task";
import { BacklogCard } from "./BacklogCard";
import { useMemo, memo } from "react";
import { taskStatusMiddleware } from "@/middleware/taskStatusMiddleware";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";

const columns = {
  todo: { title: "À faire", color: "bg-blue-50 border-blue-500" },
  in_progress: { title: "En cours", color: "bg-yellow-50 border-yellow-500" },
  review: { title: "En révision", color: "bg-purple-50 border-purple-500" },
  done: { title: "Terminé", color: "bg-green-50 border-green-500" },
};

export const KanbanBoard = memo(function KanbanBoard({
  projectId,
  tasks,
  onUpdateTask,
}: {
  projectId: string;
  tasks: ApiTask[];
  onUpdateTask: (id: number, update: { status: string }) => void;
}) {
  const { user } = useAuth();

  const normalizedTasks = useMemo(
    () =>
      tasks.map((task) => ({
        id: task.task_id,
        title: task.task_title,
        description: task.task_description,
        status: task.status as Task["status"],
        assignedUserId: task.assignedUserId,
        activiteId: task.activity_id,
        importance: task.importance,
        urgency: task.urgency,
        estimatedPomodoros: task.estimatedPomodoros,
        completedPomodoros: task.completedPomodoros,
        projectId: parseInt(projectId),
      })),
    [tasks, projectId]
  );

  const handleDragEnd = useMemo(
    () => (result: { destination: any; source: any; draggableId: any }) => {
      if (!result.destination) return;
      const { source, destination, draggableId } = result;

      if (source.droppableId !== destination.droppableId) {
        const task = normalizedTasks.find((t) => t.id === Number(draggableId));

        if (!task || !user) return;

        const canChange = taskStatusMiddleware.canChangeStatus({
          currentStatus: source.droppableId,
          newStatus: destination.droppableId,
          task,
          user,
        });

        if (!canChange) {
          toast.error("Vous n'êtes pas autorisé à déplacer cette tâche");
          return;
        }

        const isValidTransition = taskStatusMiddleware.validateStatusTransition(
          source.droppableId,
          destination.droppableId
        );

        if (canChange && isValidTransition) {
          onUpdateTask(Number(draggableId), {
            status: destination.droppableId,
          });
          toast.success("Statut de la tâche mis à jour avec succès");
        }
      }
    },
    [onUpdateTask, normalizedTasks, user]
  );

  const organizedTasks = useMemo(
    () =>
      Object.keys(columns).reduce((acc, status) => {
        acc[status] = normalizedTasks.filter((task) => task.status === status);
        return acc;
      }, {} as Record<string, Task[]>),
    [normalizedTasks]
  );

  const renderDraggable = (task: Task, index: number) => (
    <Draggable
      key={`task-${task.id}-${index}`}
      draggableId={String(task.id)}
      index={index}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-lg shadow-md p-4 border hover:shadow-lg transition-shadow"
        >
          <BacklogCard task={task} projectId={projectId} />
        </div>
      )}
    </Draggable>
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex overflow-x-auto gap-6  w-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {Object.entries(columns).map(([status, { title, color }]) => (
          <Droppable key={`column-${status}`} droppableId={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`rounded-lg shadow-lg p-4 border-t-4 ${color} min-h-[300px] min-w-[300px] max-w-[400px] 2xl:max-w-[5500px] `}
              >
                <h3 className="font-semibold text-gray-700 mb-4">{title}</h3>
                <div className="space-y-4">
                  {organizedTasks[status]?.map((task, index) =>
                    renderDraggable(task, index)
                  )}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
});
