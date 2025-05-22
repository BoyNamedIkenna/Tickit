import {List} from "lucide-react"
import type { EmptyListProps } from "../types/props"

export default function EmptyList({filter}: EmptyListProps) {
    const message = filter == "active" ? "No active tasks available" : filter==="completed" ? "No completed tasks available" : "No tasks available"
    
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <List className="w-10 h-10 text-gray-500" />
            <p className="text-gray-500">{message}</p>
        </div>
    )
}