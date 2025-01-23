import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './pages/Auth/SignIn';
import Dashboard from './Dashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Box from '@mui/material/Box';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import UserList from './pages/User/UserList';

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
                    <CircularProgress size="3rem" />
                </Box>
            );
        }

        return isAuthenticated ? children : <Navigate to="/signIn" />;
    }

    function ProtectedRoutes() {
        return (
            <PrivateRoute>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/usuario" element={<UserList />} />
                    {/* <Route path="/settings" element={<Settings />} /> */}
                </Routes>
            </PrivateRoute>
        );
    }

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/signIn" element={<SignIn />} />
                    <Route path="/*" element={<ProtectedRoutes />} />
                    <Route path="/" element={<Navigate to="/signIn" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}