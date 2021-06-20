import React, { useState } from 'react';

import { Window } from '../../lib/types';

import { List, Button, RuleAddingDialog } from '../../components';

import { useRules } from '../../hooks/useRules';
import { useWindow } from '../../hooks/useWindow';
import { IconedButton } from '../../components/iconed-button/IconedButton';

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

            <div className="w-full h-10">
              <div className="w-32 h-full m-auto">
                <Button
                  text="NEW"
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
      <div
        style={{ height: '10%' }}
        className="container w-full bg-blue-100 px-5 flex flex-row justify-between place-items-center"
      >
        <p className="text-2xl">Focus!</p>
        <div className="w-7 h-7">
          <IconedButton
            onClick={() => setLock(!locked)}
            type={locked ? 'lock-closed' : 'lock-opened'}
          />
        </div>
      </div>

      <hr className="h-0.5 bg-black" />

      <div style={{ height: '90%' }}>{resolveContent(currentWindow)}</div>
    </div>
  );
};

export default App;
