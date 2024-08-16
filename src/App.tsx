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
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Add tasks to homaepage' },
    { id: 2, title: 'Fix Styling in about sections' },
    { id: 3, title: 'Lern how to center a div' },
  ]);

  const addTask = (title: string) => {
    setTasks((task) => [...task, { id: task.length + 1, title }]);
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
      <h1>My Tasks ✅</h1>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <Input onSubmit={addTask} />
        <ColumnContainer tasks={tasks} />
      </DndContext>
    </div>
  );
}

export default App;
