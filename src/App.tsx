import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './pages/Auth/SignIn';
import Dashboard from './Dashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';

export default function App() {
    // Função para proteger rotas
    function PrivateRoute({ children }: { children: JSX.Element }) {
        const { isAuthenticated } = useAuth();

        if (isAuthenticated === null) {
            return <div>Loading...</div>; // Exiba um carregamento enquanto verifica a autenticação
        }

        return isAuthenticated ? children : <Navigate to="/signIn" />;
    }

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/signIn" element={<SignIn />} />
                    <Route
                        path="/dashboard"
                        element={<PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>}
                    />
                    <Route path="/" element={<Navigate to="/signIn" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}