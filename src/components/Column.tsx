import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../types/type';

function Column({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className=" bg-white rounded-[5px] shadow w-full p-[20px] flex justify-start items-center gap-[20px] touch-none cursor-grab"
    >
      <input type="checkbox" className=" h-[20px] w-[20px]" />
      <li>{task.title}</li>
    </div>
  );
}

export default Column;
