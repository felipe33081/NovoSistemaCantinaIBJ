import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';
import { IToastContextData } from '../utils/interfaces/interfaces';
import { setToastRef } from '../utils/ToastUtils';

const ToastContext = createContext<IToastContextData>({} as IToastContextData);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<AlertColor>('success');

    const showToast = useCallback((msg: string, type: AlertColor) => {
        setMessage(msg);
        setSeverity(type);
        setOpen(true);
    }, []);

    const showSuccess = useCallback((msg: string) => showToast(msg, 'success'), [showToast]);
    const showError = useCallback((msg: string) => showToast(msg, 'error'), [showToast]);
    const showInfo = useCallback((msg: string) => showToast(msg, 'info'), [showToast]);
    const showWarning = useCallback((msg: string) => showToast(msg, 'warning'), [showToast]);

    useEffect(() => {
        setToastRef({
            showSuccess,
            showError,
            showInfo,
            showWarning
        });
    }, [showSuccess, showError, showInfo, showWarning]);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <ToastContext.Provider value={{ showSuccess, showError, showInfo, showWarning }}>
            {children}

            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%', color: '#fff' }}>
                    {message}
                </Alert>
            </Snackbar>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast deve ser usado dentro de um ToastProvider');
    }
    return context;
};