import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Task } from '../types/type';
import Column from './Column';

function ColumnContainer({
  tasks,
  toggleTaskChecked,
  deleteTask,
}: {
  tasks: Task[];
  toggleTaskChecked: (id: number) => void;
  deleteTask: (id: number) => void;
}) {
  return (
    <ul
      className=" 
  bg-[#f2f2f3]
   rounded-[5px]
   p-[15px]
   w-[80%]
   max-w-[500px]
   flex
   flex-col
   gap-[15px]"
    >
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <Column
            toggleTaskChecked={toggleTaskChecked}
            deleteTask={deleteTask}
            key={task.id}
            task={task}
          />
        ))}
      </SortableContext>
    </ul>
  );
}

export default ColumnContainer;
