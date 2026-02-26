import React from "react";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Navigate } from 'react-router-dom';

function PrivateRoutes(
    { children }: { children: JSX.Element }) {
    //const { isAuthenticated } = useAuth();

    // if (isAuthenticated === null) {
    //     return (
    //         <Box
    //             sx={{
    //                 display: 'flex',
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //                 height: '100vh',
    //             }}
    //         >
    //             <CircularProgress size="3rem" />
    //         </Box>
    //     );
    // }

    // return isAuthenticated ? children : <Navigate to="/signIn" />;
}

export default PrivateRoutes;