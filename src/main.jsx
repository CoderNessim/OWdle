import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';

ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider>
  <Notifications />
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </MantineProvider>
);
