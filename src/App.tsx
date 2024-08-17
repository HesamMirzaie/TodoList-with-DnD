import { closestCorners, DndContext } from '@dnd-kit/core';
import ColumnContainer from './components/ColumnContainer';
import Input from './components/Input';
import { useContext } from 'react';
import { TodoContext } from './context/TodoContext';

function App() {
  const {
    sensors,
    handleDragEnd,
    addTask,
    tasks,
    setTasks,
    toggleTaskChecked,
    deleteTask,
  } = useContext(TodoContext);
  return (
    <div className="w-full h-full flex flex-col items-center gap-[50px] mt-[10px]">
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <Input onSubmit={addTask} />
        {tasks.length > 0 && (
          <ColumnContainer
            setTasks={setTasks}
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
