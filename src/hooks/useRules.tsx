import React, {
  createContext,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  useState,
  useContext,
} from 'react';
import { Rule } from '../common';

const RulesContext = createContext<Rule[]>([]);
const RulesActionContext = createContext<
  Dispatch<SetStateAction<Rule[]>> | undefined
>(undefined);

const RulesProvider = ({
  children,
}: PropsWithChildren<unknown>): JSX.Element => {
  const [rules, setRules] = useState<Rule[]>([]);

  return (
    <RulesContext.Provider value={rules}>
      <RulesActionContext.Provider value={setRules}>
        {children}
      </RulesActionContext.Provider>
    </RulesContext.Provider>
  );
};

const useRules = (): [Rule[], Dispatch<SetStateAction<Rule[]>>] => {
  const rulesContext = useContext(RulesContext);
  const rulesActionContext = useContext(RulesActionContext);

  if (rulesContext === undefined || rulesActionContext === undefined) {
    throw new Error('useRules must be inside provider');
  }

  return [rulesContext, rulesActionContext];
};

export { RulesProvider, useRules };
