import React from 'react';

interface ButtonProps {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      className="w-full h-5 border border-black rounded font-bold bg-green-100"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export { Button, ButtonProps };
