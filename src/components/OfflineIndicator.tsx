import React, { useState, useEffect } from 'react';
import {
  Alert,
  Snackbar,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import {
  WifiOff,
  Wifi,
  CloudDone,
} from '@mui/icons-material';

const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineAlert, setShowOfflineAlert] = useState(false);
  const [showOnlineAlert, setShowOnlineAlert] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOnlineAlert(true);
      setShowOfflineAlert(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineAlert(true);
      setShowOnlineAlert(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <>
      {/* Persistent status indicator */}
      <Box
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <Chip
          icon={isOnline ? <Wifi /> : <WifiOff />}
          label={isOnline ? 'Online' : 'Offline'}
          color={isOnline ? 'success' : 'warning'}
          variant="filled"
          size="small"
          sx={{
            fontWeight: 600,
            '& .MuiChip-icon': {
              fontSize: '1rem',
            },
          }}
        />
      </Box>

      {/* Offline alert */}
      <Snackbar
        open={showOfflineAlert}
        autoHideDuration={6000}
        onClose={() => setShowOfflineAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowOfflineAlert(false)}
          severity="warning"
          sx={{ width: '100%' }}
          icon={<WifiOff />}
        >
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            You're offline
          </Typography>
          <Typography variant="caption">
            App works offline • All processing happens locally
          </Typography>
        </Alert>
      </Snackbar>

      {/* Back online alert */}
      <Snackbar
        open={showOnlineAlert}
        autoHideDuration={4000}
        onClose={() => setShowOnlineAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowOnlineAlert(false)}
          severity="success"
          sx={{ width: '100%' }}
          icon={<CloudDone />}
        >
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Back online
          </Typography>
          <Typography variant="caption">
            Connection restored
          </Typography>
        </Alert>
      </Snackbar>
    </>
  );
};

export default OfflineIndicator; 