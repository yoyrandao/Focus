import React from 'react';

import { ListItem } from '../ListItem';
import { RulesProps } from '../../common';

const List: React.FC<RulesProps> = ({ rules, updateRules }: RulesProps) => {
  return (
    <div className="container p-2 w-full m-1 h-64 overflow-auto">
      {rules.map((x, i) => (
        <ListItem
          key={i}
          index={i}
          name={x.name}
          link={x.link}
          deleteAction={(i) => {
            updateRules?.((rules) => rules.filter((_, index) => index != i));
          }}
        />
      ))}
    </div>
  );
};

export { List };
