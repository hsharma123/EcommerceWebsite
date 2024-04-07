import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import { CombinedProvider } from './cartcontext/CombinedContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CombinedProvider>
      <App />
    </CombinedProvider>
  </React.StrictMode>,
)
