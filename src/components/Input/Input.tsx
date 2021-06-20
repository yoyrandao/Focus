import React from 'react';

interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ onChange }: InputProps) => {
  return (
    <div className="w-full h-full overflow-hidden">
      <input
        className="border-none text-center w-full outline-none bg-transparent text-2xl"
        onChange={onChange}
      />
      <hr className="border-1 border-black" />
    </div>
  );
};

export { Input };
