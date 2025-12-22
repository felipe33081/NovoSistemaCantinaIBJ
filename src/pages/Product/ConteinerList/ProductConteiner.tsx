import React from "react";
import ProductGrid from "./ProductGrid";
import { PageLayout } from "../../../components/PageLayout";
import AppTheme from "../../../theme/AppTheme";
import { CssBaseline } from "@mui/material";
import { dataGridCustomizations } from './../../../theme/customizations';

const xThemeComponents = {
  ...dataGridCustomizations
};


export default function ProductConteiner() {
    return (
        <AppTheme themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme />
            <PageLayout>
                <ProductGrid />
            </PageLayout>
        </AppTheme>
    );
}