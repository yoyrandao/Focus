import React from 'react';

interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ onChange }: InputProps) => {
  return (
    <div>
      <input onChange={onChange} />
    </div>
  );
};

export { Input };
