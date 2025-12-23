import React from "react";
import OrderGrid from "./OrderGrid";
import { PageLayout } from "../../../components/PageLayout";
import AppTheme from "../../../theme/AppTheme";
import { CssBaseline } from "@mui/material";
import { dataGridCustomizations } from './../../../theme/customizations';

const xThemeComponents = {
  ...dataGridCustomizations
};

export default function OrderConteiner() {
    return (
        <AppTheme themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme />
            <PageLayout>
                <OrderGrid />
            </PageLayout>
        </AppTheme>
    );
}