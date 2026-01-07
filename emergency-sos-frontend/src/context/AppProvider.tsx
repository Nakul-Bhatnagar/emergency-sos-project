import React from 'react';
import { AuthProvider } from './AuthContext';
import { SosProvider } from './SosContext';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <SosProvider>{children}</SosProvider>
    </AuthProvider>
  );
};
