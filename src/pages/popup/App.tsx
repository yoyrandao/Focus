import React from 'react';

import { Button } from '../../components';

const App = (): JSX.Element => {
  return (
    <div className="container w-full h-full bg-gray-100">
      <Button
        text="Add"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => console.log(e)}
      />
    </div>
  );
};

export default App;
