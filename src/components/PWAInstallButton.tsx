import React from 'react';
import {
  Button,
  Snackbar,
  Alert,
  Box,
  Typography,
} from '@mui/material';
import {
  GetApp,
  SystemUpdate,
  CheckCircle,
} from '@mui/icons-material';
import { usePWA } from '../hooks/usePWA';

const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isUpdateAvailable, promptInstall, skipWaiting } = usePWA();

  if (isInstalled && !isUpdateAvailable) {
    return null; // Don't show anything if already installed and no updates
  }

  return (
    <>
      {/* Install button */}
      {isInstallable && (
        <Box sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<GetApp />}
            onClick={promptInstall}
            fullWidth
            sx={{
              py: 1.5,
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                borderColor: 'primary.dark',
                backgroundColor: 'primary.light',
              },
            }}
          >
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Install App
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Works offline • Add to home screen
              </Typography>
            </Box>
          </Button>
        </Box>
      )}

      {/* Update available notification */}
      <Snackbar
        open={isUpdateAvailable}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ bottom: { xs: 90, sm: 24 } }}
      >
        <Alert
          severity="info"
          sx={{ width: '100%', alignItems: 'center' }}
          icon={<SystemUpdate />}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={skipWaiting}
              sx={{ fontWeight: 600 }}
            >
              Update
            </Button>
          }
        >
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              New version available
            </Typography>
            <Typography variant="caption">
              Restart to get the latest features
            </Typography>
          </Box>
        </Alert>
      </Snackbar>

      {/* Installed confirmation */}
      {isInstalled && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 1,
            mb: 2,
            bgcolor: 'success.light',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'success.main',
          }}
        >
          <CheckCircle sx={{ color: 'success.main', mr: 1, fontSize: '1.2rem' }} />
          <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600 }}>
            App installed • Works offline
          </Typography>
        </Box>
      )}
    </>
  );
};

export default PWAInstallButton; 