import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, alpha } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import SideMenu from '../components/SideMenu';
import AppNavbar from '../components/AppNavbar';
import AppTheme from '../theme/AppTheme';
import createThemeWithVars from '@mui/material/styles/createThemeWithVars';

const theme = createThemeWithVars();

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
                        backgroundColor: theme.vars
                            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                            : alpha(theme.palette.background.default, 1),
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