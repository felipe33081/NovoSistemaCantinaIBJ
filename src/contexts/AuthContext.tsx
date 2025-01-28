import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { getUserByIdWithouPermission } from '../Services/User/user';

Amplify.configure(awsconfig);

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
  const [userId, setUserId] = useState<string | null>(null);
  const [nameUser, setNameUser] = useState<string | null>(null);
  const [emailUser, setEmailUser] = useState<string | null>(null);

  const getCurrentUserToInfo = async () => {
    try {
      const { userId } = await getCurrentUser();
      console.log(userId);
      setUserId(userId)
    } catch (err) {
      console.error("Falha ao buscar informações de usuário:", err);
    }
  }

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

  const signOutUser = async () => {
    try {
      await signOut();
      console.log("Logout realizado com sucesso");
      window.location.href = "/signIn";
    } catch (error) {
      console.error("Falha ao deslogar:", error);
    }
  };

  const getInfosUser = async () => {
    try {
      if (userId !== null) {
        const result = await getUserByIdWithouPermission(userId ?? "");
        setNameUser(result?.name);
        setEmailUser(result?.email);
      }
    } catch (err) {
      console.log('Erro ao buscar informações de usuário');
    }
  }

  useEffect(() => {
    getInfosUser();
  }, [getCurrentUserToInfo]);

  useEffect(() => {
    getCurrentUserToInfo();
  }, [getInfosUser]);

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