import { useState } from "react";
import { Plus } from "lucide-react";
import type { TaskFormProps } from "../types/props";

const TaskForm = (props: TaskFormProps) => {
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const handleShowDetails = () => {
        setShowDetails(!showDetails)
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = (formData.get("title") as string || "").trim();
        if(!title) return alert("Please add a title")
        const task = {
            title: formData.get('title') as string,
            details: formData.get('description') as string,
            completed: false
        }
        props.addTask(task);
        e.currentTarget.reset();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-sm" >
                <div className="flex flex-col gap-2 w-full">
                    <div className=" flex flex-col w-full gap-2">
                        <input 
                            type="text" 
                            name="title" 
                            placeholder="Add a new task title" 
                            className="border border-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition-shadow duration-200" 
                        />
                        {showDetails && <div className="h-[100px]">
                            <textarea  
                                name="description" 
                                placeholder="More details (optional)" 
                                className="border border-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2 h-full w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition-shadow duration-200" 
                            />
                        </div>}
                    </div>
                    <div className="flex gap-2 justify-between">
                        <button 
                            type="button" 
                            onClick={handleShowDetails} 
                            className="border border-sm border-gray-300 dark:border-gray-600 dark:text-white dark:bg-gray-700 rounded-lg py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                            {showDetails ? "Hide " : "Add "}Details
                        </button>
                        <button 
                            type="submit" 
                            className="flex justify-center items-center  border-sm border-gray-300 rounded-lg py-2 px-3 bg-green-500 hover:bg-green-600 text-white hover:cursor-pointer transition-all duration-200"
                        >
                            <Plus className="w-5 h-5"/><span> Add</span>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default TaskForm;
