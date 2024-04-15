import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from '@material-tailwind/react';
import { theme } from './utils/theme_config.ts';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AlertProvider } from './Providers/AlertProvider.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './Providers/AuthProvider.tsx';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GoogleOAuthProvider clientId='178664293995-s6s92s28mme4eu54lg367sqhnj8bonff.apps.googleusercontent.com'>
          <ThemeProvider value={theme}>
            <AlertProvider>
              <App />
            </AlertProvider>
          </ThemeProvider>
        </GoogleOAuthProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
