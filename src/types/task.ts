export interface Task {
  id: number;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "review" | "done";
  assignedUserId: number | null;
  activiteId: number;
  importance: string;
  urgency: string;
  estimatedPomodoros: number;
  completedPomodoros: number;
  sprintId?: number;
  projectId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiTask {
  task_id: number;
  task_title: string;
  task_description: string;
  status: "todo" | "in_progress" | "review" | "done";
  assignedUserId: number | null;
  activity_id: number;
  importance: string;
  urgency: string;
  estimatedPomodoros: number;
  completedPomodoros: number;
}
