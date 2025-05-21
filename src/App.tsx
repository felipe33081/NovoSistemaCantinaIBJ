import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './pages/Auth/SignIn';
import Dashboard from './Dashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ForceNewPassword from './pages/Auth/ForceNewPassword';
import ProtectedLayout from './pages/ProtectedLayout';
import ProductConteiner from './pages/Product/ConteinerList/ProductConteiner';
import UserConteiner from './pages/User/ConteinerList/UserConteiner';
import CustomerConteiner from './pages/Customer/ConteinerList/CustomerConteiner';
import OrderConteiner from './pages/Order/ConteinerList/OrderConteiner';

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

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Rotas públicas */}
                    <Route path="/signIn" element={<SignIn />} />
                    <Route path="/changepassword" element={<ForceNewPassword />} />

                    {/* Rotas protegidas */}
                    <Route
                        path="/*"
                        element={
                            <PrivateRoute>
                                <Routes>
                                    <Route element={<ProtectedLayout />}>
                                        <Route path="/painel" element={<Dashboard />} />
                                        <Route path="/pedido" element={<OrderConteiner />} />
                                        <Route path="/cliente" element={<CustomerConteiner />} />
                                        <Route path="/produto" element={<ProductConteiner />} />
                                        <Route path="/usuario" element={<UserConteiner />} />
                                    </Route>
                                </Routes>
                            </PrivateRoute>
                        }
                    />

                    <Route path="/" element={<Navigate to="/signIn" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}