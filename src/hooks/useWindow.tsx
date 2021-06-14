import React, {
  createContext,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  useState,
  useContext,
} from 'react';
import { Window } from '../lib/types';

const WindowContext = createContext<Window>('main-window');
const WindowActionContext = createContext<
  Dispatch<SetStateAction<Window>> | undefined
>(undefined);

const WindowProvider = ({
  children,
}: PropsWithChildren<unknown>): JSX.Element => {
  const [currentWindow, setCurrentWindow] = useState<Window>('main-window');

  return (
    <WindowContext.Provider value={currentWindow}>
      <WindowActionContext.Provider value={setCurrentWindow}>
        {children}
      </WindowActionContext.Provider>
    </WindowContext.Provider>
  );
};

const useWindow = (): [Window, Dispatch<SetStateAction<Window>>] => {
  const windowContext = useContext(WindowContext);
  const windowActionContext = useContext(WindowActionContext);

  if (!windowContext || !windowActionContext) {
    throw new Error('useWindow must be inside provider');
  }

  return [windowContext, windowActionContext];
};

export { WindowProvider, useWindow };
