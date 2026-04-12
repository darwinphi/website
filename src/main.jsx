import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { i18nReady } from './i18n/config';
import App from './App.jsx';

// GitHub Pages SPA: restore redirect path forwarded by 404.html
const params = new URLSearchParams(window.location.search);
const redirect = params.get('redirect');
if (redirect) {
  window.history.replaceState(null, '', redirect);
}

const root = createRoot(document.getElementById('root'));

i18nReady
  .catch((error) => {
    console.error('Failed to initialize translations:', error);
  })
  .finally(() => {
    root.render(
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>,
    );
  });
