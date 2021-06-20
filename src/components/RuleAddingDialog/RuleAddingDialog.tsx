import React, { useState } from 'react';
import { useRules } from '../../hooks/useRules';
import { useWindow } from '../../hooks/useWindow';
import { sendMessage } from '../../lib/messaging';
import { isValidUrl, extractDomainAndName } from '../../lib/url';
import { Button } from '../Button';
import { Input } from '../Input';

const RuleAddingDialog: React.FC = () => {
  const [newValue, setNewValue] = useState<string>('');
  const [validation, setValidation] = useState<string>('');

  const [rules, updateRules] = useRules();
  const [, setCurrentWindow] = useWindow();

  const addCurrentTabAsRule = () => {
    sendMessage('ADD_CURRENT');
    setCurrentWindow('main-window');
  };

  const addTabAsRule = () => {
    if (!isValidUrl(newValue)) {
      setValidation('Url is not valid');
      return;
    }

    const [, name]: string[] = extractDomainAndName(newValue);

    updateRules(
      rules.concat([{ name: name.toUpperCase(), link: newValue }]),
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
      <div className="fixed bottom-4 h-2/3">
        <div className="w-4/5 h-full m-auto flex flex-col justify-around">
          <div className="w-full h-10">
            <Button text="ADD CURRENT" onClick={addCurrentTabAsRule} />
          </div>
          <div>
            <label htmlFor="rule-input">OR:</label>
            <span id="rule-input">
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewValue(e.target.value)
                }
              />
            </span>
          </div>
          <div className="w-full h-10">
            <Button text="ADD" onClick={addTabAsRule} />
          </div>
          <div className="w-full h-2">
            <p className="text-red-500 text-center text-sm">{validation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { RuleAddingDialog };
