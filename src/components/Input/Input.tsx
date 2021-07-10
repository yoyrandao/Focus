import React from 'react';

interface InputProps {
  focusReference: React.RefObject<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
}

const Input: React.FC<InputProps> = ({
  focusReference,
  onChange,
  onSubmit,
}: InputProps) => {
  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement> | undefined,
  ) => {
    if ((e?.code || e?.key) === 'Enter') {
      onSubmit?.();
    }
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <input
        ref={focusReference}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        className="border-none text-center w-full outline-none bg-transparent text-2xl"
      />
      <hr className="border-1 border-black" />
    </div>
  );
};

export { Input };
