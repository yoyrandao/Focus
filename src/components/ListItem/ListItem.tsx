import React, { useState } from 'react';

interface ListItemProps {
  name: string;
  link: string;
  index?: number;
  deleteAction?: (i: number) => void;
}

const ListItem: React.FC<ListItemProps> = ({
  name,
  link,
  index,
  deleteAction,
}: ListItemProps) => {
  const [isShown, setIsShown] = useState<boolean>(false);

  return (
    <div
      className="w-full shadow-md mt-2 h-12 text-base flex flex-row justify-around"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <div>
        <p className="text-center text-lg">{name}</p>
        <p className="text-center text-sm text-gray-700">{link}</p>
      </div>
      {isShown && (
        <button
          className="focus:outline-none"
          onClick={() => {
            deleteAction?.(index!);
          }}
        >
          Click
        </button>
      )}
    </div>
  );
};

export { ListItem, ListItemProps };
