import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Column from './Column';
import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';

function ColumnContainer() {
  const { tasks } = useContext(TodoContext);
  return (
    <ul className="bg-[#f2f2f3] rounded-[5px] p-[15px] w-[80%] max-w-[500px] flex flex-col gap-[15px]">
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <Column key={task.id} task={task} />
        ))}
      </SortableContext>
    </ul>
  );
}

export default ColumnContainer;
