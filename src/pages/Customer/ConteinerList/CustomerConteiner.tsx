import React from "react";
import CustomerGrid from "./CustomerGrid";
import { PageLayout } from "../../../components/PageLayout";
import AppTheme from "../../../theme/AppTheme";
import { CssBaseline } from "@mui/material";
import { dataGridCustomizations } from './../../../theme/customizations';

const xThemeComponents = {
  ...dataGridCustomizations
};


export default function CustomerConteiner() {
    return (
        <AppTheme themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme />
            <PageLayout>
                <CustomerGrid />
            </PageLayout>
        </AppTheme>
    );
}