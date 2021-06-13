import { Dispatch, SetStateAction } from 'react';

interface Rule {
  name: string;
  link: string;
}

interface RulesProps {
  rules: Rule[];
  updateRules?: Dispatch<SetStateAction<Rule[]>>;
}

export { Rule, RulesProps };
