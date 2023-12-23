//== react, react-router-dom, Auth0 ==//
import React from 'react';
import ReactDOM from 'react-dom/client';

//== TSX Components, Functions ==//
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
