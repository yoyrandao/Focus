interface Rule {
  name: string;
  link: string;
}

interface RulesProps {
  rules: Rule[];
  updateRules?: (_: Rule[]) => void;
}

export { Rule, RulesProps };
