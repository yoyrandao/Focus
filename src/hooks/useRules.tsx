import React, { createContext, PropsWithChildren, useContext } from 'react';
import { Rule } from '../common';
import { useLocalStorage } from './useLocalStorage';

const RulesContext = createContext<Rule[]>([]);
const RulesActionContext = createContext<((_: Rule[]) => void) | undefined>(
  undefined,
);

const RulesProvider = ({
  children,
}: PropsWithChildren<unknown>): JSX.Element => {
  const [rules, setRules] = useLocalStorage<Rule[]>('rules', []);

  return (
    <RulesContext.Provider value={rules}>
      <RulesActionContext.Provider value={setRules}>
        {children}
      </RulesActionContext.Provider>
    </RulesContext.Provider>
  );
};

const useRules = (): [Rule[], (_: Rule[]) => void] => {
  const rulesContext = useContext(RulesContext);
  const rulesActionContext = useContext(RulesActionContext);

  if (rulesContext === undefined || rulesActionContext === undefined) {
    throw new Error('useRules must be inside provider');
  }

  return [rulesContext, rulesActionContext];
};

export { RulesProvider, useRules };
