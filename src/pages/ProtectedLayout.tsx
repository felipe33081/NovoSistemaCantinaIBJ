import React from 'react';
import { Outlet  } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import SideMenu from '../components/SideMenu';
import AppNavbar from '../components/AppNavbar';
import AppTheme from '../theme/AppTheme';

export default function ProtectedLayout() {

    return (
        <AppTheme>
            <CssBaseline enableColorScheme />
            <Box sx={{ display: 'flex' }}>
                <SideMenu />
                <AppNavbar />
                
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        overflow: 'auto',
                        backgroundColor: (theme: any) =>
                            theme.vars
                                ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                                : theme.palette.background.default,
                    }}
                >
                    <Stack
                        spacing={2}
                    >
                        <Outlet />
                    </Stack>
                </Box>
            </Box>
        </AppTheme>
    );
}