import { useEffect, useState } from 'react';
import { Task } from '../types/type';

function useLocalStorageTasks(key: string, initialTasks: Task[] = []) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem(key);
    return storedTasks ? JSON.parse(storedTasks) : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(tasks));
  }, [key, tasks]);

  return [tasks, setTasks] as const;
}

export default useLocalStorageTasks;
