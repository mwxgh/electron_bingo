import React from 'react';
import ReactDOM from 'react-dom/client';

import { ElectronRendererContext } from '@app/types/preload';

import App from './App';
import './index.css';

declare global {
  interface Window {
    electron: ElectronRendererContext;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*');
