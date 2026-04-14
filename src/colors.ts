// src/theme/colors.ts
// ✅ Single source of truth for BOTH MUI and Tailwind

export const colors = {
  primary: {
    main: '#FFFFFF',
    light: '#F8F9FA',
    dark: '#E8E8E8',
  },
  accent: {
    main: '#2196F3',
    light: '#64B5F6',
    dark: '#1976D2',
  },
  background: {
    default: '#F5F5F5',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#1A1A1A',
    secondary: '#6C757D',
  },
  border: '#E0E0E0',
  error: '#DC3545',
  success: '#28A745',
  warning: '#FFC107',
} as const;

