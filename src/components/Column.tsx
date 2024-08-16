import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../types/type';
import { FaTrashAlt } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

function Column({
  task,
  toggleTaskChecked,
  deleteTask,
}: {
  task: Task;
  toggleTaskChecked: (id: number) => void;
  deleteTask: (id: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleCheckboxClick = (event: React.PointerEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-white rounded-[5px] shadow w-full p-[20px] flex items-center justify-between  touch-none cursor-grab"
    >
      <div className="flex justify-start items-center gap-[20px]">
        <input
          type="checkbox"
          className="h-[20px] w-[20px]"
          checked={task.check}
          onChange={() => toggleTaskChecked(task.id)}
          onPointerDown={handleCheckboxClick}
        />
        <li className={`${task.check ? 'line-through' : ''}`}>{task.title}</li>
      </div>
      <div className=" flex gap-x-3">
        <MdEdit
          onPointerDown={handleCheckboxClick}
          className="text-2xl cursor-pointer"
        />

        <FaTrashAlt
          onClick={() => deleteTask(task.id)}
          onPointerDown={handleCheckboxClick}
          className="text-2xl cursor-pointer hover:opacity-55"
        />
      </div>
    </div>
  );
}

export default Column;
