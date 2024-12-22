export type TaskStatus =
  | "backlog"
  | "todo"
  | "in-progress"
  | "done"
  | "canceled";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  type?: string;
  description?: string;
}

export interface TaskTableProps {
  data: Task[];
  onDelete?: (task: Task) => Promise<void>;
  onUpdate?: (task: Task) => Promise<void>;
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}
