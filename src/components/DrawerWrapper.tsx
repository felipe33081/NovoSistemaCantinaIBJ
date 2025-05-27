import React from 'react';
import { Drawer, Box, Typography, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface DrawerWrapperProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    width?: number | string;
    actions?: React.ReactNode;
}

export default function DrawerWrapper({
    open,
    onClose,
    title,
    children,
    width = 490,
    actions
}: DrawerWrapperProps) {
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
        >
            <Box
                sx={{
                    width: typeof width === 'number' ? `${width}px` : width,
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}
                role="presentation"
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 2,
                    }}
                >
                    {title && (
                        <Typography variant="h6" component="h2">
                            {title}
                        </Typography>
                    )}
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box
                    sx={{
                        mt: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    {children}
                    {actions &&
                        <Box>
                            {actions}
                        </Box>}
                </Box>
            </Box>
        </Drawer>
    );
}