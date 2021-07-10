interface Rule {
  name: string;
  link: string;
}

interface RulesProps {
  rules: Rule[];
  updateRules?: (_: Rule[], _f: (_a: Rule[]) => void) => void;
}

interface ChromeEvent {
  type: MessageType;
}

type Window = 'main-window' | 'adding-window' | 'minigame-window';

type MessageType = 'set-rules' | 'add-current' | 'set-locally';

type IconType = 'lock-closed' | 'lock-opened' | 'back-arrow' | 'trash';

export { Rule, RulesProps, Window, IconType, MessageType, ChromeEvent };
