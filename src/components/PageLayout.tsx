import React from "react";
import { Box, Stack } from "@mui/material";
import createThemeWithVars from '@mui/material/styles/createThemeWithVars';
import HeaderForPages from "./HeaderForPages";
import { PageLayoutProps } from "../utils/interfaces/interfaces";
import Copyright from "../internals/components/Copyright";

const theme = createThemeWithVars();

export const PageLayout = ({ children }: PageLayoutProps) => {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Este Stack precisa crescer para que o 'mt: auto' funcione */}
                <Stack
                    spacing={2}
                    sx={{
                        // ADICIONE ESTA LINHA:
                        flexGrow: 1, 
                        
                        alignItems: 'center',
                        mx: 3,
                        pb: 10,
                        mt: { xs: 8, md: 0 },
                    }}
                >
                    <HeaderForPages />
                    {children}
                    <Copyright sx={{
                        mt: 'auto',
                        py: 3
                    }} />
                </Stack>
            </Box>
        </Box>
    );
};