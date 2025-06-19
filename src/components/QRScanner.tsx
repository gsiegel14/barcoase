/**
 * QR Scanner Component
 * Optional camera-based QR code scanning functionality
 */

import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Alert, Typography, Paper } from '@mui/material';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { CameraAlt, Stop, QrCodeScanner } from '@mui/icons-material';

interface QRScannerProps {
  onScan: (data: string) => void;
  disabled?: boolean;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan, disabled = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const [reader] = useState(() => new BrowserMultiFormatReader());
  const [hasCamera, setHasCamera] = useState(false);
  const readerRef = useRef<any>(null);

  useEffect(() => {
    // Check if camera is available
    const checkCamera = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasVideoInput = devices.some(device => device.kind === 'videoinput');
        setHasCamera(hasVideoInput);
      } catch (err) {
        setHasCamera(false);
      }
    };

    checkCamera();
  }, []);

  useEffect(() => {
    return () => {
      if (readerRef.current) {
        try {
          readerRef.current.stop();
        } catch (err) {
          // Ignore cleanup errors
        }
      }
    };
  }, []);

  const startScanning = async () => {
    if (!videoRef.current || !hasCamera) return;

    try {
      setError('');
      setIsScanning(true);

      const controls = await reader.decodeFromVideoDevice(
        undefined, // Use default camera
        videoRef.current,
        (result) => {
          if (result) {
            const scannedData = result.getText();
            onScan(scannedData);
            stopScanning();
          }
          // Ignore errors during scanning - they're normal
        }
      );
      
      readerRef.current = controls;
    } catch (err) {
      setError('Failed to access camera. Please check permissions and try again.');
      setIsScanning(false);
      console.error('Camera access error:', err);
    }
  };

  const stopScanning = () => {
    if (readerRef.current) {
      try {
        readerRef.current.stop();
        readerRef.current = null;
      } catch (err) {
        // Ignore stop errors
      }
    }
    setIsScanning(false);
  };

  // Always render, but show different content based on camera availability

  return (
    <Paper
      elevation={1}
      sx={{
        mt: 2,
        p: 2,
        borderRadius: 2,
        border: '1px dashed',
        borderColor: 'primary.main',
        backgroundColor: 'primary.50',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <QrCodeScanner sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" color="primary.main">
          Camera Scanner
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {isScanning && (
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <video
            ref={videoRef}
            style={{
              width: '100%',
              maxWidth: '400px',
              height: '300px',
              border: '2px solid #0066CC',
              borderRadius: '12px',
              backgroundColor: '#000',
            }}
            playsInline
            muted
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Position QR code within the camera frame
          </Typography>
        </Box>
      )}

      <Button
        variant={isScanning ? 'outlined' : 'contained'}
        color={isScanning ? 'error' : 'primary'}
        startIcon={isScanning ? <Stop /> : <CameraAlt />}
        onClick={isScanning ? stopScanning : startScanning}
        disabled={disabled || !hasCamera}
        fullWidth
        sx={{
          py: 1.5,
          fontSize: '1rem',
        }}
      >
        {isScanning ? 'Stop Scanning' : 'Scan QR Code with Camera'}
      </Button>

      {!isScanning && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
          {hasCamera 
            ? 'Tap to use your device\'s camera to scan QR codes'
            : 'Camera not available - please type QR code data manually or check camera permissions'
          }
        </Typography>
      )}
    </Paper>
  );
};

export default QRScanner; 