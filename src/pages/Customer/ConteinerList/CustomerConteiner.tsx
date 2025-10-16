import React from "react";
import CustomerGrid from "./CustomerGrid";
import { PageLayout } from "../../../components/PageLayout";
import AppTheme from "../../../theme/AppTheme";
import { CssBaseline } from "@mui/material";

export default function CustomerConteiner() {
    return (
        <AppTheme>
            <CssBaseline enableColorScheme />
            <PageLayout>
                <CustomerGrid />
            </PageLayout>
        </AppTheme>
    );
}