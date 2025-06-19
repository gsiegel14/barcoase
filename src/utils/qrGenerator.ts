/**
 * QR Code Generation Utilities
 * Handles generating QR codes from processed data
 */

import QRCode from 'qrcode';

export interface QROptions {
  width?: number;
  margin?: number;
  color?: {
    dark?: string;
    light?: string;
  };
}

export const generateQRCodeCanvas = async (
  canvas: HTMLCanvasElement,
  data: string,
  options: QROptions = {}
): Promise<void> => {
  const defaultOptions = {
    width: 300,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    },
    ...options
  };

  await QRCode.toCanvas(canvas, data, defaultOptions);
};

export const generateQRCodeDataURL = async (
  data: string,
  options: QROptions = {}
): Promise<string> => {
  const defaultOptions = {
    width: 300,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    },
    ...options
  };

  return await QRCode.toDataURL(data, defaultOptions);
};

export const downloadQRCode = (dataUrl: string, filename: string = 'qr-code-processed.png'): void => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const shareQRCode = async (
  dataUrl: string,
  data: string,
  title: string = 'Processed QR Code'
): Promise<void> => {
  if (!navigator.share) {
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(data);
      alert('QR data copied to clipboard!');
    } catch {
      alert('Sharing not available. Please save the QR code manually.');
    }
    return;
  }

  try {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const file = new File([blob], 'qr-code.png', { type: 'image/png' });

    await navigator.share({
      title,
      text: 'Generated QR code with .forexample appended',
      files: [file]
    });
  } catch (err) {
    console.error('Share failed:', err);
    // Fallback to download
    downloadQRCode(dataUrl);
  }
}; 