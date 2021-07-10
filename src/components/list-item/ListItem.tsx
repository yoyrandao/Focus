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
      className="w-full mt-2 h-12
                 rounded-xl
                 shadow text-base
                 flex flex-row justify-between"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <div className="flex-grow overflow-hidden">
        <p className="text-center text-lg">{name}</p>
        <p className="text-center text-sm text-gray-700">{link}</p>
      </div>
      <div className={`${isShown ? 'block' : 'hidden'} mr-3`}>
        <IconedButton onClick={() => deleteAction?.(index)} type="trash" />
      </div>
    </div>
  );
};

export { ListItem, ListItemProps };
