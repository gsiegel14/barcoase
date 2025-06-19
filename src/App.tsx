/**
 * Main App Component
 * QR Code Processor - Denver Health
 * Processes QR codes by appending .forexample and generates new QR codes
 */

import { useState } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Chip,
  Divider,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { QrCode2, Clear, Transform } from '@mui/icons-material';

import { processQRDataWithPrefix, getFormatError } from './utils/qrProcessor';
import QRGenerator from './components/QRGenerator';
import QRScanner from './components/QRScanner';
import Header from './components/Header';
import OfflineIndicator from './components/OfflineIndicator';
import PWAInstallButton from './components/PWAInstallButton';
import theme from './theme';

function App() {
  const [inputData, setInputData] = useState(''); // base barcode
  const [prefix, setPrefix] = useState('EDU'); // user-entered prefix
  const [processedData, setProcessedData] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleInputChange = (value: string) => {
    setInputData(value);
    
    if (value.trim()) {
      const formatError = getFormatError(value.trim());
      setError(formatError || '');
      setIsValid(!formatError);
    } else {
      setError('');
      setIsValid(false);
    }
  };

  const handleProcess = () => {
    if (!inputData.trim()) {
      setError('Please enter the base barcode');
      return;
    }

    if (!prefix.trim()) {
      setError('Please enter a prefix');
      return;
    }

    try {
      const processed = processQRDataWithPrefix(inputData.trim(), prefix.trim());
      setProcessedData(processed);
      setError('');
    } catch (err) {
      setError('Error processing QR code data');
      console.error('Processing error:', err);
    }
  };

  const handleClear = () => {
    setInputData('');
    setProcessedData('');
    setError('');
    setIsValid(false);
  };

  const handleScan = (scannedData: string) => {
    setInputData(scannedData);
    handleInputChange(scannedData);
  };



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <OfflineIndicator />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: 'background.default',
          pb: 4,
        }}
      >
        <Header />

        <Container maxWidth="sm">
          <PWAInstallButton />
          
          {/* Main Processing Card */}
          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 3,
              background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <QrCode2 sx={{ mr: 1, color: 'primary.main', fontSize: 28 }} />
              <Typography variant="h5" color="primary.main" sx={{ fontWeight: 600 }}>
                Process QR Code
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Enter or scan a QR code in the format{' '}
              <Chip
                label="WB##########|#######"
                size="small"
                variant="outlined"
                sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}
              />
            </Typography>

            {/* Text Input */}
            <TextField
              fullWidth
              label="QR Code Data"
              placeholder="WB1234567890|9876543"
              value={inputData}
              onChange={(e) => handleInputChange(e.target.value)}
              margin="normal"
              multiline
              rows={3}
              helperText={
                inputData && isValid
                  ? '✓ Valid format detected'
                  : inputData && !isValid
                  ? 'Format should be: WB##########|#######'
                  : 'Paste or type base barcode here'
              }
              sx={{
                '& .MuiFormHelperText-root': {
                  color: inputData && isValid ? 'success.main' : 'text.secondary',
                },
              }}
            />

            {/* Prefix Input */}
            <TextField
              fullWidth
              label="Prefix"
              placeholder="EDU"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              margin="normal"
              helperText="Enter prefix to add before each part"
            />

            {/* QR Scanner */}
            <QRScanner onScan={handleScan} disabled={!!processedData} />

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            {/* Action Buttons */}
            <Box sx={{ mt: 3, display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button
                variant="contained"
                onClick={handleProcess}
                disabled={!inputData.trim()}
                startIcon={<Transform />}
                fullWidth
                sx={{ py: 1.5, fontSize: '1rem' }}
              >
                Process & Generate QR
              </Button>
              <Button
                variant="outlined"
                onClick={handleClear}
                disabled={!inputData && !processedData}
                startIcon={<Clear />}
                sx={{ minWidth: { xs: '100%', sm: 120 }, py: 1.5 }}
              >
                Clear
              </Button>
            </Box>

            {/* Results Section */}
            {processedData && (
              <>
                <Divider sx={{ my: 3 }} />
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ color: 'success.main' }}>
                    ✓ Processing Complete
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: 'grey.50',
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'grey.200',
                      mb: 2,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Original:
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: 'monospace',
                        wordBreak: 'break-all',
                        color: 'text.primary',
                        mb: 1,
                      }}
                    >
                      {inputData}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Processed:
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: 'monospace',
                        wordBreak: 'break-all',
                        color: 'success.main',
                        fontWeight: 600,
                      }}
                    >
                      {processedData}
                    </Typography>
                  </Box>

                  <QRGenerator data={processedData} />
                </Box>
              </>
            )}
          </Paper>

          {/* Footer */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Denver Health QR Code Processor
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Secure client-side processing • Works offline • No data stored
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
