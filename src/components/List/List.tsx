import React, { Dispatch, SetStateAction } from 'react';

import { ListItem } from '../ListItem';
import { Rule } from '../../common';

interface ListProps {
  rules: Rule[];
  updateRules: Dispatch<SetStateAction<Rule[]>>;
}

const List: React.FC<ListProps> = ({ rules, updateRules }: ListProps) => {
  return (
    <div className="container p-2 w-full m-1 h-64 overflow-auto">
      {rules.map((x, i) => {
        console.log(x);
        return (
          <ListItem
            key={i}
            index={i}
            name={x.name}
            link={x.link}
            deleteAction={(i) => {
              updateRules((rules) => rules.filter((_, index) => index != i));
            }}
          />
        );
      })}
    </div>
  );
};

export { List };
