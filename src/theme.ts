// src/theme/theme.ts
import { createTheme } from '@mui/material/styles';

// ✅ Define your color palette in ONE place
const palette = {
  primary: {
    main: '#FFFFFF',
    light: '#F8F9FA',
    dark: '#E8E8E8',
    contrastText: '#1A1A1A',
  },
  secondary: {
    main: '#6C757D',
    light: '#ADB5BD',
    dark: '#495057',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#F5F5F5',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#1A1A1A',
    secondary: '#6C757D',
    disabled: '#ADB5BD',
  },
  accent: {
    main: '#2196F3',       // For buttons, links, highlights
    light: '#64B5F6',
    dark: '#1976D2',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#DC3545',
  },
  success: {
    main: '#28A745',
  },
  warning: {
    main: '#FFC107',
  },
  divider: '#E0E0E0',
};

const theme = createTheme({
  palette: {
    primary: palette.primary,
    secondary: palette.secondary,
    background: palette.background,
    text: palette.text,
    error: palette.error,
    success: palette.success,
    warning: palette.warning,
    divider: palette.divider,
  },

  // ✅ Typography consistency
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, color: palette.text.primary },
    h2: { fontWeight: 700, color: palette.text.primary },
    h3: { fontWeight: 600, color: palette.text.primary },
    h4: { fontWeight: 600, color: palette.text.primary },
    h5: { fontWeight: 500, color: palette.text.primary },
    h6: { fontWeight: 500, color: palette.text.primary },
    body1: { color: palette.text.primary },
    body2: { color: palette.text.secondary },
  },

  // ✅ Component-level overrides (change once, applies everywhere)
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
          padding: '10px 24px',
        },
        contained: {
          backgroundColor: palette.accent.main,
          color: palette.accent.contrastText,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          '&:hover': {
            backgroundColor: palette.accent.dark,
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
          },
        },
        outlined: {
          borderColor: palette.divider,
          color: palette.text.primary,
          '&:hover': {
            borderColor: palette.accent.main,
            backgroundColor: 'rgba(33, 150, 243, 0.04)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: palette.background.paper,
            '& fieldset': {
              borderColor: palette.divider,
            },
            '&:hover fieldset': {
              borderColor: palette.accent.main,
            },
            '&.Mui-focused fieldset': {
              borderColor: palette.accent.main,
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: palette.background.paper,
          borderRadius: 12,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: palette.secondary.light,
          '&.Mui-checked': {
            color: palette.accent.main,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: palette.accent.main,
          '&:hover': {
            color: palette.accent.dark,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: palette.text.secondary,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
  },

  shape: {
    borderRadius: 8,
  },
});

export default theme;