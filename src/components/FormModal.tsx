import type { FormModalProps } from "../types/props"
import { useState, useEffect, useRef } from "react";

export default function FormModal(props: FormModalProps) {
    const { title, details, handleUpdate, setIsEditing } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const [updatedTitle, setUpdatedTitle] = useState<string>(title);
    const [updatedDetails, setUpdatedDetails] = useState<string>(details || "");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleUpdate(updatedTitle, updatedDetails);
        setIsEditing(false);
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md w-[600px] shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Edit Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex flex-col w-full gap-2">
                                <input
                                    type="text"
                                    name="title"
                                    value={updatedTitle}
                                    ref={inputRef}
                                    className="border border-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition-shadow duration-200"
                                    onChange={(e) => setUpdatedTitle(e.target.value)}
                                />
                                <div className="h-[100px]">
                                    <textarea
                                        name="description"
                                        value={updatedDetails}
                                        className="border border-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg p-2 h-full w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition-shadow duration-200"
                                        onChange={(e) => setUpdatedDetails(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2 justify-between">
                                <button
                                    type="submit"
                                    className="flex justify-center items-center border border-sm border-gray-300 dark:border-none rounded-lg py-2 px-5 bg-green-500 hover:bg-green-600 text-white hover:cursor-pointer transition-all duration-200"
                                >
                                    <span>Add</span>
                                </button>
                                <button
                                    className="flex justify-center items-center border border-sm border-gray-300 dark:border-none rounded-lg py-2 px-5 bg-red-500 hover:bg-red-600 text-white hover:cursor-pointer transition-all duration-200"
                                    onClick={() => setIsEditing(false)}
                                >
                                    <span>Cancel</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
