import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface DrawerContentLoaderProps {
    loading: boolean;
    children: React.ReactNode;
}

export const DrawerContentLoader = ({ loading, children }: DrawerContentLoaderProps) => {
    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                minHeight: '400px',
                gap: 2
            }}>
                <CircularProgress size={40} />
                <Typography variant="body2" color="text.secondary">
                    Carregando informações...
                </Typography>
            </Box>
        );
    }

    return <>{children}</>;
};