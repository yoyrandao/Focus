import React from 'react';

interface ButtonProps {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      className="
        transition duration-300 ease-in-out hover:bg-green-300
        w-full h-full 
        border border-black rounded 
        bg-green-100 focus:outline-none"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export { Button, ButtonProps };
