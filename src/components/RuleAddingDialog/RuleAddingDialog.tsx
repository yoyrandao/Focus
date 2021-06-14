import React, { useState } from 'react';
import { useRules } from '../../hooks/useRules';
import { useWindow } from '../../hooks/useWindow';
import { sendMessage } from '../../lib/messaging';
import { getName } from '../../lib/url';
import { Button } from '../Button';
import { Input } from '../Input';

const RuleAddingDialog: React.FC = () => {
  const [newValue, setNewValue] = useState<string>('');

  const [rules, updateRules] = useRules();
  const [, setCurrentWindow] = useWindow();

  const addCurrentTabAsRule = () => {
    sendMessage('ADD_CURRENT');
    setCurrentWindow('main-window');
  };

  const addTabAsRule = () => {
    // validation

    updateRules(
      rules.concat([{ name: getName(newValue).toUpperCase(), link: newValue }]),
      () => sendMessage('SET_RULES'),
    );
    setCurrentWindow('main-window');
  };

  return (
    <div>
      <div className="h-10">
        <div className="p-2 text-lg">
          <button
            className="focus:outline-none"
            onClick={() => setCurrentWindow('main-window')}
          >
            ⬅
          </button>
        </div>
      </div>
      <div>
        <div className="w-full">
          <div className="w-32 m-auto">
            {/* eslint-disable-next-line @typescript-eslint/no-empty-function*/}
            <Button text="ADD CURRENT" onClick={addCurrentTabAsRule} />
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewValue(e.target.value)
              }
            />
            <Button text="ADD" onClick={addTabAsRule} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { RuleAddingDialog };
