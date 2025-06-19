/**
 * Header Component
 * Displays Denver Health logo and app title
 */

import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const Header: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        py: 3,
        px: 2,
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        color: 'white',
        borderRadius: '0 0 24px 24px',
        mb: 2,
        boxShadow: '0 4px 20px rgba(0, 102, 204, 0.2)',
      }}
    >
      {/* Denver POCUS Logo */}
      <Box
        sx={{
          width: 80,
          height: 80,
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="/denver-pocus-logo.png"
          alt="Denver POCUS Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))',
          }}
        />
      </Box>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          textAlign: 'center',
          mb: 1,
          fontSize: { xs: '1.5rem', sm: '1.75rem' },
        }}
      >
        QR Code Processor
      </Typography>

      <Typography
        variant="body1"
        sx={{
          textAlign: 'center',
          opacity: 0.9,
          fontSize: { xs: '0.875rem', sm: '1rem' },
          maxWidth: '400px',
        }}
      >
        Process and generate QR codes with .forexample extension
      </Typography>
    </Box>
  );
};

export default Header; 