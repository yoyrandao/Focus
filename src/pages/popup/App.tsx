import React, { useState } from 'react';
import { Window } from '../../common';

import { List, Button, RuleAddingDialog } from '../../components';

import { useRules } from '../../hooks/useRules';
import { useWindow } from '../../hooks/useWindow';

const App = (): JSX.Element => {
  const resolveContent = (window: Window): JSX.Element => {
    switch (window) {
      case 'adding-window':
        return <RuleAddingDialog />;

      case 'main-window':
        return (
          <div
            className={`${
              locked ? 'pointer-events-none' : 'pointer-events-auto'
            }`}
          >
            {/*more styling */}
            <List rules={rules} updateRules={updateRules} />

            <div className="w-full">
              <div className="w-32 m-auto">
                <Button
                  text="ADD"
                  onClick={() => setCurrentWindow('adding-window')}
                />
              </div>
            </div>
          </div>
        );

      case 'minigame-window':
        return <></>;

      default:
        return <></>;
    }
  };

  const [locked, setLock] = useState<boolean>(false);

  const [rules, updateRules] = useRules();
  const [currentWindow, setCurrentWindow] = useWindow();

  return (
    <div className="container w-full h-full bg-gray-50">
      <div className="container w-full h-10 bg-blue-100 px-5 flex flex-row justify-between place-items-center">
        <p className="text-2xl">Focus!</p>
        <button
          className="w-7 h-7 focus:outline-none outline-none border-0"
          onClick={() => setLock(!locked)}
        >
          {locked ? (
            <img src="../../icons/lock.png" alt="Locked" />
          ) : (
            <img src="../../icons/openedLock.png" alt="Unlocked" />
          )}
        </button>
      </div>

      <hr className="h-0.5 bg-black" />

      {resolveContent(currentWindow)}
    </div>
  );
};

export default App;
