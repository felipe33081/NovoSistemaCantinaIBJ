import * as React from 'react';
import { alpha, Theme, Components } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
import { toggleButtonClasses } from '@mui/material/ToggleButton';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { gray, brand, customPalette } from '../themePrimitives';
import createThemeWithVars from '@mui/material/styles/createThemeWithVars';
import { Environment } from '../../environments/Index';

const theme = createThemeWithVars();

export const inputsCustomizations: Components<Theme> = {
  MuiButtonBase: {
    defaultProps: {
      disableTouchRipple: true,
      disableRipple: true,
    },
    styleOverrides: {
      root: () => ({
        boxSizing: 'border-box',
        transition: 'all 100ms ease-in',
        '&:focus-visible': {
          outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
          outlineOffset: '2px',
        },
      }),
    },
  },
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: 'none',
        borderRadius: '4px',
        textTransform: 'none',
        variants: [
          {
            props: {
              size: 'small',
            },
            style: {
              height: '2.25rem',
              padding: '8px 12px',
            },
          },
          {
            props: {
              size: 'medium',
            },
            style: {
              height: '2.5rem', // 40px
            },
          },
          {
            props: {
              color: 'primary',
              variant: 'contained',
            },
            style: {
              color: Environment.LIGHT_COLOR_BUTTON_TEXT,
              backgroundColor: customPalette[400],
              boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.5)',
              '&:hover': {
                backgroundImage: 'none',
                backgroundColor: customPalette[500],
              },
              '&:active': {
                backgroundColor: customPalette[300],
              },
              ...theme.applyStyles('dark', {
                color: Environment.DARK_COLOR_BUTTON_TEXT,
                backgroundColor: customPalette[600],
                boxShadow: '3px 3px 3px rgba(112, 112, 112, 0.5)',
                '&:hover': {
                  backgroundImage: 'none',
                  backgroundColor: customPalette[700],
                },
                '&:active': {
                  backgroundColor: customPalette[500],
                },
              }),
            },
          },
          {
            props: {
              color: 'secondary',
              variant: 'contained',
            },
            style: {
              color: 'white',
              backgroundColor: brand[300],
              backgroundImage: `linear-gradient(to bottom, ${alpha(brand[400], 0.8)}, ${brand[500]})`,
              boxShadow: `inset 0 2px 0 ${alpha(brand[200], 0.2)}, inset 0 -2px 0 ${alpha(brand[700], 0.4)}`,
              border: `1px solid ${brand[500]}`,
              '&:hover': {
                backgroundColor: brand[700],
                boxShadow: 'none',
              },
              '&:active': {
                backgroundColor: brand[700],
                backgroundImage: 'none',
              },
            },
          },
          {
            props: {
              variant: 'outlined',
            },
            style: {
              color: (theme || theme).palette.text.primary,
              border: '1px solid',
              borderColor: customPalette[200],
              backgroundColor: customPalette[50],
              '&:hover': {
                backgroundColor: customPalette[100],
                borderColor: customPalette[300],
              },
              '&:active': {
                backgroundColor: customPalette[200],
              },
              ...theme.applyStyles('dark', {
                backgroundColor: customPalette[800],
                borderColor: customPalette[700],

                '&:hover': {
                  backgroundColor: customPalette[900],
                  borderColor: customPalette[600],
                },
                '&:active': {
                  backgroundColor: customPalette[900],
                },
              }),
            },
          },
          {
            props: {
              color: 'secondary',
              variant: 'outlined',
            },
            style: {
              color: customPalette[700],
              border: '1px solid',
              borderColor: customPalette[200],
              backgroundColor: customPalette[50],
              '&:hover': {
                backgroundColor: customPalette[100],
                borderColor: customPalette[400],
              },
              '&:active': {
                backgroundColor: alpha(customPalette[200], 0.7),
              },
              ...theme.applyStyles('dark', {
                color: customPalette[50],
                border: '1px solid',
                borderColor: customPalette[900],
                backgroundColor: alpha(customPalette[900], 0.3),
                '&:hover': {
                  borderColor: customPalette[700],
                  backgroundColor: alpha(customPalette[900], 0.6),
                },
                '&:active': {
                  backgroundColor: alpha(customPalette[900], 0.5),
                },
              }),
            },
          },
          {
            props: {
              variant: 'text',
            },
            style: {
              color: gray[600],
              '&:hover': {
                backgroundColor: gray[100],
              },
              '&:active': {
                backgroundColor: gray[200],
              },
              ...theme.applyStyles('dark', {
                color: gray[50],
                '&:hover': {
                  backgroundColor: gray[700],
                },
                '&:active': {
                  backgroundColor: alpha(gray[700], 0.7),
                },
              }),
            },
          },
          {
            props: {
              color: 'secondary',
              variant: 'text',
            },
            style: {
              color: brand[700],
              '&:hover': {
                backgroundColor: alpha(brand[100], 0.5),
              },
              '&:active': {
                backgroundColor: alpha(brand[200], 0.7),
              },
              ...theme.applyStyles('dark', {
                color: brand[100],
                '&:hover': {
                  backgroundColor: alpha(brand[900], 0.5),
                },
                '&:active': {
                  backgroundColor: alpha(brand[900], 0.3),
                },
              }),
            },
          },
        ],
      }),
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: ({theme}) => ({
        boxShadow: 'none',
        borderRadius: (theme || theme).shape.borderRadius,
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightMedium,
        letterSpacing: 0,
        border: '1px solid ',
        borderColor: customPalette[200],
        backgroundColor: customPalette[100],
        '&:hover': {
          backgroundColor: customPalette[200],
          borderColor: customPalette[200],
        },
        '&:active': {
          backgroundColor: customPalette[300],
        },
        ...theme.applyStyles('dark', {
          backgroundColor: customPalette[900],
          borderColor: gray[500],
          '&:hover': {
            backgroundColor: customPalette[700],
            borderColor: customPalette[100],
          },
          '&:active': {
            backgroundColor: customPalette[500],
          },
        }),
        variants: [
          {
            props: {
              size: 'small',
            },
            style: {
              width: '2.25rem',
              height: '2.25rem',
              padding: '0.25rem',
              [`& .${svgIconClasses.root}`]: { fontSize: '1rem' },
            },
          },
          {
            props: {
              size: 'medium',
            },
            style: {
              width: '2.5rem',
              height: '2.5rem',
            },
          },
        ],
      }),
    },
  },
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: () => ({
        borderRadius: '10px',
        boxShadow: `0 4px 16px ${alpha(customPalette[400], 0.2)}`,
        [`& .${toggleButtonGroupClasses.selected}`]: {
          color: customPalette[500],
        },
        ...theme.applyStyles('dark', {
          [`& .${toggleButtonGroupClasses.selected}`]: {
            color: '#fff',
          },
          boxShadow: `0 4px 16px ${alpha(customPalette[700], 0.5)}`,
        }),
      }),
    },
  },
  MuiToggleButton: {
    styleOverrides: {
      root: () => ({
        padding: '12px 16px',
        textTransform: 'none',
        borderRadius: '10px',
        fontWeight: 500,
        ...theme.applyStyles('dark', {
          color: customPalette[400],
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
          [`&.${toggleButtonClasses.selected}`]: {
            color: customPalette[300],
          },
        }),
      }),
    },
  },
  MuiCheckbox: {
    defaultProps: {
      disableRipple: true,
      icon: (
        <CheckBoxOutlineBlankRoundedIcon sx={{ color: 'hsla(210, 0%, 0%, 0.0)' }} />
      ),
      checkedIcon: <CheckRoundedIcon sx={{ height: 14, width: 14 }} />,
      indeterminateIcon: <RemoveRoundedIcon sx={{ height: 14, width: 14 }} />,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        margin: 10,
        height: 16,
        width: 16,
        borderRadius: 5,
        border: 'none',
        color: customPalette[300],
        backgroundColor: alpha(customPalette[50], 0.4),
        transition: 'border-color, background-color, 120ms ease-in',
        '&:hover': {
          backgroundColor: alpha(customPalette[300], 0.5),
        },
        '&.Mui-focusVisible': {
          outline: `3px solid ${alpha(customPalette[500], 0.5)}`,
          outlineOffset: '2px',
        },
        '&.Mui-checked': {
          color: customPalette[400],
          '&:hover': {
            backgroundColor: customPalette[600],
          },
        },
        ...theme.applyStyles('dark', {
          backgroundColor: alpha(customPalette[50], 0.7),
          '&:hover': {
              backgroundColor: alpha(customPalette[300], 0.3),
          },
          '&.Mui-checked': {
            color: customPalette[600],
            '&:hover': {
              backgroundColor: customPalette[500],
            },
          },
          '&.Mui-focusVisible': {
            outline: `3px solid ${alpha(brand[500], 0.5)}`,
            outlineOffset: '2px',
          },
        }),
      }),
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        border: 'none',
      },
      input: {
        '&::placeholder': {
          opacity: 0.7,
          color: gray[500],
        },
      },
    },
  },//#22282a
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: '4px',
        backgroundColor: theme.palette.background.paper,
        ...theme.applyStyles('dark', {
          backgroundColor: '#3d4143'
        }),
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.grey[400],
        },
        [`&.${outlinedInputClasses.focused} .MuiOutlinedInput-notchedOutline`]: {
          borderColor: theme.palette.primary.main,
          borderWidth: 2,
        },
        [`&.${outlinedInputClasses.error} .MuiOutlinedInput-notchedOutline`]: {
          borderColor: theme.palette.error.main,
        },
      }),
      input: {
        padding: '16.5px 14px',
        height: '16px'
      },
      notchedOutline: {
        borderColor: 'rgba(0, 0, 0, 0.23)',
      },
    },
  },
  MuiInputAdornment: {
    styleOverrides: {
      root: () => ({
        color: (theme.vars || theme).palette.grey[500],
        ...theme.applyStyles('dark', {
          color: (theme.vars || theme).palette.grey[400],
        }),
      }),
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: () => ({
        typography: theme.typography.caption,
        marginBottom: 8,
      }),
    },
  },
};
