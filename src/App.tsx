import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './pages/Auth/SignIn';
import Dashboard from './Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import ForceNewPassword from './pages/Auth/ForceNewPassword';
import ProtectedLayout from './pages/ProtectedLayout';
import ProductConteiner from './pages/Product/ConteinerList/ProductConteiner';
import UserConteiner from './pages/User/ConteinerList/UserConteiner';
import CustomerConteiner from './pages/Customer/ConteinerList/CustomerConteiner';
import OrderConteiner from './pages/Order/ConteinerList/OrderConteiner';
import PrivateRoutes from './components/PrivateRoutes';
import { ToastProvider } from './components/ToastContext';

export default function App() {
    return (
        <AuthProvider>
            <ToastProvider>
                <Router>
                    <Routes>
                        {/* Rotas públicas */}
                        <Route path="/signIn" element={<SignIn />} />
                        <Route path="/changepassword" element={<ForceNewPassword />} />

                        {/* Rotas protegidas */}
                        <Route
                            path="/*"
                            element={
                                <PrivateRoutes>
                                    <Routes>
                                        <Route element={<ProtectedLayout />}>
                                            <Route path="/painel" element={<Dashboard />} />
                                            <Route path="/pedido" element={<OrderConteiner />} />
                                            <Route path="/cliente" element={<CustomerConteiner />} />
                                            <Route path="/produto" element={<ProductConteiner />} />
                                            <Route path="/usuario" element={<UserConteiner />} />
                                        </Route>
                                    </Routes>
                                </PrivateRoutes>
                            }
                        />
                        <Route path="/" element={<Navigate to="/signIn" />} />
                    </Routes>
                </Router>
            </ToastProvider>
        </AuthProvider>
    );
}