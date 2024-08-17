import { useContext, useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { TodoContext } from '../context/TodoContext';

function Input() {
  const { addTask } = useContext(TodoContext);
  const [input, setInput] = useState<string>('');

  const handleSubmit = () => {
    if (!input) return;
    addTask(input);
    setInput('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default form submission if inside a form
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-[10px] items-center relative">
      <input
        type="text"
        className="border focus:outline-none focus:border-green-800 rounded-[10px] p-[10px] "
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown} // Add onKeyDown event handler
        placeholder="Add Task"
      />
      <button
        className="absolute right-0 border-none rounded-sm py-[7px] px-[10px] text-black text-2xl"
        onClick={handleSubmit}
      >
        <IoIosAddCircle />
      </button>
    </div>
  );
}

export default Input;
