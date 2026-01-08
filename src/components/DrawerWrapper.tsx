import React from 'react';
import { Drawer, Box, Typography, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IDrawerWrapperProps } from '../utils/interfaces/interfaces';

export default function DrawerWrapper({
    open,
    onClose,
    title,
    children,
    actions,
    isWrapperChildren = false
}: IDrawerWrapperProps) {
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
        >
            <Box
                sx={{
                    width: isWrapperChildren
                        ? {
                            xs: '85vw',
                            sm: '70vw',
                            md: 400,
                            lg: 480,
                        }
                        : {
                            xs: '100vw',
                            sm: '80vw',
                            md: 500,
                            lg: 600,
                        },
                    maxWidth: '100vw',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                    p: 3
                }}
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

                <Divider />

                <Box
                    sx={{
                        mt: 2,
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