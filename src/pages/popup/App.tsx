import React, { useState } from 'react';

import { List, Button } from '../../components';
import { Rule } from '../../common';

const App = (): JSX.Element => {
  const [locked, setLock] = useState<boolean>(true);
  const [rules, setRules] = useState<Rule[]>([]);

  return (
    <div className="container w-full h-full bg-gray-50">
      <div className="container w-full h-10 bg-blue-100 px-5 flex flex-row justify-between place-items-center">
        <p className="text-2xl">Focus!</p>
        <button
          className="w-7 h-7 focus:outline-none outline-none border-0"
          onClick={() => setLock(!locked)}
        >
          {locked ? (
            <img src="../../icons/lock.png" alt="Locked" />
          ) : (
            <img src="../../icons/openedLock.png" alt="Unlocked" />
          )}
        </button>
      </div>

      <hr className="h-0.5 bg-black" />

      {/*to context*/}
      <List rules={rules} updateRules={setRules} />

      <div className="w-full">
        <div className="w-32 m-auto">
          <Button
            text="ADD"
            onClick={() =>
              setRules((state) =>
                state.concat([{ link: 'http://aboba1.link', name: 'aboba1' }]),
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default App;
