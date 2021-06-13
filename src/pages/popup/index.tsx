import React from 'react';
import { render } from 'react-dom';
import App from './App';

import { RulesProvider } from '../../hooks/useRules';
import { WindowProvider } from '../../hooks/useWindow';

render(
  <WindowProvider>
    <RulesProvider>
      <App />
    </RulesProvider>
  </WindowProvider>,
  document.querySelector('#root'),
);
