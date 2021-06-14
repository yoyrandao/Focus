import React, {
  createContext,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  useState,
  useContext,
} from 'react';
import { Window } from '../common';

const WindowContext = createContext<Window>('main-window');
const WindowActionContext = createContext<
  Dispatch<SetStateAction<Window>> | undefined
>(undefined);

const WindowProvider = ({
  children,
}: PropsWithChildren<unknown>): JSX.Element => {
  const [currentWindow, setCurrentWindow] = useState<Window>('adding-window');

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

  if (windowContext === undefined || windowActionContext == undefined) {
    throw new Error('useWindow must be inside provider');
  }

  return [windowContext, windowActionContext];
};

export { WindowProvider, useWindow };
