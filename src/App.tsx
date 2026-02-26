import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import ProtectedLayout from './pages/ProtectedLayout';
import ProductConteiner from './pages/Product/ConteinerList/ProductConteiner';
import UserConteiner from './pages/User/ConteinerList/UserConteiner';
import CustomerConteiner from './pages/Customer/ConteinerList/CustomerConteiner';
import OrderConteiner from './pages/Order/ConteinerList/OrderConteiner';
import { ToastProvider } from './components/ToastContext';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import PrivateRoutes from './components/PrivateRoutes';
import SignIn from './pages/Auth/SignIn';
import ForceNewPassword from './pages/Auth/ForceNewPassword';

export default function App() {
    return (
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
                                    <Routes>
                                        <Route element={<ProtectedLayout />}>
                                            <Route path="/painel" element={<Dashboard />} />
                                            <Route path="/pedido" element={<OrderConteiner />} />
                                            <Route path="/cliente" element={<CustomerConteiner />} />
                                            <Route path="/produto" element={<ProductConteiner />} />
                                            <Route path="/usuario" element={<UserConteiner />} />
                                        </Route>
                                    </Routes>
                            }
                        />
                        <Route path="/" element={<Navigate to="/signIn" />} />
                    </Routes>
                </Router>
            </ToastProvider>
    );
}