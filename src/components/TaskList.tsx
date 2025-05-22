import { useState } from "react"
import TaskItem from "./TaskItem"
import FilterButtons from "./FilterButtons"
import EmptyList from "./EmptyList"
import type { TaskListProps } from "../types/props"

export default function TaskList(props: TaskListProps) {
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
    const tasklist = props.list.filter(task => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true; // "all"
    });

    return (
        <div className="flex flex-col gap-5 items-center w-full">
            <div>
                <FilterButtons
                    filter={filter}
                    setFilter={setFilter}
                    activeTasksCount={props.activeTasksCount}
                    completedTasksCount={props.completedTasksCount}
                    allTasksCount={props.list.length}
                />
            </div>
            <div className="w-full flex flex-col gap-2">
                {!tasklist.length && <EmptyList filter={filter} />}
                {tasklist.map((task) => {
                    const { title, details, completed, id } = task
                    return (
                        <TaskItem
                            key={id}
                            id={id}
                            title={title}
                            details={details}
                            completed={completed}
                            onToggle={() => props.toggleCompleted(id)}
                            removeTask={() => props.removeTask(id)}
                            editTask={(updatedTitle,updatedDetails) => props.editTask(id, updatedTitle,updatedDetails)}
                        />
                    )
                })}
            </div>
        </div>
    )
}