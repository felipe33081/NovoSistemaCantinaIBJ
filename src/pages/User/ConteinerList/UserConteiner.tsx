import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import UserGrid from "./UserGrid";
import AppTheme from "../../../theme/AppTheme";
import { CssBaseline } from "@mui/material";
import { dataGridCustomizations } from './../../../theme/customizations';

const xThemeComponents = {
  ...dataGridCustomizations
};

export default function UserConteiner() {
    return (
        <AppTheme themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme />
            <PageLayout>
                <UserGrid />
            </PageLayout>
        </AppTheme>
    );
}