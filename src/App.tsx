import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from "react"
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import type { Task } from './types/task'

function App() {
  const [activeTasksCount, setActiveTasksCount] = useState(0);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);

  const [list, setList] = useState<Task[]>(() => {
    const stored = localStorage.getItem("taskList");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(list));
    setActiveTasksCount(list.filter((task) => !task.completed).length);
    setCompletedTasksCount(list.filter((task) => task.completed).length);
  }, [list]);

  const addTask = (task: Omit<Task, "id">) => {
    const newTask: Task = {
      ...task,
      id: uuidv4()
    };
    setList((prev) => [newTask, ...prev]);
  };

  const removeTask = (id: string) => {
    setList((prev) => prev.filter((task) => task.id !== id));
  }

  const editTask = (id: string, updatedTitle: string, updatedDetails: string) => {
    setList((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: updatedTitle, details: updatedDetails } : task
      )
    );
  };

  const toggleCompleted = (id: string) => {
    setList((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className='bg-gray-100 dark:bg-gray-900 min-h-screen w-screen py-10 gap-5'>
      <div className='px-1 w-sm md:w-2xl mx-auto flex flex-col gap-5'>
        <div className='flex flex-col items-center gap-2 mb-5'>
          <h1 className='text-3xl font-bold text-indigo-500 dark:text-indigo-400'>TickIt</h1>
          <h3 className='text-gray-800 dark:text-gray-300'>Stay organized and get things done</h3>
        </div>
        <div>
          <TaskForm addTask={addTask} />
        </div>
        <div className='h-full'>
          <TaskList
            list={list}
            toggleCompleted={toggleCompleted}
            removeTask={removeTask}
            editTask={editTask}
            activeTasksCount={activeTasksCount}
            completedTasksCount={completedTasksCount}
          />
        </div>
      </div>
    </div>
  )
}

export default App
