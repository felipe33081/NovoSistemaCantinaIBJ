import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './pages/Auth/SignIn';
import Dashboard from './Dashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import UserList from './pages/User/UserList';
import ForceNewPassword from './pages/Auth/ForceNewPassword';
import ProtectedLayout from './pages/ProtectedLayout';
import CustomerList from './pages/Customer/CustomerList';
import OrderList from './pages/Order/OrderList';
import ProductList from './pages/Product/ProductList';

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
                                        <Route path="/pedido" element={<OrderList />} />
                                        <Route path="/cliente" element={<CustomerList />} />
                                        <Route path="/produto" element={<ProductList />} />
                                        <Route path="/usuario" element={<UserList />} />
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