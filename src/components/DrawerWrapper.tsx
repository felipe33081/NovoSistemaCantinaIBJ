import React from 'react';
import { Drawer, Box, Typography, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DrawerWrapperProps } from '../utils/interfaces/interfaces';

export default function DrawerWrapper({
    open,
    onClose,
    title,
    children,
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
                    width: {
                        xs: '100vw',     // telas pequenas (mobile): largura total
                        sm: '80vw',      // telas pequenas/médias: 80%
                        md: 500,         // telas médias pra cima: fixo 500px
                        lg: 600          // telas grandes: fixo 600px
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

                <Divider/>

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