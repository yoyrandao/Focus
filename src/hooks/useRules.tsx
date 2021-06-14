import React, { createContext, PropsWithChildren, useContext } from 'react';
import { ChromeMessage, LocalStorageRulesKey, Rule } from '../common/types';
import { useLocalStorage } from './useLocalStorage';

const RulesContext = createContext<Rule[]>([]);
const RulesActionContext = createContext<
  ((_: Rule[], _f?: (_a: Rule[]) => void) => void) | undefined
>(undefined);

const RulesProvider = ({
  children,
}: PropsWithChildren<unknown>): JSX.Element => {
  const [rules, setRules] = useLocalStorage<Rule[]>(LocalStorageRulesKey, []);

  return (
    <RulesContext.Provider value={rules}>
      <RulesActionContext.Provider value={setRules}>
        {children}
      </RulesActionContext.Provider>
    </RulesContext.Provider>
  );
};

const useRules = (): [
  Rule[],
  (_: Rule[], _f?: (_a: Rule[]) => void) => void,
] => {
  const rulesContext = useContext(RulesContext);
  const rulesActionContext = useContext(RulesActionContext);

  if (rulesContext === undefined || rulesActionContext === undefined) {
    throw new Error('useRules must be inside provider');
  }

  (chrome || browser).runtime.onMessage.addListener((message) => {
    if ((message as ChromeMessage).type === 'SET_LOCALLY') {
      rulesActionContext(
        JSON.parse(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          window.localStorage.getItem(LocalStorageRulesKey)!,
        ) as Rule[],
      );
    }
  });

  return [rulesContext, rulesActionContext];
};

export { RulesProvider, useRules };
