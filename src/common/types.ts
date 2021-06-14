interface Rule {
  name: string;
  link: string;
}

interface RulesProps {
  rules: Rule[];
  updateRules?: (_: Rule[], _f: (_a: Rule[]) => void) => void;
}

interface ChromeMessage {
  type: MessageType;
}

type Window = 'main-window' | 'adding-window' | 'minigame-window';

type MessageType = 'SET_RULES';

export { Rule, RulesProps, Window, MessageType, ChromeMessage };
