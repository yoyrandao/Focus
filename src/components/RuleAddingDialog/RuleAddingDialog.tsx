import React, { useState } from 'react';
import { useRules } from '../../hooks/useRules';
import { useWindow } from '../../hooks/useWindow';
import { sendMessage } from '../../common/messaging';
import { Button } from '../Button';
import { Input } from '../Input';

const RuleAddingDialog: React.FC = () => {
  const [newValue, setNewValue] = useState<string>('');

  const [rules, updateRules] = useRules();
  const [, setCurrentWindow] = useWindow();
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
            <Button text="ADD CURRENT" onClick={() => {}} />
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewValue(e.target.value)
              }
            />
            <Button
              text="ADD"
              onClick={() => {
                updateRules(
                  rules.concat([{ name: newValue, link: newValue }]),
                  () => sendMessage('SET_RULES'),
                );
                setCurrentWindow('main-window');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { RuleAddingDialog };
