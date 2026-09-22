// src/App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { SearchProvider } from './context/SearchContext';
import { AppRoutes } from './routes/AppRoutes';
import { WebsitePreloader } from './components/shared/WebsitePreloader';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <SearchProvider>
            {/* Initial Launch Animated Preloader with Circular ATX Logo */}
            <WebsitePreloader />
            <AppRoutes />
          </SearchProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
