import React from 'react';
import { FaLock, FaLockOpen, FaArrowLeft } from 'react-icons/fa';

import { IconType } from '../../lib/types';

const resolveIcon = (type: IconType): JSX.Element => {
  switch (type) {
    case 'lock-opened':
      return <FaLock size="25px" />;

    case 'lock-closed':
      return <FaLockOpen size="25px" />;

    case 'back-arrow':
      return <FaArrowLeft size="25px" />;

    default:
      return <></>;
  }
};

interface IconedButtonProps {
  type: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const IconedButton: React.FC<IconedButtonProps> = ({
  type,
  onClick,
}: IconedButtonProps): JSX.Element => {
  return (
    <button className="focus:outline-none w-full h-full" onClick={onClick}>
      {resolveIcon(type)}
    </button>
  );
};

export { IconedButton };
