/**
 * QR Generator Component
 * Generates QR codes from processed data and provides download/share functionality
 */

import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography, Alert, Paper } from '@mui/material';
import { Download, Share, QrCode } from '@mui/icons-material';
import {
  generateQRCodeCanvas,
  generateQRCodeDataURL,
  downloadQRCode,
  shareQRCode,
} from '../utils/qrGenerator';

interface QRGeneratorProps {
  data: string;
}

const QRGenerator: React.FC<QRGeneratorProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrUrl, setQrUrl] = useState<string>('');
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (data) {
      generateQR();
    }
  }, [data]);

  const generateQR = async () => {
    if (!canvasRef.current || !data) return;

    try {
      setIsGenerating(true);
      setError('');

      // Generate QR code on canvas
      await generateQRCodeCanvas(canvasRef.current, data, {
        width: 300,
        margin: 2,
      });

      // Also generate data URL for sharing
      const dataUrl = await generateQRCodeDataURL(data, { width: 300, margin: 2 });
      setQrUrl(dataUrl);
    } catch (err) {
      setError('Failed to generate QR code');
      console.error('QR generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!qrUrl) return;
    downloadQRCode(qrUrl, 'qr-code-processed.png');
  };

  const handleShare = async () => {
    if (!qrUrl) return;
    await shareQRCode(qrUrl, data, 'Processed QR Code');
  };

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Paper
      elevation={2}
      sx={{
        mt: 3,
        p: 3,
        textAlign: 'center',
        borderRadius: 3,
        background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
        <QrCode sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" color="primary.main">
          Generated QR Code
        </Typography>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Processed Data: <code style={{ backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>{data}</code>
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 3,
          position: 'relative',
        }}
      >
        {isGenerating && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: 2,
              zIndex: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Generating...
            </Typography>
          </Box>
        )}
        <canvas
          ref={canvasRef}
          style={{
            border: '2px solid #e0e0e0',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Button
          variant="contained"
          startIcon={<Download />}
          onClick={handleDownload}
          disabled={!qrUrl || isGenerating}
          sx={{ minWidth: { xs: '100%', sm: 140 } }}
        >
          Download
        </Button>
        <Button
          variant="outlined"
          startIcon={<Share />}
          onClick={handleShare}
          disabled={!qrUrl || isGenerating}
          sx={{ minWidth: { xs: '100%', sm: 140 } }}
        >
          Share
        </Button>
      </Box>
    </Paper>
  );
};

export default QRGenerator; 