import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../types/type';
import { FaTrashAlt } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';

interface ColumnProps {
  task: Task;
}

function Column({ task }: ColumnProps) {
  const { toggleTaskChecked, deleteTask, setTasks } = useContext(TodoContext);
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleEditConfirm = () => {
    if (newTitle.trim()) {
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? { ...t, title: newTitle } : t))
      );
      setEditMode(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-white rounded-[5px] shadow w-full p-[20px] flex items-center justify-between touch-none cursor-grab"
    >
      <div className="flex justify-start items-center gap-[20px]">
        <input
          type="checkbox"
          className="relative peer shrink-0 rounded-full
          appearance-none w-4 h-4 border-2 border-black bg-white
          mt-1
          checked:bg-black checked:border-0"
          checked={task.check}
          onChange={() => toggleTaskChecked(task.id)}
          onPointerDown={(e) => e.stopPropagation()}
        />
        {editMode ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleEditConfirm}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEditConfirm();
              if (e.key === 'Escape') setEditMode(false);
            }}
            className="border p-1 rounded-md"
            autoFocus
          />
        ) : (
          <li
            className={`${
              task.check ? 'line-through' : ''
            } text-md tracking-[3px]  `}
          >
            {task.title}
          </li>
        )}
      </div>
      <div className="flex gap-x-3">
        <MdEdit
          onClick={() => setEditMode(true)}
          onPointerDown={(e) => e.preventDefault()}
          className="text-2xl cursor-pointer hover:opacity-55"
        />
        <FaTrashAlt
          onClick={() => deleteTask(task.id)}
          onPointerDown={(e) => e.preventDefault()}
          className="text-2xl cursor-pointer hover:opacity-55"
        />
      </div>
    </div>
  );
}

export default Column;
