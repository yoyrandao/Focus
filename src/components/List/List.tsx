import React from 'react';

import { ListItem } from '../list-item';
import { RulesProps } from '../../lib/types';

import { sendMessage } from '../../lib/messaging';

const List: React.FC<RulesProps> = ({ rules, updateRules }: RulesProps) => {
  return (
    <div className="container p-2 w-full h-full overflow-auto">
      {rules.map((x, i) => (
        <ListItem
          key={i}
          index={i}
          name={x.name}
          link={x.link}
          deleteAction={(i) => {
            updateRules?.(
              rules.filter((_, index) => index != i),
              () => sendMessage('set-rules'),
            );
          }}
        />
      ))}
    </div>
  );
};

export { List };
