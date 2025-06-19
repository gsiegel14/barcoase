/**
 * Material-UI Theme Configuration
 * Denver Health branding with mobile-first design
 */

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0066CC', // Denver Health blue
      light: '#3384D6',
      dark: '#004A99',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00A651', // Denver Health green
      light: '#33B870',
      dark: '#007A3D',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '1.75rem',
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
      '@media (max-width:600px)': {
        fontSize: '1.1rem',
      },
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          minHeight: 44, // Minimum touch target for mobile
          padding: '12px 24px',
          fontSize: '1rem',
          '@media (max-width:600px)': {
            minHeight: 48,
            padding: '14px 24px',
          },
        },
        contained: {
          boxShadow: '0 2px 8px rgba(0, 102, 204, 0.2)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 102, 204, 0.3)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            minHeight: 56, // Better touch target for mobile
            '&:hover fieldset': {
              borderColor: '#0066CC',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0066CC',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 16px rgba(0, 0, 0, 0.1)',
        },
        elevation3: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 16,
          paddingRight: 16,
          '@media (max-width:600px)': {
            paddingLeft: 12,
            paddingRight: 12,
          },
        },
      },
    },
  },
  spacing: 8, // MUI's 8px grid system
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme; 