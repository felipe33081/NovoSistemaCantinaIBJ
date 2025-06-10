import React from 'react';
import type { } from '@mui/x-date-pickers/themeAugmentation';
import type { } from '@mui/x-charts/themeAugmentation';
import type { } from '@mui/x-data-grid/themeAugmentation';
import type { } from '@mui/x-tree-view/themeAugmentation';
import CssBaseline from '@mui/material/CssBaseline';
import MainGrid from './components/MainGrid';
import AppTheme from './theme/AppTheme';
import { chartsCustomizations, dataGridCustomizations, datePickersCustomizations, treeViewCustomizations } from './theme/customizations';
import { PageLayout } from './components/PageLayout';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <PageLayout>
        <MainGrid />
      </PageLayout>
    </AppTheme>
  );
}