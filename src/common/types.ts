interface Rule {
  name: string;
  link: string;
}

interface RulesProps {
  rules: Rule[];
  updateRules?: (_: Rule[]) => void;
}

type Window = 'main-window' | 'adding-window' | 'minigame-window';

export { Rule, RulesProps, Window };
