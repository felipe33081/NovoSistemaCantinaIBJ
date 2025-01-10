import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser  } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

type AuthContextType = {
  isAuthenticated: boolean | null;
  setIsAuthenticated: (value: boolean | null) => void;
  checkAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuth = async () => {
    try {
        await getCurrentUser();
        setIsAuthenticated(true);
    } catch (error) {
        setIsAuthenticated(false);
    }
};

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};