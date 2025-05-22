import type { Task } from './task'

export interface TaskFormProps {
  addTask: (task: Omit<Task, "id">) => void;
}

export interface TaskListProps {
    list: Task[];
    activeTasksCount: number;
    completedTasksCount: number;
    toggleCompleted: (id: string) => void;
    removeTask: (id: string) => void;  
    editTask: (id: string, updatedTitle: string,updatedDetails:string) => void;
  
}

export interface TaskItemProps {
  id: string;
  title: string;
  details?: string;
  completed: boolean;
  onToggle: () => void;
  removeTask:() => void;
  editTask:(updatedTitle:string,updatedDetails:string) => void;
}

export interface FormModalProps {
  title: string;
  details?: string;
  handleUpdate: (newTitle:string,newDetails:string) => void;
  setIsEditing: (isEditing: boolean) => void;
}

export interface FilterButtonsProps {
  filter: "all" | "active" | "completed";
  setFilter: (filter: "all" | "active" | "completed") => void;
  activeTasksCount: number;
  completedTasksCount: number;
  allTasksCount: number;
}

export interface EmptyListProps {
  filter: "all" | "active" | "completed";
}