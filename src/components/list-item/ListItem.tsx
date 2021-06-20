import React, { useState } from 'react';
import { IconedButton } from '../iconed-button';

interface ListItemProps {
  name: string;
  link: string;
  index: number;
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
        <div className="fixed right-0 m-4 z-2">
          <IconedButton onClick={() => deleteAction?.(index)} type="trash" />
        </div>
      )}
    </div>
  );
};

export { ListItem, ListItemProps };
