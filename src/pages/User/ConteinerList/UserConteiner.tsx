import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import UserGrid from "./UserGrid";
import AppTheme from "../../../theme/AppTheme";
import { CssBaseline } from "@mui/material";

export default function UserConteiner() {
    return (
        <AppTheme>
            <CssBaseline enableColorScheme />
            <PageLayout>
                <UserGrid />
            </PageLayout>
        </AppTheme>
    );
}