import {
  closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useState } from 'react';
import ColumnContainer from './components/ColumnContainer';
import { Task } from './types/type';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Input from './components/Input';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string) => {
    setTasks((task) => [...task, { id: Date.now(), title, check: false }]);
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => task.id !== id);
    });
  };

  const getTaskId = (id: number) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id === over?.id) return;

    setTasks((task) => {
      const originalPos = getTaskId(active.id as number);
      const newPos = getTaskId(over?.id as number);

      return arrayMove(task, originalPos, newPos);
    });
  };

  const toggleTaskChecked = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, check: !task.check } : task
      )
    );
  };
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  return (
    <div
      className="
  w-full
  h-full
  flex
  flex-col
  items-center
  gap-[50px]
  mt-[10px]
  "
    >
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <Input onSubmit={addTask} />
        {tasks.length === 0 ? null : (
          <ColumnContainer
            tasks={tasks}
            toggleTaskChecked={toggleTaskChecked}
            deleteTask={deleteTask}
          />
        )}
      </DndContext>
    </div>
  );
}

export default App;
