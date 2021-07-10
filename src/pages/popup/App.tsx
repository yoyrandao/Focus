import React from 'react';

import { Window } from '../../lib/types';
import { LocalStorageLockKey } from '../../lib/keys';

import { List, Button, RuleAddingDialog, IconedButton } from '../../components';

import { useRules } from '../../hooks/useRules';
import { useWindow } from '../../hooks/useWindow';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const App = (): JSX.Element => {
  const resolveContent = (window: Window): JSX.Element => {
    switch (window) {
      case 'adding-window':
        return <RuleAddingDialog />;

      case 'main-window':
        return (
          <div
            className={`${
              locked ? 'pointer-events-auto' : 'pointer-events-none'
            } h-full`}
          >
            <div className="h-4/5">
              <List rules={rules} updateRules={updateRules} />
            </div>

            <div className="w-full h-1/5 flex justify-center">
              <div className="w-32 h-10 m-auto">
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

  const [locked, setLock] = useLocalStorage(LocalStorageLockKey, true);

  const [rules, updateRules] = useRules();
  const [currentWindow, setCurrentWindow] = useWindow();

  return (
    <div className="container w-full h-full bg-gray-50">
      <div
        style={{ height: '10%', backgroundColor: '#D3EEDE' }}
        className="container w-full px-5 flex flex-row justify-between place-items-center"
      >
        <p className="text-2xl">Focus!</p>
        <div className="w-7 h-7">
          <IconedButton
            onClick={() => setLock(!locked)}
            type={locked ? 'lock-closed' : 'lock-opened'}
          />
        </div>
      </div>

      <div style={{ height: '90%' }}>{resolveContent(currentWindow)}</div>
    </div>
  );
};

export default App;
