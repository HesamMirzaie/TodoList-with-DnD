import { createContext } from 'react';
import {
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import useLocalStorageTasks from '../hooks/useLocalStorageTasks';
import { Task } from '../types/type';

interface TodoContextProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (title: string) => void;
  deleteTask: (id: number) => void;
  toggleTaskChecked: (id: number) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  sensors: any;
}

export const TodoContext = createContext<TodoContextProps | undefined>(
  undefined
);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useLocalStorageTasks('tasks', []);

  const addTask = (title: string) => {
    setTasks((task) => [...task, { id: Date.now(), title, check: false }]);
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleTaskChecked = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, check: !task.check } : task
      )
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id === over?.id) return;

    setTasks((task) => {
      const originalPos = task.findIndex((t) => t.id === active.id);
      const newPos = task.findIndex((t) => t.id === over?.id);
      return arrayMove(task, originalPos, newPos);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <TodoContext.Provider
      value={{
        tasks,
        setTasks,
        addTask,
        deleteTask,
        toggleTaskChecked,
        handleDragEnd,
        sensors,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
