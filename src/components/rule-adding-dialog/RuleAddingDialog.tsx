import React, { useState } from 'react';

import { useRules } from '../../hooks/useRules';
import { useWindow } from '../../hooks/useWindow';
import { useEvents } from '../../hooks/useEvents';

import { isValidUrl, extractDomainAndName } from '../../lib/url';

import { Button } from '../button';
import { Input } from '../input';
import { IconedButton } from '../iconed-button/IconedButton';

const RuleAddingDialog: React.FC = () => {
  const [newValue, setNewValue] = useState<string>('');
  const [validation, setValidation] = useState<string>('');

  const [rules, updateRules] = useRules();
  const [, setCurrentWindow] = useWindow();
  const { addCurrent, setRules } = useEvents();

  const addCurrentTabAsRule = () => {
    addCurrent();
    setCurrentWindow('main-window');
  };

  const addTabAsRule = () => {
    if (!isValidUrl(newValue)) {
      setValidation('Url is not valid');
      return;
    }

    const [domain, name]: string[] = extractDomainAndName(newValue);

    if (rules.filter((x) => x.link === domain).length > 0) {
      return;
    }

    updateRules(
      rules.concat([{ name: name.toUpperCase(), link: domain }]),
      setRules,
    );
    setCurrentWindow('main-window');
  };

  return (
    <div>
      <div className="h-10">
        <div className="p-2 text-lg">
          <IconedButton
            onClick={() => setCurrentWindow('main-window')}
            type="back-arrow"
          />
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
