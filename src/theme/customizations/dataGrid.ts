import { paperClasses } from '@mui/material/Paper';
import { alpha, Theme } from '@mui/material/styles';
import type { DataGridProComponents } from '@mui/x-data-grid-pro/themeAugmentation';
import type { DataGridComponents } from '@mui/x-data-grid/themeAugmentation';
import { menuItemClasses } from '@mui/material/MenuItem';
import { listItemIconClasses } from '@mui/material/ListItemIcon';
import { iconButtonClasses } from '@mui/material/IconButton';
import { listClasses } from '@mui/material/List';
import { gridClasses } from '@mui/x-data-grid';
import { gray } from '../.././theme/themePrimitives';
import createThemeWithVars from '@mui/material/styles/createThemeWithVars';
const theme = createThemeWithVars();

export const dataGridCustomizations: DataGridProComponents<Theme> & DataGridComponents<Theme> = {
  MuiDataGrid: {
    styleOverrides: {
      root: ({ theme }) => ({
        border: 'none',
        backgroundColor: theme.palette.background.paper,
        
        [`& .${gridClasses.columnHeader}:first-of-type, & .${gridClasses.cell}:first-of-type`]: {
          paddingLeft: '24px',
        },
      }),
      cell: {
        borderBottom: 'none',
        padding: '0 16px',
        alignItems: 'center',
        display: 'flex',
      },
      menu: () => ({
        borderRadius: theme.shape.borderRadius,
        backgroundImage: 'none',
        bgcolor: 'background.paper',
        [`& .${paperClasses.root}`]: {
          border: `1px solid ${(theme.vars || theme).palette.divider}`,
        },

        [`& .${menuItemClasses.root}`]: {
          margin: '0 4px',
        },
        [`& .${listItemIconClasses.root}`]: {
          marginRight: 0,
        },
        [`& .${listClasses.root}`]: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      }),

      row: ({ theme }) => ({
        cursor: 'pointer',
        
        '&:nth-of-type(even)': {
          backgroundColor: theme.palette.mode === 'light' 
            ? '#f9f9f9' 
            : 'rgba(255, 255, 255, 0.03)',
        },

        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
      }),
      iconButtonContainer: () => ({
        [`& .${iconButtonClasses.root}`]: {
          border: 'none',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: alpha(theme.palette.action.selected, 0.3),
          },
          '&:active': {
            backgroundColor: gray[200],
          },
          ...theme.applyStyles('dark', {
            color: gray[50],
            '&:hover': {
              backgroundColor: gray[800],
            },
            '&:active': {
              backgroundColor: gray[900],
            },
          }),
        },
      }),
      menuIconButton: () => ({
        border: 'none',
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: gray[100],
        },
        '&:active': {
          backgroundColor: gray[200],
        },
        ...theme.applyStyles('dark', {
          color: gray[50],
          '&:hover': {
            backgroundColor: gray[800],
          },
          '&:active': {
            backgroundColor: gray[900],
          },
        }),
      }),
      filterForm: () => ({
        gap: theme.spacing(1),
        alignItems: 'flex-end',
      }),
      columnsManagementHeader: () => ({
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
      }),
      columnHeaderTitleContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
      },
      columnHeaderDraggableContainer: { paddingRight: 2 },
    },
  }
};
