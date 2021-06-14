import React from 'react';

interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ onChange }: InputProps) => {
  return (
    <div>
      <input className="outline-none bg-none text-2xl" onChange={onChange} />
    </div>
  );
};

export { Input };
