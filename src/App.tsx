import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './pages/Auth/SignIn';
import Dashboard from './Dashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CircularProgress, Box } from '@mui/material';

export default function App() {
    // Função para proteger rotas
    function PrivateRoute({ children }: { children: JSX.Element }) {
        const { isAuthenticated } = useAuth();
    
        if (isAuthenticated === null) {
            return (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <CircularProgress color="success"/>
                </Box>
            );
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