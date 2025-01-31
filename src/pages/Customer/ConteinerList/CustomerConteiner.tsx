import React from "react";
import { alpha, Box, Stack } from "@mui/material";
import createThemeWithVars from "@mui/material/styles/createThemeWithVars";
import HeaderForPages from "../../../components/HeaderForPages";
import CustomerGrid from "./CustomerGrid";

const theme = createThemeWithVars();

export default function CustomerConteiner () {
    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                component="main"
                sx={() => ({
                    flexGrow: 1,
                    backgroundColor: theme.vars
                        ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                        : alpha(theme.palette.background.default, 1),
                    overflow: 'auto',
                })}
            >
                <Stack
                    spacing={2}
                    sx={{
                        alignItems: 'center',
                        mx: 3,
                        pb: 10,
                        mt: { xs: 8, md: 0 },
                    }}
                >
                    <HeaderForPages />
                    <CustomerGrid />
                </Stack>
            </Box>
        </Box>
    );
}