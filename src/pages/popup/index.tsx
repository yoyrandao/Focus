import React from 'react';
import { render } from 'react-dom';
import App from './App';

import { RulesProvider } from '../../hooks/useRules';

render(
  <RulesProvider>
    <App />
  </RulesProvider>,
  document.querySelector('#root'),
);
