"use client";

import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Task } from "@/types/task";
import { useTasks } from "@/contexts/TaskContext";
import { taskStatusMiddleware } from "@/middleware/taskStatusMiddleware";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";

interface BacklogCardProps {
  task: Task;
  projectId: string;
}

export const BacklogCard = memo(function BacklogCard({
  task,
  projectId,
}: BacklogCardProps) {
  const { state, updateTask } = useTasks();
  const { users } = state;
  const { user } = useAuth();

  const assignedUser = users.find(
    (user) => user.id === Number(task.assignedUserId)
  );

  const getPriorityLabel = () => {
    if (task.importance === "important" && task.urgency === "urgent")
      return "Important / Urgent";
    if (task.importance === "important" && task.urgency === "not-urgent")
      return "Important / Pas urgent";
    if (task.importance === "not-important" && task.urgency === "urgent")
      return "Pas important / Urgent";
    return "Pas important / Pas urgent";
  };

  const getPriorityColor = () => {
    if (task.importance === "important" && task.urgency === "urgent")
      return "bg-red-500 text-white";
    if (task.importance === "important" && task.urgency === "not-urgent")
      return "bg-yellow-500 text-black";
    if (task.importance === "not-important" && task.urgency === "urgent")
      return "bg-blue-500 text-white";
    return "bg-green-500 text-white";
  };

  const handleStatusChange = async () => {
    if (!user) return;

    const statusFlow = {
      todo: "in_progress",
      in_progress: "review",
      review: "done",
      done: "todo",
    } as const;

    const newStatus = statusFlow[task.status as keyof typeof statusFlow];

    const canChange = taskStatusMiddleware.canChangeStatus({
      currentStatus: task.status,
      newStatus,
      task,
      user,
    });

    if (!canChange) {
      toast.error("Vous n'êtes pas autorisé à modifier cette tâche.");
      return;
    }

    const isValidTransition = taskStatusMiddleware.validateStatusTransition(
      task.status,
      newStatus
    );

    if (canChange && isValidTransition) {
      await updateTask(task.id, { status: newStatus });
      toast.success("Statut de la tâche mis à jour avec succès.");
    }
  };

  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-1">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h4 className="font-bold text-gray-900">{task.title}</h4>
            <p className="text-sm text-gray-600">{task.description}</p>
            <div className="flex items-center gap-2">
              <Badge
                className={`${getPriorityColor()} px-2 py-1 text-xs font-medium`}
              >
                {getPriorityLabel()}
              </Badge>
              {assignedUser && (
                <Avatar className="h-6 w-fit text-sm">
                  <AvatarFallback className="p-2">
                    {assignedUser.username}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                <MoreVertical className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleStatusChange}>
                Changer le statut
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
      <div className="bg-gray-50 px-4 py-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="h-4 w-4 text-gray-400" />
          <span>
            {task.completedPomodoros}/{task.estimatedPomodoros} pomodoros
          </span>
        </div>
      </div>
    </Card>
  );
});
