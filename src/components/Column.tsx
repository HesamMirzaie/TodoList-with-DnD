import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../types/type';
import { FaTrashAlt } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { useState } from 'react';

function Column({
  task,
  toggleTaskChecked,
  deleteTask,
  setTasks, // Add setTasks here
}: {
  task: Task;
  toggleTaskChecked: (id: number) => void;
  deleteTask: (id: number) => void;
  setTasks: (tasks: Task[]) => void; // Add setTasks to props
}) {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleCheckboxClick = (event: React.PointerEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };

  const handleTrashIconClick = (event: React.MouseEvent<SVGElement>) => {
    event.stopPropagation();
    deleteTask(task.id);
  };

  const preventDragStart = (event: React.PointerEvent<SVGElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleEditClick = (event: React.MouseEvent<SVGElement>) => {
    event.stopPropagation();
    setEditMode(true);
  };

  const handleEditConfirm = () => {
    if (newTitle.trim() !== '') {
      // Update the task title and exit edit mode
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? { ...t, title: newTitle } : t))
      );
    }
    setEditMode(false);
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
          className="h-[20px] w-[20px]"
          checked={task.check}
          onChange={() => toggleTaskChecked(task.id)}
          onPointerDown={handleCheckboxClick}
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
            className="border rounded p-1"
            autoFocus
          />
        ) : (
          <li className={`${task.check ? 'line-through' : ''}`}>
            {task.title}
          </li>
        )}
      </div>
      <div className="flex gap-x-3">
        <MdEdit
          onClick={handleEditClick}
          onPointerDown={preventDragStart}
          className="text-2xl cursor-pointer"
        />
        <FaTrashAlt
          onClick={handleTrashIconClick}
          onPointerDown={preventDragStart}
          className="text-2xl cursor-pointer hover:opacity-55"
        />
      </div>
    </div>
  );
}

export default Column;
