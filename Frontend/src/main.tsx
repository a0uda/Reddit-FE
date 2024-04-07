import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from '@material-tailwind/react';
import { theme } from './utils/theme_config.ts';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AlertProvider } from './Providers/AlertProvider.tsx';
import 'react-quill/dist/quill.snow.css';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={theme}>
        <AlertProvider>
          <App />
        </AlertProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
