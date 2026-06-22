import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { TrackProvider } from './contexts/TrackContext';
import { LanguageProvider } from './contexts/LanguageContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TrackProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </TrackProvider>
    </BrowserRouter>
  </React.StrictMode>
);
