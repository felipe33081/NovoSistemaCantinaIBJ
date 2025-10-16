import React from "react";
import ProductGrid from "./ProductGrid";
import { PageLayout } from "../../../components/PageLayout";
import AppTheme from "../../../theme/AppTheme";
import { CssBaseline } from "@mui/material";

export default function ProductConteiner() {
    return (
        <AppTheme>
            <CssBaseline enableColorScheme />
            <PageLayout>
                <ProductGrid />
            </PageLayout>
        </AppTheme>
    );
}