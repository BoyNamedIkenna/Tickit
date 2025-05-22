import type { FilterButtonsProps } from "../types/props"

export default function FilterButtons(props: FilterButtonsProps) {
    const { filter, setFilter, activeTasksCount, completedTasksCount, allTasksCount } = props;

    return (
        <div className="bg-white dark:bg-gray-800 flex gap-2 p-2 rounded-md">
            <button
                className={`rounded-md px-4 py-2 ${filter === "all" ? "bg-indigo-200 dark:bg-indigo-600 text-black dark:text-white" : "dark:text-white"}`}
                onClick={() => setFilter("all")}
            >
                All ({allTasksCount})
            </button>
            <button
                className={`rounded-md px-4 py-2 ${filter === "active" ? "bg-indigo-200 dark:bg-indigo-600 text-black dark:text-white" : "dark:text-white"}`}
                onClick={() => setFilter("active")}
            >
                Active ({activeTasksCount})
            </button>
            <button
                className={`rounded-md px-4 py-2 ${filter === "completed" ? "bg-indigo-200 dark:bg-indigo-600 text-black dark:text-white" : "dark:text-white"}`}
                onClick={() => setFilter("completed")}
            >
                Completed ({completedTasksCount})
            </button>
        </div>
    )
}
