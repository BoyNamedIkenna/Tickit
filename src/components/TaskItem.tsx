import { useState, useEffect } from "react";
import FormModal from "./FormModal";
import type { TaskItemProps } from "../types/props";
import { Check, Trash2, Edit } from 'lucide-react';

export default function TaskItem(props: TaskItemProps) {
    const { title, details, completed, onToggle, removeTask, editTask } = props
    const [show, setShow] = useState(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        const checkTouch = () => setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
        checkTouch();
    }, []);

    const handleMouseEnter = () => {
        if (!isTouch) {
            setShow(true);
        }
    };

    const handleMouseLeave = () => {
        if (!isTouch) {
            setShow(false);
        }
    };

    const handleClick = () => {
        if (isTouch) {
            setShow((prev) => !prev);
        }
    };

    const handleUpdate = (newTitle: string, newDetails: string) => {
        editTask(newTitle, newDetails);
    }

    return (
        <div
            className="flex items-center gap-2 bg-white dark:bg-gray-800 py-4 px-3 rounded-md shadow-sm hover:shadow-lg duration-200"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <button
                onClick={onToggle}
                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors duration-200 hover:cursor-pointer ${props.completed
                        ? "bg-green-500 border-none"
                        : "bg-white border-gray-400 hover:border-blue-800 dark:bg-gray-700 dark:border-gray-500"
                    }`}
            >
                {completed && <Check className="w-4 h-4 text-white" />}
            </button>

            {isEditing ? (
                <FormModal
                    title={title}
                    details={details}
                    handleUpdate={(newTitle, newDetails) => handleUpdate(newTitle, newDetails)}
                    setIsEditing={setIsEditing}
                />
            ) : (
                <div className="flex justify-between w-full">
                    <div>
                        <p className="font-semibold capitalize text-lg mb-1 dark:text-white">{title}</p>
                        <p className="dark:text-gray-300">{details}</p>
                    </div>
                    {(show || isTouch) && (
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsEditing((prev) => !prev && true)}
                                className="w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 text-gray-500 hover:cursor-pointer hover:text-indigo-500 hover:bg-indigo-50 dark:text-gray-300 dark:hover:text-indigo-400 dark:hover:bg-gray-700"
                            >
                                <Edit className="w-4 h-4" />
                            </button>
                            <button
                                onClick={removeTask}
                                className="w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 text-gray-500 hover:cursor-pointer hover:text-red-500 hover:bg-red-50 dark:text-gray-300 dark:hover:text-red-400 dark:hover:bg-gray-700"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
