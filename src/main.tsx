import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from '@/views/Root.tsx';
import '@/firebase';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
