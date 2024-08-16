import { useState } from 'react';

interface InputProps {
  onSubmit: (input: string) => void;
}

function Input({ onSubmit }: InputProps) {
  const [input, setInput] = useState<string>('');
  const handleSubmit = () => {
    if (!input) return;
    onSubmit(input);
    setInput('');
  };
  return (
    <div className="flex gap-[10px]">
      <input
        type="text"
        className="border rounded-[10px] p-[10px]"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className=" border-none rounded-[10px] py-[10px] px-[15px] bg-[#2563eb] text-white"
        onClick={handleSubmit}
      >
        Add
      </button>
    </div>
  );
}

export default Input;
