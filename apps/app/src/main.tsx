import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app';
import './main.scss';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/query-client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
