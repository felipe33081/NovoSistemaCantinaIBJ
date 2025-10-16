import React from "react";
import OrderGrid from "./OrderGrid";
import { PageLayout } from "../../../components/PageLayout";
import AppTheme from "../../../theme/AppTheme";
import { CssBaseline } from "@mui/material";

export default function OrderConteiner() {
    return (
        <AppTheme>
            <CssBaseline enableColorScheme />
            <PageLayout>
                <OrderGrid />
            </PageLayout>
        </AppTheme>
    );
}