import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Auth local e offline (sem AWS Cognito/Amplify). O acesso e liberado por um
// PIN validado pela API embutida; aqui guardamos apenas o estado da sessao.
const AUTH_KEY = 'cantina_authenticated';

type AuthContextType = {
  isAuthenticated: boolean | null;
  setIsAuthenticated: (value: boolean | null) => void;
  userId: string | null;
  setUserId: (value: string | null) => void;
  nameUser: string | null;
  setNameUser: (value: string | null) => void;
  emailUser: string | null;
  setEmailUser: (value: string | null) => void;
  checkAuth: () => Promise<void>;
  signOutUser: () => Promise<void>;
  getCurrentUserToInfo: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<string | null>('local');
  const [nameUser, setNameUser] = useState<string | null>('Cantina IBJ');
  const [emailUser, setEmailUser] = useState<string | null>('');

  const getCurrentUserToInfo = async () => {
    // Sem provedor externo: usuario unico local do caixa.
    setUserId('local');
  };

  const checkAuth = async () => {
    setIsAuthenticated(localStorage.getItem(AUTH_KEY) === 'true');
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const signOutUser = async () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    window.location.href = '/signIn';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userId, setUserId, nameUser, setNameUser, emailUser, setEmailUser, checkAuth, signOutUser, getCurrentUserToInfo }}>
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
